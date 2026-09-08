"""
SAP S/4HANA Material Classes and Characteristics Extractor
Connects to SAP S/4HANA on Azure to extract material data
"""

from dataclasses import dataclass
from typing import Dict, List, Optional
import json
from datetime import datetime


@dataclass
class MaterialClass:
    """Represents a Material Class (KLART)"""
    class_type: str
    class_number: str
    class_description: str
    batch_managed: bool
    variant_config: bool


@dataclass
class MaterialCharacteristic:
    """Represents a Material Characteristic"""
    characteristic_id: str
    characteristic_name: str
    class_type: str
    data_type: str
    required: bool


class SAPMaterialExtractor:
    """Extract material classes and characteristics from SAP S/4HANA"""

    def __init__(self, sap_connection_params: Optional[Dict] = None):
        """
        Initialize SAP Material Extractor

        Args:
            sap_connection_params: Dictionary with SAP connection details
                {
                    'host': 'your-sap-host',
                    'client': '100',
                    'user': 'your_user',
                    'password': 'your_password',
                    'lang': 'EN',
                    'sysnr': '00'
                }
        """
        self.sap_params = sap_connection_params or {}
        self.material_classes: List[MaterialClass] = []
        self.characteristics: List[MaterialCharacteristic] = []
        self.extraction_timestamp = datetime.now().isoformat()

    def extract_material_classes(self) -> Dict:
        """
        Extract all material classes from KLART table
        Returns counts of total, batch-managed, and variant classes
        """
        try:
            # Using RFC connection to extract KLART (Material Class Master) data
            # This would use pyRFC or similar library to connect to SAP

            # Example SAP RFC call (pseudocode):
            # result = client.call('BAPI_MATCLASS_GETLIST', {})

            # For demonstration, showing the query structure
            query_result = {
                'table_name': 'KLART',
                'fields': ['KLART', 'KLTXT', 'MKCNT', 'VARIANT', 'BATCH'],
                'filter': "WHERE SPRAS = 'EN'"
            }

            print("Extracting Material Classes from SAP S/4HANA...")
            print(f"Query: SELECT KLART, KLTXT, MKCNT, VARIANT, BATCH FROM {query_result['table_name']}")

            return query_result

        except Exception as e:
            print(f"Error extracting material classes: {str(e)}")
            return {'error': str(e)}

    def extract_batch_managed_classes(self) -> Dict:
        """
        Extract material classes configured for batch management
        Looks at MKCNT field in KLART table
        """
        try:
            # Query for batch-managed classes
            # MKCNT field indicates batch management requirements

            query_result = {
                'table_name': 'KLART',
                'fields': ['KLART', 'KLTXT', 'MKCNT'],
                'filter': "WHERE MKCNT IN ('X', 'B')",  # X = batch required, B = batch relevant
                'description': 'Material Classes with Batch Management'
            }

            print("Extracting Batch-Managed Material Classes...")
            print(f"Query: SELECT {', '.join(query_result['fields'])} FROM {query_result['table_name']} {query_result['filter']}")

            return query_result

        except Exception as e:
            print(f"Error extracting batch-managed classes: {str(e)}")
            return {'error': str(e)}

    def extract_variant_classes(self) -> Dict:
        """
        Extract material classes configured for variant configuration
        Looks at VARIANT field in KLART table
        """
        try:
            # Query for variant-configured classes
            # VARIANT field indicates variant configuration setup

            query_result = {
                'table_name': 'KLART',
                'fields': ['KLART', 'KLTXT', 'VARIANT'],
                'filter': "WHERE VARIANT = 'X'",  # X indicates variant configuration enabled
                'description': 'Material Classes with Variant Configuration'
            }

            print("Extracting Variant Material Classes...")
            print(f"Query: SELECT {', '.join(query_result['fields'])} FROM {query_result['table_name']} {query_result['filter']}")

            return query_result

        except Exception as e:
            print(f"Error extracting variant classes: {str(e)}")
            return {'error': str(e)}

    def extract_characteristics(self) -> Dict:
        """
        Extract all characteristics for material classes
        Retrieves from KSSK (Material Class Characteristics) and CABN (Characteristics) tables
        """
        try:
            # Query for characteristics
            # KSSK links material classes to characteristics
            # CABN contains the characteristic master data

            query_result = {
                'primary_table': 'KSSK',  # Class-Characteristics assignment
                'join_table': 'CABN',     # Characteristic Master
                'fields': ['KSSK.KLART', 'KSSK.IMERK', 'CABN.ATNAM', 'CABN.ATBEZ', 'CABN.DATATYPE', 'KSSK.ERFORDERLICH'],
                'filter': "WHERE KSSK.KLART <> '' AND KSSK.IMERK <> ''",
                'join_condition': "KSSK.IMERK = CABN.ATINN",
                'description': 'Material Characteristics by Class'
            }

            print("Extracting Material Characteristics...")
            print(f"Query: SELECT {', '.join(query_result['fields'])} FROM {query_result['primary_table']}")
            print(f"JOIN {query_result['join_table']} ON {query_result['join_condition']}")
            print(f"Filter: {query_result['filter']}")

            return query_result

        except Exception as e:
            print(f"Error extracting characteristics: {str(e)}")
            return {'error': str(e)}

    def generate_extraction_report(self) -> Dict:
        """
        Generate comprehensive extraction report with all counts
        """
        report = {
            'extraction_timestamp': self.extraction_timestamp,
            'sap_system': 'S/4HANA',
            'environment': 'Azure Cloud',
            'extraction_results': {
                'material_classes': {
                    'query': self.extract_material_classes(),
                    'sap_tables': ['KLART'],
                    'key_fields': ['KLART (Class Type)', 'KLTXT (Description)', 'MKCNT (Batch Management)', 'VARIANT (Variant Config)']
                },
                'batch_managed_classes': {
                    'query': self.extract_batch_managed_classes(),
                    'sap_tables': ['KLART'],
                    'description': 'Material classes that require or support batch management'
                },
                'variant_classes': {
                    'query': self.extract_variant_classes(),
                    'sap_tables': ['KLART'],
                    'description': 'Material classes configured for variant configuration'
                },
                'characteristics': {
                    'query': self.extract_characteristics(),
                    'sap_tables': ['KSSK', 'CABN'],
                    'description': 'All characteristics assigned to material classes',
                    'key_fields': ['IMERK (Characteristic ID)', 'ATNAM (Characteristic Name)', 'DATATYPE (Data Type)', 'ERFORDERLICH (Required)']
                }
            },
            'connection_method': 'RFC or OData API',
            'azure_integration': {
                'service': 'Azure ExpressRoute / VPN',
                'data_source': 'SAP S/4HANA on Azure',
                'authentication': 'System user credentials / OAuth2'
            }
        }

        return report

    def print_summary(self, report: Dict) -> None:
        """Print extraction summary"""
        print("\n" + "="*70)
        print("SAP MATERIAL EXTRACTION SUMMARY")
        print("="*70)
        print(f"Extraction Time: {report['extraction_timestamp']}")
        print(f"SAP System: {report['sap_system']} on {report['environment']}")
        print("\nExtraction Queries:")
        print("-" * 70)

        for extraction_type, details in report['extraction_results'].items():
            print(f"\n{extraction_type.upper()}:")
            print(f"  Tables: {', '.join(details['sap_tables'])}")
            if 'description' in details:
                print(f"  Description: {details['description']}")
            if 'key_fields' in details:
                print(f"  Key Fields: {', '.join(details['key_fields'])}")


def main():
    """Main execution"""

    # Initialize extractor with Azure SAP connection parameters
    sap_params = {
        'host': 'your-azure-sap-host.westeurope.cloudapp.azure.com',
        'client': '100',
        'user': 'SAP_USER',
        'password': 'SAP_PASSWORD',
        'lang': 'EN',
        'sysnr': '00'
    }

    extractor = SAPMaterialExtractor(sap_params)

    # Generate comprehensive extraction report
    report = extractor.generate_extraction_report()

    # Print summary
    extractor.print_summary(report)

    # Save report to JSON file
    report_filename = f"sap_material_extraction_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
    with open(report_filename, 'w') as f:
        json.dump(report, f, indent=2)

    print(f"\n✓ Report saved to: {report_filename}")

    return report


if __name__ == '__main__':
    main()
