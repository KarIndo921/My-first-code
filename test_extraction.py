"""
Test script for SAP Material Extraction
Demonstrates usage and generates sample output
"""

import json
from datetime import datetime
from sap_connector_impl import (
    ConnectionMethod,
    ConnectionConfig,
    SAPExtractionEngine
)


def test_material_extraction_odata():
    """Test extraction using OData connection"""
    print("\n" + "="*70)
    print("TEST: SAP Material Extraction via OData")
    print("="*70)

    # Configuration for OData connection
    config = ConnectionConfig(
        method=ConnectionMethod.ODATA,
        host="sap-prod.westeurope.cloudapp.azure.com",
        port=50000,
        client="100",
        user="EXTRACTION_USER",
        password="SECURE_PASSWORD",
        language="EN",
        sysnr="00",
        azure_resource_group="sap-prod-rg",
        azure_subscription_id="12345678-1234-1234-1234-123456789abc"
    )

    print("\nConnection Configuration:")
    print(f"  Host: {config.host}")
    print(f"  Port: {config.port}")
    print(f"  Client: {config.client}")
    print(f"  Connection Method: {config.method.value.upper()}")
    print(f"  Azure Resource Group: {config.azure_resource_group}")

    return config


def test_material_extraction_rfc():
    """Test extraction using RFC connection"""
    print("\n" + "="*70)
    print("TEST: SAP Material Extraction via RFC")
    print("="*70)

    # Configuration for RFC connection
    config = ConnectionConfig(
        method=ConnectionMethod.RFC,
        host="sap-prod.westeurope.cloudapp.azure.com",
        port=3200,
        client="100",
        user="EXTRACTION_USER",
        password="SECURE_PASSWORD",
        language="EN",
        sysnr="00"
    )

    print("\nConnection Configuration:")
    print(f"  Host: {config.host}")
    print(f"  Port: {config.port}")
    print(f"  Client: {config.client}")
    print(f"  Connection Method: {config.method.value.upper()}")

    return config


def generate_sample_extraction_report() -> dict:
    """Generate sample extraction report for demonstration"""

    report = {
        "extraction_timestamp": datetime.now().isoformat(),
        "sap_system": "S/4HANA",
        "environment": "Azure Cloud",
        "connection_method": "odata",
        "extraction_results": {
            "material_classes": {
                "total_count": 45,
                "description": "All Material Classes (KLART) in the system",
                "sample_data": [
                    {
                        "class_type": "001",
                        "class_description": "Raw Materials",
                        "batch_management": "X",
                        "variant_config": ""
                    },
                    {
                        "class_type": "002",
                        "class_description": "Finished Goods",
                        "batch_management": "",
                        "variant_config": "X"
                    },
                    {
                        "class_type": "003",
                        "class_description": "Components",
                        "batch_management": "X",
                        "variant_config": "X"
                    }
                ]
            },
            "batch_managed_classes": {
                "total_count": 12,
                "description": "Material Classes with Batch Management enabled",
                "batch_indicator_meanings": {
                    "X": "Batch management required",
                    "B": "Batch management relevant",
                    " ": "No batch management"
                },
                "sample_data": [
                    {
                        "class_type": "001",
                        "class_description": "Raw Materials",
                        "batch_indicator": "X"
                    },
                    {
                        "class_type": "003",
                        "class_description": "Components",
                        "batch_indicator": "X"
                    },
                    {
                        "class_type": "005",
                        "class_description": "Chemicals",
                        "batch_indicator": "B"
                    }
                ]
            },
            "variant_classes": {
                "total_count": 18,
                "description": "Material Classes with Variant Configuration",
                "variant_config_meanings": {
                    "X": "Variant configuration enabled",
                    " ": "No variant configuration"
                },
                "sample_data": [
                    {
                        "class_type": "002",
                        "class_description": "Finished Goods",
                        "variant_config": "X"
                    },
                    {
                        "class_type": "003",
                        "class_description": "Components",
                        "variant_config": "X"
                    },
                    {
                        "class_type": "008",
                        "class_description": "Configurable Products",
                        "variant_config": "X"
                    }
                ]
            },
            "characteristics": {
                "total_count": 156,
                "description": "All Characteristics assigned to Material Classes",
                "characteristics_per_class": {
                    "average": 3.5,
                    "minimum": 0,
                    "maximum": 12
                },
                "data_type_breakdown": {
                    "C": 67,  # Character
                    "N": 54,  # Numeric
                    "D": 22,  # Date
                    "T": 13   # Time
                },
                "sample_data": [
                    {
                        "class_type": "001",
                        "characteristic_id": "001",
                        "characteristic_name": "MATERIAL_WEIGHT",
                        "data_type": "N",
                        "required": "X",
                        "description": "Weight of material in kg"
                    },
                    {
                        "class_type": "001",
                        "characteristic_id": "002",
                        "characteristic_name": "MATERIAL_COLOR",
                        "data_type": "C",
                        "required": "",
                        "description": "Color of material"
                    },
                    {
                        "class_type": "002",
                        "characteristic_id": "010",
                        "characteristic_name": "EXPIRATION_DATE",
                        "data_type": "D",
                        "required": "X",
                        "description": "Product expiration date"
                    },
                    {
                        "class_type": "003",
                        "characteristic_id": "025",
                        "characteristic_name": "BATCH_SIZE",
                        "data_type": "N",
                        "required": "X",
                        "description": "Size of production batch"
                    }
                ]
            }
        },
        "summary": {
            "total_material_classes": 45,
            "batch_managed_classes_count": 12,
            "batch_managed_percentage": "26.7%",
            "variant_config_classes_count": 18,
            "variant_config_percentage": "40.0%",
            "total_characteristics": 156,
            "average_characteristics_per_class": 3.5,
            "classes_with_both_batch_and_variant": 6
        },
        "sap_tables_queried": [
            "KLART",  # Material Class Master
            "KSSK",   # Class/Characteristic Assignment
            "CABN"    # Characteristic Master
        ],
        "query_duration_seconds": 2.34,
        "extraction_status": "SUCCESS"
    }

    return report


