# SAP Sales Document Type Configuration
## Screenshots & Documentation Template

**Project:** Sales Document Type Configuration  
**Date:** [DATE]  
**Prepared By:** [CONSULTANT NAME]  
**Screenshot Set:** Configuration Evidence  

---

## SCREENSHOT GUIDE

This template provides a structured way to document your configuration with screenshots. For each section, you'll:
1. Take a screenshot in SAP
2. Paste it into this document
3. Add explanatory notes
4. Get sign-off from team lead

---

## SECTION 1: VOV8 DOCUMENT TYPE CREATION

### Screenshot 1.1: VOV8 Transaction Screen

**Location:** Screenshot of VOV8 list showing all document types
**Purpose:** Document that ZOR custom type is created and visible in list
**Evidence of:**
- Custom document type successfully created
- Appears in transaction list
- Correctly named (ZOR or your custom code)

```
[PASTE SCREENSHOT HERE]
File: VOV8_DocumentTypeList.png
Taken: [DATE/TIME]

Notes:
_________________________________________________________________
_________________________________________________________________
```

### Screenshot 1.2: ZOR Document Type Configuration

**Location:** Screenshot of VOV8 configuration screen for ZOR
**Purpose:** Show all configuration settings for custom type
**Evidence of:**
- Sales Document Type: ZOR
- Description: Custom Standard Order
- Category: C (Customer)
- Number Assignment: 05 (or your range number)
- Flags: Billing Relevant ☑, Delivery Relevant ☑, Picking Relevant ☑
- Automatic Document Creation settings
- Copy Requirements settings

```
[PASTE SCREENSHOT HERE]
File: VOV8_ZOR_Configuration.png
Taken: [DATE/TIME]

Configuration Details Verified:
  ☐ Type Code: ZOR (correct format Z/Y prefix)
  ☐ Description: Clear and descriptive
  ☐ Category: C (Customer)
  ☐ Billing Relevant: Checked
  ☐ Delivery Relevant: Checked
  ☐ Picking Relevant: Checked
  ☐ Automatic Document Creation: Configured
  ☐ Copy Requirements: Set appropriately

Notes:
_________________________________________________________________
_________________________________________________________________
```

### Screenshot 1.3: Copy Requirements Tab

**Location:** Screenshot of VOV8 Copy Requirements/Control section
**Purpose:** Document copying rules and text determination

```
[PASTE SCREENSHOT HERE]
File: VOV8_CopyControl.png
Taken: [DATE/TIME]

Copy Control Settings Verified:
  ☐ Item Category from Reference
  ☐ Billing Plan Copy
  ☐ Text Determination Procedure
  ☐ Attributes to Copy
  ☐ Agreements to Copy
  ☐ Header Text Copy
  ☐ Item Text Copy

Notes:
_________________________________________________________________
_________________________________________________________________
```

---

## SECTION 2: VN01 NUMBER RANGE ASSIGNMENT

### Screenshot 2.1: Number Range List

**Location:** Screenshot of VN01 showing all assigned ranges
**Purpose:** Document number range allocation across document types

```
[PASTE SCREENSHOT HERE]
File: VN01_NumberRangeList.png
Taken: [DATE/TIME]

Visible Ranges:
  01-09: [____________]
  10-19: [____________]
  20-29: [____________]
  30-39: [____________]
  40-49: [____________]
  50-59: [____________] ← ZOR (CUSTOM - HIGHLIGHT THIS)
  60-69: [____________]
  70-79: [____________]

Notes:
_________________________________________________________________
_________________________________________________________________
```

### Screenshot 2.2: ZOR Number Range Detail

**Location:** Screenshot of VN01 showing ZOR number range configuration
**Purpose:** Document number range for custom type

