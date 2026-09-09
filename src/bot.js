const { ActivityHandler, MessageFactory, CardFactory } = require('botbuilder');
const { LocationSuggestions } = require('./locationData');
const { MessageHandler } = require('./messageHandler');

class LonawalBot extends ActivityHandler {
  constructor(conversationState) {
    super();
    this.conversationState = conversationState;
    this.messageHandler = new MessageHandler();

    this.onMessage(async (context, next) => {
      const userMessage = context.activity.text?.toLowerCase().trim();

      if (!userMessage) {
        await next();
        return;
      }

      try {
        if (this.isGreeting(userMessage)) {
          await this.handleGreeting(context);
        } else if (userMessage.includes('suggest') || userMessage.includes('location') || userMessage.includes('place')) {
          await this.handleLocationSuggestion(context);
        } else if (userMessage.includes('map') || userMessage.includes('direction')) {
          await this.handleMapRequest(context);
        } else if (userMessage.includes('beautiful') || userMessage.includes('best')) {
          await this.handleBeautifulPlaces(context);
        } else if (userMessage.includes('help')) {
          await this.handleHelp(context);
        } else {
          await this.handleDefaultMessage(context, userMessage);
        }
      } catch (error) {
        console.error('Error processing message:', error);
        await context.sendActivity('Sorry, I encountered an error. Please try again.');
      }

      await next();
    });

    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      const welcomeText = 'Welcome to Lonawala Location Bot! 🎉\n\nI can help you with:\n- Location suggestions\n- Maps and directions\n- Beautiful places in Lonawala\n\nJust ask me anything about Lonawala!';

      for (let member of membersAdded) {
        if (member.id !== context.activity.recipient.id) {
          await context.sendActivity(welcomeText);
        }
      }

      await next();
    });
  }

  isGreeting(text) {
    const greetings = ['hello', 'hi', 'hey', 'greetings', 'namaste', 'good morning', 'good afternoon', 'good evening'];
    return greetings.some(greeting => text.includes(greeting));
  }

  async handleGreeting(context) {
    const greeting = `👋 Hello! Welcome to Lonawala Location Bot.\n\nI'm here to help you explore beautiful locations around Lonawala. You can ask me:\n- "Suggest me some locations"\n- "Show me the map"\n- "What are beautiful places here?"\n- "How do I reach X location?"\n\nWhat would you like to explore?`;
    await context.sendActivity(greeting);
  }

  async handleLocationSuggestion(context) {
    const suggestions = LocationSuggestions.getRandomSuggestions(3);
    const card = CardFactory.heroCard(
      '📍 Lonawala Location Suggestions',
      'Here are some amazing places you should visit:',
      ['https://via.placeholder.com/300x200?text=Lonawala+Locations'],
      this.buildLocationButtons(suggestions)
    );
    await context.sendActivity(MessageFactory.attachment(card));
  }

  async handleMapRequest(context) {
    const mapCard = CardFactory.heroCard(
      '🗺️ Lonawala Map & Directions',
      'Get directions to popular locations in Lonawala',
      undefined,
      [
        { type: 'openUrl', title: 'View on Google Maps', value: 'https://www.google.com/maps/search/Lonawala,+Maharashtra' },
        { type: 'openUrl', title: 'Duke\'s Nose Direction', value: 'https://www.google.com/maps/search/Duke\'s+Nose,+Lonawala' },
        { type: 'openUrl', title: 'Bhaja Caves Direction', value: 'https://www.google.com/maps/search/Bhaja+Caves,+Lonawala' },
        { type: 'openUrl', title: 'Korigad Fort Direction', value: 'https://www.google.com/maps/search/Korigad+Fort,+Lonawala' }
      ]
    );
    await context.sendActivity(MessageFactory.attachment(mapCard));
  }

  async handleBeautifulPlaces(context) {
    const places = LocationSuggestions.getBeautifulPlaces();
    let response = '✨ **Beautiful Places in Lonawala** ✨\n\n';

    places.forEach((place, index) => {
      response += `${index + 1}. **${place.name}** - ${place.description}\n`;
      response += `   📍 Location: ${place.location}\n`;
      response += `   ⭐ Best Time: ${place.bestTime}\n\n`;
    });

    await context.sendActivity(response);
  }

  async handleHelp(context) {
    const helpText = `
🤖 **Lonawala Location Bot - Help Guide**

Here are the commands I understand:

1. **"Suggest me locations"** - Get personalized location recommendations
2. **"Show me maps"** - Get directions to popular places
3. **"What are beautiful places?"** - See a list of must-visit locations
4. **"Greet me"** - Get a warm welcome
5. **"Help"** - Display this help message

Feel free to ask anything about:
- Popular tourist spots
- Trekking trails
- Restaurants & cafes
- Adventure activities
- Local transportation

How can I help you explore Lonawala? 🎒
    `;
    await context.sendActivity(helpText);
  }

  async handleDefaultMessage(context, userMessage) {
    const response = await this.messageHandler.generateResponse(userMessage);
    await context.sendActivity(response);
  }

  buildLocationButtons(suggestions) {
    return suggestions.map(suggestion => ({
      type: 'openUrl',
      title: `📍 ${suggestion.name}`,
      value: suggestion.googleMapsUrl
    }));
  }
}

module.exports = { LonawalBot };
