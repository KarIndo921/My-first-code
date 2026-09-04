# SAP Sales Document Type Configuration
## Team Training Video Script

**Video Series:** Sales & Distribution Configuration  
**Module:** Custom Document Type Setup  
**Duration:** 5 videos × 8-10 minutes each  
**Target Audience:** SAP users, functional consultants, SD team  

---

## VIDEO 1: Introduction & Concepts (8 minutes)

### Scene 1: Title Card (10 seconds)
```
[SCREEN: Deloitte Logo with dynamic background]
[NARRATION]: "Welcome to the SAP Sales Document Type Configuration series.
In this module, we'll learn how to create custom sales order types
to support your unique business requirements."

[TEXT OVERLAY]:
"SAP Sales Document Types
Copying Standard OR to Custom Types
Part 1: Introduction & Concepts"
```

### Scene 2: What is a Sales Document Type? (1 minute)
```
[NARRATION]: "In SAP Sales & Distribution, a document type is a
classification that defines how orders are processed. The standard
order type is 'OR' - what most companies use for regular sales.

But not all orders are the same. Some might be promotional,
others might be direct shipments, subscriptions, or projects.
That's where custom document types come in."

[VISUAL: Show on-screen examples]
- Standard Order (OR): Regular customer orders
- Promotional Order (ZOP): Campaign orders with discounts
- Drop-Ship (ZDS): Supplier direct to customer
- Subscription (ZSO): Monthly recurring charges
```

### Scene 3: Why Custom Document Types? (2 minutes)
```
[NARRATION]: "Let me show you a real-world scenario. Imagine your company
runs a promotional campaign. You want to give free gifts with orders.
With the standard type, you'd have to:

1. Create the order manually
2. Calculate free items separately
3. Manually adjust billing
4. Track promotions in external systems
5. Create special reports

With a custom type, you:
1. Select type 'ZOP' when creating order
2. System automatically handles free items
3. Billing is automatic (billable items only)
4. Tracking built-in
5. Standard reports show campaign data"

[VISUAL: Side-by-side comparison]
STANDARD APPROACH         vs    CUSTOM TYPE APPROACH
- Manual entry required   →     Automated
- More errors             →     Fewer errors
- Limited reporting       →     Rich analytics
- Time-consuming          →     Efficient
```

### Scene 4: What We'll Cover (1.5 minutes)
```
[NARRATION]: "In this series, we'll walk through the complete configuration:

Video 1: Introduction & Concepts (this one)
Video 2: Creating Your First Document Type in VOV8
Video 3: Item Categories & Document Flow
Video 4: Testing Your Configuration
Video 5: Troubleshooting & Best Practices

Each video includes step-by-step screen captures from SAP so you can
follow along in your own system."

[VISUAL: Animated flowchart showing the 5 videos]
```

### Scene 5: Key Transactions Overview (2 minutes)
```
[NARRATION]: "You'll be working with these SAP transactions:

VOV8: This is where you create and copy document types.
You'll define whether your type is for billing, delivery,
and set up automatic document creation.

VOV7: This defines which item categories can be used with
your document type. For example, which materials are billable,
which are free items, which are services.

VTFL: Document Flow defines what documents come next.
An order leads to a delivery, which leads to an invoice.
This transaction defines that flow.

VN01: Number Range Assignment. Each document type needs
its own number range, like 75000-75999 for promotional orders.

VA01, VL01N, VF01: These are for testing. You'll create
sample orders, deliveries, and invoices to verify everything works."

[VISUAL: Show each transaction screen briefly]
```

### Scene 6: Naming Convention (1 minute)
```
[NARRATION]: "One important rule: SAP lets you create custom codes that
start with Z or Y. Standard types use other letters like OR, LF, RV.

So for custom types, you might create:
ZOP for Promotional Orders
ZDS for Drop-Ship Orders
ZSO for Subscription Orders
ZCO for Cash Sales Orders

This naming convention makes it clear which types are custom
and which are standard."

[VISUAL: Examples on screen]
✓ Correct:    ZOP, ZDS, ZSO, ZCO, ZPO
✗ Incorrect:  OP, DS, SO, CO, PO (too similar to standard)
```