```
[PASTE SCREENSHOT HERE]
File: VN01_ZOR_Range.png
Taken: [DATE/TIME]

Number Range Details:
  Range Number: [____]
  Range Name/Description: [____________________________]
  From Number: [__________]
  To Number: [__________]
  Current Number: [__________]
  Status: ☐ ACTIVE  ☐ INACTIVE
  Ext. Assignment: ☐ YES  ☐ NO
  No. of Documents: [____] (automatically calculated)

Capacity Analysis:
  Total Range: [____] documents
  Expected Monthly Usage: [____]
  Months until Exhaustion: [____]
  Action Required: ☐ NONE  ☐ EXPAND RANGE

Verified:
  ☐ Range is ACTIVE
  ☐ Range is sufficient for expected usage
  ☐ Status is correct (internal/external)

Notes:
_________________________________________________________________
_________________________________________________________________
```

---

## SECTION 3: VOV7 ITEM CATEGORY MAPPING

### Screenshot 3.1: VOV7 Full Configuration

**Location:** Screenshot of VOV7 showing all item categories mapped to ZOR
**Purpose:** Document which item categories are available for ZOR orders

```
[PASTE SCREENSHOT HERE]
File: VOV7_ZOR_ItemCategories.png
Taken: [DATE/TIME]

Item Categories Configured:
  ☐ TAN (Standard Items)
    - Billable: ☐  Delivery: ☐  Picking: ☐
  
  ☐ TAB (Free Items)
    - Billable: ☐  Delivery: ☐  Picking: ☐
  
  ☐ TANN (Non-Stock/Service)
    - Billable: ☐  Delivery: ☐  Picking: ☐
  
  ☐ [Other]: __________________
    - Billable: ☐  Delivery: ☐  Picking: ☐

Notes:
_________________________________________________________________
_________________________________________________________________
```

### Screenshot 3.2: TAN Item Category Detail

**Location:** Screenshot of VOV7 configuration for TAN category
**Purpose:** Document standard item category settings

```
[PASTE SCREENSHOT HERE]
File: VOV7_TAN_ItemCategory.png
Taken: [DATE/TIME]

TAN Configuration Verified:
  ☐ Sales Doc Type: ZOR
  ☐ Item Category: TAN
  ☐ Item Type: I (Standard)
  ☐ Billable Item: Checked
  ☐ Delivery Relevant: Checked
  ☐ Billing Relevant: Checked
  ☐ Picking Relevant: Checked
  ☐ Batch Related: [____]
  ☐ Profit Center Related: [____]
  ☐ Returns Allowed: [____]

Notes:
_________________________________________________________________
_________________________________________________________________
```

### Screenshot 3.3: TAB Item Category Detail

**Location:** Screenshot of VOV7 configuration for TAB category (if applicable)
**Purpose:** Document free item category settings

```
[PASTE SCREENSHOT HERE]
File: VOV7_TAB_ItemCategory.png
Taken: [DATE/TIME]

TAB Configuration Verified:
  ☐ Sales Doc Type: ZOR
  ☐ Item Category: TAB
  ☐ Item Type: F (Free)
  ☐ Billable Item: UNCHECKED ← Free items not billed
  ☐ Delivery Relevant: Checked ← But still delivered
  ☐ Billing Relevant: UNCHECKED ← Not on invoice
  ☐ Picking Relevant: Checked ← Must be picked
  ☐ Revenue Accrual: NO

Notes:
_________________________________________________________________
_________________________________________________________________
```

---

## SECTION 4: VTFL DOCUMENT FLOW

### Screenshot 4.1: Complete VTFL List

**Location:** Screenshot showing all document flows in system
**Purpose:** Show where ZOR flows fit in overall flow architecture

```
[PASTE SCREENSHOT HERE]
File: VTFL_DocumentFlowList.png
Taken: [DATE/TIME]

Key Flows Visible:
  ☐ OR → LF (Standard order to delivery)
  ☐ LF → RV (Delivery to invoice)
  ☐ ZOR → LF (Custom order to delivery) ← HIGHLIGHT THIS
  ☐ [Other flows...]

Notes:
_________________________________________________________________
_________________________________________________________________
```

### Screenshot 4.2: ZOR → LF Flow Configuration

**Location:** Screenshot of VTFL showing ZOR to LF flow
**Purpose:** Document order to delivery flow setup

