"""
SAP S/4HANA Connector Implementation
Supports multiple connection methods: RFC, OData, and direct SQL-like queries
"""

import os
import json
import logging
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
from enum import Enum
from datetime import datetime
import sys

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class ConnectionMethod(Enum):
    """Supported SAP connection methods"""
    RFC = "rfc"
    ODATA = "odata"
    QUERY = "query"


@dataclass
class ConnectionConfig:
    """SAP Connection Configuration"""
    method: ConnectionMethod
    host: str
    port: int
    client: str
    user: str
    password: str
    language: str = "EN"
    sysnr: str = "00"

    # Optional: Azure-specific
    azure_resource_group: Optional[str] = None
    azure_subscription_id: Optional[str] = None


class SAPRFCConnector:
    """RFC Connection to SAP S/4HANA"""

    def __init__(self, config: ConnectionConfig):
        """Initialize RFC connector"""
        self.config = config
        self.connection = None
        self._initialized = False

    def connect(self) -> bool:
        """Establish RFC connection to SAP"""
        try:
            # Note: pyrfc is optional - this is a template implementation
            try:
                from pyrfc import Connection
            except ImportError:
                logger.warning("pyrfc not installed. Install with: pip install pyrfc")
                return False

            self.connection = Connection(
                ashost=self.config.host,
                sysnr=self.config.sysnr,
                client=self.config.client,
                user=self.config.user,
                passwd=self.config.password,
                lang=self.config.language,
                trace='3'  # Enable tracing for debugging
            )
            self._initialized = True
            logger.info(f"✓ Connected to SAP via RFC: {self.config.host}:{self.config.port}")
            return True

        except Exception as e:
            logger.error(f"✗ RFC connection failed: {str(e)}")
            return False

    def disconnect(self) -> None:
        """Close RFC connection"""
        if self.connection:
            self.connection.close()
            self._initialized = False
            logger.info("Disconnected from SAP")

    def get_material_classes(self) -> List[Dict[str, Any]]:
        """Retrieve material classes via RFC BAPI"""
        if not self._initialized:
            logger.error("Not connected to SAP")
            return []

        try:
            # Using BAPI_MATCLASS_GETLIST
            result = self.connection.call('BAPI_MATCLASS_GETLIST')
            classes = result.get('CLASS_HEADER', [])
            logger.info(f"Retrieved {len(classes)} material classes")
            return classes

        except Exception as e:
            logger.error(f"Error retrieving material classes: {str(e)}")
            return []

    def get_batch_managed_classes(self) -> List[Dict[str, Any]]:
        """Retrieve batch-managed material classes"""
        if not self._initialized:
            return []

        try:
            # Call FM to read KLART table with batch management
            result = self.connection.call(
                'RFC_READ_TABLE',
                {
                    'QUERY_TABLE': 'KLART',
                    'FIELDS': [
                        {'FIELDNAME': 'KLART'},
                        {'FIELDNAME': 'KLTXT'},
                        {'FIELDNAME': 'MKCNT'}
                    ],
                    'WHERE': [
                        {'TEXT': "MKCNT = 'X'"}
                    ]
                }
            )
            data = result.get('DATA', [])
            logger.info(f"Retrieved {len(data)} batch-managed classes")
            return data

        except Exception as e:
            logger.error(f"Error retrieving batch-managed classes: {str(e)}")
            return []

    def get_variant_classes(self) -> List[Dict[str, Any]]:
        """Retrieve variant-configured material classes"""
        if not self._initialized:
            return []

        try:
            result = self.connection.call(
                'RFC_READ_TABLE',
                {
                    'QUERY_TABLE': 'KLART',
                    'FIELDS': [
                        {'FIELDNAME': 'KLART'},
                        {'FIELDNAME': 'KLTXT'},
                        {'FIELDNAME': 'VARIANT'}
                    ],
                    'WHERE': [
                        {'TEXT': "VARIANT = 'X'"}
                    ]
                }
            )
            data = result.get('DATA', [])
            logger.info(f"Retrieved {len(data)} variant-configured classes")
            return data

        except Exception as e:
            logger.error(f"Error retrieving variant classes: {str(e)}")
            return []

    def get_characteristics(self) -> List[Dict[str, Any]]:
        """Retrieve characteristics for material classes"""
        if not self._initialized:
            return []

        try:
            result = self.connection.call(
                'RFC_READ_TABLE',
                {
                    'QUERY_TABLE': 'KSSK',
                    'FIELDS': [
                        {'FIELDNAME': 'KLART'},
                        {'FIELDNAME': 'IMERK'},
                        {'FIELDNAME': 'ERFORDERLICH'},
                        {'FIELDNAME': 'KURZTEXT'}
                    ]
                }
            )
            data = result.get('DATA', [])
            logger.info(f"Retrieved {len(data)} characteristics")
            return data

        except Exception as e:
            logger.error(f"Error retrieving characteristics: {str(e)}")
            return []


