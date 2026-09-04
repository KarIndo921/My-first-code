# SAP Sales Document Type Configuration
## Quick Reference Card

---

## 🎯 Quick Navigation

| Need | Transaction | Path |
|------|-------------|------|
| Create/Copy Document Type | **VOV8** | SD → Basic Functions → Sales Documents → Sales Document Types |
| Configure Item Categories | **VOV7** | SD → Basic Functions → Sales Documents → Sales Document Type/Item Category |
| Set Document Flow | **VTFL** | SD → Basic Functions → Sales Documents → Document Flow |
| Assign Number Ranges | **VN01** | Tools → ABAP Workbench → Development → Number Ranges |
| Create Sales Order | **VA01** | SD → Sales → Order → Create |
| Display Order | **VA03** | SD → Sales → Order → Display |
| Create Delivery | **VL01N** | SD → Shipping → Outbound Delivery → Create |
| Create Invoice | **VF01** | SD → Billing → Billing Document → Create |
| View Document Flow | **SD02** | SD → Master Data → Orders → List |
| Maintain Tables | **SM30** | Tools → ABAP Workbench → Utilities → Table Maintenance |

---

## 📝 Field Reference for VOV8

### Mandatory Fields

```
┌─────────────────────────────────────────┐
│ Sales Document Type                     │
├─────────────────────────────────────────┤
│ Sales Doc. Type:        [___|          │  ← 3 chars, Z/Y for custom
│ Description:            [______________|  ← Descriptive name
│ Category:               [C________________ ← C=Customer, V=Vendor
│ Number Assignment:      [01_______________ ← From VN01
│ Copy Requirements                       │
│ ☑ Billing Relevant                      │
│ ☑ Delivery Relevant                     │
│ ☑ Picking Relevant                      │
│ Automatic Doc Creation                  │
│ ☑ Propose Dlv Creation                  │
│ ☑ Propose Bill Creation                 │
└─────────────────────────────────────────┘
```

### Item Determination Tab

```
Override Item Category Determination: [  ]
Item Category Determination Procedure: [________________]
```

### Copy Tab

```
Copy Control:
  Item Category:              [STANDARD_______]
  Billing Plan:               [YES_____________]
  Text Determination:         [________________]
  Attributes:                 [________________]
```

---

## 🔗 Document Flow Quick Setup

### Standard Order → Delivery → Invoice

```
STEP 1: VTFL Configuration
┌──────────────────────────────┐
│ Preceding: ZOR (Order)       │
│ Subsequent: LF (Delivery)    │
│ Significant: ☑ YES           │
│ Default: ☑ YES               │
│ Max Occurs: 999              │
└──────────────────────────────┘

STEP 2: VTFL Configuration
┌──────────────────────────────┐
│ Preceding: LF (Delivery)     │
│ Subsequent: RV (Invoice)     │
│ Significant: ☑ YES           │
│ Default: ☑ YES               │
│ Max Occurs: 999              │
└──────────────────────────────┘
```

---

## 🏷️ Item Category Mapping (VOV7)

### Standard Item Categories

| Code | Description | Deliv | Bill | Batch | Profit Center |
|------|-------------|-------|------|-------|---|
| TAN | Standard Item | ✓ | ✓ | ✓ | ✓ |
| TAB | Free Items | ✓ | ✓ | - | ✓ |
| TANN | Non-Stock | - | ✓ | - | ✓ |
| TABO | Free/Non-Stock | - | ✓ | - | ✓ |
| TANN | Service | - | ✓ | - | ✓ |
| TANM | Material Return | ✓ | ✓ | ✓ | ✓ |

### VOV7 Entry Template

```
Sales Doc Type: [ZOR______]
Item Category:  [TAN_______]

Settings:
☑ Delivery Relevant
☑ Billing Relevant  
☑ Batch Related
☑ Profit Center Related
☑ Cost Object Related
☑ Usable for Returns
☑ Billing Document Item Allowed
```

---

## 🔢 Number Range Setup (VN01)

### Number Range Object: RV_BELEG

```
Create New Range:
┌────────────────────────────────┐
│ Range: 50                       │
│ From:  50000                    │
│ To:    59999                    │
│ Status: [ACTIVE]                │
│ Increment: 1                    │
│ Assignment:                     │
│   External:  [  ] Internal: [✓] │
└────────────────────────────────┘

ALLOCATION EXAMPLE:
01-09: Standard Orders (OR)
10-19: Rush Orders (ZOR1)
20-29: Promotional Orders (ZOR2)
30-39: Quotations (ZQ)
40-49: Free Items (ZFI)
50-59: Custom Orders (ZOR)
60-69: Subscription Orders (ZSO)
```

---

## 🧪 Testing Checklist

### Quick Test Path

```
1. CREATE ORDER (VA01)
   └─ Document Type: ZOR
   └─ Customer
   └─ Item + Qty
   └─ SAVE
   
2. CHECK FLOW (SD02)
   └─ Display created order
   └─ View Document Flow
   └─ Verify status: OPEN
   
3. CREATE DELIVERY (VL01N)
   └─ Reference: Your ZOR number
   └─ Confirm items
   └─ SAVE
   
4. CREATE INVOICE (VF01)
   └─ Reference: Your delivery number
   └─ Review amounts
   └─ SAVE
   
5. VALIDATE FLOW (SD02)
   └─ All 3 documents present
   └─ Status progression correct
```

---

## ⚠️ Error Resolution Matrix

### Problem → Solution