### Scene 7: Key Concepts Summary (2 minutes)
```
[NARRATION]: "Let's summarize the key concepts:

1. DOCUMENT TYPE: The classification (OR, ZOP, ZDS, etc.)
   that defines how an order is processed.

2. ITEM CATEGORY: The type of line item (standard product,
   free item, service) that can be used with each document type.

3. DOCUMENT FLOW: The sequence of documents (order, delivery,
   invoice) that follows automatically based on the type.

4. NUMBER RANGE: The numbering sequence for each document type.
   For example, 75000-75999 for promotional orders.

5. COPYING CONTROL: Rules that determine what data gets
   copied when one document references another (like
   an invoice copying from a delivery).

Understanding these five concepts is key to understanding
document type configuration."

[VISUAL: Animated diagram showing relationships]
```

### Scene 8: What's Next? (30 seconds)
```
[NARRATION]: "In Video 2, we'll get hands-on. We'll open transaction
VOV8 and create your first custom document type by copying
the standard order (OR).

Don't worry if this seems complex - we'll take it step by step.
See you in the next video!"

[TEXT OVERLAY]:
"Up Next: Video 2 - Creating Your First Document Type (VOV8)"
"Ready to continue? Click next →"
```

---

## VIDEO 2: Creating Your First Document Type - VOV8 (10 minutes)

### Scene 1: Getting Started (1 minute)
```
[SCREEN CAPTURE: SAP Login screen]
[NARRATION]: "Let's create your first custom document type. I'll show you
how to copy the standard order type (OR) to create a new one.

First, log into your SAP system and go to the Command Line.
Type VOV8 and press Enter."

[SCREEN SHOWS: SAP command line]
/n VOV8
[PRESS ENTER]
```

### Scene 2: VOV8 Screen Overview (2 minutes)
```
[SCREEN CAPTURE: VOV8 screen with sales document types list]
[NARRATION]: "This is VOV8 - the Sales Document Type configuration screen.
You're looking at a list of all document types in the system.

I can see:
- OR (Standard Order) - this is what we'll copy
- LF (Delivery)
- RV (Invoice)
- QT (Quotation)
- And many others

Notice that standard types use codes like OR, LF, RV.
Our custom type will start with Z.

Let's find the OR row and select it."

[CURSOR MOVES]: Points to OR row
```

### Scene 3: Copying the Standard Order (2 minutes)
```
[SCREEN CAPTURE: OR row highlighted]
[NARRATION]: "Now I'll select the OR row by clicking on it."

[CLICK: OR row is selected]

[NARRATION]: "Perfect. Now I'll copy this document type.
I can either click the Copy button in the toolbar,
or use the keyboard shortcut Ctrl+C."

[CLICK: Copy button in toolbar]

[SCREEN SHOWS: Dialog box appears]
[NARRATION]: "A dialog appears asking for the new document type code.
Let's call our first one ZOR - for custom order.

Note: This is just an example. In the next videos, we'll create
ZOP for promotional, ZDS for drop-ship, and others."

[TYPE: ZOR in the dialog field]
```

### Scene 4: Configuring Basic Information (3 minutes)
```
[SCREEN SHOWS: VOV8 configuration screen for new ZOR type]
[NARRATION]: "Now we're in the configuration screen for our new ZOR type.
Let me walk you through the important fields:

First, we have the Sales Document Type: ZOR
And Description: Custom Standard Order

This clearly identifies what our new type is."

[HIGHLIGHT]: Description field

[NARRATION]: "Next, we have the Category. This should be set to C for Customer.
Since we're copying from OR, this is already set correctly.

Then we have Number Assignment. We need to assign a number range.
We'll cover that in detail in the next video, but basically we're
saying 'orders of type ZOR will be numbered 50000-50999'."

[HIGHLIGHT]: Category field, then Number Assignment field

[NARRATION]: "Now look at these important checkboxes:

Billing Relevant - checked. This means orders of this type
will be billed (you pay for them).

Delivery Relevant - checked. This means orders will lead to deliveries.

Picking Relevant - checked. This means items need to be picked
from warehouse.

These are all correct for a standard order type like ours."

[HIGHLIGHT]: The three checkbox fields

[NARRATION]: "Finally, we have Copy requirements. These define what gets
copied when making new orders. The defaults from OR are fine for now.

Once you've reviewed everything, click Save."

[CLICK]: Save button
```

### Scene 5: What Just Happened (2 minutes)
```
[SCREEN SHOWS: Message 'Document type ZOR created successfully']
[NARRATION]: "Excellent! Your document type is created.

What we just did:
1. Copied the standard order structure (OR)
2. Created a new custom type (ZOR)
3. Set basic configuration
4. Saved it to the system

The document type is now available in the system, but it's not
quite ready to use yet. We need to:

1. Assign a number range (Video 2 continues)
2. Configure item categories (Video 3)
3. Set up document flow (Video 3)
4. Test it (Video 4)

Let's do the number range assignment next."

[TRANSITION]: Screen shows VN01 transaction
```

