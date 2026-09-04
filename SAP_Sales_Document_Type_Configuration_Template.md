# SAP Sales Document Type Configuration Template
## Practical Implementation Worksheet

**Project Name:** ________________________________  
**Date:** ________________________________  
**Prepared By:** ________________________________  
**System/Client:** ________________________________  
**Change Request #:** ________________________________  

---

## SECTION 1: REQUIREMENTS GATHERING

### Business Requirements

**Q1: What is the purpose of this new sales document type?**
```
□ Promotional/Discount Orders
□ Cash Sales
□ Subscription/Recurring Orders
□ Project-based Orders
□ Drop-ship Orders
□ Bulk/Volume Orders
□ Other: ___________________________________

Description:
_____________________________________________________________________________
_____________________________________________________________________________
```

**Q2: What makes this different from standard order (OR)?**
```
1. Pricing:        ☐ Same  ☐ Different (Specify: ___________________)
2. Delivery:       ☐ Same  ☐ Different (Specify: ___________________)
3. Billing:        ☐ Same  ☐ Different (Specify: ___________________)
4. Tax:            ☐ Same  ☐ Different (Specify: ___________________)
5. Payment Terms:  ☐ Same  ☐ Different (Specify: ___________________)
6. Customer Type:  ☐ Same  ☐ Different (Specify: ___________________)
```

**Q3: What documents should be created in sequence?**
```
Order Entry:
  └─ Document Type: [_____________]
     
Delivery:
  └─ Document Type: [_____________]
     □ Automatic  □ Manual  □ Optional
     
Invoicing:
  └─ Document Type: [_____________]
     □ Automatic  □ Manual  □ Optional
```

**Q4: Are there any special requirements?**
```
□ Batch/Lot Management Required
□ Variant Configuration Required
□ Serialization Required
□ Multi-level BOM Required
□ Returnable Items
□ Free Goods Allowed
□ Split Delivery Allowed
□ Partial Billing Allowed
□ Multiple Shipping Points
□ Other: ___________________________________
```

---

## SECTION 2: NAMING & NUMBERING

### Document Type Naming

**New Document Type Code:** [______] (Must be Z or Y, 3 characters max)

**Document Type Description:** _____________________________________________

**Rationale:** 
_____________________________________________________________________________

### Number Range Allocation

**Number Range Object:** RV_BELEG

| Element | From | To | Type | Status |
|---------|------|-----|------|--------|
| From Number | [______] | [______] | Internal/Ext | ACTIVE |
| Expected Volume | _________ documents/month |
| Retention Period | _________ years |

**Allocation Map (in your organization):**
```
01-09: [________________] Range
10-19: [________________] Range
20-29: [________________] Range
30-39: [________________] Range
40-49: [________________] Range
50-59: [________________] Range NEW ← Your Document Type
60-69: [________________] Range
```

---

## SECTION 3: VOV8 CONFIGURATION

### Step 1: Document Type Basic Info

**Transaction:** VOV8

| Field | Value | Notes |
|-------|-------|-------|
| Sales Doc. Type | [_________] | 3 chars, Z/Y prefix |
| Description | [________________________] | Clear business name |
| Category | [_________] | C=Customer, V=Vendor |
| Number Assignment | [_________] | Reference VN01 range |
| Active Indicator | ☑ | Must be checked |

### Step 2: Flags & Indicators

**Data Type Indicators:**
```
☑ Booking Document
  └─ Booking Category: ☐ Customer (C)  ☐ Vendor (V)
  
☑ Record Type Indicator
  └─ Type: ☐ Order  ☐ Returns  ☐ Quotation
  
☑ Negative Posting Indicator
  └─ Use for: ☐ Credit Memos  ☐ Return Orders
```

**Document Relevance Flags:**
```
☑ Billing Relevant
  └─ Accounts Receivable Processing: [__________]
  
☑ Delivery Relevant
  └─ Shipping Type: [__________]
  
☑ Picking Relevant
  └─ Warehouse Processing: ☐ Yes  ☐ No
  
☑ Batch Related
  └─ Batch Level: ☐ Order  ☐ Item  ☐ Serial
```

**Automatic Document Creation:**
```
☑ Propose Delivery Document
  └─ Default Document Type: [__________]
  └─ Automatic: ☐ Yes  ☐ No  ☐ Conditional
  
☑ Propose Billing Document
  └─ Default Document Type: [__________]
  └─ Automatic: ☐ Yes  ☐ No  ☐ Conditional
```

### Step 3: Copy Control Configuration

**Standard Settings from OR:**
```
Item Determination Procedure: [_________________________]

Copy Control (Select applicable):
  ☑ Item Category from Reference
  ☑ Billing Plan from Reference
  ☑ Texts from Reference
  ☑ Attributes from Reference
  ☑ Agreements from Reference
```

