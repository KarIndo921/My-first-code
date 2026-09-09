# ⚡ Simple Bot Setup - 5 Minutes!

## No Azure. No Permissions. Just Works! 🎉

---

## 🚀 Quick Start

### Step 1: Get Teams Webhook URL (2 minutes)

1. Open **Microsoft Teams**
2. Find the **channel** where you want the bot
3. Click **⋯ (More options)** → **Connectors**
4. Search: **"Incoming Webhook"**
5. Click **Configure**
6. Give it a name: `Lonawala Bot`
7. Click **Create**
8. **Copy the webhook URL** - Save it somewhere safe

```
Your URL will look like:
https://outlook.webhook.office.com/webhookb2/xxxxx/xxx/xxx
```

---

### Step 2: Set Up Bot (3 minutes)

```bash
# 1. Go to project folder
cd My-first-code

# 2. Create .env file
cat > .env << EOF
WEBHOOK_URL=your_webhook_url_here
PORT=3000
EOF

# 3. Install dependencies
npm install

# 4. Run the bot
node simple-bot.js
```

✅ Bot is now running!

---

## 💬 How to Use in Teams

### In Your Teams Channel:

Just type these commands and **the bot will respond automatically**:

```
@lonawala-bot hello

@lonawala-bot suggest

@lonawala-bot maps

@lonawala-bot places

@lonawala-bot help
```

---

## 📝 Available Commands

| Command | What Bot Does |
|---------|---------------|
| `hello` or `hi` | Send greeting with options |
| `suggest` | Show 3 random location suggestions |
| `maps` | Show direction links to all places |
| `places` or `beautiful` | Show list of all beautiful locations |
| `help` | Show available commands |

---

## 🎯 Example Responses

```
User: @lonawala-bot suggest

Bot: 📍 Lonawala Location Suggestions

1. Duke's Nose
   Dramatic cliff with panoramic views
   📍 Lonawala
   🗺️ [Google Maps]

2. Bhaja Caves
   Ancient Buddhist caves (2nd century BC)
   📍 Lonawala
   🗺️ [Google Maps]

3. Tiger's Leap
   Scenic waterfall viewpoint
   📍 Lonawala
   🗺️ [Google Maps]
```

---

## 🔧 Customization

### Add More Locations

Edit `simple-bot.js`, find the `locations` object:

```javascript
const locations = {
  your_place: {
    name: "Your Place Name",
    desc: "Description here",
    location: "Area",
    map: "https://www.google.com/maps/search/your+place"
  }
};
```

### Change Bot Responses

Find the `handleCommand` function and edit responses.

---

## ❓ Troubleshooting

### Bot not responding in Teams?

**Check these:**

1. **Is bot running?**
   ```bash
   # Terminal should show:
   # 🤖 Lonawala Bot running on port 3000
   ```

2. **Is webhook URL correct?**
   ```bash
   cat .env
   # Should show your webhook URL
   ```

3. **Is webhook still valid?**
   - Go back to Teams Channel → Connectors
   - Check if webhook is still listed
   - Create new one if needed

4. **Try this command:**
   ```bash
   curl -X POST http://localhost:3000
   # Should return: {"status":"Bot is running!"}
   ```

### Webhook URL format wrong?

- Must start with: `https://outlook.webhook.office.com`
- Copy from Teams exactly - don't edit it
- Test with:
   ```bash
   curl -X POST -H 'Content-Type: application/json' \
     -d '{"@type":"MessageCard","@context":"https://schema.org/extensions","summary":"Test","title":"Test Message"}' \
     YOUR_WEBHOOK_URL
   ```

---

## 📍 8 Pre-loaded Locations

Bot comes with these beautiful places:

1. **Duke's Nose** - Dramatic cliff with views
2. **Bhaja Caves** - Ancient Buddhist caves
3. **Tiger's Leap** - Scenic waterfall
4. **Korigad Fort** - 17th-century fort
5. **Rajmachi Fort** - Twin forts trekking
6. **Lonavala Lake** - Boating & picnic spot
7. **Aamby Valley** - Resort destination
8. **Cardamom Valley** - Plantations

---

## 🌐 Keep Bot Running

### Option 1: Keep Terminal Open

```bash
node simple-bot.js
# Keep this terminal window open
# Bot runs while terminal is open
```

### Option 2: Run in Background (Linux/Mac)

```bash
nohup node simple-bot.js > bot.log 2>&1 &
# Bot runs in background
# Check status: tail bot.log
```

### Option 3: Deploy to Free Server

```bash
# Heroku (Free tier closed)
# Railway.app (Simple deploy)
# Render.com (Free tier)
# Glitch.com (Browser-based)
```

---

## ✅ Success Checklist

- [ ] Webhook URL created in Teams
- [ ] Webhook URL added to .env file
- [ ] `npm install` completed
- [ ] `node simple-bot.js` runs without errors
- [ ] Terminal shows "Bot is running"
- [ ] Can type `@lonawala-bot help` in Teams
- [ ] Bot responds with menu

---

## 🎉 You're Done!

Your bot is now active in Teams!

### Next Steps:

- Share webhook with your team
- Add bot to other channels (repeat Step 1)
- Customize locations for your needs
- Deploy to keep it running 24/7

---

## 📚 Files You Need

```
My-first-code/
├── simple-bot.js          ← The bot code
├── .env                   ← Your webhook URL
└── package.json           ← Dependencies
```

---

## 🆘 Still Having Issues?

Check:

1. **Webhook working?**
   ```bash
   curl -X POST -H 'Content-Type: application/json' \
     -d '{"text":"Test"}' \
     YOUR_WEBHOOK_URL
   ```
   Should get response in Teams

2. **Bot running?**
   ```bash
   curl http://localhost:3000
   # Should return: {"status":"Bot is running!"}
   ```

3. **Environment file correct?**
   ```bash
   cat .env
   # Should show WEBHOOK_URL with your actual URL
   ```

---

**Questions?** Check these files in your repo:
- `SIMPLE-BOT-OPTIONS.md` - Compare with other options
- `README.md` - Full documentation

---

**Happy bot building!** 🤖✨

