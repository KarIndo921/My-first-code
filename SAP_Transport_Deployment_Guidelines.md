# SAP Sales Document Type Configuration
## Transport & Deployment Guidelines

**Document Version:** 1.0  
**Date:** September 4, 2026  
**Audience:** SAP Basis, Configuration Team, Project Managers  

---

## TABLE OF CONTENTS

1. [Transport Overview](#transport-overview)
2. [Pre-Transport Checklist](#pre-transport-checklist)
3. [Creating Transport Requests](#creating-transport-requests)
4. [Transport to QA System](#transport-to-qa-system)
5. [Transport to Production](#transport-to-production)
6. [Rollback Procedures](#rollback-procedures)
7. [Post-Deployment Verification](#post-deployment-verification)
8. [Troubleshooting](#troubleshooting)

---

## Transport Overview

### What is Transport?

Transport is the SAP mechanism to move configuration changes from one system to another:
```
DEV (Development)
    ↓ [Transport]
QA (Quality Assurance)
    ↓ [Transport]
PROD (Production)
```

Your configuration in DEV is captured in a **transport request**, which is then imported into QA and later PROD.

### Why Transport Matters

- **Version Control:** Tracks what changed and when
- **Separation of Concerns:** Configuration tested separately from live system
- **Rollback Capability:** Can revert if issues discovered
- **Audit Trail:** Complete history of changes
- **Team Coordination:** Multiple consultants can contribute

### Objects Being Transported

For our sales document type configuration, we transport:

```
VOV8 Objects (Document Type Master):
  - TVDT (Sales Document Type)
  - TVDT_EXT (Extended attributes)
  - TVEDT (Edition-specific settings)

VOV7 Objects (Item Category):
  - TVINX (Item Category Assignment)
  - TVITA (Item Category Details)

VTFL Objects (Document Flow):
  - TFDIR (Flow Definition)
  - TFLOW (Flow Details)
  - TFOLN (Flow Destination)

VN01 Objects (Number Range):
  - NRIV (Number Range Interval)
  - NRYR (Fiscal Year Variant)

Customizing Tables:
  - TVARVC (Variables for Customizing)
  - TVARV (Variable Values)
```

---

## Pre-Transport Checklist

Before creating a transport request, verify:

### Configuration Completeness

```
☐ All document types created (VOV8)
  - ZOR (foundational type)
  - ZOP (promotional, if applicable)
  - ZDS (drop-ship, if applicable)
  - ZSO (subscription, if applicable)
  - [Others created]

☐ All item categories configured (VOV7)
  - TAN (standard items) for each doc type
  - TAB (free items) for applicable types
  - TANN (service) for applicable types

☐ All document flows configured (VTFL)
  - Order → Delivery flows
  - Delivery → Invoice flows
  - Direct Order → Invoice flows (if applicable)

☐ All number ranges assigned (VN01)
  - Unique range for each document type
  - Range contains 1000+ numbers minimum
  - Status is ACTIVE
```

### Testing Verification

```
☐ Unit Testing Complete
  - Each transaction tested independently
  - All field validations passed
  - No validation errors

☐ Integration Testing Complete
  - Document flow end-to-end tested
  - Order creation → Delivery → Invoice works
  - Data correctly flows between documents
  - GL posting verified

☐ User Acceptance Testing Complete
  - Business users tested configuration
  - Real scenarios validated
  - UAT sign-off obtained
  - All critical defects resolved
  - Only minor/deferred issues remain

☐ Performance Testing Complete
  - Load tested at 150% of expected peak
  - No performance degradation observed
  - Batch jobs execute within SLA
```

### Documentation Ready

```
☐ Configuration documentation complete
  - VOV8 settings documented with screenshots
  - VOV7 item category mappings documented
  - VTFL flows documented
  - VN01 number ranges documented

☐ User documentation ready
  - Quick reference cards prepared
  - Training materials finalized
  - FAQ prepared
  - Help desk trained

☐ Support documentation ready
  - Troubleshooting guide prepared
  - Escalation procedures defined
  - Support contact list compiled
  - Runbooks created for support team

☐ Change Request prepared
  - CR number obtained
  - CR includes complete change description
  - Business justification documented
  - Risk assessment completed
  - CR approved by CAB (Change Advisory Board)
```

### Sign-Offs Obtained

```
☐ Functional Lead (SD) approval
  - Configuration meets requirements
  - Ready for transport

☐ Quality Assurance approval
  - All tests passed
  - No known issues blocking transport

☐ Business Owner approval
  - Configuration meets business needs
  - Ready for QA deployment

☐ Project Manager approval
  - Timeline on track
  - Resource allocation confirmed
  - Deployment plan ready
```

---

## Creating Transport Requests

### Step 1: Access Transport Tools

**Transaction Code:** SE10 (Workbench Organizer)

```
Command Line: /n SE10
Press: ENTER
```

**Screen Shows:** Transport Organizer with tasks and requests

### Step 2: Create Transport Request

```
Click: "Create Task" button (or press Ctrl+N)

New Transport Request Dialog:

┌─────────────────────────────────────────┐
│ Type of Request:                        │
│   ☐ Customizing Request (Choose this)  │
│   ☐ Workbench Request                  │
│   ☐ Transport of Copies                │
│                                         │
│ Description:                            │
│   [_____________________________]       │
│   Example: "Sales Document Type Config" │
│                                         │
│ Request Description (detailed):         │
│   [_____________________________]       │
│   [_____________________________]       │
│   Example:                              │
│   "Create custom sales order types     │
│   ZOR (base), ZOP (promotional),       │
│   ZDS (drop-ship) for OTC process"     │
│                                         │
│ Target System: [PROD]                  │
│                                         │
│ Create   Cancel                         │
└─────────────────────────────────────────┘
```

**Click:** Create

**Result:** Transport request created with number (e.g., CRXK900123)

### Step 3: Assign Configuration Objects to Request

The transport request now needs to capture which objects were modified.

**If Objects Auto-Captured:**
- Configuration changes from VOV8, VOV7, VTFL are automatically recorded

**Manual Assignment (if needed):**
1. Open the request
2. Click "Append Request"
3. Enter object type and name:
   ```
   Object Type: TVINX (Item Category)
   Object Name: ZOR*
   ```
4. Click "Add"

### Step 4: Document Transport Request

Add detailed notes:

```
Request Number: [CRXK900123]

Contents:
- VOV8: Document type ZOR (custom standard order)
- VOV8: Document type ZOP (promotional)
- VOV8: Document type ZDS (drop-ship)
- VOV7: Item category mappings for ZOR, ZOP, ZDS
- VTFL: Document flows ZOR→LF, ZOP→LF, ZDS→RV
- VN01: Number ranges 05 (ZOR), 06 (ZOP), 07 (ZDS)

Configuration Details:
- ZOR Range: 50000-50999
- ZOP Range: 75000-75999
- ZDS Range: 80000-80999

Testing Status: ✓ Complete - All UAT passed

Risk Level: LOW
- No standard type modifications
- No new transaction codes required
- Configuration only (no ABAP code)

Related Docs:
- CR#: CXXXXXX
- UAT Sign-off: [Attached]
- Configuration Screenshots: [File location]
```

---

## Transport to QA System

### Step 1: Release Transport Request

**In SE10:**

```
1. Find your transport request (e.g., CRXK900123)
2. Select it
3. Click "Release Task" button
4. Confirm release
```

**Result:** Transport request is released and ready for import

### Step 2: Export/Move to QA

**Basis Team Action (contact SAP Basis):**

```
Basis will execute:

1. SE09: View import queue for QA
2. Confirm transport is in queue
3. Execute import to QA system

Typical process:
- Request released in DEV
- Physically copied to file system
- Imported into QA via TMS (Transport Management System)
- Takes 5-15 minutes depending on system load
```

### Step 3: Verify Import in QA

After import, verify configuration in QA:

**Testing Steps:**
```
1. Access QA system
2. Go to VOV8
   - Verify ZOR document type exists
   - Check configuration matches DEV
   
3. Go to VOV7
   - Verify item categories assigned
   - Confirm all mappings present
   
4. Go to VTFL
   - Verify all document flows exist
   - Check flow settings correct
   
5. Go to VN01
   - Verify number ranges created
   - Confirm ranges active
```

**Create Test Order in QA:**
```
Transaction: VA01
1. Create test ZOR order in QA
2. Verify order number from correct range
3. Create delivery (VL01N)
4. Create invoice (VF01)
5. View flow (SD02)
```

### Step 4: QA Sign-Off

Get confirmation from:
- **QA Tester:** "Configuration works correctly in QA"
- **QA Manager:** "Ready for production transport"
- **Business User:** "Tested in QA, confirms meets requirements"

**Document in CR:**
```
CR Status Update: ☐ READY FOR PRODUCTION TRANSPORT

QA Completion Date: [__________]
QA Sign-Off By: [__________]
Issues Found: ☐ NONE  ☐ MINOR (deferred)  ☐ CRITICAL (blocked)
```

---

## Transport to Production

### Pre-Production Transport Checklist

```
☐ QA Testing Complete
  - Configuration verified working in QA
  - Test orders, deliveries, invoices created
  - No blocking issues
  
☐ Business Approval
  - Business owner approved QA results
  - Ready to go live
  
☐ Change Request Approval
  - CAB reviewed and approved transport
  - CR scheduled for production deployment
  - Deployment window confirmed
  
☐ Support Team Ready
  - Help desk trained on new document types
  - Runbooks available
  - Escalation procedures in place
  - On-call support scheduled for go-live
  
☐ Rollback Plan Ready
  - Previous/backup configuration identified
  - Rollback procedures documented
  - Rollback has been tested (in QA)
  
☐ Communication Sent
  - All users informed of changes
  - Training completed
  - Documentation distributed
```

### Step 1: Schedule Production Transport

**Coordinate with SAP Basis:**

```
Provide:
- Transport Request Number: [CRXK900123]
- Desired Deployment Date: [__________]
- Preferred Time: [__________]
  (Typically off-business hours to minimize impact)
- Estimated Duration: [30-45 minutes]
- Rollback Required: Yes (have basis prepare rollback option)

Required Attendees:
☐ SAP Basis Team (performs import)
☐ Configuration Lead (monitors import, validates after)
☐ Help Desk Manager (ready for user issues)
☐ Business Owner (available for sign-off)
☐ Project Manager (tracks go-live)
```

### Step 2: Pre-Deployment Verification

**Day Before Deployment:**

```
1. Verify transport still in DEV (it shouldn't have changed)
   - Access DEV SE10, find your request
   - Note status should be "Released"
   
2. Have basis confirm transport file exists and is ready
   
3. Verify PROD system is stable
   - Check system status
   - No active batch jobs conflicting with import
   
4. Confirm rollback capability exists
   - Basis has backup of PROD table spaces
   - Rollback procedure tested and documented
```

### Step 3: Execute Production Import

**Basis Team Executes:**

```
During Scheduled Maintenance Window:

1. Take backup of PROD system
   - Backup customizing tables
   - Backup number ranges
   
2. Import transport request into PROD
   - Use TMS to import CRXK900123
   - Monitor import log for errors
   
3. Verify Import
   - Check import completed successfully
   - All objects imported
   - No import errors
   
4. Notify Configuration Team
   - Transport import completed
   - System ready for validation
```

### Step 4: Post-Import Validation

**Configuration Lead Executes:**

```
Immediately after import (while still in maintenance window):

1. Verify Document Types (VOV8)
   ☑ ZOR exists
   ☑ ZOP exists (if created)
   ☑ ZDS exists (if created)
   ☑ Configuration matches expectation
   
2. Verify Item Categories (VOV7)
   ☑ TAN assigned to ZOR
   ☑ TAB assigned (if applicable)
   ☑ All mappings correct
   
3. Verify Document Flows (VTFL)
   ☑ ZOR → LF flow exists
   ☑ LF → RV flow exists
   ☑ All flows marked correct
   
4. Verify Number Ranges (VN01)
   ☑ All ranges created
   ☑ All ranges active
   ☑ Starting numbers correct
   
5. Create Validation Order
   - Create test ZOR order (VA01)
   - Verify number from correct range
   - Create delivery
   - Create invoice
   - View flow (SD02)
   
If all checks PASS:
   ☑ Notify basis: "Configuration validated - clear to open system"
   
If any check FAILS:
   ☑ Notify basis: "Configuration error - execute rollback"
   ☑ Document issue for post-rollback investigation
```

### Step 5: Open System for Users

**After Validation Complete:**

```
Basis Team:
1. Open PROD system for user access
2. Notify help desk system is live
3. Monitor system performance

Configuration Team:
1. Send announcement to users:
   "System is now live with new document types.
    Questions? Contact help desk."
2. Monitor for user issues
3. Track issues in help desk system
```

### Step 6: First Day Monitoring

**Support Activities:**

```
First 2 hours (CRITICAL):
- Help desk monitors all ZOR, ZOP, ZDS orders created
- Configuration lead available for immediate escalation
- Monitor for any validation errors
- Watch system performance

First 8 hours (IMPORTANT):
- Continue monitoring order creation
- Track any errors or issues
- Help desk logs issues in ticketing system
- Escalate critical issues immediately

First 24 hours (ONGOING):
- Help desk handles normal volume of questions
- Configuration lead reviews all critical issues
- Monitor batch jobs and overnight processes
- Continue monitoring system performance

First week:
- Daily monitoring of new document type usage
- Help desk tracking of trends (if certain types have issues)
- Proactive monitoring for any edge cases
```

---

## Rollback Procedures

### When to Rollback

Rollback (reverting to previous configuration) if:

```
IMMEDIATE ROLLBACK:
☑ Configuration import failed with errors
☑ Critical functionality broken (orders cannot be created)
☑ Data corruption observed
☑ System crash or severe performance issue
☑ Wrong configuration imported (wrong CR/transport)

CONSIDER ROLLBACK:
☐ Major usability issue affecting majority of users
☐ Significant business process blocked
☐ Data integrity concern

DO NOT ROLLBACK:
☐ Minor UI issues
☐ Single transaction field issue (can be fixed forward)
☐ Edge case affecting small subset of users
☐ Performance acceptable but not perfect
```

### Rollback Decision Process

**Call Decision Meeting:**

```
Participants:
- Configuration Lead
- Basis Manager
- Help Desk Manager
- Business Owner
- Project Manager

Decision Criteria:
1. How many users affected?
2. How critical is the impact?
3. How quickly can we fix forward?
4. Is rollback guaranteed to solve?
5. What's the business impact of rollback?

Decision Options:
☐ ROLLBACK immediately
☐ ROLLBACK and re-deploy (after fix)
☐ CONTINUE and fix forward
☐ DEFER (partial deployment, subset of types)
```

### Execute Rollback

**If Decision is ROLLBACK:**

```
Basis Team Action:
1. Stop users from creating new ZOR orders
   - Temporarily block ZOR type access (optional)
   - Notify help desk to stop accepting new orders
   
2. Execute rollback procedure
   - Restore from backup taken before deployment
   - Import previous transport request (if available)
   - Restore number ranges to previous state
   
3. Verify rollback
   - Confirm old configuration restored
   - Verify old document types functional
   - Create test order with old type to verify
   
4. Bring system back online
   - System ready for users
   - Notify help desk: "System rolled back to previous state"

Impact:
- Any orders created between import and rollback are lost
  (coordinate with help desk to recreate if needed)
- Users may need to re-enter orders
- Help desk fields support calls for this recovery

Timeline: 30-60 minutes for complete rollback
```

### Post-Rollback Actions

```
☐ Root Cause Analysis
  - Why did configuration fail?
  - What was wrong?
  - How do we prevent this next time?
  
☐ Fix Identification
  - Correct the configuration issue
  - Test fix in DEV
  - Test in QA replica
  
☐ Re-planning
  - Plan second deployment attempt
  - Schedule new deployment window
  - Prepare new transport request
  
☐ Communication
  - Send status update to users
  - Explain what happened
  - Set new deployment expectation
```

---

## Post-Deployment Verification

### Immediate Post-Go-Live (Day 1)

```
Morning of Go-Live:

1. Verify users can create orders
   ☐ Test ZOR order creation
   ☐ Test ZOP order creation (if applicable)
   ☐ Test ZDS order creation (if applicable)
   
2. Verify deliveries are created
   ☐ Create test order
   ☐ Automatically propose delivery
   ☐ Verify delivery successfully created
   
3. Verify invoices are created
   ☐ Manually create invoice from delivery
   ☐ Verify amounts correct
   ☐ Verify GL posting correct
   
4. Monitor help desk tickets
   ☐ Watch for incoming issues
   ☐ Track trends (are certain types having issues?)
   ☐ Escalate critical issues
   
5. Check system performance
   ☐ Order creation response time acceptable?
   ☐ Report queries returning in < 10 seconds?
   ☐ No system slowdowns observed?
   
6. Verify batch processes
   ☐ Overnight billing run completed successfully
   ☐ Delivery proposal job worked if scheduled
   ☐ Any scheduled jobs involving document types completed
```

### First Week Post-Go-Live

```
Daily Activities:

1. Monitor order volume
   ☐ Track orders created by type
   ☐ Watch for unusual patterns
   ☐ Confirm volumes normal
   
2. Review help desk tickets
   ☐ Common issues emerging?
   ☐ Training gaps evident?
   ☐ Configuration issues?
   ☐ System performance issues?
   
3. Check data quality
   ☐ Are orders being created with correct data?
   ☐ Are amounts calculating correctly?
   ☐ Are GL postings correct?
   ☐ Any data corruption observed?
   
4. Proactive communication
   ☐ Send daily status update to stakeholders
   ☐ Report any issues and resolutions
   ☐ Confirm system stable

End of Week Review:

1. Gather metrics
   - Total orders created by type
   - Total errors/issues reported
   - Average resolution time
   - User satisfaction feedback
   
2. Address any remaining issues
   - Fix non-critical issues identified
   - Plan enhancements based on feedback
   
3. Sign-off
   - Business owner approves: "Go-live successful"
   - Project declares deployment complete
```

### Monthly Post-Go-Live Monitoring

```
Ongoing Activities:

1. Monitor number range usage
   ☐ ZOR usage level: ____% of range
   ☐ ZOP usage level: ____% of range
   ☐ ZDS usage level: ____% of range
   ☐ Any approaching exhaustion?
   ☐ Plan expansion if needed
   
2. Review process efficiency
   ☐ Are orders being fulfilled faster?
   ☐ Are invoices being generated on time?
   ☐ Any process bottlenecks?
   
3. Monitor system health
   ☐ Performance still acceptable?
   ☐ Any recurring issues?
   ☐ Database size growing as expected?
   
4. Gather user feedback
   ☐ What's working well?
   ☐ What could be improved?
   ☐ Any training refresher needed?
   
5. Document learnings
   ☐ What went well?
   ☐ What could be improved?
   ☐ Recommendations for future projects
```

---

## Troubleshooting

### Transport-Related Issues

#### Issue 1: Transport Request Not Appearing in QA

**Symptom:** Request released in DEV but not visible in QA import queue

**Cause:** 
- Transport file not copied to QA system
- TMS not configured to auto-transport
- Transport sitting in intermediate system

**Solution:**
```
1. Contact SAP Basis team
2. Verify transport file exists on file system
3. Check TMS (Transaction STMS) for system connection
4. Manually import if automatic transport failed
5. Verify import queue in QA (SE09)
```

#### Issue 2: Import Failed with Errors

**Symptom:** Transport import to QA/PROD failed, rollback triggered

**Cause:**
- Objects already exist with different settings
- Customizing tables corrupted
- Authorization issues
- Syntax errors in configuration

**Solution:**
```
1. Check import log (SE09 or basis alert)
2. Identify which objects failed
3. Determine reason (conflict, corruption, etc.)
4. For conflicts: Delete target and re-import
5. For corruption: Restore from backup, retry import
6. For auth issues: Verify basis access rights
7. Create new transport with corrected objects
8. Re-import transport
```

#### Issue 3: Partial Import - Some Objects Failed

**Symptom:** Some objects imported successfully, others failed

**Cause:**
- Dependency issues (object B depends on object A)
- Conflicting configuration
- Selective import attempt

**Solution:**
```
1. Review import log for failed objects
2. Identify any dependencies
3. Manually adjust configuration for failed objects
4. Re-create transport with failed objects only
5. Re-import failed transport
6. Validate all objects now present
```

### Production Deployment Issues

#### Issue 1: Orders Cannot Be Created After Deployment

**Symptom:** Users try to create ZOR order, get error

**Cause:**
- Document type configuration incomplete
- Item categories not mapped
- Number range not active
- Authorization issue

**Solution:**
```
1. Check VOV8: Is ZOR document type active?
2. Check VOV7: Are item categories assigned?
3. Check VN01: Is number range active and not exhausted?
4. Check SE16: Query customizing table to verify data
5. If all look OK: Try creating order in debug mode
6. Clear table cache if needed: SE38 → TCODE /n CCMS
7. If still fails: Rollback and investigate
```

#### Issue 2: Deliveries Not Creating Automatically

**Symptom:** ZOR orders created but VL01N must be used manually

**Cause:**
- Document flow not configured in VTFL
- VTFL flow not marked as "Default"
- Background job not running for auto-proposal
- User authorization doesn't allow auto-creation

**Solution:**
```
1. Verify VTFL: Is ZOR → LF flow configured?
2. Check "Default" and "Significant" flags are set
3. If not: Update VTFL and test again
4. If background job: Check SM36 for job status
5. If auth: Check user's authorization for delivery creation
6. Test creating delivery manually (VL01N) to confirm system works
7. Debug if auto-creation still not working
```

#### Issue 3: Invoices Show Wrong Amount

**Symptom:** Invoice created but amount is incorrect

**Cause:**
- Pricing condition not configured
- Free items not properly marked
- Discount not applied
- Tax calculation error

**Solution:**
```
1. Verify item category flags in VOV7
   - TAN should have "Billable" checked
   - TAB should have "Billable" unchecked
   
2. Check pricing configuration (VK11)
   - Verify condition type assigned
   - Verify price correctly stored
   
3. Check invoice line by line
   - Are free items missing from invoice? (correct)
   - Are amounts correct per item?
   - Is tax calculated correctly?
   
4. Review order vs delivery vs invoice
   - Quantities flow correctly?
   - Prices consistent?
   
5. If still wrong: Recalculate manually and compare
   - If calculation logic is wrong, need pricing rule review
```

---

## Transport & Deployment Checklist

### Pre-Transport
- ☐ All configuration complete (VOV8, VOV7, VTFL, VN01)
- ☐ Unit testing passed
- ☐ Integration testing passed
- ☐ UAT sign-off obtained
- ☐ Change Request approved by CAB
- ☐ Configuration documented with screenshots
- ☐ User documentation prepared
- ☐ Support documentation ready

### Creating Transport
- ☐ SE10 transaction accessed
- ☐ Transport request created
- ☐ All objects included in transport
- ☐ Transport description documented
- ☐ Transport released
- ☐ Transport number recorded: [_________]

### QA Deployment
- ☐ Basis imported to QA
- ☐ QA configuration validated
- ☐ Test orders created successfully
- ☐ Test deliveries created successfully
- ☐ Test invoices created successfully
- ☐ Document flow verified
- ☐ QA sign-off obtained

### Production Deployment
- ☐ Production window scheduled
- ☐ All teams notified
- ☐ Support team on-call
- ☐ Rollback plan documented and tested
- ☐ Basis executes import
- ☐ Configuration validated immediately post-import
- ☐ Test order created
- ☐ System opened for users
- ☐ Help desk monitoring active

### Post-Deployment
- ☐ First day monitoring complete
- ☐ No critical issues
- ☐ Users can create ZOR/ZOP/ZDS orders
- ☐ Deliveries created successfully
- ☐ Invoices created successfully
- ☐ Go-live sign-off obtained
- ☐ Transition to support mode
- ☐ Weekly monitoring scheduled

---

**Document Version:** 1.0  
**Last Updated:** September 4, 2026  
**Classification:** Implementation Guide

*This guide is based on standard SAP transport best practices. Follow your organization's change management process and coordinate with your SAP Basis team for all transport activities.*
