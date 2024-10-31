const express = require("express");
const { Telegraf } = require("telegraf");
const { youtube } = require("./utils/youtube");
const { message } = require("telegraf/filters");
const ytdl = require("ytdl-core");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(async (ctx, next) => {
  console.log(
    `Received a message from ${ctx.from.username}: ${ctx.message.text}`
  );
  await next();
});

bot.start((ctx) =>
  ctx.reply("Welcome! Send me a YouTube link to download the video.")
);
bot.help((ctx) =>
  ctx.reply("Send me a YouTube video link, and I’ll download it for you.")
);

const YOUTUBE_REGEX =
  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;

bot.hears(YOUTUBE_REGEX, youtube);

bot.on(message("text"), (ctx) => {
  let url = ytdl.validateURL(ctx?.message.text);
  if (url) {
    return youtube(ctx);
  } else ctx.reply("bunday buyruq yoq iltimos qaytadan urinib ko`ring");
});

bot.launch();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} \nhttp://localhost:${PORT}`);
});