def display_extraction_summary(report: dict) -> None:
    """Display extraction summary in formatted output"""

    print("\n" + "="*70)
    print("EXTRACTION SUMMARY")
    print("="*70)
    print(f"Extraction Time: {report['extraction_timestamp']}")
    print(f"Status: {report['extraction_status']}")
    print(f"Query Duration: {report['query_duration_seconds']} seconds")

    print("\n" + "-"*70)
    print("MATERIAL EXTRACTION COUNTS")
    print("-"*70)

    summary = report['summary']
    print(f"\n1. Total Material Classes:")
    print(f"   Count: {summary['total_material_classes']}")

    print(f"\n2. Batch-Managed Material Classes:")
    print(f"   Count: {summary['batch_managed_classes_count']}")
    print(f"   Percentage: {summary['batch_managed_percentage']}")

    print(f"\n3. Variant-Configured Material Classes:")
    print(f"   Count: {summary['variant_config_classes_count']}")
    print(f"   Percentage: {summary['variant_config_percentage']}")

    print(f"\n4. Total Characteristics:")
    print(f"   Count: {summary['total_characteristics']}")
    print(f"   Average per Class: {summary['average_characteristics_per_class']}")
    print(f"   Classes with Both Batch & Variant: {summary['classes_with_both_batch_and_variant']}")

    print("\n" + "-"*70)
    print("DATA TYPE BREAKDOWN (Characteristics)")
    print("-"*70)
    for dtype, count in report['extraction_results']['characteristics']['data_type_breakdown'].items():
        type_name = {
            'C': 'Character',
            'N': 'Numeric',
            'D': 'Date',
            'T': 'Time'
        }.get(dtype, dtype)
        print(f"  {type_name} ({dtype}): {count}")

    print("\n" + "-"*70)
    print("SAP TABLES QUERIED")
    print("-"*70)
    for table in report['sap_tables_queried']:
        print(f"  • {table}")


def save_sample_report(report: dict, filename: str = None) -> str:
    """Save sample extraction report to file"""

    if filename is None:
        filename = f"sap_extraction_sample_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"

    with open(filename, 'w') as f:
        json.dump(report, f, indent=2)

    print(f"\n✓ Sample report saved to: {filename}")
    return filename


def main():
    """Run tests and generate sample output"""

    print("\n" + "="*70)
    print("SAP MATERIAL EXTRACTION - TEST SUITE")
    print("="*70)

    # Test 1: OData Configuration
    odata_config = test_material_extraction_odata()

    # Test 2: RFC Configuration
    rfc_config = test_material_extraction_rfc()

    # Generate sample extraction report
    print("\n" + "="*70)
    print("GENERATING SAMPLE EXTRACTION REPORT")
    print("="*70)

    sample_report = generate_sample_extraction_report()

    # Display summary
    display_extraction_summary(sample_report)

    # Save report
    output_file = save_sample_report(sample_report)

    print("\n" + "="*70)
    print("TEST EXECUTION COMPLETED")
    print("="*70)
    print(f"\n✓ Sample extraction report saved to: {output_file}")
    print(f"\nNext Steps:")
    print("  1. Update connection credentials in sap_connector_impl.py")
    print("  2. Uncomment pyrfc dependency in requirements.txt for RFC connections")
    print("  3. Run: python sap_connector_impl.py")
    print("  4. Results will be saved to sap_extraction_*.json")


if __name__ == '__main__':
    main()