### Scene 6: Number Range Assignment (2 minutes)
```
[SCREEN CAPTURE: VN01 - Number Range Assignment]
[NARRATION]: "Now we need to assign a number range for our ZOR type.
Type VN01 in the command line to go to number range configuration.

This tells SAP: 'When someone creates a ZOR order, use numbers
from this range - for example, 50000 to 50999'."

[SCREEN SHOWS]: VN01 list of number ranges

[NARRATION]: "I can see various number ranges here.
We need to find the one for sales documents - RV_BELEG.

Let me search for it."

[SEARCH]: Type RV_BELEG

[NARRATION]: "Found it. Now I'll create a new range for our ZOR type.
I'll click 'New Entries' to create a new range."

[CLICK]: New Entries button

[SCREEN SHOWS]: Empty form for new number range

[NARRATION]: "Now I'll fill in:
- Range Number: 05 (unique identifier)
- From Number: 50000 (where our ZOR numbers start)
- To Number: 50999 (where they end)
- Status: Active

This gives us 1000 order numbers for our ZOR type.
That's usually plenty. If we need more, we can expand later."

[FILL IN]: Each field as narrated

[CLICK]: Save

[SCREEN SHOWS]: Message confirming save
[NARRATION]: "Perfect! Our number range is created.

Now when someone creates a ZOR order, it will automatically
get a number between 50000 and 50999."
```

### Scene 7: Verification (1 minute)
```
[NARRATION]: "Let's quickly verify everything worked.
Go back to VOV8 and find our ZOR type."

[SCREEN CAPTURE]: VOV8 with ZOR row visible

[NARRATION]: "There it is - ZOR is now in the system.
The configuration is complete for this transaction.

In the next video, we'll configure item categories (VOV7)
and document flow (VTFL) to finish setting up our document type."

[TEXT OVERLAY]:
"Completed: ✓ Document Type Created (VOV8)
         ✓ Number Range Assigned (VN01)
         
Next Steps: Item Categories (VOV7)
            Document Flow (VTFL)"
```

### Scene 8: Summary & Next Steps (30 seconds)
```
[NARRATION]: "In this video, we learned how to:
- Access VOV8
- Copy a standard document type
- Configure basic information
- Assign a number range
- Verify the setup

In Video 3, we'll configure which item types can be used
with our ZOR document type, and how documents flow from
order to delivery to invoice.

Great job! See you in the next video."
```

---

## VIDEO 3: Item Categories & Document Flow (10 minutes)

### Scene 1: Introduction (1 minute)
```
[NARRATION]: "Welcome to Video 3. In the last video, we created
our ZOR document type and assigned a number range.

Now we need to tell SAP:
1. What types of items can be in a ZOR order
2. What documents come next (the flow)

Let's start with item categories."
```

### Scene 2: Understanding Item Categories (2 minutes)
```
[NARRATION]: "When you create an order, each line has an item.
That item could be:
- A regular product (billable, delivered, picked)
- A free gift (delivered, not billable)
- A service charge (not delivered, but billable)

Item categories define these different types.

The standard ones are:
TAN - Standard items (products you pay for and receive)
TAB - Free items (gifts, no charge)
TANN - Non-stock items (services, rentals)

Each document type must specify which item categories it supports."

[VISUAL]: Show examples of different item types
```

### Scene 3: Configuring VOV7 (3 minutes)
```
[SCREEN CAPTURE]: SAP command line
[NARRATION]: "Let's go to VOV7 to configure item categories.
Type VOV7 in the command line."

/n VOV7
[PRESS ENTER]

[SCREEN SHOWS]: VOV7 Item Category configuration

[NARRATION]: "This screen shows which item categories are assigned
to each document type.

For our ZOR type, we need to assign TAN (standard items).
Since ZOR is similar to the standard OR, we can copy the
item category setup from OR.

Let me click 'New Entries' to add a line for ZOR."

[CLICK]: New Entries

[SCREEN SHOWS]: Empty configuration line

[NARRATION]: "Now I'll fill in:
Sales Doc Type: ZOR
Item Category: TAN

Then I'll check these boxes:
- Billable Item (yes, because these are products we charge for)
- Delivery Relevant (yes, we deliver the products)
- Billing Relevant (yes, we bill for them)
- Picking Relevant (yes, we pick them from warehouse)

Let me fill these in."

[FILL IN & CHECK]: Each field and checkbox

[CLICK]: Save

[NARRATION]: "Done! Now ZOR orders can have standard items.

If we wanted to also support free items (like promotional gifts),
we'd add another line:
Sales Doc Type: ZOR
Item Category: TAB
And uncheck 'Billing Relevant' since free items aren't billed."

[VISUAL]: Show the optional second line
```

