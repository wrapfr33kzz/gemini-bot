// Import required modules
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Your Telegram bot token from BotFather
const token = '7566005560:AAF_wJ6m08DKHyc_W0WteTu-hPlgrk__AIg';

// Create a new Telegram bot instance
const bot = new TelegramBot(token, { polling: true });

// Gemini API base URL
const geminiAPI = 'https://dev-the-dark-lord.pantheonsite.io/wp-admin/js/Apis/Gemini.php';

// Shinobu Kocho's image URL
const shinobuImageUrl = 'https://i.pinimg.com/736x/e4/61/5c/e4615cec0e441309da374106183f0b23.jpg';

// Function to query the Gemini API
const getGeminiResponse = async (message) => {
  try {
    // Construct the full API URL with the user's message
    const url = `${geminiAPI}?message=${encodeURIComponent(message)}`;

    // Send GET request to the API
    const response = await axios.get(url);

    // Return the response data from Gemini API
    return response.data;
  } catch (error) {
    console.error('Error querying Gemini API:', error.message);
    return 'Sorry, I couldn\'t connect to the Gemini API right now. Please try again later.';
  }
};

// Handle incoming messages from Telegram users
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text;

  // Acknowledge receipt of the user's message
  await bot.sendMessage(chatId, 'Thinking...');

  // Send the image of Shinobu Kocho
  await bot.sendPhoto(chatId, shinobuImageUrl, { caption: 'Here is Shinobu Kocho!' });

  // Get a response from Gemini API using the user's message
  const geminiReply = await getGeminiResponse(userMessage);

  // Add "Shinobu Kocho" persona and respond with the image
  const finalReply = `Shinobu Kocho says: ${geminiReply}`;

  // Send the API's response back to the user
  await bot.sendMessage(chatId, finalReply);
});

// Log that the bot is up and running
console.log('Your Telegram bot is running...');
