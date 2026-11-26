
require("dotenv").config();
const mineflayer = require("mineflayer");

const config = {
  host: process.env.MC_HOST,
  port: Number(process.env.MC_PORT),
  username: process.env.MC_USERNAME || "VodkaMikiMiki",
  version: process.env.MC_VERSION || false,
  auth: process.env.MC_AUTH || "offline"
};

let bot;
let reconnectTimer;

function startBot() {
  console.log("Starting Vodka Miki Miki...");

  bot = mineflayer.createBot(config);

  bot.on("login", () => {
    console.log("Connected to Minecraft server!");
  });

  bot.on("spawn", () => {
    console.log("Bot spawned in the server!");
  });

  bot.on("message", (message) => {
    console.log("[SERVER]", message.toString());

    // Login/register commands are intentionally
    // not automated with an unverified password.
  });

  bot.on("kicked", (reason) => {
    console.log("Kicked:", reason);
  });

  bot.on("error", (error) => {
    console.log("Bot error:", error.message);
  });

  bot.on("end", () => {
    console.log("Disconnected. Reconnecting in 30 seconds...");

    clearTimeout(reconnectTimer);
    reconnectTimer = setTimeout(startBot, 30000);
  });
}

if (!config.host) {
  console.log("Please set MC_HOST in Railway Variables.");
  process.exit(1);
}

startBot();
                
