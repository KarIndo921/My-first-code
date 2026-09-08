# SAP S/4HANA Material Classes & Characteristics Extraction Guide

## Overview
This guide provides comprehensive instructions for extracting material classes, batch-managed materials, variant materials, and characteristics from SAP S/4HANA on Azure.

---

## 1. Material Classes (KLART)

### What is Extracted?
Total count of **Material Classes** maintained in the SAP system.

### SAP Table: `KLART`
**Fully qualified name:** `SAP > Logistics > Product Lifecycle Management > Variant Management > Material Classes`

### Key Fields:
| Field | Description | Data Type |
|-------|-------------|-----------|
| **KLART** | Material Class Type (e.g., 001, 002, etc.) | CHAR(3) |
| **KLTXT** | Material Class Description | CHAR(40) |
| **MKCNT** | Batch Management Indicator | CHAR(1) |
| **VARIANT** | Variant Configuration Indicator | CHAR(1) |

### Extraction Query:
```sql
SELECT KLART, KLTXT, MKCNT, VARIANT, LANGABZ
FROM KLART
WHERE SPRAS = 'EN'
ORDER BY KLART
```

### Example Results:
| KLART | Description | Batch | Variant |
|-------|------------|-------|---------|
| 001 | Materials | X | - |
| 002 | Consumables | - | X |
| 003 | Spare Parts | X | X |

---

## 2. Batch-Managed Material Classes

### What is Extracted?
Count of **Material Classes configured for Batch Management**.

### SAP Table: `KLART` (Field: MKCNT)

### Batch Management Values:
| Value | Meaning |
|-------|---------|
| **X** | Batch management is required |
| **B** | Batch management is relevant |
| **(space)** | No batch management |

### Extraction Query:
```sql
SELECT COUNT(KLART) as BATCH_MANAGED_COUNT,
       KLART, KLTXT
FROM KLART
WHERE MKCNT IN ('X', 'B')
  AND SPRAS = 'EN'
GROUP BY KLART, KLTXT
ORDER BY KLART
```

### Related Tables:
- **MCHA**: Batch Master (Material Batch)
- **MBCH**: Material Batch Characteristics
- **MCH1**: Batch Characteristics - Numeric Values

### Key Business Use:
- Quality management
- Expiration date tracking
- Shelf-life management
- Lot-wise inventory tracking

---

## 3. Variant-Managed Material Classes

### What is Extracted?
Count of **Material Classes configured for Variant Configuration**.

### SAP Table: `KLART` (Field: VARIANT)

### Variant Configuration Values:
| Value | Meaning |
|-------|---------|
| **X** | Variant configuration is enabled |
| **(space)** | No variant configuration |

### Extraction Query:
```sql
SELECT COUNT(KLART) as VARIANT_CONFIG_COUNT,
       KLART, KLTXT
FROM KLART
WHERE VARIANT = 'X'
  AND SPRAS = 'EN'
GROUP BY KLART, KLTXT
ORDER BY KLART
```

### Related Tables:
- **KSSK**: Class/Characteristic Assignment
- **CABN**: Characteristics (Master)
- **CAWN**: Characteristic Values
- **KONP**: Configuration Profile Steps
- **KOMK**: Configuration Header

### Key Business Use:
- Product configuration (e.g., laptop with multiple configurations)
- Build-to-order manufacturing
- Sales order configuration
- Variant pricing

---

## 4. Total Characteristics

### What is Extracted?
Total count of **Characteristics** assigned to Material Classes.

### Primary SAP Tables:
- **KSSK**: Class/Characteristic Assignment
- **CABN**: Characteristic Master Data

### Key Fields:

#### KSSK Table:
| Field | Description | Data Type |
|-------|-------------|-----------|
| **KLART** | Class Type | CHAR(3) |
| **IMERK** | Characteristic Number | NUMC(3) |
| **ERFORDERLICH** | Required Indicator | CHAR(1) |
| **KURZTEXT** | Short Text | CHAR(40) |

#### CABN Table:
| Field | Description | Data Type |
|-------|-------------|-----------|
| **ATINN** | Characteristic Number (Internal) | NUMC(4) |
| **ATNAM** | Characteristic Name | CHAR(30) |
| **ATBEZ** | Characteristic Description | CHAR(40) |
| **DATATYPE** | Data Type (C/N/D/T) | CHAR(1) |
| **ATZLEN** | Char. Length | NUMC(3) |

### Data Types:
- **C** = Character
- **N** = Numeric
- **D** = Date
- **T** = Time

### Extraction Query:
```sql
SELECT DISTINCT
       KSSK.KLART,
       KSSK.IMERK as CHARACTERISTIC_ID,
       CABN.ATNAM as CHARACTERISTIC_NAME,
       CABN.ATBEZ as CHARACTERISTIC_DESC,
       CABN.DATATYPE,
       KSSK.ERFORDERLICH as REQUIRED,
       COUNT(*) OVER (PARTITION BY KSSK.KLART) as CHAR_COUNT_PER_CLASS
FROM KSSK
  INNER JOIN CABN 
    ON KSSK.IMERK = CABN.ATINN
WHERE KSSK.KLART <> ''
  AND KSSK.IMERK <> ''
ORDER BY KSSK.KLART, KSSK.IMERK
```

### Example Results:
| KLART | Characteristic ID | Characteristic Name | Data Type | Required |
|-------|------------------|-------------------|-----------|----------|
| 001 | 001 | Material_Weight | N | X |
| 001 | 002 | Material_Color | C | - |
| 001 | 003 | Manufacturing_Date | D | X |
| 002 | 001 | Shelf_Life_Days | N | X |

