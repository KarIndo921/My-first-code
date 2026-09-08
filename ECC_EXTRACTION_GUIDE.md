# SAP ECC Material Classes & Characteristics Extraction

Same four extraction targets as the S/4HANA-on-Azure solution, adapted for a
classic **SAP ECC 6.0 / R/3** system:

1. Total Material Classes
2. Batch-Managed Material Classes
3. Variant-Configured Material Classes
4. Total Characteristics

Use `sap_ecc_connector.py` for ECC instead of `sap_connector_impl.py`.

---

## What's Identical to S/4HANA

The Classification module (**CA-CL**) and Material Master (**LO-MD**) tables
have not changed structurally between ECC 6.0 and S/4HANA, so the same
tables and fields apply:

| Table | Purpose | Same in ECC? |
|-------|---------|---------------|
| `KLART` | Material class master (KLART, KLTXT, MKCNT, VARIANT) | ✓ Identical |
| `KSSK` | Class ↔ Characteristic assignment | ✓ Identical |
| `CABN` | Characteristic master | ✓ Identical |
| `MCHA` | Batch master | ✓ Identical |

The SQL-like queries and field meanings in `SAP_EXTRACTION_GUIDE.md`
(MKCNT indicators, VARIANT flag, characteristic data types) apply unchanged.

---

## What's Different: Connectivity

| Aspect | S/4HANA on Azure | ECC |
|--------|-------------------|-----|
| **Preferred connection** | OData REST API (built-in Gateway) | RFC/BAPI (native, always available) |
| **OData availability** | Native, always on | Optional add-on (`SAP_GWFND` Gateway Hub) — often **not installed** on older ECC systems |
| **Typical network path** | Azure ExpressRoute/VPN to Azure VM | Corporate LAN/WAN, often via **SAProuter** |
| **Connection topology** | Single host + port | Direct app server **or** load-balanced via message server + logon group (common in multi-app-server ECC landscapes) |
| **Security** | TLS/HTTPS, Azure AD/OAuth2 possible | Often **SNC** (Secure Network Communication) + native SAP user/password |
| **JOIN support** | OData can pre-join server-side | `RFC_READ_TABLE` cannot JOIN — KSSK and CABN are read separately and merged client-side (see `get_characteristics()`) |

Because of this, `sap_ecc_connector.py` defaults to **RFC-only** and doesn't
attempt OData unless you know Gateway is installed on your ECC system (in
which case you can reuse `SAPODataConnector` from `sap_connector_impl.py`
unchanged — the service names may differ per your Gateway config).

---

## Connecting to ECC

### Option A — Direct Application Server

Use when you have a specific application server hostname:

```python
from sap_ecc_connector import ECCConnectionConfig, SAPECCExtractionEngine

config = ECCConnectionConfig(
    host="ecc-app01.yourcompany.corp",
    sysnr="00",
    client="800",
    user="SAP_USER",
    password="SAP_PASSWORD",
)

engine = SAPECCExtractionEngine(config)
results = engine.extract_all()
```

### Option B — Load Balancing (Message Server)

Common in production ECC landscapes with multiple application servers:

```python
config = ECCConnectionConfig(
    host="", sysnr="",  # not used when load balancing
    client="800",
    user="SAP_USER",
    password="SAP_PASSWORD",
    use_load_balancing=True,
    message_server="ecc-msg.yourcompany.corp",
    logon_group="PUBLIC",
    sap_system_id="ECC",   # the R/3 Name / SID
)
```

### Option C — Behind a SAProuter

If the ECC system is only reachable through a SAProuter (typical when
connecting from outside the corporate network, e.g. a partner/consultant
laptop):

```python
config = ECCConnectionConfig(
    host="ecc-app01.yourcompany.corp",
    sysnr="00",
    client="800",
    user="SAP_USER",
    password="SAP_PASSWORD",
    saprouter="/H/saprouter.yourcompany.corp/S/3299/H/",
)
```

---

## Running the Extraction

```bash
pip install -r requirements.txt
pip install pyrfc   # required for RFC connections

python sap_ecc_connector.py
```

Output:

```
======================================================================
SAP ECC MATERIAL EXTRACTION RESULTS
======================================================================
Timestamp: 2026-09-08T...
SAP System: ECC 6.0

Counts:
----------------------------------------------------------------------
  material_classes: 38
  batch_managed_classes: 9
  variant_classes: 14
  characteristics: 121

✓ Results saved to: sap_ecc_extraction_20260908_....json
```

(Counts above are illustrative — actual figures depend on your system.)

---

## Authorization Requirements (ECC-specific)

The RFC user needs, at minimum:

- `S_RFC` authorization for function group `SDTX` (RFC_READ_TABLE) — note
  many ECC Basis teams restrict `RFC_READ_TABLE` for security reasons; if
  blocked, ask Basis for a **custom Z-RFC** wrapping the same `SELECT`
  logic, or use `BAPI_CLASS_GETDETAIL2` / `BAPI_OBJCL_GETCLASSES` (classic
  classification BAPIs available since 4.6C) as an alternative.
- `S_TABU_DIS` for table authorization group covering `KLART`, `KSSK`, `CABN`.
- `C_KLAH_BKL` (Classification) display authorization.

---

## Troubleshooting (ECC-specific)

**Error:** `RFC_READ_TABLE` returns `TABLE_NOT_AVAILABLE` or authorization error
- Most common ECC issue — this FM is frequently locked down. Confirm with
  Basis whether it's allowed, or request a custom RFC-enabled function
  module.

**Error:** `Group PUBLIC not found` (load balancing)
- Logon group must be maintained in transaction `SMLG`. Ask Basis for the
  correct group name for your client.

**Error:** connection timeout through SAProuter
- Verify the SAProuter string format and that your IP is permitted in the
  SAProuter's `saprouttab`.
