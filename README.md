# Order-to-Cash Sample Project

A tiny, self-contained Python project for learning how to work with Claude Code.
It models a very simplified Order-to-Cash flow: create a sales order, price the
lines, run a credit check against the customer's credit limit, and produce an
invoice.

## Files

- `order_to_cash.py` — the core logic (`Customer`, `Product`, `SalesOrder`)
- `test_order_to_cash.py` — pytest tests covering the main behaviors

## Run it

```bash
python order_to_cash.py
```

## Run the tests

```bash
pip install pytest
pytest -v
```

## Things to try with Claude Code

Use this project to get a feel for how Claude Code works day to day:

1. **Ask questions about the code**: "Walk me through what `credit_check` does."
2. **Ask for a small feature**: "Add support for an order discount percentage
   and update the invoice output to show it."
3. **Ask for a bug fix**: "What happens if `unit_price` is negative? Add
   validation and a test for it."
4. **Ask it to extend the domain**: "Add a `Shipment` step: an order can only
   be invoiced after it has been marked as shipped."
5. **Ask it to run tests**: "Run the test suite and fix anything that fails."
6. **Ask for a refactor**: "Split this into `models.py` and `order_to_cash.py`
   and update imports."

Each time, notice how Claude reads the existing code first, makes a focused
change, and (if you ask) runs the tests to confirm nothing broke — that loop
(read → edit → verify) is the core workflow you'll use on real Deloitte
projects too.
