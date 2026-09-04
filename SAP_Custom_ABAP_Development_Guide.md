# SAP Sales Document Type Configuration
## Custom ABAP Development Guide

**Document Version:** 1.0  
**Date:** September 4, 2026  
**Audience:** ABAP Developers, Technical Consultants  

---

## TABLE OF CONTENTS

1. [Introduction](#introduction)
2. [Enhancement Points](#enhancement-points)
3. [Custom Fields & Tables](#custom-fields--tables)
4. [Validations & Business Logic](#validations--business-logic)
5. [Reports & Analytics](#reports--analytics)
6. [Batch Jobs](#batch-jobs)
7. [Interfaces & Integrations](#interfaces--integrations)
8. [Testing & Deployment](#testing--deployment)
9. [Code Examples](#code-examples)

---

## Introduction

### When Do You Need Custom ABAP Code?

The base configuration (VOV8, VOV7, VTFL, VN01) handles 90% of requirements. Custom ABAP is needed for:

```
✓ Custom validation logic
✓ Custom fields on documents
✓ Automated background processing
✓ Special reporting requirements
✓ Third-party integrations
✓ Complex pricing algorithms
✓ Workflow-based approvals
✓ Custom document numbering

✗ Custom fields - use Enhancement Framework instead
✗ Custom screens - use BAdI instead
✗ Custom reports - use BW/BI instead (preferred)
```

### Development Approach

**SAP Standard Methods:**

```
1. ENHANCEMENT FRAMEWORK (Preferred)
   - Add custom fields without modifying SAP tables
   - Less invasive than Z-tables
   - Easier to support across upgrades
   
2. BADI (Business Add-In)
   - Hook into existing SAP processes
   - Execute custom logic at specific points
   - Less code required
   
3. USER EXITS
   - Older method (not recommended for new development)
   - Consider using BAdI instead if possible
   
4. Z-TABLES (Appendix)
   - Create custom tables for new data
   - Link to standard tables via foreign keys
   - Use when no standard table exists
```

---

## Enhancement Points

### Sales Order Header Enhancement

**Purpose:** Add custom fields to ZOR order headers

**Standard Table:** VBAK (Sales Order Header)

**Enhancement Approach:**

```
Transaction: SE11 (Data Dictionary)

Method 1: Use Structure Enhancement

1. Find structure: VBAK_APPEND
   (this is the append for adding custom fields)

2. Add custom fields:
   ZCAMP_ID       CHARACTER 10    Campaign ID
   ZCAMP_DESC     CHARACTER 40    Campaign Description
   ZPROMO_TYPE    CHARACTER 20    Promotional Type
   ZRETENTION_PCT DECIMAL 5,2     Retention Percentage
   ZAUTO_INVOICE  INDICATOR       Auto-invoice indicator
   
3. Create screen fields in:
   Transaction: SM31 (Table Maintenance)
   Define custom fields in screen builder

4. Activate and regenerate table
```

**ABAP Enhancement:**

```abap
" In transaction: CMOD or SE19 (Enhancement Implementation)
" Project Name: Z_SALES_DOC_ENHANCEMENTS

" Enhancement Type: BADI (Business Add-In)
" BAdI Name: SALES_DOCUMENT_CHANGE
" Hook Point: Document saved, before posting

" Example: Validate promotional campaign
IF lt_vbak-zcamp_id is NOT INITIAL.
  PERFORM check_campaign USING lt_vbak-zcamp_id.
ENDIF.
```

### Sales Order Item Enhancement

**Purpose:** Add custom fields to order items

**Standard Table:** VBAP (Sales Order Item)

**Enhancement Approach:**

```
Similar to header:
1. Add fields to VBAP_APPEND
2. Fields needed:
   ZFREE_ITEM         INDICATOR    Free promotional item?
   ZFREE_QTY          NUMERIC 15   Quantity of free items
   ZPROMO_MATERIAL    CHARACTER 40 Material bundled in promo
   ZSUPPLIER_ID       CHARACTER 10 Supplier (for drop-ship)
   ZVENDOR_MATERIAL   CHARACTER 40 Vendor's material number
   ZVENDOR_PRICE      DECIMAL      Supplier cost
   
3. Create table maintenance and screens
4. Activate
```

---

## Custom Fields & Tables

### Creating Custom Z-Tables

**When:** Standard tables don't have required data structure

**Example: Promotional Campaign Tracking**

```abap
* Table: ZPROMO_CAMPAIGNS
* Description: Promotional campaign master data

DEFINITION:
  ZCAMP_ID         CHARACTER 10  (Key)  Campaign ID
  ZCAMP_DESC       CHARACTER 40         Campaign Description
  ZCAMP_TYPE       CHARACTER 10         Campaign Type (SEASONAL/EVENT/LOYALTY)
  ZSTART_DATE      DATE                 Campaign start date
  ZEND_DATE        DATE                 Campaign end date
  ZMARKETING_CODE  CHARACTER 20         Marketing tracking code
  ZBUDGET_AMOUNT   DECIMAL 13,2         Campaign budget
  ZBUDGET_USED     DECIMAL 13,2         Budget spent to date
  ZSTATUS          CHARACTER 1          Status (A/I/C)
  ZCREATED_BY      CHARACTER 12         Created by user
  ZCREATED_ON      DATE                 Created date
  ZMODIFIED_BY     CHARACTER 12         Modified by user
  ZMODIFIED_ON     DATE                 Modified date
```

**Creating Table in SE11:**

```
1. SE11: Data Dictionary
2. Create new table: ZPROMO_CAMPAIGNS
3. Define fields as above
4. Set ZCAMP_ID as primary key
5. Create delivery class: "Master data"
6. Activate table
7. Create table maintenance view: SM30
8. Create ABAP program for maintenance
9. Transport table via CR
```

### Linking Custom Data to Orders

**Example: Link Promotional Campaign to Order**

```abap
" Create internal table structure
TYPES: BEGIN OF ty_order_campaign,
         vbeln      TYPE vbak-vbeln,      "Sales Order
         zcamp_id   TYPE zcamp_id,         "Campaign ID
         zcamp_desc TYPE zcamp_desc,       "Campaign Description
         discount   DECIMAL(5,2),         "Promotional discount
       END OF ty_order_campaign.

DATA lt_order_campaign TYPE TABLE OF ty_order_campaign.

" When order saved with campaign, store relationship
" This allows easy lookup of orders by campaign
" For reporting: "How many orders in SUMMER2026 campaign?"
```

---

## Validations & Business Logic

### Custom Validation for Document Type

**Purpose:** Enforce business rules specific to ZOR type

**Implementation Method:** BAdI SALES_DOCUMENT_CREATION

```abap
" Include: LZOR_VALIDATION
" Description: Custom validations for ZOR document type

FUNCTION zor_validate_order.
  PARAMETER i_vbak LIKE vbak.
  PARAMETER i_vbap LIKE TABLE OF vbap.
  PARAMETER e_error TYPE string.

  " Rule 1: Promotional orders must have campaign reference
  IF i_vbak-vbtyp = 'C' AND i_vbak-zcamp_id IS INITIAL.
    e_error = 'Promotional order must have campaign ID'.
    EXIT.
  ENDIF.

  " Rule 2: Drop-ship items must have supplier
  LOOP AT i_vbap INTO ls_item.
    IF ls_item-zsupplier_id IS INITIAL
       AND ls_item-matnr IN <drop_ship_materials>.
      e_error = 'Drop-ship materials require supplier'.
      EXIT.
    ENDIF.
  ENDLOOP.

  " Rule 3: Subscription orders can't be partial delivery
  IF i_vbak-vbtyp = 'S'.
    i_vbak-teiln = 'X'.  "No partial delivery
  ENDIF.

ENDFUNCTION.
```

### Promotional Discount Calculation

**Purpose:** Apply promotional discount based on campaign rules

**Implementation:**

```abap
" Program: Z_CALC_PROMO_DISCOUNT
" Description: Calculate promotional discount

FUNCTION z_calc_promo_discount
  IMPORTING
    i_vbeln         TYPE vbak-vbeln
    i_zcamp_id      TYPE zcamp_id
  EXPORTING
    e_discount_pct  TYPE decimal
    e_discount_amt  TYPE decimal.

  DATA ls_campaign TYPE zpromo_campaigns.
  DATA ls_vbak LIKE vbak.
  
  " Get order data
  SELECT SINGLE * FROM vbak INTO ls_vbak
    WHERE vbeln = i_vbeln.
  
  " Get campaign rules
  SELECT SINGLE * FROM zpromo_campaigns INTO ls_campaign
    WHERE zcamp_id = i_zcamp_id.
  
  " Calculate discount based on rules
  CASE ls_campaign-zcamp_type.
    WHEN 'SEASONAL'.
      e_discount_pct = 15.  "15% for seasonal
    WHEN 'LOYALTY'.
      e_discount_pct = 10.  "10% for loyalty
    WHEN 'EVENT'.
      e_discount_pct = 20.  "20% for event
  ENDCASE.
  
  " Calculate amount
  e_discount_amt = ls_vbak-netwr / 100 * e_discount_pct.

ENDFUNCTION.
```

### Subscription Renewal Logic

**Purpose:** Automatically renew subscriptions at end of contract

**Implementation:**

```abap
" Program: Z_RENEWAL_SUBSCRIPTION
" Description: Renewal job for subscriptions
" Schedule: Daily at 2 AM

REPORT z_renewal_subscription.

DATA lt_subscriptions TYPE TABLE OF zsubscription_master.
DATA ls_subscription LIKE LINE OF lt_subscriptions.
DATA lv_today LIKE sy-datum.

lv_today = sy-datum.

" Find all subscriptions ending today
SELECT * FROM zsubscription_master 
  INTO TABLE lt_subscriptions
  WHERE zend_date = lv_today
    AND zauto_renewal = 'X'
    AND zstatus = 'ACTIVE'.

" For each subscription
LOOP AT lt_subscriptions INTO ls_subscription.

  " Check if customer wants to renew
  IF ls_subscription-zauto_renewal = 'X'.
    
    " Extend subscription
    PERFORM extend_subscription USING ls_subscription.
    
    " Create new order for next cycle
    PERFORM create_renewal_order USING ls_subscription.
    
    " Generate invoice if requested
    PERFORM create_renewal_invoice USING ls_subscription.
    
  ENDIF.

ENDLOOP.

" Update statistics
PERFORM update_renewal_stats.
```

---

## Reports & Analytics

### Sales by Document Type Report

**Purpose:** Analytics on document type usage and performance

**Report Program:**

```abap
" Program: Z_SALES_DOC_ANALYTICS
" Description: Sales document type analysis report

REPORT z_sales_doc_analytics.

TABLES: vbak, vbap, vbrk.

DATA: gt_result TYPE TABLE OF ty_doc_analytics.
DATA: ls_result LIKE LINE OF gt_result.

" Selection screen
PARAMETERS:
  p_doc_type(3)   DEFAULT 'ZOR',
  p_period(6)     DEFAULT '202609',
  p_cust(10)      OPTIONAL.

" Query data
SELECT
  vbak~auart AS doc_type,
  vbak~vbeln AS order_number,
  vbak~kunnr AS customer,
  vbak~netwr AS order_amount,
  vbak~waerk AS currency,
  COALESCE(vbrk~netwr, 0) AS billed_amount,
  vbak~erdat AS creation_date
  INTO CORRESPONDING FIELDS OF TABLE gt_result
  FROM vbak
  LEFT JOIN vbrk ON vbak~vbeln = vbrk~vgbel
  WHERE vbak~auart = p_doc_type
    AND vbak~erdat >= p_period.

" Calculate summary statistics
DATA: lv_total_orders    LIKE vbak-netwr,
      lv_avg_order_size  LIKE vbak-netwr,
      lv_billed_percent  TYPE p VALUE 0,
      lv_order_count     TYPE i.

LOOP AT gt_result INTO ls_result.
  ADD 1 TO lv_order_count.
  ADD ls_result-order_amount TO lv_total_orders.
ENDLOOP.

lv_avg_order_size = lv_total_orders / lv_order_count.

" Display results
DATA: lo_alv TYPE REF TO cl_salv_table.

CALL METHOD cl_salv_table=>factory
  IMPORTING
    r_salv_table = lo_alv
  CHANGING
    t_table      = gt_result.

lo_alv->display( ).
```

### Promotional Campaign Tracking Report

**Purpose:** Track promotional campaign effectiveness

**Report:**

```abap
" Program: Z_PROMO_CAMPAIGN_REPORT

REPORT z_promo_campaign_report.

DATA: gt_campaign_data TYPE TABLE OF ty_campaign_report.
DATA: ls_campaign_data LIKE LINE OF gt_campaign_data.

" Get campaign master data
SELECT 
  zcamp_id,
  zcamp_desc,
  zstart_date,
  zend_date,
  zbudget_amount
  INTO CORRESPONDING FIELDS OF TABLE gt_campaign_data
  FROM zpromo_campaigns
  WHERE zstatus = 'A'.

" For each campaign, get order statistics
LOOP AT gt_campaign_data INTO ls_campaign_data.
  
  " Count orders in campaign
  SELECT COUNT(*) INTO ls_campaign_data-order_count
    FROM vbak
    WHERE zcamp_id = ls_campaign_data-zcamp_id.
  
  " Sum order amounts
  SELECT SUM(netwr) INTO ls_campaign_data-total_sales
    FROM vbak
    WHERE zcamp_id = ls_campaign_data-zcamp_id.
  
  " Calculate ROI
  ls_campaign_data-roi = 
    (ls_campaign_data-total_sales - ls_campaign_data-zbudget_amount) 
    / ls_campaign_data-zbudget_amount * 100.
  
  MODIFY gt_campaign_data FROM ls_campaign_data.
  
ENDLOOP.

" Display in ALV
" ... ALV display code ...
```

---

## Batch Jobs

### Background Job: Recurring Billing

**Purpose:** Generate recurring invoices for subscription orders

**Program Name:** Z_SUBSCRIPTION_BILLING_BATCH

```abap
" Program: Z_SUBSCRIPTION_BILLING_BATCH
" Description: Generate recurring subscription invoices
" Schedule: Daily at 02:00 AM

REPORT z_subscription_billing_batch.

DATA: lt_subscriptions TYPE TABLE OF zsubscription_master.
DATA: ls_subscription LIKE LINE OF lt_subscriptions.
DATA: lv_today LIKE sy-datum.
DATA: lv_error_count TYPE i VALUE 0.
DATA: lv_success_count TYPE i VALUE 0.

lv_today = sy-datum.

WRITE: / 'Subscription Billing Job Started', sy-datum, sy-timlo.

TRY.

  " Find subscriptions ready for next billing
  SELECT * FROM zsubscription_master
    INTO TABLE lt_subscriptions
    WHERE znext_invoice_date = lv_today
      AND zstatus = 'ACTIVE'.
  
  IF sy-subrc <> 0.
    WRITE: / 'No subscriptions to bill today'.
    STOP.
  ENDIF.
  
  " Process each subscription
  LOOP AT lt_subscriptions INTO ls_subscription.
    
    TRY.
      
      " 1. Create subscription order
      PERFORM create_subscription_order USING ls_subscription.
      
      " 2. Create billing document
      PERFORM create_billing_doc USING ls_subscription.
      
      " 3. Calculate next invoice date
      PERFORM calculate_next_invoice_date USING ls_subscription.
      
      " 4. Update subscription master
      UPDATE zsubscription_master SET
        znext_invoice_date = ls_subscription-znext_invoice_date
        WHERE zsubscription_id = ls_subscription-zsubscription_id.
      
      ADD 1 TO lv_success_count.
      
    CATCH cx_bapi_manager INTO DATA(ex_error).
      
      ADD 1 TO lv_error_count.
      WRITE: / 'Error for subscription', ls_subscription-zsubscription_id,
              ex_error->get_text( ).
      
    ENDTRY.
    
  ENDLOOP.
  
  COMMIT WORK.
  
  WRITE: / 'Job Completed'.
  WRITE: / 'Successful:', lv_success_count.
  WRITE: / 'Errors:', lv_error_count.
  
CATCH cx_root INTO DATA(ex_main).
  
  WRITE: / 'Fatal Error:', ex_main->get_text( ).
  ROLLBACK WORK.
  
ENDTRY.
```

### Background Job: Drop-Ship PO Creation

**Purpose:** Automatically create POs for drop-ship orders

**Program Name:** Z_DROPSHIP_PO_CREATION

```abap
" Program: Z_DROPSHIP_PO_CREATION
" Description: Auto-create POs for drop-ship orders

REPORT z_dropship_po_creation.

DATA: lt_ds_orders TYPE TABLE OF vbak.
DATA: ls_ds_order LIKE LINE OF lt_ds_orders.

" Find all ZDS orders without PO
SELECT * FROM vbak
  INTO TABLE lt_ds_orders
  WHERE auart = 'ZDS'
    AND erdat = sy-datum
    AND zpo_created = ' '.  "No PO created yet

LOOP AT lt_ds_orders INTO ls_ds_order.
  
  TRY.
    
    " Create PO to supplier based on ZDS order
    PERFORM create_supplier_po USING ls_ds_order.
    
    " Link PO to order
    UPDATE vbak SET zpo_created = 'X'
      WHERE vbeln = ls_ds_order-vbeln.
    
  CATCH OTHERS.
    
    WRITE: / 'Error creating PO for', ls_ds_order-vbeln.
    
  ENDTRY.
  
ENDLOOP.

COMMIT WORK.
```

---

## Interfaces & Integrations

### EDI Interface: Order to 3PL

**Purpose:** Send drop-ship orders to 3PL partner via EDI

**Program: Z_EDI_DROPSHIP_ORDER**

```abap
" Program: Z_EDI_DROPSHIP_ORDER
" Description: EDI export of drop-ship orders to 3PL

REPORT z_edi_dropship_order.

DATA: lt_orders TYPE TABLE OF vbak.
DATA: lt_lines TYPE TABLE OF vbap.
DATA: ls_edi_msg TYPE z_edi_shipment_msg.

" Get unprocessed drop-ship orders
SELECT * FROM vbak
  INTO TABLE lt_orders
  WHERE auart = 'ZDS'
    AND zedi_sent = ' '
    AND erdat = sy-datum.

LOOP AT lt_orders INTO DATA(ls_order).
  
  " Get order items
  SELECT * FROM vbap
    INTO TABLE lt_lines
    WHERE vbeln = ls_order-vbeln.
  
  " Build EDI message
  ls_edi_msg-message_type = '850'.  "Purchase order
  ls_edi_msg-order_number = ls_order-vbeln.
  ls_edi_msg-ship_to = ls_order-kunnr.
  ls_edi_msg-carrier = ls_order-zsupplier_id.
  
  " Add line items
  LOOP AT lt_lines INTO DATA(ls_line).
    APPEND INITIAL LINE TO ls_edi_msg-items.
    ls_edi_msg-items[-1]-line_num = ls_line-posnr.
    ls_edi_msg-items[-1]-material = ls_line-matnr.
    ls_edi_msg-items[-1]-qty = ls_line-menge.
  ENDLOOP.
  
  " Send via EDI
  CALL FUNCTION 'EDI_DOCUMENT_SEND'
    EXPORTING
      i_edi_message = ls_edi_msg
    EXCEPTIONS
      OTHERS        = 1.
  
  IF sy-subrc = 0.
    UPDATE vbak SET zedi_sent = 'X'
      WHERE vbeln = ls_order-vbeln.
  ENDIF.
  
ENDLOOP.

COMMIT WORK.
```

### Web Service: Order Status Update

**Purpose:** External system can query order status

**Program: Z_ORDER_STATUS_WS**

```abap
" Program: Z_ORDER_STATUS_WS
" Description: Web service for order status
" Service Method: get_order_status

FUNCTION z_get_order_status
  IMPORTING
    i_order_number    TYPE vbak-vbeln
  EXPORTING
    e_order_status    TYPE char1
    e_delivery_status TYPE char1
    e_invoice_status  TYPE char1
    e_amount          TYPE decimal
    e_balance_due     TYPE decimal.

  DATA ls_vbak TYPE vbak.
  DATA ls_vbup TYPE vbup.
  DATA ls_vbrk TYPE vbrk.
  
  " Get order master
  SELECT SINGLE * FROM vbak INTO ls_vbak
    WHERE vbeln = i_order_number.
  
  " Get order status
  SELECT SINGLE * FROM vbup INTO ls_vbup
    WHERE vbeln = i_order_number.
  
  " Get invoice data
  SELECT SINGLE * FROM vbrk INTO ls_vbrk
    WHERE vgbel = i_order_number.
  
  " Return status
  e_order_status = ls_vbup-gbstk.    "Order status
  e_delivery_status = ls_vbup-lfstk. "Delivery status
  e_invoice_status = ls_vbup-fkstk.  "Invoicing status
  e_amount = ls_vbak-netwr.
  e_balance_due = ls_vbak-netwr - COALESCE(ls_vbrk-netwr, 0).

ENDFUNCTION.
```

---

## Testing & Deployment

### ABAP Unit Tests

**Program: Z_TESTS_SALES_DOC_TYPE**

```abap
" Program: Z_TESTS_SALES_DOC_TYPE
" Description: Unit tests for custom development

CLASS test_document_type DEFINITION FOR TESTING
  DURATION SHORT
  RISK LEVEL HARMLESS.

  PRIVATE SECTION.
    DATA: lt_test_data TYPE TABLE OF vbak.
    
    METHODS:
      setup,
      test_promotional_order,
      test_dropship_order,
      test_subscription_order.
      
ENDCLASS.

CLASS test_document_type IMPLEMENTATION.

  METHOD setup.
    " Setup test data
    PERFORM prepare_test_orders USING lt_test_data.
  ENDMETHOD.
  
  METHOD test_promotional_order.
    " Test 1: Promotional order validation
    DATA ls_order TYPE vbak.
    
    ls_order-auart = 'ZOP'.
    ls_order-zcamp_id = 'SUMMER2026'.
    
    TRY.
      PERFORM zor_validate_order USING ls_order.
      cl_abap_unit_assert=>assert_initial(
        EXPORTING
          act = ls_order-error
        GIVEN
          msg = 'Promotional order validation passed' ).
    CATCH OTHERS.
      cl_abap_unit_assert=>fail( 'Validation failed' ).
    ENDTRY.
  ENDMETHOD.
  
  METHOD test_dropship_order.
    " Test 2: Drop-ship validation
    DATA ls_order TYPE vbak.
    
    ls_order-auart = 'ZDS'.
    ls_order-zsupplier_id = '1000'.
    
    TRY.
      PERFORM zor_validate_order USING ls_order.
      cl_abap_unit_assert=>assert_initial(
        EXPORTING
          act = ls_order-error
        GIVEN
          msg = 'Drop-ship order validation passed' ).
    CATCH OTHERS.
      cl_abap_unit_assert=>fail( 'Validation failed' ).
    ENDTRY.
  ENDMETHOD.
  
  METHOD test_subscription_order.
    " Test 3: Subscription order processing
    " ... Test code ...
  ENDMETHOD.
  
ENDCLASS.
```

### Integration Testing

**Test Scenarios:**

```
1. End-to-End Order Flow
   - Create ZOR order
   - Verify it appears in system
   - Create delivery
   - Verify delivery items match order
   - Create invoice
   - Verify invoice amount correct
   - View document flow
   
2. Custom Validations
   - Test promotional order validation
   - Test drop-ship supplier requirement
   - Test subscription renewal logic
   
3. Batch Jobs
   - Run subscription billing job
   - Verify invoices created
   - Check GL postings
   
4. Integrations
   - Test EDI export for 3PL
   - Test order status web service
   - Verify external systems receive data
```

### Deployment

**Transport Process:**

```
1. Development (DEV)
   - Code written and unit tested
   - Custom tables created
   - Programs tested with actual data
   
2. Quality Assurance (QA)
   - Code imported to QA
   - Integration testing performed
   - User testing completed
   - No critical defects
   
3. Production (PROD)
   - Code transported via CR
   - Post-import testing
   - Batch jobs scheduled
   - Go-live support ready
```

---

## Code Examples

### Example 1: Custom Promotional Order Logic

```abap
FUNCTION z_process_promotional_order
  IMPORTING
    i_order_number TYPE vbak-vbeln
  EXPORTING
    e_error TYPE string.

  DATA: ls_vbak TYPE vbak.
  DATA: lt_vbap TYPE TABLE OF vbap.
  DATA: ls_vbap LIKE LINE OF lt_vbap.
  DATA: lv_discount DECIMAL(5,2).
  
  " Get order
  SELECT SINGLE * FROM vbak INTO ls_vbak
    WHERE vbeln = i_order_number.
  
  " Get items
  SELECT * FROM vbap INTO TABLE lt_vbap
    WHERE vbeln = i_order_number.
  
  " Validate campaign
  IF ls_vbak-zcamp_id IS INITIAL.
    e_error = 'Campaign ID required for ZOP'.
    EXIT.
  ENDIF.
  
  " Calculate discount
  CALL FUNCTION 'Z_CALC_PROMO_DISCOUNT'
    EXPORTING
      i_vbeln = i_order_number
      i_zcamp_id = ls_vbak-zcamp_id
    IMPORTING
      e_discount_pct = lv_discount.
  
  " Mark free items
  LOOP AT lt_vbap INTO ls_vbap.
    IF ls_vbap-matnr IN <promotional_free_items>.
      ls_vbap-zfree_item = 'X'.
      UPDATE vbap FROM ls_vbap.
    ENDIF.
  ENDLOOP.
  
  " Apply discount to header
  ls_vbak-zpromo_level = lv_discount.
  UPDATE vbak FROM ls_vbak.
  
  COMMIT WORK.

ENDFUNCTION.
```

### Example 2: Subscription Renewal Logic

```abap
FUNCTION z_renew_subscription
  IMPORTING
    i_subscription_id TYPE zsubscription_master-zsubscription_id
  EXPORTING
    e_error TYPE string.

  DATA: ls_subscription TYPE zsubscription_master.
  DATA: lv_new_end_date TYPE d.
  
  " Get subscription
  SELECT SINGLE * FROM zsubscription_master INTO ls_subscription
    WHERE zsubscription_id = i_subscription_id.
  
  " Calculate new end date
  IF ls_subscription-zperiod = 'MONTHLY'.
    lv_new_end_date = ls_subscription-zend_date + 30.
  ELSEIF ls_subscription-zperiod = 'QUARTERLY'.
    lv_new_end_date = ls_subscription-zend_date + 90.
  ELSEIF ls_subscription-zperiod = 'ANNUAL'.
    lv_new_end_date = ls_subscription-zend_date + 365.
  ENDIF.
  
  " Create renewal order
  CALL FUNCTION 'Z_CREATE_RENEWAL_ORDER'
    EXPORTING
      i_subscription_id = i_subscription_id
    IMPORTING
      e_order_number = DATA(lv_order_number).
  
  " Update subscription
  UPDATE zsubscription_master SET
    zend_date = lv_new_end_date,
    znext_invoice_date = ls_subscription-znext_invoice_date + 30
    WHERE zsubscription_id = i_subscription_id.
  
  COMMIT WORK.

ENDFUNCTION.
```

---

## Recommended ABAP Tools & Frameworks

### SAP Standard Tools

```
ABA I (ABAP Analyzer)           - Performance analysis
ABAHTDL (HTTP Trace)             - Web service debugging
CCMS (Computing Center)          - System monitoring
SE18/SE19 (BAdI Framework)        - Business add-ins
SE37 (Function Modules)          - Test function modules
SE38 (ABAP Program Editor)        - Write ABAP code
SE39 (Extended Program Check)     - Code quality
SE80 (Object Navigator)          - Navigate ABAP objects
SLIN (Code Inspector)            - Static code analysis
```

### Recommended Coding Standards

```
✓ Use meaningful variable names (not v_1, v_2)
✓ Add function documentation
✓ Use exception handling (TRY/CATCH)
✓ Follow SAP naming conventions (Z for custom)
✓ Include unit tests for functions
✓ Use OOPS where appropriate (classes vs. procedures)
✓ Avoid nested loops when possible
✓ Use internal table processing efficiently
✓ Comment complex logic
✓ Use logging (e.g., CL_LOG)
```

### Version Control

```
Git Repository Best Practices:
- Commit ABAP changes to git
- Use meaningful commit messages
- Tag releases by CR number
- Maintain separate branches for features
- Code review before merge
- Document non-standard patterns
```

---

## Troubleshooting Custom Code

### Common Issues

**Issue 1: Custom Field Not Appearing in Screen**
```
Solution:
1. Field added to VBAK_APPEND? ✓
2. Screen field defined in SM31? ✓
3. Table regenerated? SE14 → VBAK → Active
4. Cache cleared? Ctrl+Shift+F5
5. Re-login to see new fields
```

**Issue 2: BAdI Not Firing**
```
Solution:
1. BAdI implementation created (SE19)? ✓
2. Implementation activated? ✓
3. Correct BAdI hook point? Check SAP docs
4. Correct program flow? Add debug statements
5. User authorization for transaction? ✓
```

**Issue 3: Batch Job Not Running**
```
Solution:
1. Job scheduled in SM36? ✓
2. Job active (not suspended)? ✓
3. Background work process available? ✓
4. Check job log in SM37
5. Add WRITE statements for debugging
```

---

## Summary

Key points for custom ABAP development:

1. **Start Simple** - Use enhancements before Z-tables
2. **Test Thoroughly** - Unit test all custom logic
3. **Document Well** - Comment and explain the "why"
4. **Follow Standards** - Use SAP patterns and naming
5. **Transport Properly** - Use CR and TMS
6. **Support Production** - Have monitoring and rollback ready

---

**Document Version:** 1.0  
**Last Updated:** September 4, 2026  
**Classification:** Development Guide

*This guide provides framework and patterns. Actual implementation should be done by qualified ABAP developers following your organization's coding standards and Deloitte development practices.*
