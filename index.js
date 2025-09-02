require("dotenv").config()
const { Client, GatewayIntentBits, AttachmentBuilder } = require("discord.js")
const {GoogleGenAI} = require("@google/genai")
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateContent(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: `
        "always take answer short never take answer upto 3500 words and formatting in good structure."
      `
    }
  });

  return response.text
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})

client.once("ready", () => {
  console.log("Bot is Ready")
})

client.on("messageCreate", async (message) => {

  const isBot = message.author.bot;
  if (isBot) return

  const content = await generateContent(message.content)
  if (content) {
    message.reply(content)
  }
})
  
client.login(process.env.DISCORD_BOT_TOKEN)