---

## 5. Connection Methods

### Method 1: RFC (Remote Function Call)
**Best for:** Batch processing, high-volume data extraction

```python
# Pseudocode
from pyrfc import Connection

conn = Connection(
    ashost='your-azure-sap-host',
    sysnr='00',
    client='100',
    user='SAP_USER',
    passwd='SAP_PASSWORD',
    lang='EN'
)

# Call BAPI to read material classes
result = conn.call('BAPI_MATCLASS_GETLIST', {})
```

### Method 2: OData API
**Best for:** REST-based integration, modern applications

```python
import requests
from requests.auth import HTTPBasicAuth

url = 'https://your-azure-sap-host:50000/sap/opu/odata/sap/MD_MATERIAL_SRV'
headers = {'Accept': 'application/json'}
auth = HTTPBasicAuth('SAP_USER', 'SAP_PASSWORD')

# Query Material Classes
response = requests.get(
    f'{url}/MaterialClasses',
    headers=headers,
    auth=auth
)
```

### Method 3: SAP Query (SQ01)
**Best for:** Ad-hoc queries, user-friendly interface

1. Transaction: `SQ01` (SAP Query)
2. Query Area: `C` (Logistics)
3. Create query on tables: KLART, KSSK, CABN

---

## 6. Azure SAP Connectivity

### Azure ExpressRoute Setup:
- Direct connection to on-premises or cloud SAP systems
- Dedicated network path (1 Gbps - 100 Gbps)
- Low latency, high reliability

### Azure VPN Gateway:
- Site-to-site VPN to SAP systems
- Suitable for smaller data volumes

### Azure Data Factory Integration:
```python
# Azure Data Factory pipeline can orchestrate extraction
# Using SAP connector with RFC or OData source
```

---

## 7. Expected Output Counts

### Summary Report Structure:
```json
{
  "extraction_timestamp": "2024-01-15T10:30:45.123456",
  "sap_system": "S/4HANA",
  "environment": "Azure Cloud",
  "summary": {
    "total_material_classes": 45,
    "batch_managed_classes": 12,
    "variant_config_classes": 18,
    "total_characteristics": 156,
    "avg_characteristics_per_class": 3.5
  }
}
```

---

## 8. Performance Optimization Tips

### Indexing:
- SAP automatically indexes KLART and KSSK tables
- Key indexes: KLART (primary key), KSSK (KLART + IMERK)

### Extraction Best Practices:
1. **Batch Processing**: Extract data in chunks if volume is large
2. **Filtering**: Use SPRAS (language) to reduce result set
3. **Parallel Threads**: RFC connections support parallel queries
4. **Scheduling**: Run during off-peak hours

### Query Performance:
```sql
-- ✓ Good: Uses indexed fields
SELECT * FROM KLART 
WHERE KLART BETWEEN '001' AND '100'

-- ✗ Avoid: Full table scan
SELECT * FROM KLART 
WHERE MKCNT LIKE '%X%'
```

---

## 9. SAP Transactions for Manual Verification

| Transaction | Description |
|-------------|-------------|
| **CL01** | Maintain Classes (Variant Configuration) |
| **CL02** | Display Classes |
| **CL03** | Change Classes |
| **CL21** | Characteristics Overview |
| **CT04** | Maintain Characteristics |
| **CTMS** | Characteristics: Mass Processing |
| **SQ01** | SAP Query - Create reports |

---

## 10. Sample Execution

### Running the Extractor:
```bash
python sap_material_extractor.py
```

### Expected Output:
```
======================================================================
SAP MATERIAL EXTRACTION SUMMARY
======================================================================
Extraction Time: 2024-01-15T10:30:45.123456
SAP System: S/4HANA on Azure Cloud

Extraction Queries:
----------------------------------------------------------------------

MATERIAL_CLASSES:
  Tables: KLART
  Key Fields: KLART, KLTXT, MKCNT, VARIANT

BATCH_MANAGED_CLASSES:
  Tables: KLART
  Description: Material classes that require or support batch management

VARIANT_CLASSES:
  Tables: KLART
  Description: Material classes configured for variant configuration

CHARACTERISTICS:
  Tables: KSSK, CABN
  Description: All characteristics assigned to material classes

✓ Report saved to: sap_material_extraction_20240115_103045.json
```

---

## 11. Troubleshooting

### Connection Issues:
- **Error**: "RFC connection failed"
  - **Solution**: Verify SAP host, port, client, and user credentials

- **Error**: "Table KLART not found"
  - **Solution**: Ensure user has access to Logistics module (LO)

### Data Issues:
- **Error**: "No data returned"
  - **Solution**: Check if material classes are actually maintained (use CL02 transaction)

- **Empty Characteristics**: Some material classes may not have characteristics assigned

---

## 12. References

### SAP Documentation:
- **Material Master**: https://help.sap.com/docs/S4HANA/
- **Variant Configuration**: Topic: "Variant Configuration - Basic Concepts"
- **Batch Management**: Topic: "Batch Management in the Goods Movement Process"

### Azure SAP Integration:
- **Azure on SAP**: https://learn.microsoft.com/en-us/azure/virtual-machines/workloads/sap/
- **SAP Data Intelligence on Azure**: https://help.sap.com/docs/data-intelligence

---

**Document Version:** 1.0  
**Last Updated:** 2024-01-15  
**Author:** SAP Consultant - Production Planning & Variant Configuration
