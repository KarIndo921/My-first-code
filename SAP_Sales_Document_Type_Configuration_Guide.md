# SAP Sales Document Type Configuration Guide
## Creating a Copy of Standard Sales Order (OR)

**Document Version:** 1.0  
**Last Updated:** September 4, 2026  
**Prepared by:** SAP Consultant - Deloitte  
**Scope:** Order to Cash (OTC) Process

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Step-by-Step Configuration](#step-by-step-configuration)
4. [Configuration Checklist](#configuration-checklist)
5. [Document Flow Settings](#document-flow-settings)
6. [Testing and Validation](#testing-and-validation)
7. [Troubleshooting](#troubleshooting)

---

## Overview

This guide provides detailed instructions to copy the standard SAP sales order type **OR** (Standard Order) to create a custom sales document type. This is commonly required when you need a specialized order type with specific business logic, document flow, or billing requirements.

### Use Cases for Custom Sales Order Types
- Promotional orders with special pricing
- Cash sales orders
- Subscription-based orders
- Project-based orders
- Rush orders with priority handling
- Trade orders with specific terms

---

## Prerequisites

### Required Access & Roles
- **Transaction Access:** VOV8, VOV7, VTFL, VBUK, VBUP, SM30
- **SAP Module:** Sales and Distribution (SD)
- **IMG Path Access:** IMG → Sales and Distribution → Basic Functions → Sales Documents → Sales Document Types
- **User Role:** Must have authorization for Customizing (CONFIG_MASTER or equivalent)

### Required Knowledge
- Understanding of SAP Sales Order process flow
- Knowledge of document categories (T, H, D, B)
- Familiarity with item categories and delivery/billing requirements
- Basic understanding of SAP Data Dictionary (SE11)

### System Requirements
- Access to Development (DEV) system for configuration
- Change Request (CR) number to transport changes
- Client 100+ (not client 000)

---

## Step-by-Step Configuration

### Step 1: Access the Sales Document Type Configuration Screen

**Transaction Code:** `VOV8`

1. Login to SAP system with appropriate user credentials
2. In the Command Field (or Transaction box), enter: **VOV8**
3. Press **Enter** or click **Execute**

**Alternative Path:**
```
IMG → Sales and Distribution → Basic Functions → 
Sales Documents → Sales Document Types → Define Sales Document Types
```

### Step 2: Locate the Standard Order Type (OR)

1. On the VOV8 screen, you will see a list of existing sales document types
2. Identify the **OR** (Standard Order) line
3. The screen shows columns:
   - **Sales Doc. Type** (e.g., OR)
   - **Description** (e.g., "Standard Order")
   - **Booking Document** (typically "C" for Customer)
   - **Number Assignment** (external/internal numbering)

**Expected Standard OR Configuration:**
```
Sales Doc Type:  OR
Description:     Standard Order
Category:        Order
```

### Step 3: Copy the Standard Order Type

#### Option A: Using Toolbar Copy Function
1. Click on the **OR** line to select it
2. From the toolbar, click **Copy** (or use Ctrl+C)
3. A dialog box will appear titled "Copy from Sales Document Type"
4. In the "New Sales Doc. Type" field, enter your custom code:
   - Example: **ZOR** (for custom standard order)
   - Max 3 characters
   - Must start with Z or Y (for custom development)
5. Click **Copy**

#### Option B: Manual Creation
1. Click the **New Entries** button in the toolbar
2. Fill in the fields as shown below:

### Step 4: Configure New Sales Document Type Fields

#### Basic Information Tab

| Field | Value | Notes |
|-------|-------|-------|
| **Sales Doc. Type** | ZOR | Custom code (must start with Z/Y) |
| **Description** | Custom Standard Order | Clear, descriptive name |
| **Document Category** | Inherit from OR | Usually "Order" |
| **Booking Document** | C | C = Customer; V = Vendor |
| **Number Assignment** | 01 or 02 | Assign number range |

#### Key Configuration Fields

1. **Number Range Assignment:**
   - Transaction: `VN01`
   - Number Range Object: `RV_BELEG`
   - Create new number range for your document type
   - Example: Range 50-59 for ZOR documents

2. **Billing Relevance:**
   - Check field: "Billing Relevant" (typically checked for sales orders)
   - Check field: "Invoice Relevant"

3. **Delivery Relevance:**
   - Check field: "Delivery Relevant"
   - Check field: "Picking Relevant"

4. **Document Flow Settings:**
   - Enable: "Create Follow-up Document Automatically"
   - Set flow to automatically create deliveries/invoices

### Step 5: Configure Item Categories

**Transaction Code:** `VOV7`

After creating the document type in VOV8, configure item categories:

1. Go to **VOV7** (Sales Document Type and Item Category)
2. Search for your new document type **ZOR**
3. For each item category combination, specify:
   - **Item Category** (TAN, TAB, TANN, TABE, etc.)
   - **Statistical Item** (Yes/No)
   - **Delivery Related** (Yes/No)
   - **Billing Related** (Yes/No)

**Standard Item Categories for ZOR:**
```
Item Category  | Description           | Delivery | Billing | Batch
TAN           | Standard Items        | Yes      | Yes     | No
TAB           | Free Items            | Yes      | Yes     | No
TANN          | Non-Stock Items       | No       | Yes     | No
```

### Step 6: Define Document Flow

**Transaction Code:** `VTFL`

1. Go to **VTFL** (Maintain Document Flow)
2. Define the following flows for your **ZOR** document:
   - **ZOR → LF** (Order → Delivery)
   - **LF → RV** (Delivery → Invoice)
   - **ZOR → RV** (Order → Direct Billing, if applicable)

**Example Configuration:**
```
Sales Doc Type: ZOR  →  Delivery Type: LF  →  Invoice Type: RV
```

**Document Flow Fields:**
- **Subsequent Doc. Type:** (e.g., LF for Delivery)
- **Significant:** Yes (if this is a critical dependency)
- **Default:** Yes (automatically propose this flow)
- **Max. Occurs:** 999 (allows multiple occurrences)

### Step 7: Assign Order Reason & Order Type

**Transaction Code:** `VOV6`

1. For custom sales orders, configure order reason and type:
   - Go to **VOV6** (Sales Document Type - Order Reasons)
   - Assign order reasons that apply to **ZOR**

### Step 8: Configure Billing Document Type (if different billing required)

**Transaction Code:** `VBUK`

1. If your custom ZOR requires a custom invoice type:
   - Create custom invoice type in VBUK
   - Link it to your ZOR through document flow
   - Configure number ranges for invoices

---

## Configuration Checklist

Use this checklist to ensure complete configuration:

### Phase 1: Basic Setup
- [ ] Document type code (ZOR) created in VOV8
- [ ] Description clearly defined
- [ ] Booking document type set to "C" (Customer)
- [ ] Number range assigned (VN01)
- [ ] All required fields filled without errors

### Phase 2: Document Relationships
- [ ] Item categories configured (VOV7)
- [ ] Document flow defined (VTFL)
- [ ] Delivery type linked (typically LF)
- [ ] Invoice type linked (typically RV)
- [ ] Copy requirements configured (VOV8)

### Phase 3: Advanced Settings
- [ ] Billing relevance flags set correctly
- [ ] Delivery relevance flags set correctly
- [ ] Picking requirements configured
- [ ] Batch management enabled (if needed)
- [ ] Variant configuration enabled (if needed)
- [ ] Shipping conditions assigned
- [ ] Incoterms assigned

### Phase 4: Validations & Testing
- [ ] Test order creation in VA01 with ZOR type
- [ ] Test delivery creation from order
- [ ] Test invoice creation from delivery
- [ ] Verify number assignment working correctly
- [ ] Check document flow in SD02 (Logistics → Sales)

### Phase 5: Transport & Deployment
- [ ] Changes assigned to Change Request (CR)
- [ ] Configuration transported to QA/Test system
- [ ] Tested in QA environment
- [ ] Documentation updated
- [ ] Prepared for production transport

---

## Document Flow Settings

### Standard Document Flow for ZOR (Custom Order)

```
Entry Point: Sales Order (ZOR)
    ↓
    ├── Delivery (LF) - Automatic or Manual
    │   ├── Pick List (PK)
    │   ├── Goods Issue (GI) - Inventory Module
    │   └── Packing List (PT)
    │       ↓
    │   Billing (RV) - Automatic from Delivery
    │
    └── Direct Billing (RV) - For Order-to-Invoice scenarios
```

### Configuration Details

**Step 1: Order → Delivery (ZOR → LF)**
```
Transaction: VTFL
Preceding: ZOR (Sales Order)
Subsequent: LF (Delivery)
Document Category: T (Order/Delivery)
Significant: ✓
Default: ✓
Max Occurs: 999
```

**Step 2: Delivery → Invoice (LF → RV)**
```
Transaction: VTFL
Preceding: LF (Delivery)
Subsequent: RV (Invoice)
Document Category: J (Invoice)
Significant: ✓
Default: ✓
Max Occurs: 999
```

---

## Testing and Validation

### Test Case 1: Create Sales Order with ZOR Type

**Steps:**
1. Transaction: **VA01** (Create Sales Order)
2. Sales Organization: Select appropriate org
3. Distribution Channel: Select channel
4. Division: Select division
5. Sales Document Type: **ZOR**
6. Click **Enter**
7. Fill in mandatory fields:
   - Bill-to Party
   - Ship-to Party
   - Item Details (Material, Quantity, Price)
8. Save (Ctrl+S)

**Expected Result:**
- Order created with document number from assigned range
- No error messages
- Order appears in document list

### Test Case 2: Create Delivery from ZOR Order

**Steps:**
1. Transaction: **VL01N** (Create Outbound Delivery)
2. Reference Document: Enter ZOR order number
3. Click **Enter**
4. Review delivery items
5. Save

**Expected Result:**
- Delivery (LF) created automatically
- Fulfillment status updated in order
- Item quantities correctly transferred

### Test Case 3: Create Invoice from Delivery

**Steps:**
1. Transaction: **VF01** (Create Billing Document)
2. Reference Document: Enter delivery number
3. Click **Enter**
4. Review invoice items and amounts
5. Save

**Expected Result:**
- Invoice (RV) created with correct amounts
- Document flow shows complete chain
- Billing status updated in order

### Test Case 4: Verify Document Flow

**Steps:**
1. Transaction: **SD02** (List of Sales Orders)
2. Select your ZOR order
3. View → Document Flow (or use menu path: Logistics → Sales → Document Flow)
4. Verify complete chain: ZOR → LF → RV

**Expected Result:**
- All documents visible in flow
- No broken links
- Status progression correct

### Validation Checks

- [ ] Order number within assigned range
- [ ] Document flow contains all required documents
- [ ] No ERROR status in any document
- [ ] Billing amount matches order amount
- [ ] All mandatory fields populated
- [ ] Date fields show correct values
- [ ] Customer master data correctly referenced

---

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: Cannot Create Order with ZOR Type
**Symptom:** ZOR type not appearing in dropdown or error message

**Root Causes:**
1. Number range not assigned
2. Item categories not configured
3. User lacks authorization

**Solution:**
```
1. Check VOV8: Verify ZOR is "Active" status
2. Check VN01: Confirm number range assigned
3. Check VOV7: Verify item categories configured
4. Check SM01: Verify user has access to ZOR type
5. Clear SAP cache: Ctrl+Shift+F5
6. Re-login to system
```

#### Issue 2: Cannot Create Delivery from ZOR Order
**Symptom:** "No delivery document can be created" error

**Root Causes:**
1. Document flow not configured (VTFL)
2. Item categories not marked as delivery-relevant
3. Delivery type not active

**Solution:**
```
1. Check VTFL: Verify ZOR → LF flow exists
2. Check VOV7: Mark items as "Delivery Relevant"
3. Check VOV8 (Delivery Type LF): Ensure active
4. Check item category configuration in VOV7
5. Regenerate tables: SM30 with table name
```

#### Issue 3: Number Range Exhausted
**Symptom:** "Number range exhausted" error when creating orders

**Root Causes:**
1. Number range configured incorrectly (too small)
2. Wrong range assigned to document type
3. Number range locked

**Solution:**
```
1. Transaction VN01
2. Expand number range for ZOR
3. Increase "To Number" to larger value
4. Check status (should be "Active")
5. Release number range if locked
```

#### Issue 4: Document Flow Not Working
**Symptom:** Manual creation of delivery/invoice required; no automatic follow-up

**Root Causes:**
1. "Automatic Document Creation" not enabled
2. Item category not configured for automatic follow-up
3. Wrong control settings

**Solution:**
```
1. Check VTFL: Verify "Significant" flag set
2. Check VOV8: Enable automatic follow-up flags
3. Check item category in VOV7
4. Verify copying control (VOV8 → Copy Requirements tab)
5. Test with explicit delivery creation first (VL01N with reference)
```

#### Issue 5: Billing Not Created Automatically
**Symptom:** Invoice must be created manually from delivery

**Root Causes:**
1. Delivery type not marked as billing-relevant
2. Document flow LF → RV not configured
3. Copying control not set

**Solution:**
```
1. Check VOV8 (Delivery Type LF): Mark "Billing Relevant"
2. Check VTFL: Verify LF → RV flow configured
3. Check VOV7: Ensure item category supports billing
4. Check order status in VBUK (Billing doc type config)
5. Set "Automatic Billing Document Creation" in VOV8
```

---

## Key Transaction Codes Reference

| Transaction | Purpose | Notes |
|------------|---------|-------|
| **VOV8** | Define Sales Document Types | Primary configuration |
| **VOV7** | Sales Doc Type/Item Category | Item-level configuration |
| **VOV6** | Sales Doc Type - Order Reasons | Reason assignment |
| **VTFL** | Document Flow | Chain of documents |
| **VN01** | Number Range Assignment | Number range mgmt |
| **VA01** | Create Sales Order | Testing/usage |
| **VA02** | Change Sales Order | Order maintenance |
| **VA03** | Display Sales Order | View-only |
| **VL01N** | Create Outbound Delivery | Delivery creation |
| **VF01** | Create Billing Document | Invoice creation |
| **SD02** | List of Sales Orders | Query sales orders |
| **SM30** | Table Maintenance | Direct table edits |
| **VBUK** | Billing doc type config | Invoice type setup |

---

## Best Practices

### 1. Naming Conventions
- Custom document types: Start with **Z** or **Y**
- Example: **ZOR** for custom order, **ZDL** for custom delivery
- Use meaningful abbreviations
- Document naming in 3-character limit

### 2. Number Range Planning
- Allocate sufficient ranges per document type
- Example: 50-59 for ZOR orders, 60-69 for backlog orders
- Leave gaps for future document types
- Document your number range allocation

### 3. Testing Strategy
- Test in DEV first
- Replicate in QA with data
- Validate end-to-end document flow
- Test edge cases (free items, partial delivery, etc.)

### 4. Documentation
- Document all custom document types created
- Maintain list of number ranges allocated
- Record business process affected
- Keep track of transport requests

### 5. Change Management
- Always use Change Request (CR) for transports
- Update Configuration Management Database (CMDB)
- Communicate changes to SD team
- Maintain audit trail

---

## Example: Creating a Custom Order Type for Promotional Orders

### Scenario
Company wants to create promotional sales orders with specific business logic:
- Custom document type: **ZOP** (Promotional Order)
- Custom invoice type: **ZIV** (Promotional Invoice)
- Special pricing without sales tax
- Express delivery requirement

### Configuration Steps

1. **Create Document Type ZOP**
   ```
   Transaction: VOV8
   Type: ZOP | Description: Promotional Order
   Copy from: OR
   ```

2. **Assign Number Range**
   ```
   Transaction: VN01
   Range: 70-79 for ZOP orders
   ```

3. **Configure Item Categories**
   ```
   Transaction: VOV7
   Item Category: TAN (Standard Item)
   Mark: Delivery Relevant, Billing Relevant
   ```

4. **Set Up Document Flow**
   ```
   Transaction: VTFL
   ZOP → LF (Promotional Delivery)
   LF → ZIV (Promotional Invoice)
   ```

5. **Test Order Creation**
   ```
   Transaction: VA01
   Create order with ZOP type
   Verify document flow chain
   ```

---

## Related Configuration Areas

### Integration Points
- **Pricing (V/05):** Configure condition types for ZOR
- **Credit Management (OB63):** Set credit exposure rules
- **Shipping (VV01):** Define shipping conditions
- **Rebates (VB01):** Configure rebate conditions if applicable
- **Output (NACE):** Define print forms for ZOR orders
- **ALE (BD67):** Configure distribution if needed

### Variant Configuration (if applicable)
- **Transaction VCEQ:** Variant/Value Condition
- **Transaction C223:** Class/Characteristic Assignment
- **Transaction C202:** Create Characteristics
- Configure for customizable products in your orders

---

## Support & Resources

### Internal Contacts
- SAP Basis Team: System access & authorization issues
- SD Functional Team: Business process questions
- ABAP Development Team: Custom code requirements

### External Resources
- SAP Help Portal: https://help.sap.com (Sales & Distribution)
- SAP Community: https://community.sap.com
- SAP Notes: https://launchpad.support.sap.com

### Documentation to Create/Update
- Business Process Documentation
- System Configuration Runbook
- User Training Materials
- Data Dictionary References
- Transport Request Log

---

## Approval & Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| SAP Consultant | | | |
| Functional Lead | | | |
| Technical Lead | | | |
| Change Advisory Board | | | |

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-09-04 | SAP Consultant | Initial version |

---

**End of Document**

*This guide is based on SAP standard configuration best practices for SD module. Configuration steps may vary based on your SAP system version and landscape setup.*
