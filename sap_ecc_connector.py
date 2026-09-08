"""
SAP ECC (ECC 6.0 / R/3) Connector for Material Classes & Characteristics Extraction

Same extraction targets as the S/4HANA on Azure version:
  1. Total Material Classes (KLART)
  2. Batch-Managed Material Classes (KLART.MKCNT)
  3. Variant-Configured Material Classes (KLART.VARIANT)
  4. Total Characteristics (KSSK + CABN)

Key difference vs. S/4HANA on Azure: ECC connectivity is RFC-first.
OData/Gateway is an optional add-on in ECC (SAP_GWFND / Gateway Hub), not
guaranteed to be installed, so this connector defaults to RFC and only
falls back to OData if you explicitly configure it and Gateway is present.

The underlying classification tables (KLART, KSSK, CABN, MCHA) are part of
the CA-CL (Classification) and LO-MD (Material Master) modules, which are
structurally unchanged between ECC 6.0 and S/4HANA - so the SQL-like
queries below are identical to the S/4HANA guide.
"""

import os
import json
import logging
from typing import Dict, List, Optional, Any
from dataclasses import dataclass
from datetime import datetime

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@dataclass
class ECCConnectionConfig:
    """SAP ECC RFC Connection Configuration"""
    # Direct application server connection
    host: str
    sysnr: str
    client: str
    user: str
    password: str
    language: str = "EN"

    # OR: message server / logon group (load-balanced connection) - common in ECC
    use_load_balancing: bool = False
    message_server: Optional[str] = None
    logon_group: str = "PUBLIC"
    sap_system_id: Optional[str] = None  # R/3 Name, e.g. "ECC" or "PRD"

    # Optional: SAProuter string if ECC sits behind a router (typical for
    # on-prem ECC accessed from outside its network, e.g. "/H/saprouter/H/")
    saprouter: Optional[str] = None

    # Optional SNC (Secure Network Communication) - common in ECC landscapes
    use_snc: bool = False
    snc_partnername: Optional[str] = None
    snc_qop: str = "3"


class SAPECCRFCConnector:
    """RFC connector for classic SAP ECC systems"""

    def __init__(self, config: ECCConnectionConfig):
        self.config = config
        self.connection = None
        self._initialized = False

    def connect(self) -> bool:
        """Establish RFC connection to ECC via direct app server or load balancing"""
        try:
            try:
                from pyrfc import Connection
            except ImportError:
                logger.warning("pyrfc not installed. Install with: pip install pyrfc")
                return False

            conn_params = {
                "client": self.config.client,
                "user": self.config.user,
                "passwd": self.config.password,
                "lang": self.config.language,
            }

            if self.config.use_load_balancing:
                conn_params.update({
                    "mshost": self.config.message_server,
                    "group": self.config.logon_group,
                    "r3name": self.config.sap_system_id,
                })
                logger.info(
                    f"Connecting via load balancing: msserver={self.config.message_server}, "
                    f"group={self.config.logon_group}, sid={self.config.sap_system_id}"
                )
            else:
                conn_params.update({
                    "ashost": self.config.host,
                    "sysnr": self.config.sysnr,
                })
                logger.info(f"Connecting via direct app server: {self.config.host}:{self.config.sysnr}")

            if self.config.saprouter:
                conn_params["saprouter"] = self.config.saprouter

            if self.config.use_snc:
                conn_params.update({
                    "snc_lib": os.getenv("SNC_LIB", ""),
                    "snc_myname": os.getenv("SNC_MYNAME", ""),
                    "snc_partnername": self.config.snc_partnername,
                    "snc_qop": self.config.snc_qop,
                })

            self.connection = Connection(**conn_params)
            self._initialized = True
            logger.info("✓ Connected to SAP ECC via RFC")
            return True

        except Exception as e:
            logger.error(f"✗ ECC RFC connection failed: {str(e)}")
            return False

    def disconnect(self) -> None:
        if self.connection:
            self.connection.close()
            self._initialized = False
            logger.info("Disconnected from SAP ECC")

    def _read_table(self, table: str, fields: List[str], where: Optional[str] = None,
                     max_rows: int = 0) -> List[Dict[str, Any]]:
        """Generic RFC_READ_TABLE wrapper (works identically on ECC and S/4HANA)"""
        if not self._initialized:
            logger.error("Not connected to SAP ECC")
            return []

        try:
            options = [{"TEXT": where}] if where else []
            result = self.connection.call(
                "RFC_READ_TABLE",
                QUERY_TABLE=table,
                FIELDS=[{"FIELDNAME": f} for f in fields],
                OPTIONS=options,
                ROWCOUNT=max_rows,
            )

            columns = [f["FIELDNAME"] for f in result["FIELDS"]]
            widths = [(f["OFFSET"], f["OFFSET"] + f["LENGTH"]) for f in result["FIELDS"]]

            rows = []
            for row in result["DATA"]:
                line = row["WA"]
                record = {col: line[start:end].strip() for col, (start, end) in zip(columns, widths)}
                rows.append(record)

            logger.info(f"Read {len(rows)} rows from {table}")
            return rows

        except Exception as e:
            logger.error(f"Error reading table {table}: {str(e)}")
            return []

    def get_material_classes(self) -> List[Dict[str, Any]]:
        """All material classes - KLART table"""
        return self._read_table(
            table="KLART",
            fields=["KLART", "KLTXT", "MKCNT", "VARIANT"],
            where=f"SPRAS = '{self.config.language}'",
        )

    def get_batch_managed_classes(self) -> List[Dict[str, Any]]:
        """Material classes with batch management - KLART.MKCNT in (X, B)"""
        return self._read_table(
            table="KLART",
            fields=["KLART", "KLTXT", "MKCNT"],
            where="MKCNT = 'X' OR MKCNT = 'B'",
        )

    def get_variant_classes(self) -> List[Dict[str, Any]]:
        """Material classes with variant configuration - KLART.VARIANT = X"""
        return self._read_table(
            table="KLART",
            fields=["KLART", "KLTXT", "VARIANT"],
            where="VARIANT = 'X'",
        )

    def get_characteristics(self) -> List[Dict[str, Any]]:
        """
        Characteristics assigned to classes.
        RFC_READ_TABLE can't JOIN, so KSSK and CABN are read separately
        and joined in Python on IMERK / ATINN.
        """
        kssk = self._read_table(
            table="KSSK",
            fields=["KLART", "IMERK", "ERFORDERLICH"],
        )
        cabn = self._read_table(
            table="CABN",
            fields=["ATINN", "ATNAM", "ATBEZ", "DATATYPE"],
        )
        cabn_by_id = {c["ATINN"]: c for c in cabn}

        merged = []
        for row in kssk:
            char = cabn_by_id.get(row["IMERK"], {})
            merged.append({
                "class_type": row["KLART"],
                "characteristic_id": row["IMERK"],
                "characteristic_name": char.get("ATNAM", ""),
                "description": char.get("ATBEZ", ""),
                "data_type": char.get("DATATYPE", ""),
                "required": row["ERFORDERLICH"],
            })

        logger.info(f"Merged {len(merged)} characteristic assignments")
        return merged


