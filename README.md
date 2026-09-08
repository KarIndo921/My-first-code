# SAP S/4HANA Material Classes & Characteristics Extraction

A comprehensive Python solution for extracting material master data from SAP S/4HANA running on Azure, including material classes, batch management configuration, variant configuration, and associated characteristics.

## 📋 Overview

This project provides tools to extract and analyze:

1. **Total Material Classes** - Complete inventory of KLART master data
2. **Batch-Managed Classes** - Material classes configured for batch management (MKCNT field)
3. **Variant Classes** - Material classes configured for variant configuration (VARIANT field)
4. **Total Characteristics** - All characteristics (CABN) assigned to material classes via KSSK

### Target Use Case
- **Production Planning** - Understand material master setup for planning
- **Order to Cash** - Analyze batch tracking and variant configuration for sales orders
- **Variant Configuration** - Inventory characteristics and configuration profiles

---

## 🏗️ Architecture

### Files in This Repository

| File | Purpose |
|------|---------|
| `sap_material_extractor.py` | Core extraction logic with query templates |
| `sap_connector_impl.py` | Connection implementations for S/4HANA (RFC, OData) |
| `sap_ecc_connector.py` | RFC-only connector for classic SAP ECC 6.0 / R/3 systems |
| `test_extraction.py` | Test suite and sample report generation |
| `SAP_EXTRACTION_GUIDE.md` | Detailed technical guide with SAP table structures |
| `ECC_EXTRACTION_GUIDE.md` | ECC-specific connectivity notes (RFC, load balancing, SAProuter) |
| `requirements.txt` | Python dependencies |
| `README.md` | This file |

### Connection Methods

```
┌─────────────────────────────────────────────────────────────┐
│                  SAP S/4HANA on Azure                       │
│                  (Production System)                        │
└────────────────────────┬────────────────────────────────────┘
                         │
          ┌──────────────┼──────────────┐
          │              │              │
    ┌─────▼──┐     ┌────▼────┐    ┌───▼────┐
    │   RFC  │     │  OData   │    │ Query  │
    │  Port  │     │ REST API │    │  SQL   │
    │  3200  │     │  50000   │    │ Like   │
    └─────┬──┘     └────┬─────┘    └───┬────┘
          │             │             │
    ┌─────▼─────────────▼─────────────▼─────┐
    │        SAPExtractionEngine             │
    │  ┌─ Material Classes                   │
    │  ├─ Batch-Managed Classes              │
    │  ├─ Variant Classes                    │
    │  └─ Characteristics                    │
    └─────────────────────────────────────┬──┘
                                          │
                                    ┌─────▼──────┐
                                    │ JSON Output│
                                    │ Report     │
                                    └────────────┘
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Clone repository
cd /home/user/My-first-code

# Install required packages
pip install -r requirements.txt

# For RFC connections, optionally install
pip install pyrfc
```

### 2. Configure SAP Connection

Edit `sap_connector_impl.py` and update:

```python
config = ConnectionConfig(
    method=ConnectionMethod.ODATA,  # or RFC
    host="your-sap-host.azure.com",
    port=50000,  # or 3200 for RFC
    client="100",
    user="SAP_USERNAME",
    password="SAP_PASSWORD",
    language="EN",
    sysnr="00",
    azure_resource_group="your-rg",
    azure_subscription_id="your-subscription-id"
)
```

### 3. Run Extraction

```bash
# Test with sample data
python test_extraction.py

# Run actual extraction (requires SAP connection)
python sap_connector_impl.py
```

### 4. View Results

Results are saved as JSON files:
```bash
cat sap_extraction_20240115_103045.json
```

---

## 📊 Data Extraction Details

### 1. Material Classes (KLART)

**What:** Total count of all material classes in the system

**SAP Table:** `KLART`

**Sample Query:**
```sql
SELECT KLART, KLTXT, MKCNT, VARIANT, LANGABZ
FROM KLART
WHERE SPRAS = 'EN'
ORDER BY KLART
```