```
[PASTE SCREENSHOT HERE]
File: VTFL_ZOR_to_LF.png
Taken: [DATE/TIME]

Flow Configuration: ZOR → LF
  Preceding Document Type: ZOR
  Preceding Document Category: T (Order)
  Subsequent Document Type: LF
  Subsequent Document Category: D (Delivery)

Control Settings:
  ☐ Significant: Checked (delivery is required)
  ☐ Default: Checked (propose delivery by default)
  ☐ Copy Requirements: Checked (copy items automatically)
  ☐ Exclude: UNCHECKED
  ☐ Max Occurs: 999

Copying Control:
  ☐ Item Number: Copy
  ☐ Material: Copy
  ☐ Quantity: Copy
  ☐ Price: [______]
  ☐ Delivery Schedule: Copy

Verified:
  ☐ Flow correctly configured
  ☐ All required flags set
  ☐ Copying rules appropriate

Notes:
_________________________________________________________________
_________________________________________________________________
```

### Screenshot 4.3: LF → RV Flow Configuration

**Location:** Screenshot of VTFL showing LF to RV flow
**Purpose:** Document delivery to invoice flow setup

```
[PASTE SCREENSHOT HERE]
File: VTFL_LF_to_RV.png
Taken: [DATE/TIME]

Flow Configuration: LF → RV
  Preceding Document Type: LF
  Preceding Document Category: D (Delivery)
  Subsequent Document Type: RV
  Subsequent Document Category: J (Invoice/Billing)

Control Settings:
  ☐ Significant: Checked
  ☐ Default: Checked
  ☐ Copy Requirements: Checked
  ☐ Max Occurs: 999

Notes:
_________________________________________________________________
_________________________________________________________________
```

---

## SECTION 5: PRICING & CONDITIONS

### Screenshot 5.1: Condition Records

**Location:** Screenshot of pricing configuration for ZOR (if applicable)
**Purpose:** Document pricing setup for custom document type

```
[PASTE SCREENSHOT HERE]
File: Pricing_ZOR_ConditionRecords.png
Taken: [DATE/TIME]

Pricing Configuration:
  ☐ Price Type: [____________]
  ☐ Condition Type: [____________]
  ☐ Discount Type: [____________]
  ☐ Surcharge Type: [____________]
  ☐ Tax Treatment: [____________]

Notes:
_________________________________________________________________
_________________________________________________________________
```

---

## SECTION 6: TEST RESULTS

### Screenshot 6.1: Test Order Creation (VA01)

**Location:** Screenshot of successfully created ZOR order
**Purpose:** Prove document type works for order creation

```
[PASTE SCREENSHOT HERE]
File: VA01_ZOR_TestOrder.png
Taken: [DATE/TIME]

Test Order Details:
  Document Type: ZOR
  Order Number: [__________]
  Customer: [__________]
  Item: [__________]
  Quantity: [__________]
  Status: OPEN ☐  DELIVERED ☐  BILLED ☐
  Order Amount: [__________]

Verification:
  ☐ Order created successfully
  ☐ Document type is ZOR
  ☐ Order number is from correct range (50000-50999)
  ☐ No error messages
  ☐ All mandatory fields accepted
  ☐ Order appears in VA03 (Display)

Notes:
_________________________________________________________________
_________________________________________________________________
```

### Screenshot 6.2: Test Delivery Creation (VL01N)

**Location:** Screenshot of delivery created from ZOR order
**Purpose:** Prove document flow works (Order → Delivery)

```
[PASTE SCREENSHOT HERE]
File: VL01N_TestDelivery.png
Taken: [DATE/TIME]

Test Delivery Details:
  Delivery Number: [__________]
  Referenced Order: [__________] (should be your ZOR order)
  Items: [Count: __________]
  Quantity: [__________]
  Status: OPEN ☐  PICKED ☐  SHIPPED ☐

Verification:
  ☐ Delivery created successfully
  ☐ Items from order correctly transferred
  ☐ Quantities correct
  ☐ No errors during creation
  ☐ References ZOR order correctly

Notes:
_________________________________________________________________
_________________________________________________________________
```

