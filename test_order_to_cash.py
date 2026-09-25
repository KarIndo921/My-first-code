import pytest

from order_to_cash import Customer, Product, SalesOrder


def make_order():
    customer = Customer(name="Acme Corp", credit_limit=1000)
    order = SalesOrder(order_id="SO-1", customer=customer)
    order.add_line(Product(sku="FG-100", unit_price=25.0), quantity=4)
    return order, customer


def test_total_value():
    order, _ = make_order()
    assert order.total_value() == 100.0


def test_credit_check_passes_within_limit():
    order, _ = make_order()
    assert order.credit_check() is True


def test_credit_check_fails_over_limit():
    customer = Customer(name="Tight Budget Co", credit_limit=50)
    order = SalesOrder(order_id="SO-2", customer=customer)
    order.add_line(Product(sku="FG-100", unit_price=25.0), quantity=4)
    assert order.credit_check() is False


def test_invoice_raises_when_over_credit():
    customer = Customer(name="Tight Budget Co", credit_limit=50)
    order = SalesOrder(order_id="SO-2", customer=customer)
    order.add_line(Product(sku="FG-100", unit_price=25.0), quantity=4)
    with pytest.raises(ValueError):
        order.invoice()


def test_invoice_updates_outstanding_balance():
    order, customer = make_order()
    order.invoice()
    assert customer.outstanding_balance == 100.0


def test_add_line_rejects_non_positive_quantity():
    order, _ = make_order()
    with pytest.raises(ValueError):
        order.add_line(Product(sku="FG-999", unit_price=10.0), quantity=0)