### Scene 4: Document Flow Explained (2 minutes)
```
[NARRATION]: "Now let's talk about document flow.
When you create a sales order, what happens next?

Typically:
1. Order is created (type ZOR)
2. Delivery document created (type LF)
3. Invoice document created (type RV)

These are connected in a chain - we call this the document flow.

VTFL (Maintain Document Flow) defines these connections.
Let's look at how to set this up."

[VISUAL]: Show diagram of Order → Delivery → Invoice
```

### Scene 5: Configuring VTFL (3 minutes)
```
[SCREEN CAPTURE]: SAP command line
[NARRATION]: "Type VTFL to access document flow configuration."

/n VTFL
[PRESS ENTER]

[SCREEN SHOWS]: VTFL list of document flows

[NARRATION]: "VTFL shows all the flows in the system.
We can see flows like:
OR → LF (Standard Order to Delivery)
LF → RV (Delivery to Invoice)

For our ZOR type, we need to create similar flows:
ZOR → LF (Custom Order to Delivery)
LF → RV (Delivery to Invoice - this already exists)

Let me create the first one. I'll click 'New Entries'."

[CLICK]: New Entries

[SCREEN SHOWS]: Empty flow configuration

[NARRATION]: "Now I'll configure:
Preceding Document: ZOR (our custom order type)
Subsequent Document: LF (standard delivery type)

Significant: Check this - it means the delivery is required
Default: Check this - it means automatically propose delivery
Copy Requirements: Check this - automatically copy items

Then Save."

[FILL IN & CHECK]: Each field

[CLICK]: Save

[NARRATION]: "Perfect! We've created the flow: ZOR → LF

What this means: When someone creates a ZOR order, they can
automatically create an LF delivery that references it.

Since LF → RV flow already exists in the system, invoices
will automatically be created from deliveries."

[VISUAL]: Show complete flow: ZOR → LF → RV
```

### Scene 6: Verification (1 minute)
```
[NARRATION]: "Let's verify our configurations are complete:

✓ VOV8: Created ZOR document type
✓ VN01: Assigned number range 50000-50999
✓ VOV7: Configured TAN item category for ZOR
✓ VTFL: Set up ZOR → LF document flow

Our custom document type is now fully configured!

Next, we'll create a test order to make sure everything works."
```

### Scene 7: Summary (1 minute)
```
[NARRATION]: "In this video, we:
- Configured item categories (VOV7)
- Set up document flow (VTFL)
- Verified all connections

Your ZOR document type can now handle standard items,
create deliveries automatically, and flow through to invoices.

In Video 4, we'll test our configuration with a real order."
```

---

## VIDEO 4: Testing Your Configuration (8 minutes)

### Scene 1: Test Overview (1 minute)
```
[NARRATION]: "Welcome to Video 4 - Testing. We've created and configured
our ZOR document type. Now let's verify it works!

We'll create a test order, then verify the entire flow:
1. Create order (VA01)
2. Create delivery (VL01N)
3. Create invoice (VF01)
4. View complete flow (SD02)

Let's get started."
```

### Scene 2: Creating a Test Order (3 minutes)
```
[SCREEN CAPTURE]: SAP command line
[NARRATION]: "Let's create our first ZOR order.
Type VA01 - this is the Create Sales Order transaction."

/n VA01
[PRESS ENTER]

[SCREEN SHOWS]: Sales Order creation screen

[NARRATION]: "When the screen opens, you'll see fields for:
Sales Organization
Distribution Channel
Division
And Sales Document Type

Select your Sales Document Type as ZOR.

Then enter:
- Bill-to Party (a customer number)
- Ship-to Party (where it ships)
- Item details (material number, quantity)

Let me fill these in."

[FILL IN]: Shows example data being entered

[NARRATION]: "Good. Now I have a ZOR order with one line item.
Let me save this order."

[CLICK]: Save (Ctrl+S)

[SCREEN SHOWS]: Message showing order created
[NARRATION]: "Excellent! Order ZOR50000 created successfully.
It got a number from our configured range (50000-50999).

Notice the status shows 'Open' - meaning it's waiting for delivery."

[HIGHLIGHT]: Order number and status
```

