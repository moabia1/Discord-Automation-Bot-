require("dotenv").config()
const { Client, GatewayIntentBits } = require("discord.js")

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

client.on("messageCreate", (message) => { 
  const isBot = message.author.bot;
  if (isBot) return
  
  message.reply("Hello From Bot")
})

client.login(process.env.DISCORD_BOT_TOKEN)