**Text Determination:**
```
Text Determination Procedure: [_________________________]

Header Texts:
  □ Customer Order Number
  □ Purchase Order Number
  □ Notes
  
Item Texts:
  □ Material Description
  □ Notes
  □ Storage Condition
```

---

## SECTION 4: VOV7 CONFIGURATION (Item Categories)

### Item Category Mapping

**Transaction:** VOV7

Create entries for your new document type with each required item category:

#### Entry 1
```
Sales Doc Type:    [_________]
Item Category:     [___] (TAN/TAB/TANN/etc.)
Item Type:         ☐ I (Standard)  ☐ C (Config)  ☐ D (Delivery)

Flags:
  ☑ Billable Item
  ☑ Debit/Return (for returns)
  
Delivery Settings:
  ☑ Delivery Relevant: [Yes/No]
  ☑ Batch Required: [Yes/No]
  ☑ Picking Required: [Yes/No]
  
Billing Settings:
  ☑ Billing Relevant: [Yes/No]
  ☑ Billing Block Allowed: [Yes/No]
  ☑ Tax Relevant: [Yes/No]
```

#### Entry 2
```
Sales Doc Type:    [_________]
Item Category:     [___] (Free Items - TAB)
Item Type:         ☐ I (Standard)  ☐ F (Free)
Status:            ☐ Active  ☐ Inactive

Flags:
  ☑ Free Item
  ☑ No Revenue
  
Configuration:
  Revenue Accrual Type: [__________]
  Profit Center Related: [Yes/No]
  Cost Center Related: [Yes/No]
```

#### Entry 3
```
Sales Doc Type:    [_________]
Item Category:     [___] (Non-Stock/Service - TANN)
Item Type:         ☐ S (Service)  ☐ N (Non-Stock)

Special Settings:
  ☑ Delivery Relevant: [No]
  ☑ Billing Relevant: [Yes]
  ☑ Stock Transfer: [No]
```

**Summary Table:**
| Item Cat | Description | Deliv | Bill | Free | Batch | Stock |
|----------|-------------|-------|------|------|-------|-------|
| TAN | Standard Items | ☐ | ☐ | ☐ | ☐ | ☐ |
| TAB | Free Items | ☐ | ☐ | ☐ | ☐ | ☐ |
| TANN | Non-Stock | ☐ | ☐ | ☐ | ☐ | ☐ |

---

## SECTION 5: VTFL CONFIGURATION (Document Flow)

### Document Flow Matrix

**Transaction:** VTFL

Define the flow path for your documents:

#### Flow 1: Order → Delivery
```
Preceding Document Type:    [_________] (Your new order type)
Preceding Doc. Category:    ☐ T (Order)  ☐ H (Header)

Subsequent Document Type:   [LF] (Delivery - Usually standard)
Subsequent Doc. Category:   ☐ T (Order)  ☐ D (Delivery)

Control Indicators:
  ☑ Significant: [Yes/No]           (Block order if delivery missing)
  ☑ Default: [Yes/No]               (Pre-populate in flow)
  ☑ Copy Requirements: [Yes/No]     (Auto-copy items)
  ☑ Exclude:  [Yes/No]              (Cannot create flow)
  
Max Occurs:  [999]                  (Number of follow-up docs)

Document Flow Completion:
  ☐ Automatic
  ☐ Manual Selection Required
  ☐ Proposal Only
```

#### Flow 2: Delivery → Invoice
```
Preceding Document Type:    [LF] (Delivery)
Preceding Doc. Category:    ☐ D (Delivery)  ☐ L (Logistics)

Subsequent Document Type:   [RV] (Invoice - Usually standard)
Subsequent Doc. Category:   ☐ J (Invoice)  ☐ B (Billing)

Control Indicators:
  ☑ Significant: [Yes/No]
  ☑ Default: [Yes/No]
  ☑ Copy Requirements: [Yes/No]
  ☑ Exclude: [Yes/No]
  
Max Occurs: [999]

Billing Determination:
  ☐ Automatic after Goods Issue
  ☐ Manual Billing
  ☐ Scheduled Billing
```

#### Flow 3 (if needed): Order → Direct Invoice
```
Preceding Document Type:    [_________] (Your order type)
Preceding Doc. Category:    ☐ T (Order)

Subsequent Document Type:   [RV] (Invoice)
Subsequent Doc. Category:   ☐ J (Invoice)

When to use:
  ☐ Order-to-Invoice (No delivery step)
  ☐ Service Orders
  ☐ Non-stock Items
  
Conditions:
  Max Occurs: [1] (Usually single invoice)
```

