/**
 * Source Code By RezaDevv
 * Don't Forget Smile
 * This Bot Telegram Using Api Official
 * Thank You
 */

require("./configuration/config")
const fs = require("fs");
const chalk = require("chalk");
const os = require("os");
const speed = require('performance-now');
const figlet = require("figlet");
const { aze_bot } = require("./myfunc/function")
const { Telegraf } = require("telegraf");
const qrcode = require("qrcode-terminal");

global.api = (name, path = "/", query = {}, apikeyqueryname) =>
  (name in global.APIs ? global.APIs[name] : name) +
  path +
  (query || apikeyqueryname
    ? "?" +
    new URLSearchParams(
      Object.entries({
        ...query,
        ...(apikeyqueryname
          ? {
            [apikeyqueryname]:
              global.APIKeys[
              name in global.APIs ? global.APIs[name] : name
              ],
          }
          : {}),
      })
    )
    : "");
    

    if (BOT_TOKEN == 'YOUR_TELEGRAM_BOT_TOKEN') {
      return console.log(LANGUAGE_IND.noToken)
    }

    const bot = new Telegraf(BOT_TOKEN)
    async function startaze() {
      console.log(
        aze_bot.color(
          figlet.textSync("Aze - Bot", {
            font: "Standard",
            horizontalLayout: "default",
            vertivalLayout: "default",
            whitespaceBreak: false,
          }),
          "cyan"
        )
      );
      const query_split = '*'
      bot.on('callback_query', async (aze) => {
        //console.log(aze)
        action = aze.callbackQuery.data.split(query_split)
        args = action
        user_id = Number(action[1])
        if (aze.callbackQuery.from.id != user_id) return aze.answerCbQuery('Uppss... this button not for you!', {
          show_alert: true
        })
        const timestampi = speed();
        const latensii = speed() - timestampi
        const user = aze_bot.getUserName(aze.callbackQuery.from)
        const pushname = user.full_name;
        const username = user.username ? user.username : "unknown";
        const isCreator = [aze.botInfo.username, ...global.OWNER].map(v => v.replace("https://t.me/", '')).includes(user.username ? user.username : "-")
        const reply = async (text) => {
            for (var x of aze_bot.range(0, text.length, 4096)) { //maks 4096 character, jika lebih akan eror
                return await aze.replyWithMarkdown(text.substr(x, 4096), {
                    disable_web_page_preview: true
                })
            }
        }
        try {
          switch (action[0]) {
            case "ownercmd": {
              await aze.sendContact(OWNER_NUMBER, OWNER_NAME)
              reply(`This owner [${OWNER_NAME}](${OWNER[0]}) 👑`)
            }
            break
            case 'anime': case 'waifu': case 'husbu': case 'neko': case 'shinobu': case 'megumin': {
              reply(LANGUAGE_IND.mess.wait)
              const image_url = api('zenz', '/randomanime/' + action[0], {}, 'apikey')
              var button = [
                [{
                  text: 'Next ⏭',
                  callback_data: action[0] + 'cmd*' + user_id
                }]
              ]
              aze.replyWithPhoto({
                url: image_url
              }, {
                caption: 'Successfull Generate ' + action[0].replace('anime', 'Anime').replace('waifu', 'Waifu').replace('husbu', 'Husbu').replace('neko', 'Neko').replace('shinobu', 'Shinobu').replace('megumin', 'Megumin'),
                parse_mode: "MARKDOWN",
                disable_web_page_preview: true,
                reply_markup: {
                  inline_keyboard: button
                }
              })
            }
            break
            case "darkjoke": case "memeindo": case "meme": case "patrick": case "profil": {
              reply(LANGUAGE_IND.mess.wait)
              const image_url = api('zenz', '/randomimage/' + action[0], {}, 'apikey')
              var button = [
                [{
                  text: 'Next ⏭',
                  callback_data: action[0] + '*' + user_id
                }]
              ]
              aze.replyWithPhoto({
                url: image_url
              }, {
                caption: 'Successfull Generate ' + action[0].replace('darkjoke', 'Darkjoke').replace('memeindo', 'Memeindo').replace('meme', 'Meme').replace('patrick', 'Patrick').replace('profil', 'Profil'),
                parse_mode: "MARKDOWN",
                disable_web_page_preview: true,
                reply_markup: {
                  inline_keyboard: button
                }
              })
            }
            break
            case "allmenucmd": {
              LANGUAGE_IND.allmenu(aze, pushname, THUMBNAIL)
            }
            break
            case "menu2cmd": {
              LANGUAGE_IND.menu2(aze, pushname, THUMBNAIL)
            }
          }  
        } catch (e) {
          console.log(e)
        }
      })
      bot.command('help', async (aze) => {
        user = aze_bot.getUserName(aze.message.from)
        await aze.reply(LANGUAGE_IND.first_chat(BOT_NAME, user.full_name), {
          parse_mode: "MARKDOWN",
          disable_web_page_preview: true,
          reply_markup: {
            inline_keyboard: [
              [{
                text: 'Script',
                url: "https://github.com/resahdevv/Aze-Bot-Tele"
              }, {
                text: 'Creator',
                url: OWNER[0]
              }]
            ]
          }
        })
      })
      bot.command('start', async (aze) => {
        user = aze_bot.getUserName(aze.message.from)
        await aze.reply(LANGUAGE_IND.first_chat(BOT_NAME, user.full_name), {
          parse_mode: "MARKDOWN",
          disable_web_page_preview: true,
          reply_markup: {
              inline_keyboard: [
                  [{
                      text: 'Script',
                      url: "https://github.com/resahdevv/Aze-Bot-Tele"
                  }, {
                      text: 'Creator',
                      url: OWNER[0]
                  }]
              ]
          }
      })
  })
  bot.on('message', async (aze) => {
    require("./azebot")(aze, bot);
  })
  bot.launch({
    dropPendingUpdates: true
  })
  bot.telegram.getMe().then((getme) => {
    console.table({
      "Bot Name": getme.first_name,
      "Username": "@" + getme.username,
      "Id": getme.id,
      "Link": "https://t.me/" + getme.username,
      "Author": OWNER[0]
    })
    console.log(aze_bot.color('Print Bot Token...', 'cyan'))
    qrcode.generate(BOT_TOKEN ? BOT_TOKEN : 'Unknown', {small: true});
  })
}
startaze()
  
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});