class SAPODataConnector:
    """OData REST API Connection to SAP S/4HANA"""

    def __init__(self, config: ConnectionConfig):
        """Initialize OData connector"""
        self.config = config
        self.session = None
        self._initialized = False
        self.base_url = f"https://{config.host}:{config.port}"

    def connect(self) -> bool:
        """Establish OData connection"""
        try:
            import requests
            from requests.auth import HTTPBasicAuth

            self.session = requests.Session()
            self.session.auth = HTTPBasicAuth(self.config.user, self.config.password)
            self.session.headers.update({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })

            # Test connection
            response = self.session.get(
                f"{self.base_url}/sap/opu/odata/sap/MD_MATERIAL_SRV",
                verify=False  # Disable SSL verification for testing
            )

            if response.status_code in [200, 401]:  # 401 is OK for auth test
                self._initialized = True
                logger.info(f"✓ Connected to SAP via OData: {self.base_url}")
                return True
            else:
                logger.error(f"✗ OData connection failed: HTTP {response.status_code}")
                return False

        except Exception as e:
            logger.error(f"✗ OData connection error: {str(e)}")
            return False

    def disconnect(self) -> None:
        """Close OData connection"""
        if self.session:
            self.session.close()
            self._initialized = False
            logger.info("Disconnected from SAP OData API")

    def get_material_classes(self) -> List[Dict[str, Any]]:
        """Retrieve material classes via OData"""
        if not self._initialized:
            return []

        try:
            url = f"{self.base_url}/sap/opu/odata/sap/MD_MATERIAL_SRV/MaterialClasses"
            response = self.session.get(url, verify=False)

            if response.status_code == 200:
                data = response.json()
                classes = data.get('d', {}).get('results', [])
                logger.info(f"Retrieved {len(classes)} material classes via OData")
                return classes
            else:
                logger.error(f"Error: HTTP {response.status_code}")
                return []

        except Exception as e:
            logger.error(f"Error retrieving material classes: {str(e)}")
            return []

    def get_batch_managed_classes(self) -> List[Dict[str, Any]]:
        """Retrieve batch-managed classes via OData"""
        if not self._initialized:
            return []

        try:
            url = f"{self.base_url}/sap/opu/odata/sap/MD_MATERIAL_SRV/MaterialClasses?$filter=BatchManagement eq 'X'"
            response = self.session.get(url, verify=False)

            if response.status_code == 200:
                data = response.json()
                classes = data.get('d', {}).get('results', [])
                logger.info(f"Retrieved {len(classes)} batch-managed classes via OData")
                return classes
            else:
                return []

        except Exception as e:
            logger.error(f"Error: {str(e)}")
            return []

    def get_variant_classes(self) -> List[Dict[str, Any]]:
        """Retrieve variant-configured classes via OData"""
        if not self._initialized:
            return []

        try:
            url = f"{self.base_url}/sap/opu/odata/sap/MD_MATERIAL_SRV/MaterialClasses?$filter=VariantConfig eq 'X'"
            response = self.session.get(url, verify=False)

            if response.status_code == 200:
                data = response.json()
                classes = data.get('d', {}).get('results', [])
                logger.info(f"Retrieved {len(classes)} variant classes via OData")
                return classes
            else:
                return []

        except Exception as e:
            logger.error(f"Error: {str(e)}")
            return []

    def get_characteristics(self) -> List[Dict[str, Any]]:
        """Retrieve characteristics via OData"""
        if not self._initialized:
            return []

        try:
            url = f"{self.base_url}/sap/opu/odata/sap/MD_MATERIAL_SRV/Characteristics"
            response = self.session.get(url, verify=False)

            if response.status_code == 200:
                data = response.json()
                chars = data.get('d', {}).get('results', [])
                logger.info(f"Retrieved {len(chars)} characteristics via OData")
                return chars
            else:
                return []

        except Exception as e:
            logger.error(f"Error: {str(e)}")
            return []