### Screenshot 6.3: Test Invoice Creation (VF01)

**Location:** Screenshot of invoice created from delivery
**Purpose:** Prove complete flow works (Order → Delivery → Invoice)

```
[PASTE SCREENSHOT HERE]
File: VF01_TestInvoice.png
Taken: [DATE/TIME]

Test Invoice Details:
  Invoice Number: [__________]
  Referenced Delivery: [__________]
  Invoice Amount: [__________]
  Tax Amount: [__________]
  Total: [__________]
  Status: [__________]

Verification:
  ☐ Invoice created successfully
  ☐ Amount calculation correct
  ☐ Tax calculated correctly
  ☐ References delivery properly
  ☐ No errors

Amount Validation:
  Line Item Total: [__________]
  + Tax (if applicable): [__________]
  = Invoice Total: [__________] ✓ CORRECT

Notes:
_________________________________________________________________
_________________________________________________________________
```

### Screenshot 6.4: Document Flow View (SD02)

**Location:** Screenshot showing complete flow: Order → Delivery → Invoice
**Purpose:** Prove complete document chain is connected

```
[PASTE SCREENSHOT HERE]
File: SD02_CompleteDocumentFlow.png
Taken: [DATE/TIME]

Complete Document Flow Visible:
  ☐ ZOR Order Number: [__________]
      ↓
  ☐ LF Delivery Number: [__________]
      ↓
  ☐ RV Invoice Number: [__________]

Document Status:
  Order Status: [__________]
  Delivery Status: [__________]
  Invoice Status: [__________]

Flow Verification:
  ☐ All three documents visible
  ☐ Flow path is connected
  ☐ Statuses show progression (Open → Delivered → Billed)
  ☐ No orphaned documents
  ☐ References are correct

Notes:
_________________________________________________________________
_________________________________________________________________
```

---

## SECTION 7: USER ACCEPTANCE TESTING

### Screenshot 7.1: UAT Test Case 1 Result

**Location:** Screenshot of first UAT test passing
**Purpose:** Document user testing success

```
[PASTE SCREENSHOT HERE]
File: UAT_TestCase_1.png
Taken: [DATE/TIME]

Test Case: [____________________________________________]
Test Scenario: [_______________________________________]
Tester Name: [____________]
Date: [____________]

Expected Result: [_______________________________________]
Actual Result: [_______________________________________]

Result: ☐ PASS  ☐ FAIL  ☐ CONDITIONAL

Notes:
_________________________________________________________________
_________________________________________________________________
```

### Screenshot 7.2: UAT Test Case 2 Result

**Location:** Screenshot of second UAT test passing
**Purpose:** Document additional user testing

```
[PASTE SCREENSHOT HERE]
File: UAT_TestCase_2.png
Taken: [DATE/TIME]

Test Case: [____________________________________________]
Result: ☐ PASS  ☐ FAIL  ☐ CONDITIONAL

Notes:
_________________________________________________________________
_________________________________________________________________
```

---

## SECTION 8: ERROR CORRECTIONS

### Screenshot 8.1: Before and After Error Fix

**Location:** Screenshots showing configuration error and its resolution
**Purpose:** Document issues found and how they were resolved

```
BEFORE (Error):
[PASTE SCREENSHOT HERE]
File: Error_Before.png

Issue Description:
_________________________________________________________________
_________________________________________________________________

AFTER (Corrected):
[PASTE SCREENSHOT HERE]
File: Error_After.png

Resolution Steps:
1. [_______________________________________________________]
2. [_______________________________________________________]
3. [_______________________________________________________]

Verified: ☐ YES, issue resolved
```

---

## SECTION 9: AUDIT TRAIL

### Screenshot 9.1: Change Request

**Location:** Screenshot of Change Request (CR) for configuration
**Purpose:** Document formal change control