| Error Message | Cause | Fix |
|---------------|-------|-----|
| "Document Type ZOR not found" | Not created in VOV8 | Create in VOV8, activate |
| "No item category assigned" | VOV7 not configured | Configure ZOR + TAN in VOV7 |
| "Number range exhausted" | Range too small | Expand range in VN01 |
| "Cannot create delivery" | Document flow missing | Add ZOR→LF in VTFL |
| "Invalid item category" | Item cat not assigned | Link in VOV7 |
| "Incompatible document type" | Wrong category | Verify category in VOV8 |
| "Number already assigned" | Duplicate range | Check VN01 allocation |

---

## 🛠️ Configuration Order of Operations

```
PHASE 1: FOUNDATION
├─ 1. Create Number Range (VN01)
├─ 2. Create Document Type (VOV8)
└─ 3. Activate Document Type

PHASE 2: STRUCTURE  
├─ 4. Configure Item Categories (VOV7)
├─ 5. Set Document Flow (VTFL)
└─ 6. Configure Copying Control

PHASE 3: TESTING
├─ 7. Test Order Creation (VA01)
├─ 8. Test Delivery Creation (VL01N)
├─ 9. Test Invoice Creation (VF01)
└─ 10. Verify Document Flow (SD02)

PHASE 4: DEPLOYMENT
├─ 11. Assign to Change Request
├─ 12. Transport to QA
├─ 13. Test in QA Environment
└─ 14. Transport to Production
```

---

## 📊 Configuration Decision Matrix

### Should you create custom order type?

```
┌─ Do you need special business logic?
│  └─ YES: Create custom type
│  └─ NO: Use standard type
│
├─ Do you need different numbering?
│  └─ YES: Create custom type
│  └─ NO: Use standard type
│
├─ Do you need different document flow?
│  └─ YES: Create custom type
│  └─ NO: Use standard type
│
└─ Do you need customer-specific billing?
   └─ YES: Possibly custom type
   └─ NO: Use standard type
```

---

## 🔐 Authorization Codes Required

### User Must Have:
```
✓ T-Code VOV8: Access to Customizing
✓ T-Code VOV7: Access to Customizing
✓ T-Code VTFL: Access to Customizing
✓ T-Code VN01: Access to Number Range Maintenance
✓ T-Code VA01: Access to Sales Order Creation
✓ Authorization: CONFIG_MASTER or equivalent
✓ Authorization: SalesDoc/TCODE-VOV8
✓ Authorization: SalesDoc/TCODE-VOV7
```

---

## 📞 Quick Help Commands

### Useful SAP Menu Shortcuts
```
Display IMG:                    /n SPRO
Open Transaction:               /n [TCODE]
Open New Session:               /n
Display System Information:     System → Status
Search Help:                    F4 or Help → Search
Match Code:                     F1 in any field
Display All Fields:             Switch to Edit Mode
Print Screen:                   Print button or Ctrl+P
Expand All Sections:            Ctrl+* (Numpad)
Collapse All Sections:          Ctrl+- (Numpad)
```

---

## 📋 Document Type Naming Convention

### Recommended Standard
```
SYSTEM TYPES (Don't modify):
  OR  = Standard Order
  QT  = Quotation
  ZQ  = Quotation (custom)
  LF  = Delivery
  RV  = Invoice
  
CUSTOM TYPES (Naming examples):
  Z** = Production-like custom
  Y** = Development/Test custom
  
EXAMPLES:
  ZOR  = Custom Standard Order
  ZOP  = Promotional Order
  ZOR1 = Rush Order
  ZOR2 = Drop-ship Order
  ZSO  = Subscription Order
  ZCO  = Cash Order
  ZBO  = Bulk Order
```

---

## 🔄 Copying Standard OR → Custom ZOR

### Quick Copy Steps
```
1. Open VOV8 (T-Code)
2. Find row "OR" (Standard Order)
3. Click "OR" to select
4. Press Ctrl+C or Click Copy button
5. In dialog, enter "ZOR" as new code
6. Click Copy
7. Fill required fields
8. Save (Ctrl+S)
9. Press Back or Escape
```

---

## 📈 Testing Evidence Checklist

After configuration, document:

```
☑ Screenshot of VOV8 with ZOR type active
☑ Screenshot of VOV7 with TAN item category mapped
☑ Screenshot of VTFL showing ZOR→LF→RV flow
☑ Screenshot of VN01 showing number range for ZOR
☑ Screenshot of created ZOR order number
☑ Screenshot of delivery created from ZOR
☑ Screenshot of invoice created from delivery
☑ Screenshot of complete document flow in SD02
☑ Test results summary document
☑ Any errors encountered and resolutions
```

---

## 🚀 Common Customizations

### Promotional Orders (ZOP)
```
Copy from: OR
Number Range: 70-79
Special Settings:
  • Billing without tax
  • Express delivery flag
  • Discount condition type
  • Marketing document ref
```

### Drop-Ship Orders (ZDS)
```
Copy from: OR
Number Range: 80-89
Special Settings:
  • Supplier linked
  • Direct delivery
  • No picking required
  • Split delivery allowed
```

### Subscription Orders (ZSO)
```
Copy from: OR
Number Range: 90-99
Special Settings:
  • Recurring schedule
  • Multiple billing
  • Contract reference
  • Renewal tracking
```

---

## 📞 Support Contacts

**SAP System Issues:**
- Basis Team
- User: [_______________]
- Phone: [_______________]

**SD Functional Support:**
- SD Lead
- User: [_______________]
- Phone: [_______________]

**Change Request:**
- CAB Coordinator
- User: [_______________]
- Phone: [_______________]

---

**Quick Reference Version 1.0 | Updated: September 4, 2026**

*Keep this card handy during configuration sessions*