**Key Fields:**
- `KLART` (CHAR 3) - Class Type ID
- `KLTXT` (CHAR 40) - Class Description
- `MKCNT` (CHAR 1) - Batch Management Indicator
- `VARIANT` (CHAR 1) - Variant Configuration Indicator

**Expected Count Range:** 20-100 classes (typical enterprise)

### 2. Batch-Managed Material Classes

**What:** Classes configured to handle batch tracking

**SAP Table:** `KLART` (filtered by MKCNT field)

**Sample Query:**
```sql
SELECT COUNT(*) as BATCH_CLASS_COUNT,
       KLART, KLTXT
FROM KLART
WHERE MKCNT IN ('X', 'B')
  AND SPRAS = 'EN'
GROUP BY KLART, KLTXT
```

**Batch Indicators:**
- `X` = Batch management required
- `B` = Batch management relevant
- (space) = No batch management

**Related Tables:**
- `MCHA` - Batch Master
- `MBCH` - Batch Characteristics
- `MCH1` - Batch Characteristic Values

**Business Use:**
- Quality tracking (expiration dates, lot traceability)
- Pharmaceutical/chemical materials
- Food & beverage products

### 3. Variant-Configured Material Classes

**What:** Classes configured for product configuration/variants

**SAP Table:** `KLART` (filtered by VARIANT field)

**Sample Query:**
```sql
SELECT COUNT(*) as VARIANT_CLASS_COUNT,
       KLART, KLTXT
FROM KLART
WHERE VARIANT = 'X'
  AND SPRAS = 'EN'
GROUP BY KLART, KLTXT
```

**Related Tables:**
- `KSSK` - Class/Characteristic Assignment
- `CABN` - Characteristics Master
- `KONP` - Configuration Profile
- `KOMK` - Configuration Header

**Business Use:**
- Build-to-order (BTO) manufacturing
- Sales order configuration
- Variant management (e.g., laptop configurations)

### 4. Total Characteristics

**What:** All characteristics assigned to material classes

**SAP Tables:** 
- `KSSK` - Class/Characteristic Assignment
- `CABN` - Characteristic Master

**Sample Query:**
```sql
SELECT DISTINCT
       KSSK.KLART,
       KSSK.IMERK as CHARACTERISTIC_ID,
       CABN.ATNAM as CHARACTERISTIC_NAME,
       CABN.ATBEZ as DESCRIPTION,
       CABN.DATATYPE,
       KSSK.ERFORDERLICH as REQUIRED,
       COUNT(*) OVER (PARTITION BY KSSK.KLART) as CHARS_PER_CLASS
FROM KSSK
  INNER JOIN CABN 
    ON KSSK.IMERK = CABN.ATINN
WHERE KSSK.KLART <> ''
  AND KSSK.IMERK <> ''
ORDER BY KSSK.KLART, KSSK.IMERK
```

**Key Fields in KSSK:**
| Field | Meaning |
|-------|---------|
| `KLART` | Class Type |
| `IMERK` | Characteristic ID |
| `ERFORDERLICH` | Required Indicator (X/blank) |
| `KURZTEXT` | Short Text |

**Key Fields in CABN:**
| Field | Meaning |
|-------|---------|
| `ATINN` | Characteristic Number (Internal) |
| `ATNAM` | Characteristic Name |
| `ATBEZ` | Characteristic Description |
| `DATATYPE` | Data Type (C/N/D/T) |
| `ATZLEN` | Character Length |

**Data Type Breakdown:**
- `C` = Character (text, 200 typical)
- `N` = Numeric (integer/decimal, 150 typical)
- `D` = Date (50 typical)
- `T` = Time (10 typical)

---

## 🔌 Connection Methods

### Method 1: OData REST API

**Advantages:**
- No additional SAP libraries needed
- Works over HTTP/HTTPS
- Easy integration with Azure services
- Better firewall traversal

