const { default: axios } = require("axios");
const { Context } = require("telegraf");
const ytdl = require("ytdl-core");

/**
 *
 * @param {Context} ctx
 */

module.exports.youtube = async (ctx) => {
  let url = ctx.update.message.text;
  const info = await ytdl.getInfo(url);
  console.log(
    info.formats.filter(
      (format) =>
        format.container == "mp4" && format.hasVideo && format.hasAudio
    )
  );
  if (info) {
    await ctx.reply("🔎");
    const format = info.formats.filter(
      (format) =>
        format.container == "mp4" && format.hasVideo && format.hasAudio
    )[0];
    
    

    await ctx.replyWithVideo({ url: format.url });
  }
};
