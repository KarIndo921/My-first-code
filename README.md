# Lonawala Teams Location Bot 🤖

A Microsoft Teams bot that provides location suggestions, maps, and guidance for exploring beautiful places in Lonawala, India.

## Features 🎯

- **Location Suggestions**: Get random recommendations for beautiful places to visit
- **Map & Directions**: Access Google Maps links to navigate to popular locations
- **Beautiful Places Guide**: Explore a curated list of must-visit locations
- **Interactive Help**: Get information about activities, weather, transportation, and accommodation
- **Smart Message Handling**: Natural language processing for common queries

## Beautiful Locations Included 📍

1. **Duke's Nose** - Dramatic cliff with panoramic views
2. **Bhaja Caves** - Ancient Buddhist rock-cut caves (2nd century BC)
3. **Korigad Fort** - 17th-century fort with stunning views
4. **Rajmachi Fort** - Twin forts with exciting trekking routes
5. **Tiger's Leap** - Scenic waterfall viewpoint
6. **Lonavala Lake** - Perfect for boating and picnicking
7. **Aamby Valley** - Resort destination with entertainment
8. **Cardamom Valley** - Scenic valley with plantations

## Getting Started 🚀

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Microsoft Teams
- Bot Framework Emulator (for testing locally)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd lonawala-teams-location-bot
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Fill in your Azure Bot credentials:
```
MicrosoftAppId=your_app_id
MicrosoftAppPassword=your_app_password
BotOpenIdMetadataUrl=https://login.botframework.com/.well-known/openidmetadata
PORT=3978
```

4. **Start the bot locally**
```bash
npm run dev
```

The bot will be available at `http://localhost:3978`

## Bot Commands 💬

### Greeting
- "Hello" / "Hi" / "Hey"
- Response: Warm welcome with available options

### Location Suggestions
- "Suggest me locations"
- "What places should I visit?"
- "Show me recommendations"
- Response: 3 random location suggestions with maps

### Maps & Directions
- "Show me the map"
- "How do I reach X?"
- "Directions please"
- Response: Interactive cards with Google Maps links

### Beautiful Places
- "What are beautiful places?"
- "Best locations in Lonawala"
- "Popular spots"
- Response: Complete list of all locations with descriptions

### Information Queries
- "What about weather?"
- "How's the traffic?"
- "Where can I eat?"
- "What activities are there?"
- "How do I reach Lonawala?"
- "Where to stay?"

### Help
- "Help" / "?"
- Response: Detailed guide of all available commands

## Architecture 🏗️

```
src/
├── index.js              # Express server & bot adapter setup
├── bot.js               # Main bot logic & message handling
├── locationData.js      # Location database & search utilities
└── messageHandler.js    # NLP for message processing
```

## Project Structure

```
lonawala-teams-location-bot/
├── src/
│   ├── index.js
│   ├── bot.js
│   ├── locationData.js
│   └── messageHandler.js
├── package.json
├── .env.example
└── README.md
```

## Deployment to Azure

### Step 1: Create Bot Resource in Azure

1. Go to [Azure Portal](https://portal.azure.com)
2. Create a new "Azure Bot" resource
3. Get the **App ID** and **App Password**

### Step 2: Update Environment

Add to `.env`:
```
MicrosoftAppId=<your_app_id>
MicrosoftAppPassword=<your_app_password>
```

### Step 3: Deploy to Azure App Service

```bash
# Install Azure CLI
npm install -g azure-cli

# Login to Azure
az login

# Create resource group
az group create --name lonawala-bot-rg --location eastus

# Deploy
az deployment group create --resource-group lonawala-bot-rg --template-file deployment.json
```

### Step 4: Add to Teams

1. Go to Bot Framework Developer Portal
2. Configure messaging endpoint: `https://<your-domain>/api/messages`
3. Download the bot and add to Teams
4. Or use "Add to Teams" button in the Teams App Store

## Extending the Bot 🔧

### Add New Locations

Edit `src/locationData.js`:
```javascript
const locations = [
  {
    id: 9,
    name: "New Place",
    description: "Description here",
    location: "Location details",
    coordinates: { lat: 18.7xxx, lng: 73.4xxx },
    bestTime: "Season",
    activities: ['Activity1', 'Activity2'],
    googleMapsUrl: 'Google Maps URL'
  }
];
```

### Add New Responses

Edit `src/messageHandler.js`:
```javascript
this.responses = {
  ...
  newTopic: 'Your response here'
};
```

### Customize Location Suggestions

Edit `src/locationData.js` class methods:
```javascript
static getRandomSuggestions(count = 3) {
  // Customize suggestion logic
}
```

## Testing 🧪

### Local Testing with Bot Framework Emulator

1. [Download Bot Framework Emulator](https://aka.ms/botframework-emulator)
2. Open Emulator and select "Open Bot"
3. Enter: `http://localhost:3978/api/messages`
4. App ID and Password are optional for local testing

### Testing Commands

```
User: Hello
Bot: [Greeting response]

User: Suggest me locations
Bot: [3 location suggestions]

User: Show me maps
Bot: [Map cards with directions]

User: What are beautiful places?
Bot: [Complete location list]

User: Help
Bot: [Help guide]
```

## Environment Variables 🔐

- `MicrosoftAppId` - Your bot's Microsoft App ID
- `MicrosoftAppPassword` - Your bot's password from Azure
- `BotOpenIdMetadataUrl` - Bot Framework metadata URL (default: official URL)
- `PORT` - Server port (default: 3978)
- `NODE_ENV` - Environment mode (development/production)

## Troubleshooting 🔍

### Bot not responding
- Check if server is running: `npm run dev`
- Verify .env file has correct credentials
- Check Bot Framework Emulator connection

### Messages not processing
- Ensure `MicrosoftAppId` and `MicrosoftAppPassword` are correct
- Check console for error messages
- Verify Teams app is properly configured

### Map links not working
- Check internet connectivity
- Verify location coordinates are correct
- Google Maps URLs should be publicly accessible

## Contributing 📝

To contribute to this project:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Security 🔒

- Never commit `.env` file with credentials
- Store app passwords securely in Azure Key Vault
- Use HTTPS for all communications
- Validate all user inputs

## License 📄

MIT License - Feel free to use for your projects!

## Support 💡

For questions or issues:
- Check the troubleshooting section
- Review Azure Bot Service documentation
- Consult Teams bot development guides

---

**Created by**: Deloitte Consultant
**Last Updated**: September 2026
**Version**: 1.0.0

Happy exploring Lonawala! 🎒🏔️