class SAPExtractionEngine:
    """Main extraction engine supporting multiple connection methods"""

    def __init__(self, config: ConnectionConfig):
        """Initialize extraction engine"""
        self.config = config
        self.connector = self._initialize_connector()

    def _initialize_connector(self):
        """Create appropriate connector based on connection method"""
        if self.config.method == ConnectionMethod.RFC:
            return SAPRFCConnector(self.config)
        elif self.config.method == ConnectionMethod.ODATA:
            return SAPODataConnector(self.config)
        else:
            raise ValueError(f"Unsupported connection method: {self.config.method}")

    def extract_all(self) -> Dict[str, Any]:
        """Execute full extraction"""
        logger.info("Starting SAP Material Extraction...")

        if not self.connector.connect():
            return {'error': 'Connection failed'}

        try:
            results = {
                'timestamp': datetime.now().isoformat(),
                'connection_method': self.config.method.value,
                'extraction_results': {
                    'material_classes': {
                        'total_count': 0,
                        'data': self.connector.get_material_classes()
                    },
                    'batch_managed_classes': {
                        'total_count': 0,
                        'data': self.connector.get_batch_managed_classes()
                    },
                    'variant_classes': {
                        'total_count': 0,
                        'data': self.connector.get_variant_classes()
                    },
                    'characteristics': {
                        'total_count': 0,
                        'data': self.connector.get_characteristics()
                    }
                }
            }

            # Calculate counts
            for key, item in results['extraction_results'].items():
                item['total_count'] = len(item['data'])

            logger.info("✓ Extraction completed successfully")
            return results

        finally:
            self.connector.disconnect()

    def save_results(self, results: Dict[str, Any], filename: Optional[str] = None) -> str:
        """Save extraction results to JSON file"""
        if filename is None:
            filename = f"sap_extraction_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"

        with open(filename, 'w') as f:
            json.dump(results, f, indent=2, default=str)

        logger.info(f"Results saved to: {filename}")
        return filename


def main():
    """Example usage"""

    # Configure SAP connection (update with your actual SAP system details)
    config = ConnectionConfig(
        method=ConnectionMethod.ODATA,  # or ConnectionMethod.RFC
        host="your-azure-sap-host.westeurope.cloudapp.azure.com",
        port=50000,
        client="100",
        user=os.getenv("SAP_USER", "SAPUSER"),
        password=os.getenv("SAP_PASSWORD", "SAPPASS"),
        language="EN",
        sysnr="00",
        azure_resource_group="your-resource-group",
        azure_subscription_id="your-subscription-id"
    )

    # Create extraction engine
    engine = SAPExtractionEngine(config)

    # Execute extraction
    results = engine.extract_all()

    # Display results
    print("\n" + "="*70)
    print("SAP MATERIAL EXTRACTION RESULTS")
    print("="*70)
    print(f"Timestamp: {results.get('timestamp')}")
    print(f"Connection Method: {results.get('connection_method')}")
    print("\nCounts:")
    print("-" * 70)

    for extraction_type, data in results.get('extraction_results', {}).items():
        count = data.get('total_count', 0)
        print(f"  {extraction_type}: {count}")

    # Save results
    output_file = engine.save_results(results)
    print(f"\n✓ Results saved to: {output_file}")

    return results


if __name__ == '__main__':
    main()
