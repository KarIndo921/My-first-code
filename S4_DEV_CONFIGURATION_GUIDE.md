# SAP S4 AZURE Dev Environment - Configuration Execution Guide

## Project: TF-080-050-010 (Depreciation Posting Run Configuration)

**Status**: Ready for Dev Environment Execution  
**Process**: Fixed Asset Accounting - Depreciation Posting Run  
**Environment**: S4 Development Server  
**Date**: 2026-09-08

---

## STEP 1: CONNECTION DETAILS

### Azure S4 Dev System Information
```
System Type: SAP S/4HANA
Landscape: Development (DEV)
Deployment: Microsoft Azure
Protocol: HTTPS (SAP Gateway)
Port: 50000 (default)
```

### Required Connection Parameters
You'll need to provide:
- **System Hostname**: (Your Azure S4 instance URL)
- **Username**: (Dev user account)
- **Password**: (Dev user password)
- **Client**: 100 (development client)
- **Company Code**: 1000 (or your dev company code)

---

## STEP 2: AUTOMATED CONFIGURATION EXECUTION

### Option A: Python Script (Recommended)

**File**: `sap_s4_config_executor.py`

**Setup**:
```bash
# 1. Update credentials in the script
nano sap_s4_config_executor.py

# Find and update these lines:
SAP_HOST = "your-azure-s4-instance.com"
SAP_USERNAME = "DEVELOPER"
SAP_PASSWORD = "your-dev-password"
COMPANY_CODE = "1000"

# 2. Run the script
python3 sap_s4_config_executor.py
```

**What it does**:
✅ Connects to SAP S4 via OData APIs  
✅ Retrieves Customer Master Data  
✅ Retrieves Asset Classes (TF-080)  
✅ Retrieves Depreciation Methods  
✅ Retrieves GL Accounts for depreciation  
✅ Configures TF-080-050-010 parameters  
✅ Generates configuration report  

**Output**: `tf080_configuration_report.json`

---

## STEP 3: MANUAL CONFIGURATION (Transactions)

If you prefer manual configuration, use these SAP transactions:

### Phase 1: Asset Master Setup
```
Transaction: AS01
Purpose: Create Asset Master Records
Config:
  - Asset Class: Building, Equipment, Vehicles
  - Useful Life: Per asset class
  - Salvage Value: Company policy
  - Acquisition Date: Historical data
```

### Phase 2: Depreciation Configuration
```
Transaction: AFABO
Purpose: Create Depreciation Run Batch
Config:
  - Depreciation Area: 01 (Book Value)
  - Posting Period: Monthly (End of month)
  - Test Run First: AVAL transaction
  - Production Run: AFAB transaction
```

### Phase 3: GL Account Setup
```
Transaction: FS00
Purpose: Create/Maintain GL Accounts
Required Accounts:
  - 410000 - Depreciation Expense
  - 120000 - Accumulated Depreciation (Asset side)
  - 120010 - Accumulated Depreciation (Liability side)
```

### Phase 4: Posting Rules
```
Transaction: OAOA
Purpose: Asset/GL Determination
Config:
  - Asset Class → GL Account mapping
  - Depreciation Area → Posting rules
  - Automatic posting activation
```

---

## STEP 4: EXECUTION WORKFLOW

### Pre-Configuration
- [ ] Test connectivity to SAP S4
- [ ] Verify user has authorization (SUIM)
- [ ] Backup configuration (if reconfiguring)
- [ ] Notify team of maintenance window

### Configuration Execution
1. **Run automated script OR execute manual transactions**
   ```
   python3 sap_s4_config_executor.py
   ```

2. **Monitor execution**
   ```
   Check report: tf080_configuration_report.json
   Verify: All data retrieved successfully
   ```

3. **Validate configuration**
   ```
   Transaction AFAB
   - Run depreciation simulation (AVAL first)
   - Verify posting logic
   - Check GL account reconciliation
   ```

### Post-Configuration
- [ ] Review configuration report
- [ ] Execute test depreciation run (AVAL)
- [ ] Verify GL postings (FBL3N)
- [ ] Generate depreciation analysis (ALR5)
- [ ] Document any custom settings
- [ ] Update change log

---

## STEP 5: VERIFICATION CHECKLIST

### Master Data Validation
- [ ] Customer master has required fields
- [ ] Asset classes defined (4+ classes)
- [ ] Depreciation methods configured (3+ methods)
- [ ] GL accounts created and active
- [ ] Company code linked to depreciation area

### Depreciation Run Validation
- [ ] Batch job scheduled (monthly)
- [ ] Posting period configured (end of month)
- [ ] Test run successful (AVAL)
- [ ] GL balancing verified (debit = credit)
- [ ] No error messages in job log

### Reporting Validation
- [ ] Asset ledger reports working (ALR1)
- [ ] Depreciation analysis available (ALR5)
- [ ] GL line items visible (FBL3N)
- [ ] Audit trail complete (AFAR)

---

