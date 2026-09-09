# Quick Start Guide - Lonawala Location Bot 🚀

## 5-Minute Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your Azure credentials
```

### 3. Run Locally
```bash
npm run dev
```

You'll see:
```
restify listening to http://[::]:3978
```

## Test with Bot Framework Emulator

1. **Download Emulator**: https://aka.ms/botframework-emulator
2. **Open Bot in Emulator**
3. **Enter endpoint**: `http://localhost:3978/api/messages`
4. Click **Connect**

## Test These Commands

| Command | Response |
|---------|----------|
| `Hello` | Warm greeting with options |
| `Suggest me locations` | 3 random recommendations |
| `Show me maps` | Directions to popular spots |
| `What are beautiful places?` | Complete location list |
| `Help` | Available commands guide |
| `Where's Tiger's Leap?` | Specific location details |
| `Best trekking spots?` | Trekking locations list |

## Sample Conversation Flow

```
User: Hi
Bot: 👋 Hello! Welcome to Lonawala Location Bot...

User: Suggest me locations
Bot: 📍 Lonawala Location Suggestions
     [3 interactive location cards with map links]

User: Show me Duke's Nose on map
Bot: 📍 Duke's Nose
     A dramatic mountain cliff offering breathtaking views...
     [Google Maps link]

User: What activities can I do there?
Bot: Popular activities include: Trekking, Photography, Rock Climbing
```

## Deploy to Azure (Next Steps)

### Get Azure Credentials

1. Go to [Azure Portal](https://portal.azure.com)
2. Create **Azure Bot** service
3. Copy **App ID** and **App Password**

### Update .env
```
MicrosoftAppId=your_app_id_here
MicrosoftAppPassword=your_app_password_here
```

### Deploy
```bash
npm install -g azure-cli
az login
az deployment group create --resource-group my-rg --template-file deployment.json
```

## Add to Teams

1. In Azure Bot → Configure
2. Set **Messaging endpoint** to your Azure app URL + `/api/messages`
3. Download the bot
4. Open in Teams → **Add to Teams**

## File Structure Quick Reference

```
src/
├── index.js           → Server setup
├── bot.js             → Message handling logic
├── locationData.js    → 8 Lonawala locations
└── messageHandler.js  → NLP responses
```

## Customize Locations

Edit `src/locationData.js` - Add your own places:

```javascript
{
  id: 9,
  name: "Your Place",
  description: "Description",
  location: "Coordinates",
  bestTime: "Season",
  activities: ['Activity1', 'Activity2'],
  googleMapsUrl: 'https://...'
}
```

## Troubleshooting

**Bot not responding?**
- Is server running? (Look for "listening to http://..." message)
- Try `npm run dev` again

**Can't send messages?**
- Check firewall/proxy settings
- Verify .env credentials
- Check console for errors

**Maps not opening?**
- Check internet connection
- Verify location coordinates

## Next Steps 📚

- ✅ Run locally (Done!)
- 📝 Customize locations
- 🚀 Deploy to Azure
- 🎨 Add custom responses
- 📞 Integrate with other services

## Get Help

- Check full [README.md](./README.md) for detailed docs
- Review code comments in `src/bot.js`
- Check Azure Bot Service docs: https://docs.microsoft.com/en-us/azure/bot-service/

---

**Ready to deploy?** Follow the deployment section in [README.md](./README.md)

Happy bot building! 🤖