**Configuration:**
```python
ConnectionMethod.ODATA
port=50000  # or 50001 for HTTPS
```

**Example Code:**
```python
from sap_connector_impl import SAPODataConnector, ConnectionConfig

config = ConnectionConfig(
    method=ConnectionMethod.ODATA,
    host="sap.azure.com",
    port=50000,
    client="100",
    user="USER",
    password="PASS"
)

connector = SAPODataConnector(config)
if connector.connect():
    classes = connector.get_material_classes()
```

### Method 2: RFC Connection

**Advantages:**
- Direct SAP native protocol
- Higher performance for large data volumes
- Better for batch processing
- Native SAP transactions available

**Configuration:**
```python
ConnectionMethod.RFC
port=3200  # or 3300, etc.
```

**Example Code:**
```python
from sap_connector_impl import SAPRFCConnector, ConnectionConfig

config = ConnectionConfig(
    method=ConnectionMethod.RFC,
    host="sap.azure.com",
    port=3200,
    client="100",
    user="USER",
    password="PASS"
)

connector = SAPRFCConnector(config)
if connector.connect():
    classes = connector.get_material_classes()
```

**Prerequisites:**
- Install `pyrfc`: `pip install pyrfc`
- SAP NW RFC SDK installed on client
- RFC connection open in SAP system

---

## 📈 Sample Output

### Extraction Report JSON

```json
{
  "extraction_timestamp": "2024-01-15T10:30:45.123456",
  "sap_system": "S/4HANA",
  "environment": "Azure Cloud",
  "extraction_results": {
    "material_classes": {
      "total_count": 45,
      "description": "All Material Classes (KLART)",
      "sample_data": [...]
    },
    "batch_managed_classes": {
      "total_count": 12,
      "description": "Classes with batch management",
      "sample_data": [...]
    },
    "variant_classes": {
      "total_count": 18,
      "description": "Classes with variant configuration",
      "sample_data": [...]
    },
    "characteristics": {
      "total_count": 156,
      "description": "All characteristics assigned to classes",
      "sample_data": [...]
    }
  },
  "summary": {
    "total_material_classes": 45,
    "batch_managed_classes_count": 12,
    "batch_managed_percentage": "26.7%",
    "variant_config_classes_count": 18,
    "variant_config_percentage": "40.0%",
    "total_characteristics": 156,
    "average_characteristics_per_class": 3.5
  }
}
```

---

## 🔐 Azure Integration

### Prerequisites

1. **Azure ExpressRoute or VPN**
   - Direct network connection to SAP system on Azure
   - Low latency, high bandwidth

2. **SAP S/4HANA Instance**
   - User with read access to Logistics (LO) module
   - RFC or OData services enabled

3. **Azure Resources**
   ```
   Resource Group: your-sap-rg
   Virtual Network: your-vnet
   Subscription: your-subscription-id
   Region: westeurope (or your region)
   ```

### Using Azure Key Vault for Credentials

```python
from azure.keyvault.secrets import SecretClient
from azure.identity import DefaultAzureCredential

credential = DefaultAzureCredential()
client = SecretClient(vault_url="https://your-keyvault.vault.azure.net/", credential=credential)

sap_user = client.get_secret("sap-user").value
sap_pass = client.get_secret("sap-password").value
```

### Azure Data Factory Integration

Use Azure Data Factory pipeline to orchestrate extraction:
1. Schedule extraction (daily, hourly)
2. Load data to Azure SQL/Synapse
3. Trigger analytics/reporting

---

## 🧪 Testing

### Run Sample Extraction

```bash
python test_extraction.py
```