### Scene 3: Creating Delivery (2 minutes)
```
[NARRATION]: "Now let's create a delivery for this order.
Type VL01N to create a delivery."

/n VL01N
[PRESS ENTER]

[SCREEN SHOWS]: Create Delivery screen

[NARRATION]: "In VL01N, I'll reference my ZOR order.
The system will automatically pull in the order details."

[FILL IN]: Order reference shows ZOR50000

[NARRATION]: "Perfect! The items from my ZOR order appear here.
Now I'll save this delivery."

[CLICK]: Save

[SCREEN SHOWS]: Message 'Delivery LF created'

[NARRATION]: "Great! Delivery LF100000 created.
Our document flow is working:
ZOR50000 → LF100000

Now let's go back to the order and confirm the status changed."

[GO TO]: Display ZOR order
[SCREEN SHOWS]: Order status now 'Delivered' or 'Partially Delivered'
```

### Scene 4: Creating Invoice (2 minutes)
```
[NARRATION]: "Finally, let's create an invoice for our delivery.
Type VF01 to create a billing document."

/n VF01
[PRESS ENTER]

[SCREEN SHOWS]: Create Billing Document screen

[NARRATION]: "I'll reference my delivery LF100000.
The system pulls in delivery details and calculates the invoice amount."

[FILL IN]: Delivery reference

[NARRATION]: "Everything looks correct. The invoice will include:
- The item we ordered
- The quantity delivered
- The price per unit
- Total amount

Let me save."

[CLICK]: Save

[SCREEN SHOWS]: Message 'Invoice RV created'

[NARRATION]: "Perfect! Invoice RV200000 created.

Now our complete flow is working:
ZOR50000 (Order) → LF100000 (Delivery) → RV200000 (Invoice)

This is exactly what we configured!"
```

### Scene 5: Viewing the Complete Flow (1 minute)
```
[NARRATION]: "Let's see the complete flow in one view.
Type SD02 to see a list of orders."

/n SD02
[PRESS ENTER]

[SCREEN SHOWS]: Sales order list

[NARRATION]: "I'll find and select my ZOR50000 order."

[SEARCH & SELECT]: ZOR50000 order

[NARRATION]: "Now I'll view the Document Flow.
Click on the order and select Document Flow from the menu."

[CLICK]: Document Flow menu

[SCREEN SHOWS]: Complete flow diagram
[NARRATION]: "Look at this! All three documents visible:
- ZOR50000 (Order) at the top
- LF100000 (Delivery) in the middle
- RV200000 (Invoice) at the bottom

This confirms our configuration is working perfectly!
The document types are connected correctly.
Items flowed through properly.
Billing amount is correct."
```

### Scene 6: What This Means (1 minute)
```
[NARRATION]: "What we've just proven:

✓ Document type ZOR works
✓ Orders can be created with proper numbering
✓ Deliveries automatically reference the order
✓ Invoices automatically reference the delivery
✓ Document flow is complete and correct
✓ Billing amount calculated properly

Your configuration is ready for production!"
```

---

## VIDEO 5: Troubleshooting & Best Practices (9 minutes)

### Scene 1: Common Issues (4 minutes)
```
[NARRATION]: "In this final video, let's cover some things that could
go wrong and how to fix them.

Issue 1: 'Document type ZOR not found in dropdown'
This usually means:
- Document type wasn't created in VOV8
- User doesn't have authorization
- Cache needs refresh

Solution: Go back to VOV8, verify ZOR exists.
If it's not there, create it. If it is, press Ctrl+Shift+F5 to
refresh your cache, then try again."

[SCREEN SHOWS]: VOV8 screen, then cache refresh

[NARRATION]: "Issue 2: 'Cannot create delivery - no item category assigned'
This means we forgot to configure VOV7.

Solution: Go to VOV7, add the item category mapping for ZOR."

[SCREEN SHOWS]: VOV7 configuration

[NARRATION]: "Issue 3: 'Cannot create invoice from delivery'
This usually means the document flow isn't set up.

Solution: Go to VTFL, verify the LF → RV flow exists and
is marked as 'Default' and 'Significant'."

[SCREEN SHOWS]: VTFL screen

[NARRATION]: "Issue 4: 'Number range exhausted'
This means you've used all numbers in your range.

Solution: Go to VN01, expand the 'To Number' to a higher value.
For example, change 50999 to 60999."

[SCREEN SHOWS]: VN01 number range expansion
```

