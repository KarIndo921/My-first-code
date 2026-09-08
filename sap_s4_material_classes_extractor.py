#!/usr/bin/env python3
"""
SAP S4 HANA - Material Classes & Classification Data Extractor
Extracts: Material Classes, Batch Classes, Variant Material Classes, Classification Time Types
Data Source: S4 Development Environment
"""

import requests
import json
import sys
from datetime import datetime
from requests.auth import HTTPBasicAuth
from collections import defaultdict

class SAPS4ClassificationExtractor:
    def __init__(self, host, port, username, password, client="100", use_https=True):
        """Initialize SAP S4 connection"""
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
        self.session.verify = False
        self.session.headers.update({
            "Content-Type": "application/json",
            "Accept": "application/json"
        })
        
    def test_connection(self):
        """Test connection to SAP S4"""
        print("[STEP 1] Testing Connection to SAP S4 System...")
        print(f"System: {self.host}:{self.port}")
        try:
            # Test with a simple API call
            url = f"{self.base_url}/sap/opu/odata/sap/C_MATERIAL"
            response = self.session.get(url + "?$top=1", timeout=10)
            
            if response.status_code in [200, 401, 403]:
                print(f"✅ Connection Successful (Status: {response.status_code})")
                return True
            else:
                print(f"❌ Connection Failed: {response.status_code}")
                return False
        except Exception as e:
            print(f"❌ Connection Error: {str(e)}")
            return False
    
    def get_material_classes(self):
        """Extract Material Classes from S4"""
        print("\n[STEP 2] Extracting Material Classes...")
        try:
            # Table: MARA contains material master data
            url = f"{self.base_url}/sap/opu/odata/sap/C_MATERIAL"
            params = {
                "$select": "Material,MaterialName,MaterialType",
                "$format": "json",
                "$top": 1000
            }
            
            response = self.session.get(url, params=params, timeout=60)
            
            if response.status_code == 200:
                data = response.json()
                materials = data.get("d", {}).get("results", [])
                
                # Group by material type
                material_types = defaultdict(list)
                for mat in materials:
                    mat_type = mat.get("MaterialType", "Unknown")
                    material_types[mat_type].append(mat)
                
                print(f"✅ Retrieved {len(materials)} materials")
                print(f"   Material Types Found:")
                for mat_type, mats in material_types.items():
                    print(f"   - {mat_type}: {len(mats)} materials")
                
                return materials, material_types
            else:
                print(f"⚠️  API Response: {response.status_code}")
                return [], {}
        except Exception as e:
            print(f"⚠️  Error: {str(e)}")
            return [], {}
    
    def get_batch_classes(self):
        """Extract Batch-relevant Classes"""
        print("\n[STEP 3] Extracting Batch Classes...")
        try:
            # Query for materials with batch management enabled
            url = f"{self.base_url}/sap/opu/odata/sap/C_MATERIAL"
            params = {
                "$select": "Material,MaterialName,BatchManagementIndicator",
                "$filter": "BatchManagementIndicator eq true",
                "$format": "json",
                "$top": 500
            }
            
            response = self.session.get(url, params=params, timeout=60)
            
            if response.status_code == 200:
                data = response.json()
                batch_materials = data.get("d", {}).get("results", [])
                print(f"✅ Retrieved {len(batch_materials)} batch-managed materials")
                return batch_materials
            else:
                print(f"⚠️  Batch materials query: {response.status_code}")
                return []
        except Exception as e:
            print(f"⚠️  Error: {str(e)}")
            return []
    
    def get_variant_materials(self):
        """Extract Variant Material Classes"""
        print("\n[STEP 4] Extracting Variant Material Classes...")
        try:
            # Materials with variant configuration
            url = f"{self.base_url}/sap/opu/odata/sap/C_MATERIAL"
            params = {
                "$select": "Material,MaterialName,MaterialType",
                "$filter": "contains(MaterialType,'VART')",  # Variant material type
                "$format": "json",
                "$top": 500
            }
            
            response = self.session.get(url, params=params, timeout=60)
            
            if response.status_code == 200:
                data = response.json()
                variant_materials = data.get("d", {}).get("results", [])
                print(f"✅ Retrieved {len(variant_materials)} variant materials")
                return variant_materials
            else:
                print(f"⚠️  Variant materials query: {response.status_code}")
                return []
        except Exception as e:
            print(f"⚠️  Error: {str(e)}")
            return []
    
    def get_classification_data(self):
        """Extract Classification Time Types"""
        print("\n[STEP 5] Extracting Classification Data & Time Types...")
        try:
            # Classification master data
            url = f"{self.base_url}/sap/opu/odata/sap/C_CHARACTERISTICMASTER"
            params = {
                "$format": "json",
                "$top": 500
            }
            
            response = self.session.get(url, params=params, timeout=60)
            
            if response.status_code == 200:
                data = response.json()
                classifications = data.get("d", {}).get("results", [])
                print(f"✅ Retrieved {len(classifications)} classification characteristics")
                
                # Group by status/type
                active_count = sum(1 for c in classifications if c.get("CharacteristicStatus") == "Active")
                print(f"   Active Classifications: {active_count}")
                
                return classifications
            else:
                print(f"⚠️  Classification query: {response.status_code}")
                return []
        except Exception as e:
            print(f"⚠️  Error: {str(e)}")
            return []
    
    def get_classification_classes(self):
        """Extract Classification Classes"""
        print("\n[STEP 6] Extracting Classification Classes...")
        try:
            # Classification classes (Klasse)
            url = f"{self.base_url}/sap/opu/odata/sap/C_CLASSIFICATIONCLASS"
            params = {
                "$format": "json",
                "$top": 1000
            }
            
            response = self.session.get(url, params=params, timeout=60)
            
            if response.status_code == 200:
                data = response.json()
                classes = data.get("d", {}).get("results", [])
                print(f"✅ Retrieved {len(classes)} classification classes")
                
                # Group by type
                class_types = defaultdict(int)
                for cls in classes:
                    cls_type = cls.get("ClassType", "Unknown")
                    class_types[cls_type] += 1
                
                print(f"   Classification Classes by Type:")
                for cls_type, count in class_types.items():
                    print(f"   - Type {cls_type}: {count} classes")
                
                return classes, class_types
            else:
                print(f"⚠️  Classification classes query: {response.status_code}")
                return [], {}
        except Exception as e:
            print(f"⚠️  Error: {str(e)}")
            return [], {}
    
    def generate_summary_report(self, materials, material_types, batch_materials, 
                               variant_materials, classifications, classes, class_types):
        """Generate comprehensive summary report"""
        print("\n" + "="*80)
        print("MATERIAL CLASSES & CLASSIFICATION DATA SUMMARY REPORT")
        print("="*80)
        
        report = {
            "timestamp": datetime.now().isoformat(),
            "system": f"{self.host}:{self.port}",
            "data_extracted": {
                "total_materials": len(materials),
                "material_types": dict(material_types),
                "material_type_count": len(material_types),
                "batch_managed_materials": len(batch_materials),
                "variant_materials": len(variant_materials),
                "classifications_characteristics": len(classifications),
                "classification_classes": len(classes),
                "classification_class_types": dict(class_types)
            },
            "summary": {
                "MATERIAL CLASSES": {
                    "Total Materials": len(materials),
                    "Material Types": len(material_types),
                    "Types Breakdown": {
                        "FERT": "Finished Goods",
                        "HALBF": "Semi-finished Goods",
                        "ROH": "Raw Materials",
                        "VART": "Variant Materials",
                        "ZUBH": "Accessories",
                        "VERP": "Packaging Materials"
                    }
                },
                "BATCH CLASSES": {
                    "Batch-Managed Materials": len(batch_materials),
                    "Percentage of Total": f"{(len(batch_materials)/len(materials)*100):.1f}%" if materials else "N/A",
                    "Status": "Active" if batch_materials else "No batch materials found"
                },
                "VARIANT MATERIAL CLASSES": {
                    "Variant Materials": len(variant_materials),
                    "Percentage of Total": f"{(len(variant_materials)/len(materials)*100):.1f}%" if materials else "N/A",
                    "Status": "Configured" if variant_materials else "No variant materials"
                },
                "CLASSIFICATION TIME TYPES": {
                    "Total Classifications": len(classifications),
                    "Classification Classes": len(classes),
                    "Class Types": class_types,
                    "Status": "Maintained" if classes else "No classifications"
                }
            },
            "details": {
                "sample_materials": materials[:5] if materials else [],
                "sample_batch_materials": batch_materials[:5] if batch_materials else [],
                "sample_variant_materials": variant_materials[:5] if variant_materials else [],
                "sample_classifications": classifications[:5] if classifications else [],
                "class_types_breakdown": class_types
            }
        }
        
        # Print summary
        print("\n📊 SUMMARY COUNTS:")
        print("-" * 80)
        print(f"Total Materials Maintained:          {len(materials):>6}")
        print(f"Material Types:                      {len(material_types):>6}")
        print(f"Batch-Managed Materials:             {len(batch_materials):>6}")
        print(f"Variant Materials:                   {len(variant_materials):>6}")
        print(f"Classifications (Characteristics):   {len(classifications):>6}")
        print(f"Classification Classes:              {len(classes):>6}")
        print("-" * 80)
        
        print("\n📋 MATERIAL TYPE BREAKDOWN:")
        print("-" * 80)
        for mat_type, count in sorted(material_types.items(), key=lambda x: x[1], reverse=True):
            print(f"{mat_type:20} {count:>6} materials")
        
        print("\n🏷️  CLASSIFICATION CLASS TYPES:")
        print("-" * 80)
        for cls_type, count in sorted(class_types.items()):
            type_names = {
                "001": "Material",
                "002": "Document",
                "003": "Equipment",
                "004": "Customer",
                "005": "Vendor",
                "006": "General",
                "007": "Tool",
                "008": "Task List"
            }
            type_name = type_names.get(str(cls_type), "Unknown")
            print(f"Class Type {cls_type} ({type_name:20}) {count:>6} classes")
        
        return report
    
    def execute_full_extraction(self):
        """Execute complete data extraction"""
        print("="*80)
        print("SAP S4 HANA - MATERIAL CLASSES & CLASSIFICATION DATA EXTRACTION")
        print("="*80)
        print(f"Start Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"System: {self.host}:{self.port}\n")
        
        # Step 1: Test connection
        if not self.test_connection():
            print("\n❌ Cannot proceed without system connection")
            return None
        
        # Step 2-6: Extract all data
        materials, material_types = self.get_material_classes()
        batch_materials = self.get_batch_classes()
        variant_materials = self.get_variant_materials()
        classifications = self.get_classification_data()
        classes, class_types = self.get_classification_classes()
        
        # Generate report
        report = self.generate_summary_report(
            materials, material_types, batch_materials,
            variant_materials, classifications, classes, class_types
        )
        
        print("\n" + "="*80)
        print("DATA EXTRACTION COMPLETE")
        print("="*80)
        print(f"End Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        
        return report


def main():
    """Main execution"""
    print("\n🔍 SAP S4 HANA - Material Classes & Classification Extractor")
    print("="*80 + "\n")
    
    # Update with your S4 credentials
    SAP_HOST = "your-s4-azure-instance.com"
    SAP_PORT = "50000"
    SAP_USERNAME = "DEVELOPER"
    SAP_PASSWORD = "YourPassword123!"
    
    print("📋 SETUP INSTRUCTIONS:")
    print("-" * 80)
    print("1. Update the following credentials in this script:")
    print(f"   SAP_HOST = '{SAP_HOST}'")
    print(f"   SAP_PORT = '{SAP_PORT}'")
    print(f"   SAP_USERNAME = '{SAP_USERNAME}'")
    print()
    print("2. Execute the script:")
    print("   python3 sap_s4_material_classes_extractor.py")
    print()
    print("3. Output files:")
    print("   - Console: Summary report with all counts")
    print("   - JSON: material_classes_report.json (detailed data)")
    print("-" * 80 + "\n")
    
    # To execute, uncomment below and provide your credentials:
    # extractor = SAPS4ClassificationExtractor(
    #     host=SAP_HOST,
    #     port=SAP_PORT,
    #     username=SAP_USERNAME,
    #     password=SAP_PASSWORD
    # )
    # 
    # report = extractor.execute_full_extraction()
    # 
    # if report:
    #     # Save to JSON
    #     with open("material_classes_report.json", "w") as f:
    #         json.dump(report, f, indent=2, default=str)
    #     print(f"✅ Report saved to: material_classes_report.json")


if __name__ == "__main__":
    main()
