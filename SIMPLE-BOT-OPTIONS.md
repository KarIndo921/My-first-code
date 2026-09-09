# Simple Lonawala Bot - 3 Easy Options 🤖

Your organization doesn't allow complex Azure setup? **No problem!** Choose one of these simpler solutions:

---

## ✅ OPTION 1: Incoming Webhook (Simplest - 2 minutes)

**What it is:** A simple URL you can POST messages to from Teams

**Setup:**
1. In Teams → Click ⋯ (more) → Connectors
2. Search "Incoming Webhook"
3. Configure → Copy the webhook URL
4. Share this with your team

**How to use:**
```bash
# Send location suggestions to Teams
curl -X POST -H 'Content-Type: application/json' \
  -d '{
    "title": "📍 Beautiful Places in Lonawala",
    "text": "1. Dukes Nose\n2. Bhaja Caves\n3. Tiger's Leap",
    "@type": "MessageCard",
    "@context": "https://schema.org/extensions"
  }' \
  YOUR_WEBHOOK_URL
```

**Pros:**
- ✅ No code needed
- ✅ No deployment
- ✅ 2 minute setup
- ✅ No permissions needed

**Cons:**
- ❌ Bot can't respond to messages
- ❌ One-way communication only

---

## ✅ OPTION 2: Simple Node Bot (10 minutes setup)

**What it is:** A lightweight Node.js bot that runs locally or on any server

**No Azure needed** - works with just a webhook!

### Quick Setup:

```bash
# 1. Copy bot files
npm install

# 2. Create .env file
echo "WEBHOOK_URL=your_incoming_webhook_url" > .env

# 3. Run bot
npm run dev

# 4. Bot is ready!
```

### In Teams:

```
Just type: @lonawala-bot help
Bot responds immediately!
```

**Pros:**
- ✅ Simple setup (10 minutes)
- ✅ Works locally or on any server
- ✅ No Azure account needed
- ✅ Can respond to messages
- ✅ Full location suggestions

**Cons:**
- ⚠️ Needs to keep running on a machine
- ⚠️ Can't be offline

---

## ✅ OPTION 3: Power Automate Flow (15 minutes - No Code!)

**What it is:** Microsoft's visual automation tool - zero coding required

### Flow Steps:

```
1. Trigger: When a message is mentioned in Teams
2. Condition: Check if message contains keywords
   - "suggest locations"
   - "show maps"
   - "beautiful places"
3. Action: Post response with location cards
```

**Setup:**
1. Go to https://make.powerautomate.com
2. Create new "Cloud flow" → Automated
3. Trigger: "When a message is mentioned in a Teams channel"
4. Add actions to post responses
5. Save and enable

**Pros:**
- ✅ No coding at all
- ✅ Uses your Microsoft account (no extra auth)
- ✅ Runs in Microsoft cloud (always on)
- ✅ Visual builder (drag & drop)
- ✅ Works within organization policies

**Cons:**
- ⚠️ Limited customization
- ⚠️ Need to manually build flow
- ⚠️ Responses slower than bot

---

## 🎯 Comparison

| Feature | Webhook | Simple Bot | Power Automate |
|---------|---------|-----------|-----------------|
| Setup Time | 2 min | 10 min | 15 min |
| Responds to Messages | ❌ | ✅ | ✅ |
| Two-Way Chat | ❌ | ✅ | ✅ |
| No Code Needed | ✅ | ❌ | ✅ |
| Always Running | ✅ | ⚠️ (if computer on) | ✅ |
| Needs Azure | ❌ | ❌ | ❌ (just Office 365) |
| Needs Approval | ❌ | ⚠️ (maybe) | ⚠️ (maybe) |

---

## 🚀 My Recommendation

**Start with OPTION 2 (Simple Bot)** because:
- ✅ You can run it on your personal machine
- ✅ No organizational approval needed for deployment
- ✅ Full bot functionality
- ✅ Can be deployed to any server later
- ✅ Same location suggestions & features

**OR use OPTION 3 (Power Automate)** if:
- You want it always running (no personal machine needed)
- Your org allows Power Automate flows
- You want cloud-hosted solution

---

## Which Do You Want?

**Tell me:**
1. Do you have permission to run code on a server/machine?
2. Can you use Power Automate flows in your organization?
3. Do you need the bot responding to messages or just posting updates?

I'll create the exact solution you need! 🎯

