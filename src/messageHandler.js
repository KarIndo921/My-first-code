const { LocationSuggestions } = require('./locationData');

class MessageHandler {
  constructor() {
    this.responses = {
      weather: 'The weather in Lonawala is generally pleasant. Monsoon (June-Sept) brings heavy rains, while Oct-May is the best season with cool temperatures.',
      traffic: 'Lonawala is about 1.5 hours from Pune and 2.5 hours from Mumbai. Best to avoid peak hours (weekends & holidays).',
      food: 'Popular local food includes Jaggery, Chikhalwali (local snacks), fresh fruit juices, and authentic Maharashtrian cuisine.',
      adventure: 'Popular adventure activities include trekking, rock climbing, paragliding, and camping.',
      transport: 'You can reach by car, bus, or motorcycle. Public transport (MSRTC) buses are available from Mumbai and Pune.',
      accommodation: 'Lonawala has budget hostels, mid-range hotels, resorts, and luxury properties. Book in advance during peak season.',
      default: 'That\'s an interesting question about Lonawala! Would you like suggestions for locations, maps, or information about beautiful places?'
    };
  }

  async generateResponse(userMessage) {
    const message = userMessage.toLowerCase();

    // Check for specific keywords
    if (message.includes('weather')) {
      return this.responses.weather;
    }
    if (message.includes('traffic') || message.includes('road') || message.includes('travel time')) {
      return this.responses.traffic;
    }
    if (message.includes('food') || message.includes('eat') || message.includes('restaurant')) {
      return this.responses.food;
    }
    if (message.includes('adventure') || message.includes('activity') || message.includes('thing to do')) {
      return this.responses.adventure;
    }
    if (message.includes('transport') || message.includes('reach') || message.includes('travel')) {
      return this.responses.transport;
    }
    if (message.includes('hotel') || message.includes('stay') || message.includes('accommodation')) {
      return this.responses.accommodation;
    }

    // Check for location names
    const searchResult = this.searchForLocation(message);
    if (searchResult) {
      return searchResult;
    }

    // Check for activity-based queries
    const activityResult = this.searchByActivity(message);
    if (activityResult) {
      return activityResult;
    }

    return this.responses.default;
  }

  searchForLocation(query) {
    const results = LocationSuggestions.searchByName(query);
    if (results.length > 0) {
      const location = results[0];
      return `
📍 **${location.name}**
${location.description}

📌 Location: ${location.location}
🏔️ Best Time: ${location.bestTime}
🎯 Activities: ${location.activities.join(', ')}

🗺️ Get Directions: ${location.googleMapsUrl}
      `;
    }
    return null;
  }

  searchByActivity(query) {
    if (query.includes('trek')) {
      const trekLocations = LocationSuggestions.getLocationsByActivity('Trekking');
      return this.formatLocationList('Trekking Locations', trekLocations);
    }
    if (query.includes('waterfall')) {
      const results = LocationSuggestions.getLocationsByActivity('Waterfall');
      return results.length > 0
        ? this.formatLocationList('Waterfall Locations', results)
        : '💧 Tiger\'s Leap is the best waterfall spot, especially during monsoon!';
    }
    if (query.includes('fort')) {
      const forts = LocationSuggestions.getLocationsByActivity('Fort Trek');
      return this.formatLocationList('Fort Locations', forts);
    }
    return null;
  }

  formatLocationList(title, locations) {
    if (locations.length === 0) return null;

    let response = `🎯 **${title}**\n\n`;
    locations.forEach((loc, index) => {
      response += `${index + 1}. **${loc.name}** - ${loc.description}\n`;
      response += `   📍 ${loc.location}\n\n`;
    });
    return response;
  }
}

module.exports = { MessageHandler };