### Scene 2: Performance Considerations (2 minutes)
```
[NARRATION]: "A few things to watch for performance:

1. Don't create unnecessary custom document types.
   Each one adds complexity to the system.

2. Test with realistic data volumes.
   Make sure your configuration handles 100+ orders per day.

3. Monitor number range usage.
   Don't let it get near exhaustion - expand proactively.

4. Clean up test data before production.
   Remove test orders, deliveries, invoices from DEV before
   moving to PROD.

5. Schedule number range monitoring reports.
   Check monthly to see usage trends."

[VISUAL]: Show monitoring dashboard example
```

### Scene 3: Best Practices (2 minutes)
```
[NARRATION]: "Here are the best practices we recommend:

1. NAMING: Use clear, descriptive codes for your document types.
   ZOP = Promotional Order (not Z01 or PROMO)

2. DOCUMENTATION: Document why you created each type.
   What business need does it fulfill?

3. TRAINING: Make sure your users understand the different types.
   Consider color-coding them in printouts.

4. TESTING: Always test in DEV and QA before production.
   Test with real data, not just single items.

5. MONITORING: After go-live, check daily for issues.
   Have someone monitoring orders for the first week.

6. SUPPORT: Make sure help desk is trained on new types.
   Create a FAQ for common questions.

7. CONSISTENCY: Don't let users accidentally use wrong types.
   Consider restricting document type selection by user role."

[VISUAL]: Show best practices checklist
```

### Scene 4: Support Resources (1 minute)
```
[NARRATION]: "Remember, you have resources available:

- Configuration Guide: Detailed reference document
- Quick Reference Card: Handy lookup for transactions
- Help Desk: For user questions
- Consulting Team: For complex issues

Don't hesitate to reach out if you have questions."

[SCREEN SHOWS]: Support contact information
```

### Scene 5: Final Summary (1 minute)
```
[NARRATION]: "Let's recap what we've covered in this series:

Video 1: Introduction & key concepts
Video 2: Creating your document type (VOV8)
Video 3: Item categories & document flow (VOV7, VTFL)
Video 4: Testing your configuration
Video 5: Troubleshooting & best practices

You now have the knowledge to:
✓ Copy standard SAP document types
✓ Create custom document types for your business
✓ Configure item categories and document flows
✓ Test your setup thoroughly
✓ Support your users

Great job completing this training series!"

[TEXT OVERLAY]:
"Questions? Contact your SAP Support Team
Documentation available: SAP_Sales_Document_Type_Configuration_Guide.md"
```

---

## ADDITIONAL RESOURCES

### Training Video Production Notes

**Video Length:** 5 × 8-10 minutes = 40-50 minutes total

**Production Requirements:**
- Screen recording software (Camtasia, Adobe Captivate, etc.)
- SAP test system with demo data
- Microphone for narration
- Video editing software
- Graphics for diagrams

**Recommended Pacing:**
- 30 seconds per screenshot
- 2-3 seconds for screen transitions
- Clear narration at moderate speed

**Accessibility:**
- Include captions/subtitles for hearing-impaired
- Use high-contrast screen displays
- Pause between complex sections
- Repeat key points

### Video Script Customization

**For Your Organization:**
- Replace example order types with your actual types (ZOP, ZDS, etc.)
- Use your actual number ranges (not 50000-50999)
- Include your company branding/logos
- Reference your actual SAP system names
- Insert real process screenshots
- Add your support team contact info

### Distribution

**Video Hosting:**
- Internal training portal / LMS
- SharePoint / Teams channel
- YouTube (private channel)
- SAP Training eLearning

**Complementary Materials:**
- Quick reference card (print or PDF)
- Configuration guide (reference)
- FAQ document
- Feedback survey

### Follow-Up Actions

**After Video Training:**
1. Email: Confirm completion checklist to each user
2. Quiz: Brief assessment of key concepts (optional)
3. Office Hours: Q&A session with SAP team
4. Support: Help desk availability for follow-up questions
5. Feedback: Survey to gather training effectiveness

---

**Video Script Version:** 1.0  
**Format:** Detailed script with narration, screen instructions, and visual notes  
**Estimated Production Time:** 40-60 hours (scripting, recording, editing)  
**Target Completion:** 2-3 weeks with dedicated producer

*All screen captures are based on standard SAP SD module. Actual screens may vary slightly depending on your SAP version and customization.*
