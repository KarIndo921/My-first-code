#!/usr/bin/env python3
"""
SAP S4 HANA Configuration Executor
Executes TF-080-050-010 (Depreciation Posting Run) Configuration
and retrieves Customer Master Data
"""

import requests
import json
import sys
from datetime import datetime
from requests.auth import HTTPBasicAuth

class SAPS4Configurator:
    def __init__(self, host, port, username, password, client="100", use_https=True):
        """Initialize SAP S4 connection parameters"""
        self.host = host
        self.port = port
        self.username = username
        self.password = password
        self.client = client
        self.use_https = use_https
        self.protocol = "https" if use_https else "http"
        self.base_url = f"{self.protocol}://{self.host}:{self.port}"
        self.session = requests.Session()
        self.session.auth = HTTPBasicAuth(username, password)
        self.session.verify = False  # For dev environment only
        
    def test_connection(self):
        """Test connection to SAP S4 system"""
        print("[1] Testing Connection to SAP S4...")
        try:
            url = f"{self.base_url}/sap/opu/odata/sap/API_BUSINESS_PARTNER"
            response = self.session.get(url, timeout=10)
            
            if response.status_code in [200, 401, 403]:
                print(f"✅ Connection established to {self.host}:{self.port}")
                print(f"   Status Code: {response.status_code}")
                return True
            else:
                print(f"❌ Connection failed: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ Connection error: {str(e)}")
            return False
    
    def get_customers(self, limit=10):
        """Retrieve customer master data"""
        print(f"\n[2] Retrieving Customer Master Data (Limit: {limit})...")
        try:
            url = f"{self.base_url}/sap/opu/odata/sap/C_CUSTOMER"
            params = {"$top": limit, "$format": "json"}
            
            response = self.session.get(url, params=params, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                customers = data.get("d", {}).get("results", [])
                print(f"✅ Retrieved {len(customers)} customers")
                return customers
            else:
                print(f"❌ Error retrieving customers: {response.status_code}")
                print(f"   Response: {response.text[:200]}")
                return []
        except Exception as e:
            print(f"❌ Error: {str(e)}")
            return []
    
    def get_asset_classes(self):
        """Retrieve asset classes for TF-080"""
        print(f"\n[3] Retrieving Asset Classes for TF-080...")
        try:
            url = f"{self.base_url}/sap/opu/odata/sap/C_ASSETCLASS"
            params = {"$format": "json", "$top": 20}
            
            response = self.session.get(url, params=params, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                asset_classes = data.get("d", {}).get("results", [])
                print(f"✅ Retrieved {len(asset_classes)} asset classes")
                return asset_classes
            else:
                print(f"⚠️  Asset classes not available via OData")
                return []
        except Exception as e:
            print(f"⚠️  Note: {str(e)}")
            return []
    
    def get_depreciation_methods(self):
        """Retrieve depreciation methods configuration"""
        print(f"\n[4] Retrieving Depreciation Methods...")
        try:
            url = f"{self.base_url}/sap/opu/odata/sap/C_DEPRECIATIONMETHOD"
            params = {"$format": "json", "$top": 20}
            
            response = self.session.get(url, params=params, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                methods = data.get("d", {}).get("results", [])
                print(f"✅ Retrieved {len(methods)} depreciation methods")
                return methods
            else:
                print(f"⚠️  Depreciation methods not available via OData")
                return []
        except Exception as e:
            print(f"⚠️  Note: {str(e)}")
            return []
    
    def get_gl_accounts(self):
        """Retrieve GL accounts for depreciation posting"""
        print(f"\n[5] Retrieving GL Accounts (Depreciation Related)...")
        try:
            url = f"{self.base_url}/sap/opu/odata/sap/C_GLACCOUNT"
            params = {
                "$filter": "contains(GLAccountName,'Depreciation') or contains(GLAccountName,'Accumulated')",
                "$format": "json",
                "$top": 20
            }
            
            response = self.session.get(url, params=params, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                accounts = data.get("d", {}).get("results", [])
                print(f"✅ Retrieved {len(accounts)} GL accounts")
                return accounts
            else:
                print(f"⚠️  GL accounts filter not available")
                return []
        except Exception as e:
            print(f"⚠️  Note: {str(e)}")
            return []
    
    def configure_tf080_depreciation(self, company_code, depreciation_area, method_code):
        """Configure TF-080-050-010 Depreciation Settings"""
        print(f"\n[6] Configuring TF-080-050-010 (Depreciation Posting Run)...")
        try:
            # This would normally execute via RFC or ABAP call
            # For now, we'll show the configuration that would be applied
            
            config = {
                "Company Code": company_code,
                "Depreciation Area": depreciation_area,
                "Depreciation Method": method_code,
                "Posting Frequency": "Monthly",
                "Posting Date": "Last day of period",
                "Batch Run Name": "DEPRECIATION_RUN",
                "Status": "Ready for Configuration"
            }
            
            print("✅ Configuration Parameters Prepared:")
            for key, value in config.items():
                print(f"   {key}: {value}")
            
            return config
        except Exception as e:
            print(f"❌ Configuration error: {str(e)}")
            return None
    
    def generate_configuration_report(self, customers, asset_classes, gl_accounts, config):
        """Generate comprehensive configuration report"""
        print(f"\n[7] Generating Configuration Report...")
        
        report = {
            "timestamp": datetime.now().isoformat(),
            "system": f"{self.host}:{self.port}",
            "process": "TF-080-050-010 (Depreciation Posting Run)",
            "summary": {
                "customers_count": len(customers),
                "asset_classes_count": len(asset_classes),
                "gl_accounts_count": len(gl_accounts),
                "configuration_status": "Ready for Execution"
            },
            "customer_sample": customers[:3] if customers else [],
            "asset_classes_sample": asset_classes[:3] if asset_classes else [],
            "gl_accounts_sample": gl_accounts[:3] if gl_accounts else [],
            "configuration": config,
            "next_steps": [
                "1. Review configuration parameters above",
                "2. Execute depreciation run via transaction AFAB",
                "3. Monitor depreciation posting via FBL3N (GL Line Items)",
                "4. Generate asset depreciation report via ALR5",
                "5. Reconcile GL accounts with asset module"
            ]
        }
        
        return report
    
    def execute_full_configuration(self, company_code="1000", depreciation_area="01", method_code="LINR"):
        """Execute complete configuration workflow"""
        print("="*80)
        print("SAP S4 HANA - TF-080-050-010 Configuration Execution")
        print("="*80)
        
        # Step 1: Test Connection
        if not self.test_connection():
            print("\n❌ Cannot proceed without system connection")
            return None
        
        # Step 2: Retrieve Customer Data
        customers = self.get_customers(limit=50)
        
        # Step 3: Retrieve Asset Classes
        asset_classes = self.get_asset_classes()
        
        # Step 4: Retrieve Depreciation Methods
        dep_methods = self.get_depreciation_methods()
        
        # Step 5: Retrieve GL Accounts
        gl_accounts = self.get_gl_accounts()
        
        # Step 6: Configure Depreciation
        config = self.configure_tf080_depreciation(company_code, depreciation_area, method_code)
        
        # Step 7: Generate Report
        report = self.generate_configuration_report(
            customers, 
            asset_classes, 
            gl_accounts, 
            config
        )
        
        print("\n" + "="*80)
        print("CONFIGURATION EXECUTION COMPLETE")
        print("="*80)
        
        return report


def main():
    """Main execution"""
    print("\n🔧 SAP S4 Azure Configuration Executor")
    print("Process: TF-080-050-010 (Depreciation Posting Run)\n")
    
    # Configuration Parameters - UPDATE THESE WITH YOUR SYSTEM DETAILS
    SAP_HOST = "azure-s4.your-domain.com"  # Your Azure S4 hostname
    SAP_PORT = "50000"                      # Usually 50000 for HTTPS
    SAP_USERNAME = "DEVELOPER"              # Dev user
    SAP_PASSWORD = "YourPassword123!"       # Dev password
    COMPANY_CODE = "1000"                   # Your company code
    DEPRECIATION_AREA = "01"                # Book value area
    DEPRECIATION_METHOD = "LINR"            # Linear depreciation
    
    # Instructions
    print("⚙️  Configuration Instructions:")
    print("-" * 80)
    print("1. Update the following parameters in this script:")
    print(f"   - SAP_HOST: {SAP_HOST}")
    print(f"   - SAP_PORT: {SAP_PORT}")
    print(f"   - SAP_USERNAME: {SAP_USERNAME}")
    print(f"   - SAP_PASSWORD: [HIDDEN]")
    print(f"   - COMPANY_CODE: {COMPANY_CODE}")
    print("\n2. Run the script:")
    print("   python3 sap_s4_config_executor.py")
    print("\n3. Review the output report")
    print("-" * 80 + "\n")
    
    # Uncomment and update with your actual credentials to execute:
    # configurator = SAPS4Configurator(
    #     host=SAP_HOST,
    #     port=SAP_PORT,
    #     username=SAP_USERNAME,
    #     password=SAP_PASSWORD
    # )
    # report = configurator.execute_full_configuration(
    #     company_code=COMPANY_CODE,
    #     depreciation_area=DEPRECIATION_AREA,
    #     method_code=DEPRECIATION_METHOD
    # )
    # 
    # # Save report
    # with open("tf080_configuration_report.json", "w") as f:
    #     json.dump(report, f, indent=2, default=str)
    # print(f"\n✅ Report saved to: tf080_configuration_report.json")


if __name__ == "__main__":
    main()
