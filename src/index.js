const dotenv = require('dotenv');
const path = require('path');
const restify = require('restify');
const { BotFrameworkAdapter, ConversationState, MemoryStorage } = require('botbuilder');
const { DialogSet, WaterfallDialog } = require('botbuilder-dialogs');
const { LonawalBot } = require('./bot');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const adapter = new BotFrameworkAdapter({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
});

const memoryStorage = new MemoryStorage();
const conversationState = new ConversationState(memoryStorage);

adapter.onTurnError = async (context, error) => {
  console.error(`\n [onTurnError] unhandled error: ${error}`);
  await context.sendActivity(`Oops! Something went wrong. Please try again.`);
  await conversationState.delete(context);
};

const bot = new LonawalBot(conversationState);

const server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.post('/api/messages', (req, res) => {
  adapter.processActivity(req, res, async (context) => {
    await bot.run(context);
  });
});

server.listen(process.env.PORT || 3978, () => {
  console.log(`\n${ server.name } listening to ${ server.url }`);
  console.log('\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator');
});
