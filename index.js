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
  console.log("message by you-",message)
  message.reply("Hello! This response from bot")
})

client.login(process.env.DISCORD_BOT_TOKEN)