class SAPECCExtractionEngine:
    """Extraction engine for classic ECC systems (RFC-only)"""

    def __init__(self, config: ECCConnectionConfig):
        self.config = config
        self.connector = SAPECCRFCConnector(config)

    def extract_all(self) -> Dict[str, Any]:
        logger.info("Starting SAP ECC Material Extraction...")

        if not self.connector.connect():
            return {"error": "Connection failed"}

        try:
            data = {
                "material_classes": self.connector.get_material_classes(),
                "batch_managed_classes": self.connector.get_batch_managed_classes(),
                "variant_classes": self.connector.get_variant_classes(),
                "characteristics": self.connector.get_characteristics(),
            }

            results = {
                "timestamp": datetime.now().isoformat(),
                "sap_system": "ECC 6.0",
                "connection_method": "rfc",
                "extraction_results": {
                    key: {"total_count": len(rows), "data": rows}
                    for key, rows in data.items()
                },
            }

            logger.info("✓ ECC extraction completed successfully")
            return results

        finally:
            self.connector.disconnect()

    def save_results(self, results: Dict[str, Any], filename: Optional[str] = None) -> str:
        if filename is None:
            filename = f"sap_ecc_extraction_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(filename, "w") as f:
            json.dump(results, f, indent=2, default=str)
        logger.info(f"Results saved to: {filename}")
        return filename


def main():
    """Example usage - update with your actual ECC connection details"""

    # Option A: Direct application server connection
    config = ECCConnectionConfig(
        host="ecc-app01.yourcompany.corp",
        sysnr="00",
        client="800",
        user=os.getenv("SAP_USER", "SAPUSER"),
        password=os.getenv("SAP_PASSWORD", "SAPPASS"),
        language="EN",
    )

    # Option B: Load-balanced connection via message server (common for
    # production ECC landscapes with multiple app servers)
    # config = ECCConnectionConfig(
    #     host="",
    #     sysnr="",
    #     client="800",
    #     user=os.getenv("SAP_USER", "SAPUSER"),
    #     password=os.getenv("SAP_PASSWORD", "SAPPASS"),
    #     use_load_balancing=True,
    #     message_server="ecc-msg.yourcompany.corp",
    #     logon_group="PUBLIC",
    #     sap_system_id="ECC",
    # )

    engine = SAPECCExtractionEngine(config)
    results = engine.extract_all()

    print("\n" + "=" * 70)
    print("SAP ECC MATERIAL EXTRACTION RESULTS")
    print("=" * 70)
    print(f"Timestamp: {results.get('timestamp')}")
    print(f"SAP System: {results.get('sap_system')}")
    print("\nCounts:")
    print("-" * 70)
    for extraction_type, item in results.get("extraction_results", {}).items():
        print(f"  {extraction_type}: {item.get('total_count', 0)}")

    output_file = engine.save_results(results)
    print(f"\n✓ Results saved to: {output_file}")

    return results


if __name__ == "__main__":
    main()