**Complete Flow Visualization:**
```
START: [_________] (Your Document Type)
  │
  ├─→ [LF] Delivery
  │    └─→ [RV] Invoice ─→ END
  │
  └─→ [RV] Invoice (Direct) ─→ END
```

---

## SECTION 6: VN01 CONFIGURATION (Number Ranges)

### Number Range Setup

**Transaction:** VN01  
**Number Range Object:** RV_BELEG

| Parameter | Value | Notes |
|-----------|-------|-------|
| Range # | [__] | Unique identifier |
| Description | [_________________] | For your doc type |
| From Number | [________] | Starting number |
| To Number | [________] | Ending number |
| Current Number | [________] | Usually From or From-1 |
| Increment | [1] | Usually 1 |
| Ext. Assignment | ☐ | External numbering Y/N |
| Status | ☐ Active | Must be Active |

**Capacity Planning:**
```
From Number:        50000
To Number:          59999
Total Range:        10000 documents

Monthly Volume:     [_________]
Expected Months:    [_________]
Calculated Need:    [_________]
Safety Buffer:      _________%

⚠️ If usage > 100 docs/month, ensure range is adequate
```

**Number Range Allocation Worksheet:**
```
Document Type | From | To | Usage | Responsible | Date Activated
[__________] | [____] | [____] | [_________] | [___________] | [__________]
[__________] | [____] | [____] | [_________] | [___________] | [__________]
[__________] | [____] | [____] | [_________] | [___________] | [__________]
```

---

## SECTION 7: ADDITIONAL CONFIGURATIONS

### VOV6: Order Reasons (if applicable)

**Transaction:** VOV6

```
Sales Doc Type:  [_________]

Order Reasons to Assign:
  ☐ Standard Sale
  ☐ Rush Order
  ☐ Promotional
  ☐ Renewal
  ☐ Replacement
  ☐ Other: _____________________
```

### Copying Control Requirements

**Document Type:** [_________]

```
Header Copying:
  ☑ Customer Data          [Copy/Don't Copy]
  ☑ Billing Address        [Copy/Don't Copy]
  ☑ Shipping Conditions    [Copy/Don't Copy]
  ☑ Incoterms              [Copy/Don't Copy]
  ☑ Payment Terms          [Copy/Don't Copy]
  
Item Copying:
  ☑ Material               [Copy/Don't Copy]
  ☑ Quantity               [Copy/Don't Copy]
  ☑ Price                  [Copy/Always Ask]
  ☑ Delivery Date          [Copy/Don't Copy]
  ☑ Requirement Type       [Copy/Don't Copy]
```

### Special Settings

**Pricing Procedure:**
```
Pricing Procedure: [_________________________]
Base Pricing Type: ☐ Standard  ☐ Custom
Custom Conditions:
  ☐ Promotional Discount
  ☐ Bulk Discount
  ☐ Loyalty Discount
  ☐ Other: ___________________
```

**Billing Plan:**
```
Billing Plan Required: ☐ Yes  ☐ No
Plan Type: ☐ Milestone  ☐ Time-based  ☐ Event-based
Payment Schedule: [_________________________]
```

---

## SECTION 8: TESTING PLAN

### Test Case 1: Order Creation

```
Test Date: [__________]
Tested By: [__________]

STEPS:
1. Open Transaction: VA01
2. Sales Organization: [_________________]
3. Distribution Channel: [_________________]
4. Division: [_________________]
5. Document Type: [_________] (Your new type)
6. Bill-to Party: [_________________]
7. Ship-to Party: [_________________]
8. Item:
   - Material: [_________________]
   - Quantity: [_________________]
   - Price: [_________________]
9. Save (Ctrl+S)

EXPECTED RESULTS:
☐ No error messages
☐ Document created with assigned number range
☐ All mandatory fields accepted
☐ Order appears in VA03 with correct status
☐ Document flow shows OPEN

ACTUAL RESULTS:
☐ PASS  ☐ FAIL  ☐ CONDITIONAL

Notes: _________________________________________________________________
_______________________________________________________________________
```

### Test Case 2: Delivery Creation

```
Test Date: [__________]
Tested By: [__________]

STEPS:
1. Open Transaction: VL01N
2. Reference Document: [_________] (Your test order)
3. Confirm items display correctly
4. Save delivery

EXPECTED RESULTS:
☐ Delivery created automatically or with reference
☐ Quantity correctly transferred
☐ Delivery number assigned from correct range
☐ Order status updated to PARTIALLY DELIVERED

ACTUAL RESULTS:
☐ PASS  ☐ FAIL  ☐ CONDITIONAL

Notes: _________________________________________________________________
_______________________________________________________________________
```

### Test Case 3: Invoice Creation