**Output:**
```
======================================================================
SAP MATERIAL EXTRACTION - TEST SUITE
======================================================================

TEST: SAP Material Extraction via OData
...

GENERATING SAMPLE EXTRACTION REPORT
======================================================================

======================================================================
EXTRACTION SUMMARY
======================================================================
Extraction Time: 2024-01-15T10:30:45.123456
Status: SUCCESS
Query Duration: 2.34 seconds

---------- MATERIAL EXTRACTION COUNTS ----------

1. Total Material Classes:
   Count: 45

2. Batch-Managed Material Classes:
   Count: 12
   Percentage: 26.7%

3. Variant-Configured Material Classes:
   Count: 18
   Percentage: 40.0%

4. Total Characteristics:
   Count: 156
   Average per Class: 3.5
   ...
```

---

## 🛠️ Troubleshooting

### Connection Issues

**Error:** `Connection refused`
- Check SAP host is reachable
- Verify firewall rules allow port 50000 (OData) or 3200 (RFC)
- Confirm ExpressRoute/VPN connection is active

**Error:** `Authentication failed`
- Verify SAP username/password
- Check user has Logistics (LO) module authorization
- Confirm SAP user is not locked

**Error:** `Table KLART not found`
- Ensure user has read access to Logistics module
- Check SAP client number (100, 200, etc.)
- Verify you're accessing correct SAP system

### Data Issues

**No data returned:**
- Material classes may not be maintained in test system
- Check with your SAP administrator
- Use CL02 transaction to verify classes exist

**Zero characteristics:**
- Some classes may not have characteristics assigned
- This is normal for certain class types
- Check KSSK table directly for validation

---

## 📚 SAP Transactions for Reference

| Transaction | Purpose |
|-------------|---------|
| **CL01** | Create Material Class |
| **CL02** | Display Material Class |
| **CL03** | Change Material Class |
| **CL04** | Delete Material Class |
| **CT04** | Maintain Characteristics |
| **CL21** | Characteristics Overview |
| **SQ01** | Create SAP Query |
| **SE11** | ABAP Dictionary (view tables) |
| **ST05** | SQL Trace |

---

## 📖 Documentation

- **Detailed Technical Guide:** See `SAP_EXTRACTION_GUIDE.md`
- **SAP Official Docs:** https://help.sap.com/docs/S4HANA/
- **Azure + SAP Integration:** https://learn.microsoft.com/en-us/azure/virtual-machines/workloads/sap/

---

## 🚀 Real-World Usage Examples

### Use Case 1: Production Planning Analysis

```python
engine = SAPExtractionEngine(config)
results = engine.extract_all()

# Find classes used in production
production_classes = [
    c for c in results['extraction_results']['material_classes']['data']
    if c['batch_management'] == 'X'
]

print(f"Production classes with batch tracking: {len(production_classes)}")
```

### Use Case 2: Variant Configuration Inventory

```python
variant_classes = results['extraction_results']['variant_classes']
characteristics = results['extraction_results']['characteristics']

# Analyze variant complexity
for cls in variant_classes['data']:
    char_count = len([
        c for c in characteristics['data']
        if c['class_type'] == cls['class_type']
    ])
    print(f"Class {cls['class_type']}: {char_count} characteristics")
```

### Use Case 3: Batch Management Audit

```python
batch_classes = results['extraction_results']['batch_managed_classes']
print(f"Classes requiring batch management: {batch_classes['total_count']}")

# Identify high-risk materials
high_risk = [
    c for c in batch_classes['data']
    if c['batch_indicator'] == 'X'
]
```

---

## 📝 License & Attribution

This tool is designed for SAP Consultants implementing S/4HANA on Azure.

**Developed for:** Production Planning, Order to Cash, Variant Configuration

---

## 🤝 Support

For issues or questions:
1. Check `SAP_EXTRACTION_GUIDE.md` for detailed information
2. Verify SAP connection configuration
3. Confirm user has appropriate SAP authorizations
4. Review SAP logs in transaction `SM37` (batch job logs) or `ST05` (SQL trace)

---

**Version:** 1.0  
**Last Updated:** 2024-01-15  
**Compatibility:** SAP S/4HANA 2020+, Python 3.8+
