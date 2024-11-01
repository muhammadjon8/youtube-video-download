const express = require("express");
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const { youtube } = require("./utils/youtube");
const ytdl = require("ytdl-core");
require("dotenv").config();

const app = express();

app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;

const bot = new Telegraf(BOT_TOKEN);

bot.use(async (ctx, next) => {
  console.log(
    `Received a message from ${ctx.from.username}: ${ctx.message.text}`
  );
  await next();
});

bot.start((ctx) => ctx.reply("Welcome to the bot!"));

bot.help((ctx) => ctx.reply("Send me a message to get started!"));


bot.on(message("text"), (ctx) => {
  let url = ytdl.validateURL(ctx?.message?.text);
  if (!url) {
    ctx.reply("Invalid YouTube URL.");
    return;
  }

  return youtube(ctx);
});

bot.launch(console.log("Bot working"));