```
[PASTE SCREENSHOT HERE]
File: ChangeRequest_CR000123.png
Taken: [DATE/TIME]

Change Request Details:
  CR Number: [____________]
  Description: Create Sales Document Type ZOR
  Business Justification: [_____________________]
  Risk Level: ☐ LOW  ☐ MEDIUM  ☐ HIGH
  Approved By: [____________]
  Approved Date: [____________]
  Scheduled Date: [____________]

Notes:
_________________________________________________________________
_________________________________________________________________
```

### Screenshot 9.2: Transport Request

**Location:** Screenshot of transport request
**Purpose:** Document movement from DEV → QA → PROD

```
[PASTE SCREENSHOT HERE]
File: TransportRequest_CXXX000123.png
Taken: [DATE/TIME]

Transport Details:
  Transport Number: [____________]
  Description: ZOR document type configuration
  Source System: DEV
  Target System: QA
  Objects Included: ☐ VOV8  ☐ VOV7  ☐ VTFL  ☐ VN01
  
Status:
  ☐ Created
  ☐ Released to QA
  ☐ Imported in QA
  ☐ Released to PROD
  ☐ Imported in PROD

Notes:
_________________________________________________________________
_________________________________________________________________
```

---

## SECTION 10: SIGN-OFFS

### Configuration Sign-Off

```
Configuration Complete and Verified

SAP Consultant:
  Name: _____________________
  Signature: _________________ Date: _________
  Comments: ________________________________________________

Functional Lead (SD):
  Name: _____________________
  Signature: _________________ Date: _________
  Comments: ________________________________________________

Technical Lead (Basis):
  Name: _____________________
  Signature: _________________ Date: _________
  Comments: ________________________________________________

Quality Assurance:
  Name: _____________________
  Signature: _________________ Date: _________
  Comments: ________________________________________________
```

### UAT Sign-Off

```
User Acceptance Testing Complete

Business Owner:
  Name: _____________________
  Signature: _________________ Date: _________
  Approval: ☐ APPROVED  ☐ APPROVED WITH CONDITIONS  ☐ REJECTED
  Comments: ________________________________________________

SD Manager:
  Name: _____________________
  Signature: _________________ Date: _________
  Comments: ________________________________________________

Finance Manager (if billing involved):
  Name: _____________________
  Signature: _________________ Date: _________
  Comments: ________________________________________________
```

### Go-Live Authorization

```
Ready for Production Deployment

Project Manager:
  Name: _____________________
  Signature: _________________ Date: _________
  Authorization: ☐ APPROVED FOR GO-LIVE

Executive Sponsor:
  Name: _____________________
  Signature: _________________ Date: _________
  Final Approval: ☐ APPROVED FOR PRODUCTION
```

---

## SCREENSHOT CHECKLIST

Before submitting configuration, ensure you have:

**VOV8 Transactions:**
- ☐ Screenshot of ZOR in document type list
- ☐ Screenshot of ZOR configuration screen
- ☐ Screenshot of Copy Control tab

**VN01 Transaction:**
- ☐ Screenshot of number range list
- ☐ Screenshot of ZOR-specific number range detail

**VOV7 Transaction:**
- ☐ Screenshot of item category list
- ☐ Screenshot of TAN category configuration
- ☐ Screenshot of any additional item categories (TAB, etc.)

**VTFL Transaction:**
- ☐ Screenshot of document flow list
- ☐ Screenshot of ZOR → LF flow
- ☐ Screenshot of LF → RV flow (if applicable)

**Testing Evidence:**
- ☐ Screenshot of test order creation (VA01)
- ☐ Screenshot of test delivery creation (VL01N)
- ☐ Screenshot of test invoice creation (VF01)
- ☐ Screenshot of complete document flow (SD02)

**UAT Evidence:**
- ☐ At least 2 UAT test case results
- ☐ Business user sign-off
- ☐ No open defects

**Support Documentation:**
- ☐ Change Request (CR) screenshot
- ☐ Transport Request screenshot
- ☐ All sign-offs completed

---

**Screenshots Template Version:** 1.0  
**Last Updated:** September 4, 2026

*This template helps organize and document all configuration screenshots. Print pages with screenshots for audit trail and historical reference.*
