// ✨ SIMPLE LONAWALA BOT - No Azure Needed!
// Just provide your Teams Webhook URL in .env

const http = require('http');
require('dotenv').config();

const locations = {
  dukes_nose: {
    name: "Duke's Nose",
    desc: "Dramatic cliff with panoramic views",
    location: "Lonawala",
    map: "https://www.google.com/maps/search/Duke's+Nose,+Lonawala"
  },
  bhaja_caves: {
    name: "Bhaja Caves",
    desc: "Ancient Buddhist caves (2nd century BC)",
    location: "Lonawala",
    map: "https://www.google.com/maps/search/Bhaja+Caves,+Lonawala"
  },
  tiger_leap: {
    name: "Tiger's Leap",
    desc: "Scenic waterfall viewpoint",
    location: "Lonawala",
    map: "https://www.google.com/maps/search/Tiger's+Leap,+Lonawala"
  },
  korigad_fort: {
    name: "Korigad Fort",
    desc: "17th-century fort with stunning views",
    location: "Talegaon",
    map: "https://www.google.com/maps/search/Korigad+Fort,+Lonawala"
  },
  rajmachi_fort: {
    name: "Rajmachi Fort",
    desc: "Twin forts perfect for trekking",
    location: "Lonawala",
    map: "https://www.google.com/maps/search/Rajmachi+Fort,+Lonawala"
  }
};

// Send message to Teams
function sendToTeams(message) {
  if (!process.env.WEBHOOK_URL) {
    console.log('No webhook URL. Message:', message);
    return;
  }

  const https = require('https');
  const url = new URL(process.env.WEBHOOK_URL);

  const data = JSON.stringify(message);

  const options = {
    hostname: url.hostname,
    port: 443,
    path: url.pathname + url.search,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = https.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
  });

  req.on('error', (error) => console.error('Error:', error));
  req.write(data);
  req.end();
}

// Format response for Teams
function formatTeamsMessage(title, text, color = '#0078D4') {
  return {
    "@type": "MessageCard",
    "@context": "https://schema.org/extensions",
    "summary": title,
    "themeColor": color,
    "title": title,
    "sections": [{
      "text": text,
      "markdown": true
    }]
  };
}

// Get random locations
function getRandomLocations(count = 3) {
  const keys = Object.keys(locations);
  const result = [];
  for (let i = 0; i < count && keys.length > 0; i++) {
    const idx = Math.floor(Math.random() * keys.length);
    result.push(locations[keys[idx]]);
    keys.splice(idx, 1);
  }
  return result;
}

// Handle user commands
function handleCommand(command) {
  const cmd = command.toLowerCase().trim();

  if (cmd.includes('hello') || cmd.includes('hi')) {
    return formatTeamsMessage(
      '👋 Welcome to Lonawala Location Bot!',
      'I can help you explore Lonawala! Try:\n\n' +
      '• `suggest` - Get location suggestions\n' +
      '• `maps` - Get directions\n' +
      '• `places` - See all beautiful places\n' +
      '• `help` - Show this message'
    );
  }

  if (cmd.includes('suggest')) {
    const locs = getRandomLocations(3);
    let text = '📍 **Suggested Locations:**\n\n';
    locs.forEach((loc, i) => {
      text += `${i + 1}. **${loc.name}**\n` +
              `   ${loc.desc}\n` +
              `   📍 ${loc.location}\n` +
              `   🗺️ [Google Maps](${loc.map})\n\n`;
    });
    return formatTeamsMessage('🎯 Lonawala Location Suggestions', text, '#107C10');
  }

  if (cmd.includes('maps') || cmd.includes('direction')) {
    let text = '🗺️ **Popular Locations - Get Directions:**\n\n';
    Object.values(locations).forEach((loc) => {
      text += `• [${loc.name}](${loc.map})\n`;
    });
    return formatTeamsMessage('Map Links', text, '#0078D4');
  }

  if (cmd.includes('places') || cmd.includes('beautiful')) {
    let text = '✨ **Beautiful Places in Lonawala:**\n\n';
    Object.values(locations).forEach((loc, i) => {
      text += `${i + 1}. **${loc.name}**\n   ${loc.desc}\n\n`;
    });
    return formatTeamsMessage('Beautiful Places', text, '#FFB900');
  }

  if (cmd.includes('help')) {
    return formatTeamsMessage(
      '📚 Lonawala Bot Help',
      '**Available Commands:**\n\n' +
      '• `Hello` - Get greeting\n' +
      '• `Suggest` - Random location suggestions\n' +
      '• `Maps` - Get direction links\n' +
      '• `Places` - All beautiful places\n' +
      '• `Help` - This message\n\n' +
      'Just mention the bot with any command!'
    );
  }

  // Default response
  return formatTeamsMessage(
    '🤖 Lonawala Location Bot',
    'I didn\'t understand that command.\n\n' +
    'Try: **suggest**, **maps**, **places**, or **help**'
  );
}

// Simple HTTP server (optional - for testing without webhook)
const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const command = data.text || 'help';
        const response = handleCommand(command);
        sendToTeams(response);
        res.writeHead(200);
        res.end('OK');
      } catch (e) {
        res.writeHead(400);
        res.end('Error');
      }
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'Bot is running!' }));
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🤖 Lonawala Bot running on port ${PORT}`);
  console.log('For Teams integration, set WEBHOOK_URL in .env');
});

module.exports = { handleCommand, sendToTeams };