```
Test Date: [__________]
Tested By: [__________]

STEPS:
1. Open Transaction: VF01
2. Reference Document: [_________] (Your test delivery)
3. Review amount calculation
4. Save invoice

EXPECTED RESULTS:
☐ Invoice created with correct amount
☐ Tax calculated per configuration
☐ Invoice number assigned from correct range
☐ Order status updated to BILLED

ACTUAL RESULTS:
☐ PASS  ☐ FAIL  ☐ CONDITIONAL

Notes: _________________________________________________________________
_______________________________________________________________________
```

### Test Case 4: Document Flow Verification

```
Test Date: [__________]
Tested By: [__________]

STEPS:
1. Open Transaction: SD02
2. Search for your test order
3. Select order and view Document Flow
4. Verify complete chain

EXPECTED RESULTS:
☐ All three documents visible (Order, Delivery, Invoice)
☐ Document flow shows sequence
☐ Statuses progress correctly
☐ No orphaned documents

FLOW VERIFIED: [Order #_______] → [Delivery #_______] → [Invoice #_______]

ACTUAL RESULTS:
☐ PASS  ☐ FAIL  ☐ CONDITIONAL

Notes: _________________________________________________________________
_______________________________________________________________________
```

---

## SECTION 9: IMPLEMENTATION CHECKLIST

### Pre-Implementation
- [ ] All requirements gathered and documented
- [ ] Business stakeholders approved configuration
- [ ] Number ranges allocated and reserved
- [ ] Change Request created
- [ ] Training completed for support team
- [ ] Rollback plan documented
- [ ] Test environment matches production

### Configuration Phase
- [ ] VOV8: Document type created
- [ ] VN01: Number range assigned
- [ ] VOV7: Item categories mapped
- [ ] VTFL: Document flow configured
- [ ] VOV6: Order reasons assigned (if applicable)
- [ ] Copy control settings configured
- [ ] All mandatory fields validated
- [ ] Configuration reviewed by team lead

### Testing Phase
- [ ] Test Case 1 (Order Creation): PASS
- [ ] Test Case 2 (Delivery): PASS
- [ ] Test Case 3 (Invoice): PASS
- [ ] Test Case 4 (Document Flow): PASS
- [ ] Edge cases tested
- [ ] Performance validated
- [ ] Security verified
- [ ] Backup created before final save

### Documentation Phase
- [ ] Configuration documented with screenshots
- [ ] Decision log completed
- [ ] Configuration guide created
- [ ] User training materials updated
- [ ] Support documentation updated
- [ ] Runbook created for production support

### Deployment Phase
- [ ] Change Request reviewed and approved
- [ ] Configuration transported to QA system
- [ ] QA testing completed
- [ ] User Acceptance Testing (UAT) passed
- [ ] Approval from Business Owner
- [ ] Transported to Production
- [ ] Production verification completed
- [ ] Go-live successful

### Post-Implementation
- [ ] Support team trained on new type
- [ ] Help desk documentation available
- [ ] User communication sent
- [ ] Monitoring alerts configured
- [ ] Documentation archived
- [ ] Project closure meeting completed

---

## SECTION 10: SIGN-OFF & APPROVALS

### Configuration Completed By

| Role | Name | Signature | Date |
|------|------|-----------|------|
| SAP Consultant | _____________ | _____________ | _______ |
| Functional Lead | _____________ | _____________ | _______ |
| Technical Lead | _____________ | _____________ | _______ |

### Approvals

| Role | Name | Signature | Date |
|------|------|-----------|------|
| SD Team Lead | _____________ | _____________ | _______ |
| Finance Lead | _____________ | _____________ | _______ |
| CAB Coordinator | _____________ | _____________ | _______ |
| Project Manager | _____________ | _____________ | _______ |

### Issues/Deviations

```
1. Issue: ________________________________________________________________
   Resolution: ___________________________________________________________
   Date Resolved: ________

2. Issue: ________________________________________________________________
   Resolution: ___________________________________________________________
   Date Resolved: ________

3. Issue: ________________________________________________________________
   Resolution: ___________________________________________________________
   Date Resolved: ________
```

---

## SECTION 11: CONFIGURATION SUMMARY

### Quick Reference

**New Document Type:** [_________]  
**Copied From:** OR (Standard Order)  
**Number Range:** [_________]  
**Document Flow:** [_________] → [_________] → [_________]  
**Item Categories:** [_________], [_________], [_________]  
**Created Date:** [_________]  
**Deployed to Production:** [_________]  

### Key Contacts

**Configuration Support:** _________________________________  
**Business Owner:** _________________________________  
**Help Desk Contact:** _________________________________  

---

**Configuration Template Version 1.0**  
**Document Date: September 4, 2026**

*This template should be completed during implementation and stored for future reference and auditing purposes.*