## STEP 6: TROUBLESHOOTING

### Issue: Connection Timeout
```
Error: HTTPException or timeout
Solution:
  1. Check Azure S4 instance is running
  2. Verify network connectivity
  3. Check firewall/NSG rules
  4. Try via SAP Logon (SAP GUI) first
```

### Issue: Authentication Failed
```
Error: 401 Unauthorized
Solution:
  1. Verify username/password correct
  2. Check user has dev access
  3. Verify SSL certificate (dev may use self-signed)
  4. Check user not locked (SU01)
```

### Issue: Asset Classes Not Retrieved
```
Error: API returns empty results
Solution:
  1. Asset classes may use different API
  2. Try T-code OAOA directly
  3. May require RFC call instead of OData
  4. Check authorization (Asset Accounting)
```

### Issue: Depreciation Run Fails
```
Error: AFAB gives error message
Solution:
  1. Check GL accounts exist and active (FS00)
  2. Verify posting period open (OB52)
  3. Test with smaller asset subset first
  4. Review AFAB job log (SM37)
```

---

## STEP 7: CONFIGURATION DETAILS

### TF-080-050-010 Core Configuration

**Company Code Setup**:
```
Company Code: 1000
Currency: USD (or your currency)
Fiscal Year: Calendar (Jan-Dec)
Depreciation Areas: 01 (Book), 02 (Tax)
```

**Depreciation Methods**:
```
Method LINR - Linear Depreciation
  Formula: Acquisition Value / Useful Life (months)
  Example: $100,000 / 60 months = $1,666.67/month

Method DECL - Declining Balance
  Formula: Net Book Value × Rate
  Example: $100,000 × 20% = $20,000 (Year 1)

Method SUMY - Sum-of-Years
  Formula: (Remaining Years / Sum Years) × Acquisition Value
```

**GL Account Mapping**:
```
Asset Class → GL Account
  Building → 120100 (Accumulated Depreciation)
  Equipment → 120200 (Accumulated Depreciation)
  Vehicles → 120300 (Accumulated Depreciation)
  Other → 120000 (Accumulated Depreciation - General)

Expense Accounts:
  All Classes → 410000 (Depreciation Expense)
```

**Batch Run Schedule**:
```
Run Frequency: Monthly
Run Date: Last business day of month
Run Time: 23:00 (after business hours)
Posting Period: Month/Year of depreciation
Automatic Posting: Yes (after validation)
```

---

## STEP 8: KEY TRANSACTIONS REFERENCE

### Quick Access Commands

**Asset Master**:
- AS01 - Create
- AS02 - Change  
- AS03 - Display
- AS04 - History

**Depreciation Execution**:
- AFAB - Execute Depreciation Run (MAIN)
- AVAL - Simulate Run (Test first!)
- AFAR - Retire Asset
- AFACO - Consistency Check

**Finance Verification**:
- FBL3N - GL Line Items
- F.03 - GL Account Balance
- OFX5 - Reconciliation Cockpit

**Reports**:
- ALR1 - Asset List
- ALR5 - Depreciation Analysis
- SM37 - Job Log (batch jobs)

---

## STEP 9: NEXT STEPS

After Configuration:

1. **Execute First Depreciation Run**
   ```
   Transaction: AFAB
   - Test with AVAL first
   - Review output
   - Verify GL postings
   - Confirm amounts correct
   ```

2. **Schedule Recurring Batch Job**
   ```
   Transaction: SM36
   - Create job step for AFAB
   - Schedule: Last day of month
   - Notification recipient: Finance team
   - Log retention: 30 days
   ```

3. **Setup Monitoring**
   ```
   - Monitor job execution (SM37)
   - Alert if job fails
   - Review GL reconciliation weekly
   - Generate depreciation reports monthly
   ```

4. **User Training**
   ```
   - How to view depreciation results (ALR5)
   - How to investigate variances (ALR1)
   - How to handle exceptions (AFAR)
   - How to verify GL postings (FBL3N)
   ```

---

## SUPPORT & ESCALATION

### L1 - Functional Support
- **Contact**: Finance Team Lead
- **Response Time**: 1 hour
- **Issues**: Depreciation amount questions, GL reconciliation

### L2 - SAP Configuration
- **Contact**: SAP Functional Consultant
- **Response Time**: 4 hours
- **Issues**: Configuration changes, batch job setup

### L3 - Infrastructure
- **Contact**: Azure Support / IT Team
- **Response Time**: 2 hours
- **Issues**: System connectivity, performance

### Critical Issue
- **Contact**: On-Call Support
- **Response Time**: 15 minutes
- **Issues**: System down, batch failures

---

## SIGN-OFF

**Configured By**: Claude Haiku 4.5  
**Date**: 2026-09-08  
**Environment**: S4 Development  
**Process**: TF-080-050-010 (Depreciation Posting Run)  
**Status**: Ready for Execution

---

**Ready to Execute!** Provide your Azure S4 connection details and we can run the configuration immediately.

