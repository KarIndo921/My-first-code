const locations = [
  {
    id: 1,
    name: "Duke's Nose",
    description: "A dramatic mountain cliff offering breathtaking panoramic views of the surrounding landscape",
    location: "Lonawala, Pune District",
    coordinates: { lat: 18.7464, lng: 73.4120 },
    bestTime: "October to May",
    activities: ['Trekking', 'Photography', 'Rock Climbing'],
    googleMapsUrl: 'https://www.google.com/maps/search/Duke\'s+Nose,+Lonawala/@18.7464,73.4120'
  },
  {
    id: 2,
    name: "Bhaja Caves",
    description: "Ancient Buddhist rock-cut caves dating back to 2nd century BC with intricate carvings",
    location: "Bhaje Village, Lonawala",
    coordinates: { lat: 18.7639, lng: 73.4211 },
    bestTime: "October to March",
    activities: ['Historical Tour', 'Photography', 'Trekking'],
    googleMapsUrl: 'https://www.google.com/maps/search/Bhaja+Caves,+Lonawala/@18.7639,73.4211'
  },
  {
    id: 3,
    name: "Korigad Fort",
    description: "A 17th-century fort with stunning views, perfect for history enthusiasts and trekkers",
    location: "Talegaon, Pune",
    coordinates: { lat: 18.7297, lng: 73.3758 },
    bestTime: "September to May",
    activities: ['Fort Trek', 'History', 'Camping'],
    googleMapsUrl: 'https://www.google.com/maps/search/Korigad+Fort,+Lonawala/@18.7297,73.3758'
  },
  {
    id: 4,
    name: "Rajmachi Fort",
    description: "Twin forts offering an exciting trek with excellent views of surrounding valleys",
    location: "Rajmachi, Lonawala",
    coordinates: { lat: 18.7508, lng: 73.3786 },
    bestTime: "October to May",
    activities: ['Trekking', 'Adventure', 'Photography'],
    googleMapsUrl: 'https://www.google.com/maps/search/Rajmachi+Fort,+Lonawala/@18.7508,73.3786'
  },
  {
    id: 5,
    name: "Tiger's Leap",
    description: "A picturesque waterfall viewpoint offering stunning seasonal waterfall views",
    location: "Lonawala",
    coordinates: { lat: 18.7523, lng: 73.4296 },
    bestTime: "June to September (Monsoon)",
    activities: ['Waterfall Viewing', 'Photography', 'Picnic'],
    googleMapsUrl: 'https://www.google.com/maps/search/Tiger\'s+Leap,+Lonawala/@18.7523,73.4296'
  },
  {
    id: 6,
    name: "Lonavala Lake",
    description: "A scenic lake perfect for boating, picnicking and relaxing with nature",
    location: "Lonawala Town",
    coordinates: { lat: 18.7528, lng: 73.4231 },
    bestTime: "November to February",
    activities: ['Boating', 'Picnic', 'Photography'],
    googleMapsUrl: 'https://www.google.com/maps/search/Lonavala+Lake/@18.7528,73.4231'
  },
  {
    id: 7,
    name: "Aamby Valley",
    description: "A planned resort destination with gardens, entertainment and luxury accommodations",
    location: "Lonawala",
    coordinates: { lat: 18.7442, lng: 73.3974 },
    bestTime: "All Year",
    activities: ['Resort Stay', 'Golf', 'Entertainment'],
    googleMapsUrl: 'https://www.google.com/maps/search/Aamby+Valley,+Lonawala/@18.7442,73.3974'
  },
  {
    id: 8,
    name: "Cardamom Valley",
    description: "A scenic valley with cardamom plantations and beautiful trekking trails",
    location: "Lonawala Ghat",
    coordinates: { lat: 18.7289, lng: 73.4186 },
    bestTime: "October to May",
    activities: ['Trekking', 'Plantation Tour', 'Nature Walk'],
    googleMapsUrl: 'https://www.google.com/maps/search/Cardamom+Valley,+Lonawala/@18.7289,73.4186'
  }
];

class LocationSuggestions {
  static getRandomSuggestions(count = 3) {
    const shuffled = [...locations].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  static getBeautifulPlaces() {
    return locations;
  }

  static getLocationById(id) {
    return locations.find(loc => loc.id === id);
  }

  static searchByName(name) {
    return locations.filter(loc =>
      loc.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  static getLocationsByActivity(activity) {
    return locations.filter(loc =>
      loc.activities.some(act => act.toLowerCase().includes(activity.toLowerCase()))
    );
  }

  static getLocationsByBestTime(season) {
    return locations.filter(loc =>
      loc.bestTime.toLowerCase().includes(season.toLowerCase())
    );
  }
}

module.exports = { LocationSuggestions, locations };
