"""Tiny Order-to-Cash simulator for learning Claude Code.

Models a simplified O2C flow: create a sales order, price it with an
optional discount, ship it, run a credit check, and generate an invoice.
"""

from dataclasses import dataclass, field


@dataclass
class Product:
    sku: str
    unit_price: float


@dataclass
class Customer:
    name: str
    credit_limit: float
    outstanding_balance: float = 0.0

    def available_credit(self) -> float:
        return self.credit_limit - self.outstanding_balance


@dataclass
class OrderLine:
    product: Product
    quantity: int

    def line_total(self) -> float:
        return self.product.unit_price * self.quantity


@dataclass
class SalesOrder:
    order_id: str
    customer: Customer
    lines: list[OrderLine] = field(default_factory=list)
    discount_percent: float = 0.0
    shipped: bool = False

    def add_line(self, product: Product, quantity: int) -> None:
        if quantity <= 0:
            raise ValueError("Quantity must be positive")
        self.lines.append(OrderLine(product, quantity))

    def set_discount(self, percent: float) -> None:
        if not 0 <= percent <= 100:
            raise ValueError("Discount percent must be between 0 and 100")
        self.discount_percent = percent

    def subtotal(self) -> float:
        return sum(line.line_total() for line in self.lines)

    def discount_amount(self) -> float:
        return self.subtotal() * (self.discount_percent / 100)

    def total_value(self) -> float:
        return self.subtotal() - self.discount_amount()

    def credit_check(self) -> bool:
        return self.total_value() <= self.customer.available_credit()

    def ship(self) -> None:
        if not self.lines:
            raise ValueError(f"Order {self.order_id} cannot ship: no order lines")
        self.shipped = True

    def invoice(self) -> str:
        if not self.shipped:
            raise ValueError(f"Order {self.order_id} cannot be invoiced: not yet shipped")
        if not self.credit_check():
            raise ValueError(f"Order {self.order_id} blocked: exceeds available credit")
        self.customer.outstanding_balance += self.total_value()
        lines_text = "\n".join(
            f"  {line.product.sku} x{line.quantity} @ {line.product.unit_price:.2f} = {line.line_total():.2f}"
            for line in self.lines
        )
        discount_text = (
            f"  Discount ({self.discount_percent:.0f}%): -{self.discount_amount():.2f}\n"
            if self.discount_percent
            else ""
        )
        return (
            f"INVOICE for order {self.order_id} ({self.customer.name})\n"
            f"{lines_text}\n"
            f"  Subtotal: {self.subtotal():.2f}\n"
            f"{discount_text}"
            f"  TOTAL: {self.total_value():.2f}"
        )


if __name__ == "__main__":
    customer = Customer(name="Acme Corp", credit_limit=10000)
    order = SalesOrder(order_id="SO-1001", customer=customer)
    order.add_line(Product(sku="FG-100", unit_price=25.5), quantity=10)
    order.add_line(Product(sku="FG-200", unit_price=99.0), quantity=2)
    order.set_discount(10)
    order.ship()

    print(order.invoice())
