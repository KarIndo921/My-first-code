# SAP Sales Document Type Advanced Customization Scenarios
## Complex Implementation Patterns for Order to Cash

**Version:** 2.0  
**Date:** September 4, 2026  
**Audience:** SAP Consultants, Functional Analysts, Technical Team Leads  

---

## Table of Contents

1. [Scenario 1: Promotional Orders with Split Billing](#scenario-1-promotional-orders)
2. [Scenario 2: Drop-Ship/3PL Orders](#scenario-2-drop-ship-orders)
3. [Scenario 3: Subscription/Recurring Orders](#scenario-3-subscription-orders)
4. [Scenario 4: Project-Based Orders](#scenario-4-project-based-orders)
5. [Scenario 5: Cash Sales (COD) Orders](#scenario-5-cash-sales-orders)
6. [Scenario 6: Variant Configuration Orders](#scenario-6-variant-configuration-orders)
7. [Scenario 7: Order with Batch Serialization](#scenario-7-batch-serialization-orders)
8. [Advanced Patterns & Integrations](#advanced-patterns)

---

## Scenario 1: Promotional Orders with Split Billing

### Business Requirements

A company wants to create a special sales order type for promotional campaigns where:
- Orders can include free items (promotional gifts)
- Free items are delivered but not billed
- Regular items billed normally
- Promotional discount applied at header level
- Special tracking for promotional campaigns
- Marketing attribution required

### Configuration Approach

#### Step 1: Create Custom Document Type (ZOP)

```
Transaction: VOV8

Sales Doc. Type:         ZOP
Description:             Promotional Order
Booking Document:        C (Customer)
Category:                Order
Number Assignment:       75 (Range: 75000-75999)
Billing Relevant:        ☑ YES
Delivery Relevant:       ☑ YES
Picking Relevant:        ☑ YES

SPECIAL SETTINGS:
Automatic Document Creation:
  ☑ Propose Delivery: YES → Delivery Type LF
  ☑ Propose Billing: NO (Manual billing required for control)

Copy Control:
  ☑ Header Texts: YES
  ☑ Item Texts: YES
  ☑ Agreements: YES
  ☑ Promotional Reference: YES (Custom field)
```

#### Step 2: Configure Multiple Item Categories

```
Transaction: VOV7

ENTRY 1: Regular Items
┌─────────────────────────────────────┐
│ Sales Doc Type: ZOP                 │
│ Item Category: TAN (Standard)       │
│                                     │
│ Flags:                              │
│   ☑ Billable Item              │
│   ☑ Delivery Relevant              │
│   ☑ Billing Relevant               │
│   ☑ Tax Relevant                   │
│                                     │
│ Profit Center Related: YES          │
└─────────────────────────────────────┘

ENTRY 2: Free Promotional Items
┌─────────────────────────────────────┐
│ Sales Doc Type: ZOP                 │
│ Item Category: TAB (Free Items)     │
│                                     │
│ Flags:                              │
│   ☑ Free Item                       │
│   ☐ Billable Item (NOT CHECKED)    │
│   ☑ Delivery Relevant              │
│   ☐ Billing Relevant (NOT CHECKED) │
│   ☐ Tax Relevant (NOT CHECKED)     │
│                                     │
│ Revenue Accrual: NO                 │
│ Profit Center Related: NO           │
└─────────────────────────────────────┘

ENTRY 3: Service/Setup Charges
┌─────────────────────────────────────┐
│ Sales Doc Type: ZOP                 │
│ Item Category: TANN (Service)       │
│                                     │
│ Flags:                              │
│   ☑ Service Item                    │
│   ☑ Billable Item                   │
│   ☐ Delivery Relevant (NO)          │
│   ☑ Billing Relevant                │
│   ☑ Tax Relevant                    │
│                                     │
│ Profit Center Related: YES          │
└─────────────────────────────────────┘
```

#### Step 3: Configure Document Flow with Splitting

```
Transaction: VTFL

FLOW 1: Order to Delivery
┌────────────────────────────────┐
│ Preceding: ZOP (Order)         │
│ Subsequent: LF (Delivery)      │
│                                │
│ Significant: YES               │
│ Default: YES                   │
│ Copy Requirements:             │
│   - Copy Qty: YES              │
│   - Copy Free Items: YES       │
│   - Copy Services: NO (manual) │
│                                │
│ Max Occurs: 1 (single delivery)│
└────────────────────────────────┘

FLOW 2: Order to Invoice
┌────────────────────────────────┐
│ Preceding: ZOP (Order)         │
│ Subsequent: RV (Invoice)       │
│                                │
│ Significant: NO                │
│ Default: NO (Manual)           │
│ Copy Requirements:             │
│   - Copy Only Billable Items   │
│   - Exclude Free Items: YES    │
│   - Include Services: YES      │
│                                │
│ Max Occurs: 2 (multiple invoices)│
└────────────────────────────────┘

FLOW 3: Delivery to Invoice
┌────────────────────────────────┐
│ Preceding: LF (Delivery)       │
│ Subsequent: RV (Invoice)       │
│                                │
│ Significant: YES               │
│ Default: YES                   │
│ Copy Requirements:             │
│   - Copy All Delivered Items   │
│   - Include Freight Charges    │
│                                │
│ Max Occurs: 999                │
└────────────────────────────────┘
```

#### Step 4: Advanced: Promotional Campaign Integration

```
CUSTOM FIELDS (Requires ABAP Enhancement):

Table: VBAK (Sales Document Header)
Add Fields:
  ZCAMP_ID      (Character 10)  - Campaign ID
  ZCAMP_DESC    (Character 40)  - Campaign Description
  ZPROMO_LEVEL  (Decimal 5,2)   - Promotional Discount %
  ZMARKETING_CD (Character 20)  - Marketing Code

Item Level: VBAP
Add Fields:
  ZFREE_ITEM    (Indicator)     - Mark as promotional free
  ZFREE_QTY     (Numeric 15)    - Free quantity given
  ZPROMO_MATERIAL (Char 40)     - Link to promo material
```

#### Step 5: Copying Control with Custom Logic

```
Transaction: VTFA (Copy Control)

Item Copying Control:
  From: ZOP → To: ZOP (Quotation copy)
  
  Control Indicators:
    ☑ Item Number:              Copy
    ☑ Material:                 Copy
    ☑ Quantity:                 Copy
    ☑ Net Price:                Do Not Copy (recalculate)
    ☑ Cost:                     Do Not Copy
    ☑ Pricing Condition:        Manual Selection
    ☑ Configuration:            Copy
    ☑ Requirement Type:         Copy
    ☑ Delivery Schedule:        Manual Selection
    ☑ Free Item Indicator:      Copy
    ☑ Promotional Reference:    Copy
```

### Testing Scenarios for Promotional Orders

**Test 1: Mixed Order with Paid + Free Items**
```
Test Order: ZOP0001
Items:
  1. Material A - Qty 10 @ $100/unit = $1,000 (TAN - billable)
  2. Gift Item B - Qty 5 @ $0 = $0 (TAB - free, no tax)
  3. Setup Fee - 1x @ $50 = $50 (TANN - service, billable)
  
Expected Delivery:
  - Delivery LF0001 includes all items (10A + 5B + Setup)
  
Expected Invoice:
  - Invoice RV0001 includes only billable (10A + Setup = $1,050)
  - Free Item NOT on invoice
  - Tax calculated only on billable items

Validation: ☑ PASS
```

**Test 2: Campaign Tracking**
```
Test Order: ZOP0002
Campaign ID: SUMMER2026
Campaign Description: Summer Promotion 2026
Promotional Discount: 15%

Order Header:
  - Original Total: $1,500
  - After 15% Promo: $1,275
  - Marketing Code: DIGITAL_MARKETING
  
Verification: ☑ PASS
```

**Test 3: Split Billing Scenario**
```
Test Order: ZOP0003
Items:
  1. Material A - Qty 10 @ $100 = $1,000 (Regular - Bill now)
  2. Material B - Qty 5 @ $50 = $250 (Regular - Bill later)
  3. Service Setup - 1x @ $100 = $100 (Service - Bill later)
  
Delivery:
  - All items delivered together in LF0003
  
Billing Options:
  Invoice 1: $1,000 (Material A only - immediate)
  Invoice 2: $350 (Material B + Service - 30 days later)
  
Validation: ☑ PASS
```

### Production Considerations

- **Reporting:** Create custom report for promotional campaign tracking
- **Analytics:** Track free items vs. paid revenue by campaign
- **Compliance:** Ensure free items properly accounted in COGS
- **System Load:** Monitor invoice splitting impact on billing run

---

## Scenario 2: Drop-Ship / 3PL Orders

### Business Requirements

A company uses third-party logistics (3PL) or drop-ship suppliers where:
- Orders created by company sales team
- Supplier ships directly to end customer
- No goods received at company warehouse
- Supplier invoices company directly
- Company invoices customer
- No inventory impact for company

### Configuration Approach

#### Step 1: Create Custom Order Type (ZDS)

```
Transaction: VOV8

Sales Doc. Type:         ZDS
Description:             Drop-Ship Order
Booking Document:        C (Customer)
Number Assignment:       80 (Range: 80000-80999)
Billing Relevant:        ☑ YES
Delivery Relevant:       ☑ NO (no warehouse involvement)
Picking Relevant:        ☑ NO (not picked from stock)

KEY DIFFERENCE FROM ZOP:
  ☐ Picking Relevant: UNCHECKED
  ☑ Direct Shipping: YES
  ☑ Supplier Linked: YES (requires custom field)
  ☑ No Stock Check: YES
  
Copy Control:
  ☑ Supplier Reference: YES
  ☑ Carrier Reference: YES
  ☑ Tracking Number: YES
```

#### Step 2: Item Categories for Drop-Ship

```
Transaction: VOV7

ENTRY 1: Drop-Ship Item
┌──────────────────────────────┐
│ Sales Doc Type: ZDS          │
│ Item Category: ZDSN          │
│                              │
│ Flags:                       │
│   ☑ Billable Item           │
│   ☐ Delivery Relevant (NO)   │
│   ☐ Picking Relevant (NO)    │
│   ☑ Billing Relevant        │
│   ☐ Stock Required (NO)      │
│   ☑ Supplier Link Required   │
│                              │
│ Special Handling:            │
│   Requirement Type: ASN      │
│   (Advanced Shipping Notice) │
│   Material Link: Required    │
│   Supplier Link: Required    │
└──────────────────────────────┘

ENTRY 2: Drop-Ship Service
┌──────────────────────────────┐
│ Sales Doc Type: ZDS          │
│ Item Category: ZDSS          │
│                              │
│ Flags:                       │
│   ☑ Service Item             │
│   ☐ Delivery Relevant (NO)   │
│   ☑ Billing Relevant        │
│   ☐ Stock Check (NO)         │
└──────────────────────────────┘
```

#### Step 3: Document Flow for Drop-Ship

```
Transaction: VTFL

FLOW 1: Drop-Ship Order → Direct Invoice
┌──────────────────────────────┐
│ Preceding: ZDS (Order)       │
│ Subsequent: RV (Invoice)     │
│                              │
│ Significant: YES             │
│ Default: YES                 │
│ Copy Requirements:           │
│   - Copy Item Data: YES      │
│   - Include Freight: YES     │
│                              │
│ Max Occurs: 1                │
└──────────────────────────────┘

NOTE: NO DELIVERY FLOW
  - Goods never enter company inventory
  - Supplier creates their own shipment
  - Customer receives directly from supplier
  - Company only tracks financially
```

#### Step 4: Custom Fields for Supplier Management

```
Required Enhancements:

Table: VBAK (Sales Header)
  ZSUPPLIER_ID   (Character 10) - Vendor/Supplier ID
  ZCARRIER_ID    (Character 10) - Shipping carrier
  ZTRACKING_NUM  (Character 30) - Tracking reference
  ZASM_REQUIRED  (Indicator)    - ASN (Advanced Shipment Notice)

Table: VBAP (Sales Items)
  ZSUPPLY_FIRM   (Character 10) - Which supplier
  ZVENDOR_MAT    (Character 40) - Vendor's material number
  ZVENDOR_PRICE  (Decimal)      - Cost from supplier
  ZMARKUP_PCT    (Decimal 5,2)  - Markup to customer

Table: VBRK (Invoice Header)
  ZVENDOR_INV    (Character 30) - Supplier's invoice number
  ZVENDOR_DATE   (Date)         - Supplier invoice date
```

#### Step 5: Integration Points

```
Procurement Integration:
  - Create Purchase Order (PO) to supplier automatically
  - Link ZDS order to supplier PO
  - Track PO delivery against order

Logistics Integration:
  - Integrate with carrier API for tracking
  - Display tracking number in order
  - Auto-update order status based on ASN

Finance Integration:
  - Match supplier invoice to PO
  - Reconcile supplier invoice with order
  - Flag discrepancies for manual review
```

### Advanced: Supplier SLA Tracking

```
Create Z-Table: ZDROP_SLA

Fields:
  SUPPLIER_ID    (Key)
  ORDER_TYPE     (ZDS - Key)
  DELIVERY_DAYS  (Number) - Target delivery days
  ACCURACY_PCT   (Decimal) - Expected order accuracy
  QUALITY_LEVEL  (String)  - Quality requirements
  PENALTY_PCT    (Decimal) - Late delivery penalty
  BONUS_PCT      (Decimal) - On-time bonus

Logic:
  Monitor each ZDS order against SLA
  Alert if supplier misses commitment
  Auto-calculate penalties/bonuses
```

### Testing Scenarios for Drop-Ship

**Test 1: Basic Drop-Ship Order**
```
Test Order: ZDS0001
Customer: ABC Corp
Items:
  Material X (Drop-Ship) - Qty 100
  Supplier: XYZ Logistics
  
Expected Flow:
  1. ZDS Order created
  2. PO created for supplier automatically
  3. Invoice created to customer
  4. NO warehouse delivery step
  
Validation: ☑ PASS
```

**Test 2: Tracking Integration**
```
Test Order: ZDS0002
Supplier: XYZ Logistics
Tracking: TRACK123456789

Expected:
  - Tracking number visible in order
  - Customer can track shipment
  - Delivery status auto-updates
  - Order status changes with ASN receipt
  
Validation: ☑ PASS
```

**Test 3: Invoice Reconciliation**
```
Test Order: ZDS0003
ZDS Order: $1,000
Supplier PO: $800
Customer Invoice: $1,000

Expected:
  - PO cost: $800
  - Markup: $200
  - Customer billed: $1,000
  - Company margin: $200
  - All properly reconciled
  
Validation: ☑ PASS
```

---

## Scenario 3: Subscription/Recurring Orders

### Business Requirements

A company provides subscription services where:
- Initial order creates subscription contract
- Recurring orders generated automatically monthly/quarterly
- Billing occurs on schedule (not based on delivery)
- Contract can be modified or cancelled
- Different subscription tiers available
- Prorated billing for mid-month changes

### Configuration Approach

#### Step 1: Create Subscription Order Type (ZSO)

```
Transaction: VOV8

Sales Doc. Type:         ZSO
Description:             Subscription Order
Booking Document:        C (Customer)
Number Assignment:       90 (Range: 90000-90999)
Billing Relevant:        ☑ YES
Delivery Relevant:       ☐ NO (often digital/service)
Picking Relevant:        ☐ NO
Contract Order:          ☑ YES (special indicator)

KEY SETTINGS:
  ☑ Recurring Order
  ☑ Contract Relevant
  ☑ Billing Schedule: YES
  ☑ Scheduled Billing Type: TIME-BASED
  
Copy Control:
  ☑ Subscription Terms: YES
  ☑ Billing Schedule: YES
  ☑ Contract Reference: YES
```

#### Step 2: Item Categories for Subscriptions

```
Transaction: VOV7

ENTRY 1: Subscription Service
┌──────────────────────────────┐
│ Sales Doc Type: ZSO          │
│ Item Category: ZSUBM         │
│                              │
│ Flags:                       │
│   ☑ Service Item             │
│   ☑ Billable Item           │
│   ☐ Delivery Relevant (NO)   │
│   ☑ Billing Relevant        │
│   ☑ Recurring Billing        │
│   ☑ Contract Item            │
│                              │
│ Special:                     │
│   Billing Schedule: Monthly  │
│   Proration: YES             │
│   Cancel Allowed: YES        │
└──────────────────────────────┘

ENTRY 2: Add-on Service
┌──────────────────────────────┐
│ Sales Doc Type: ZSO          │
│ Item Category: ZADD          │
│                              │
│ Flags:                       │
│   ☑ Service Item             │
│   ☑ Billable Item           │
│   ☑ Billing Relevant        │
│   ☑ Optional Add-on          │
│   ☑ Mid-contract Allowed     │
└──────────────────────────────┘
```

#### Step 3: Document Flow for Subscriptions

```
Transaction: VTFL

FLOW 1: Subscription Order → Recurring Invoice
┌───────────────────────────────────┐
│ Preceding: ZSO (Order)            │
│ Subsequent: RV (Invoice)          │
│                                   │
│ Significant: YES                  │
│ Default: YES                      │
│ Recurring:                        │
│   ☑ Automatic: YES                │
│   ☑ Frequency: Monthly            │
│   ☑ Generate Invoice Automatically│
│   ☑ Trigger: Date-based           │
│                                   │
│ Max Occurs: UNLIMITED             │
│ (Invoices generated for duration) │
└───────────────────────────────────┘

NOTE:
  - No warehouse delivery
  - Invoices generated on schedule
  - Regardless of physical delivery
```

#### Step 4: Billing Schedule Configuration

```
Create Custom Z-Table: ZSUBSCRIPTION

Fields:
  SUBSCRIPTION_ID    (Key, Character 20)
  ORDER_TYPE         (ZSO)
  CUSTOMER_ID        (Key)
  SERVICE_CODE       (Character 20)
  SUBSCRIPTION_TYPE  (Enum: Monthly/Quarterly/Annual)
  START_DATE         (Date)
  END_DATE           (Date)
  BILLING_DAY        (Number 1-28)
  AMOUNT_MONTHLY     (Decimal 15,2)
  CURRENCY           (Character 3)
  AUTO_RENEWAL       (Indicator)
  RENEWAL_DAYS_BEFORE (Number)
  STATUS             (ACTIVE/INACTIVE/CANCELLED)
  CANCELLATION_DATE  (Date)
  PRORATION_FACTOR   (Decimal 5,4)
  NEXT_INVOICE_DATE  (Date)

Billing Logic:
  1. On START_DATE: Create initial invoice
  2. On NEXT_INVOICE_DATE: Generate recurring invoice
  3. On MID-CONTRACT CHANGE: Prorate charges
  4. On CANCELLATION_DATE: Final invoice with proration
  5. AUTO_RENEWAL: Extend END_DATE and recreate order
```

#### Step 5: Scheduling Jobs for Recurring Billing

```
Background Job Configuration:

Job Name: ZSUB_RECURRING_BILLING
Program: ZSUB_BILLING_BATCH

Execution Schedule:
  Frequency: Daily
  Time: 02:00 AM (Low system load)
  
Logic:
  1. Query ZSUBSCRIPTION table for NEXT_INVOICE_DATE = TODAY
  2. For each subscription due:
     a. Create ZSO order (if not exists)
     b. Create RV invoice
     c. Update NEXT_INVOICE_DATE to next period
  3. Handle auto-renewals:
     a. Check END_DATE = TODAY
     b. If AUTO_RENEWAL = YES
     c. Extend END_DATE
     d. Mark for new cycle
  4. Handle cancellations:
     a. Check CANCELLATION_DATE = TODAY
     b. Generate final prorated invoice
     c. Set STATUS = CANCELLED
  5. Log all activities

Error Handling:
  - Failed invoices: Queue for manual review
  - Missing customer data: Alert to support
  - Price change conflicts: Calculate proration
```

### Testing Scenarios for Subscriptions

**Test 1: Initial Subscription Order**
```
Test Order: ZSO0001
Customer: DEF Corp
Subscription: Premium Monthly @ $999/month
Start Date: 2026-09-01
Billing Day: 1st of month

Expected:
  1. ZSO order created
  2. Initial invoice RV (Sept 1) = $999
  3. Next invoice scheduled for Oct 1
  
Validation: ☑ PASS
```

**Test 2: Prorated Add-on**
```
Test Order: ZSO0002
Original: Premium $999/month (started Sept 1)
Change Date: Sept 15 (mid-month)
Add-on: Premium Extra $300/month

Calculation:
  Days remaining: 15 days
  Proration: (15/30) × $300 = $150
  
Expected:
  Sept Invoice: $999 + $150 (prorated add-on) = $1,149
  Oct Invoice: $999 + $300 = $1,299
  
Validation: ☑ PASS
```

**Test 3: Subscription Cancellation**
```
Test Order: ZSO0003
Subscription: Premium $999/month
Cancel Date: Sept 20 (mid-month)

Calculation:
  Days used: 20 days
  Proration: (20/30) × $999 = $666
  
Expected:
  Final Invoice = $666 (prorated)
  Subscription status = CANCELLED
  Order status = COMPLETED
  
Validation: ☑ PASS
```

---

## Scenario 4: Project-Based Orders

### Business Requirements

A company delivers projects/services where:
- Complex multi-item orders
- Billing in milestones (project phases)
- Items linked to project phases/WBS elements
- Multiple deliverables and deliveries
- Revenue recognition at milestones
- Different payment terms per phase

### Configuration Approach

#### Step 1: Create Project Order Type (ZPO)

```
Transaction: VOV8

Sales Doc. Type:         ZPO
Description:             Project Order
Booking Document:        C (Customer)
Number Assignment:       60 (Range: 60000-60999)
Billing Relevant:        ☑ YES
Delivery Relevant:       ☑ YES (phased deliveries)
Picking Relevant:        ☑ NO (services/custom work)
Project Relevant:        ☑ YES

Copy Control:
  ☑ Project Reference: YES
  ☑ WBS Element Link: YES
  ☑ Milestone Schedule: YES
```

#### Step 2: Item Categories for Projects

```
Transaction: VOV7

ENTRY 1: Phase/Milestone Item
┌──────────────────────────────┐
│ Sales Doc Type: ZPO          │
│ Item Category: ZPRJ          │
│                              │
│ Flags:                       │
│   ☑ Project Item             │
│   ☑ Billable Item           │
│   ☑ Delivery Relevant        │
│   ☑ Billing Relevant        │
│   ☑ WBS Element Link         │
│   ☑ Milestone Based          │
│                              │
│ Special:                     │
│   Revenue Recognition: At    │
│   Milestone Completion       │
│   Payment Terms: Per Phase   │
└──────────────────────────────┘
```

#### Step 3: Document Flow for Projects

```
Transaction: VTFL

FLOW 1: Project Order → Phase Delivery
┌──────────────────────────────┐
│ Preceding: ZPO (Order)       │
│ Subsequent: LF (Delivery)    │
│                              │
│ Significant: YES             │
│ Default: NO (Manual per phase)│
│ Copy Requirements:           │
│   - Link to WBS: YES         │
│   - Phase Control: Manual    │
│                              │
│ Max Occurs: UNLIMITED        │
│ (One delivery per phase)     │
└──────────────────────────────┘

FLOW 2: Phase Delivery → Phase Invoice
┌──────────────────────────────┐
│ Preceding: LF (Delivery)     │
│ Subsequent: RV (Invoice)     │
│                              │
│ Significant: YES             │
│ Default: YES                 │
│ Copy Requirements:           │
│   - Milestone Amount: YES    │
│   - Retention: YES           │
│                              │
│ Max Occurs: UNLIMITED        │
└──────────────────────────────┘
```

#### Step 4: Project Integration

```
Table: VBAK (Project-linked)
  ZPROJECT_ID       - SAP Project ID
  ZPHASE_NUM        - Phase sequence
  ZMILESTONE_DESC   - Milestone description
  ZRETENTION_PCT    - Retention percentage

Table: VBAP (Project Items)
  ZWBS_ELEMENT      - WBS Element
  ZPHASE_ID         - Phase identifier
  ZDELIVERABLE      - What is deliverable
  ZACCEPTANCE_CRIT  - Acceptance criteria

MILESTONE_BILLING Logic:
  1. Each item = one milestone/phase
  2. Invoice created only when phase marked COMPLETE
  3. Retention amount held (typically 5-10%)
  4. Final invoice includes released retention
  5. Revenue recognized at delivery/acceptance
```

### Advanced: Revenue Recognition

```
Revenue Recognition Configuration:

Timing Options:
  1. At Order Creation → Full revenue
  2. At Delivery → Delivery value revenue
  3. At Invoice → Invoice amount revenue
  4. At Acceptance → Customer acceptance signals completion
  5. At Payment → When cash received

Project Scenario:
  Phase 1 Delivery: $50,000 (95% = $47,500, Retention 5% = $2,500)
  Phase 2 Delivery: $50,000 (95% = $47,500, Retention 5% = $2,500)
  Final Invoice: Retention ($5,000) + Holdback (-$5,000) = Net

Accounting Integration:
  GL Account: Revenue/Project Services
  Cost Center: Project ID
  Internal Order: Project Order Number
  WBS Element: Phase tracking
```

---

## Scenario 5: Cash Sales (COD - Cash on Delivery) Orders

### Business Requirements

For retail/cash sales where:
- Orders must be paid in full or majority before delivery
- Different terms than credit orders
- Limited credit exposure
- Fast processing (same-day delivery possible)
- Higher priority in fulfillment

### Configuration Approach

#### Step 1: Create Cash Order Type (ZCO)

```
Transaction: VOV8

Sales Doc. Type:         ZCO
Description:             Cash on Delivery Order
Booking Document:        C (Customer)
Number Assignment:       40 (Range: 40000-40999)
Billing Relevant:        ☑ YES
Delivery Relevant:       ☑ YES
Picking Relevant:        ☑ YES (expedited)
Credit Check:            ☐ NO (skip for cash sales)

Copy Control:
  ☑ Payment Terms: YES (Cash/COD only)
  ☑ Credit Limit: NO (bypass)
```

#### Step 2: Pricing & Payment Configuration

```
Transaction: VK11 (Condition Records)

For ZCO Document Type:
  Price Type:     Z001 (Cash Price)
  Discount Type:  NO (Cash customers get standard price)
  Payment Terms:  ZCO (Cash on Delivery only)
  
Payment Terms Configuration:
  Terms Code: ZCO
  Description: Cash on Delivery
  
  Payment Conditions:
    1st Payment: 100% at delivery
    Due Date: Day of delivery
    Discount: None
    Penalty: Standard late fees
```

#### Step 3: Delivery Configuration for Cash Orders

```
Document Flow: VTFL

ZCO → LF (Immediate Delivery)

Special Settings:
  ☑ Expedited Processing
  ☑ Same-day Delivery Possible
  ☑ Pick/Pack on same day as order
  ☑ No Delivery Block
  
Routing Priority:
  Set Priority Code: HIGH/URGENT
  Affects warehouse fulfillment sequence
```

#### Step 4: Credit Management Bypass

```
Transaction: OB63 (Credit Exposure)

For ZCO Orders:
  ☐ Check Credit Limit
  ☐ Check Credit Group
  ☐ Check Payment Terms
  
  Instead:
  ☑ Verify Payment Method Accepted
  ☑ Verify Cash Amount Available
  ☑ Process as COD transaction
```

### Testing Scenarios

**Test 1: Cash Order Full Payment**
```
Test Order: ZCO0001
Amount: $1,000
Payment: Cash/Card - $1,000 collected
Status: PAID

Expected:
  Immediate release for picking
  Same-day delivery scheduled
  Invoice with PAID indicator
  
Validation: ☑ PASS
```

---

## Scenario 6: Variant Configuration Orders

### Business Requirements

Company manufactures customizable products where:
- Customer selects options (color, size, features)
- System auto-generates bill of materials
- Lead time depends on configuration complexity
- Pricing varies by selected options
- Limited variant options to choose from

### Configuration Approach

#### Step 1: Create Variant Order Type (ZVC)

```
Transaction: VOV8

Sales Doc. Type:         ZVC
Description:             Variant Configuration Order
Booking Document:        C (Customer)
Number Assignment:       50 (Range: 50000-50999)
Billing Relevant:        ☑ YES
Delivery Relevant:       ☑ YES
Picking Relevant:        ☑ YES
Variant Relevant:        ☑ YES

Copy Control:
  ☑ Configuration: YES (copy variant details)
  ☑ Characteristics: YES
```

#### Step 2: Variant Configuration Setup

```
Transactions: C223, C202, C225

Create Characteristics (C202):
  ZCOLOR      - Color option
  ZSIZE       - Size/Dimension
  ZFEATURE_A  - Feature A
  ZFEATURE_B  - Feature B
  ZMATERIAL   - Material choice

Create Class (C223):
  Class: ZPRODUCT_VAR
  Type: 300 (Material Class)
  Characteristics: All above
  
Values/Variants (C225):
  ZCOLOR options: RED, BLUE, GREEN, BLACK
  ZSIZE options: S, M, L, XL
  ZFEATURE_A options: YES/NO
  ZFEATURE_B options: YES/NO
  ZMATERIAL options: PLASTIC, METAL, COMPOSITE

Pricing Variants:
  Base Price: $100
  ZCOLOR Impact: +$5 (premium colors)
  ZSIZE Impact: +$10 (larger sizes)
  ZFEATURE_A: +$25
  ZFEATURE_B: +$40
  ZMATERIAL: +$15 (premium) to -$5 (standard)
```

### Advanced Integration with Pricing

```
Condition Records (V/05):
  Price Determination by Variant
  
  CONDITION TYPE: ZVC1
  For Document Type: ZVC
  
  Logic:
    Base Price + (Color Markup) + (Size Markup) +
    (Feature A × $25) + (Feature B × $40) +
    (Material Markup)
    
Example Calculation:
  Customer selects: BLUE (premium) + L (large) +
                    Feature A (YES) + Feature B (NO) +
                    METAL (premium)
  
  Price = $100 + $5 + $10 + $25 + $0 + $15 = $155
```

---

## Scenario 7: Batch/Serialization Orders

### Business Requirements

Industries like pharma, automotive, high-value electronics where:
- Batch/Lot tracking mandatory
- Serial numbers required
- Expiry dates tracked
- Quality certifications per batch
- Regulatory compliance documentation

### Configuration Approach

#### Step 1: Create Batch Order Type (ZBatch)

```
Transaction: VOV8

Sales Doc. Type:         ZBC
Description:             Batch Control Order
Booking Document:        C (Customer)
Number Assignment:       30 (Range: 30000-30999)
Billing Relevant:        ☑ YES
Delivery Relevant:       ☑ YES
Picking Relevant:        ☑ YES
Batch Management:        ☑ YES
Serialization:           ☑ YES
```

#### Step 2: Batch Item Category

```
Transaction: VOV7

Item Category: ZBAT

Flags:
  ☑ Batch Required
  ☑ Serial Number Required
  ☑ Batch Level: Item
  ☑ Expiry Date Check
  ☑ Manufacturing Date Required
  ☑ Quality Certificate Required
```

#### Step 3: Batch Control Tables

```
Batch Tables:
  CHVD: Batch Header Data
  CHVB: Batch Values
  MCHA: Batch Characteristics
  
Custom Fields in VBAP:
  ZQUALITY_CERT  - Quality cert reference
  ZEXPIRY_DATE   - Product expiry date
  ZMANUF_DATE    - Manufacturing date
  ZMANUF_LOT     - Manufacturer lot number
  ZCERT_PATH     - Path to cert document
```

#### Step 4: Quality & Compliance Integration

```
Quality Module Integration:
  Inspection Lot Creation: Mandatory for batches
  Quality Check: Before delivery
  Certification: Auto-attach to invoice
  
Regulatory Compliance:
  Batch-level audit trail
  Full traceability (forward & backward)
  Expiry date enforcement
  Quarantine capability
```

---

## Advanced Patterns & Integrations

### Pattern 1: Multi-Level Approval Workflows

```
High-Value Order Workflow:

Order Value ≥ $50,000:
  1. Order created (ZOP)
  2. Auto-hold for approval
  3. Sales Manager Review → Approve/Reject
  4. Credit Manager Review (if credit sale)
  5. Finance Manager Review
  6. Release to fulfillment

Implementation:
  - Custom workflow in SAP BW/BODI
  - Integration with approvals management
  - Email notifications to approvers
  - SLA tracking for approval time
```

### Pattern 2: Dynamic Pricing Based on Rules

```
Scenario: Volume Discounts + Customer Tier + Season

Rules Engine Setup:
  
  1. Volume Discount (Qty-based):
     Qty 1-100: No discount
     Qty 101-500: 5% discount
     Qty 501-1000: 10% discount
     Qty > 1000: 15% discount
  
  2. Customer Tier (based on annual spend):
     Gold (> $100K/year): +5% discount
     Silver ($50K-100K): +3% discount
     Bronze ($10K-50K): +1% discount
  
  3. Seasonal Multiplier:
     Peak season (Jun-Aug): No adjustment
     Off-season (Jan-Mar): +10% discount
  
  Combined Example:
    Qty 200 units + Gold tier + Jan order
    = Base price × (1 - 0.05) × (1 - 0.05) × (1 + 0.10)
    = Base price × 0.99
```

### Pattern 3: Automated Document Routing

```
Routing Logic by Document Type:

ZOP (Promotional):
  → Marketing team for campaign review
  → Finance for promotional budget verification
  → Sales for execution
  
ZDS (Drop-ship):
  → Procurement for supplier order
  → Logistics for carrier assignment
  → Finance for supplier invoice matching
  
ZSO (Subscription):
  → Contracts for terms verification
  → IT for service setup
  → Finance for recurring billing setup
```

### Pattern 4: Integration with SAP BW/Analytics

```
Custom Report: Sales Document Type Analysis

Dimensions:
  - Document Type (OR, ZOP, ZDS, etc.)
  - Customer Segment
  - Product Line
  - Region
  - Time Period

Metrics:
  - Order Count
  - Order Value
  - Average Order Size
  - Fulfillment Time
  - Invoice Status
  - Margin by Type
  
Benefits:
  Track success of custom document types
  Identify process bottlenecks
  Measure team performance
  Forecast by document type
```

---

## Implementation Roadmap Example

### For Large Enterprise Rollout

**Phase 1 (Weeks 1-4): Foundation**
- Copy standard OR type
- Create one basic custom type (ZOR)
- Configure basic item categories
- Set up document flow
- Test in DEV environment

**Phase 2 (Weeks 5-8): Advanced**
- Create 2-3 specialized types (ZOP, ZDS, ZSO)
- Implement variant configuration
- Set up pricing rules
- Create custom reports
- Test in QA environment

**Phase 3 (Weeks 9-12): Integration**
- Integrate with procurement (3PL)
- Set up subscription billing automation
- Implement quality/batch management
- Deploy approval workflows
- UAT with business users

**Phase 4 (Week 13): Go-Live**
- Production deployment
- User training
- Support team readiness
- Monitor and optimize
- Gather feedback for enhancements

---

## Best Practices Summary

### Do's ✓
- ✓ Document all custom document types comprehensively
- ✓ Test edge cases thoroughly before production
- ✓ Plan number ranges with growth in mind
- ✓ Create user-friendly naming conventions
- ✓ Integrate with other modules properly
- ✓ Monitor system performance with new types
- ✓ Maintain audit trail for compliance

### Don'ts ✗
- ✗ Don't create unnecessary custom types
- ✗ Don't duplicate standard functionality
- ✗ Don't skip testing phases
- ✗ Don't allocate small number ranges
- ✗ Don't bypass validation controls
- ✗ Don't modify standard types directly
- ✗ Don't go live without user training

---

## Troubleshooting Advanced Scenarios

### Issue: Variant Configuration Not Showing in Order

**Root Cause:** Variant class not linked to material/item category

**Solution:**
```
1. Transaction: C223
2. Select class ZPRODUCT_VAR
3. Transaction: MARA (Material Master)
4. Link material to class
5. Transaction: CUS2
6. Assign class to material sales org data
7. Re-test order
```

### Issue: Subscription Billing Not Auto-Generating

**Root Cause:** Background job not scheduled or running

**Solution:**
```
1. Transaction: SM36
2. Check job status: ZSUB_RECURRING_BILLING
3. If missing: Create new job with program ZSUB_BILLING_BATCH
4. Schedule: Daily at 02:00 AM
5. Check job logs: SM37
6. Verify notifications configured
```

### Issue: Drop-Ship PO Not Creating Automatically

**Root Cause:** Vendor link missing in item or copy control not set

**Solution:**
```
1. VOV7: Verify item category has vendor link enabled
2. VTFA: Check copy control includes vendor data
3. Verify supplier master exists for material
4. Check material/customer/supplier combination valid
5. Re-test with vendor data populated
```

---

**End of Advanced Scenarios Document**

*Version 2.0 | September 4, 2026 | For Advanced SAP Implementation Teams*
