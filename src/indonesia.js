const fs = require("fs");
const chalk = require("chalk");
const moment = require("moment-timezone");
const { aze_bot } = require("../myfunc/function");

exports.noToken = "Bot token tidak boleh kosong, silahkan buat bot melalui https://t.me/BotFather"
exports.first_chat = (botname, pushname) => {
    return `_Hallo ${pushname}👋 Ini adalah program ${botname} klik /menu untuk menampilkan menu. Klik /rules untuk mengetahui syarat & ketentuan bot._`
}
exports.rules = "_Syarat & Ketentuan Bot_\n\n1. Dilarang spam bot\n2. Hubungi owner bila ada perlu\n3. Spam akan langsung di block\n\n_Bot ini dibangun mengguananakan api official dari_ [@BotFather](https://t.me/BotFather) _sehingga bot ini legal digunakan secara personal maupun public. Menggunakan bot berarti menyetujui bahwa informasi seperti id dan username akan disimpan di database kami._"
exports.getStyle = (style, style2) => {
    return `**${style2} Yg Kamu Masukkan Salah**\n\n__Berikut List ${style2} Yg Benar, Total__ **${style}** __${style2}__\n\n`
}
exports.mess = {
    wait: 'Loading...',
    owner: 'Fitur Khusus Owner Bot!',
    waitdata: 'Melihat Data Terkini...',
    success: 'Successfull ✔',
    private: 'Fitur Khusus Private Chat!',
    group: 'Fitur Khusus Group!',
    banned: 'You Have Been Banned 😥'
}

exports.menu = async (aze, thumbnail, pushname, OWNER_NAME, OWNER, prefix, latensii, os, aze_bot, username, pengguna, isCreator, user_id) => {
    var anu = `Hi ${pushname}👋

╭─❒ 「 Bot Info 」 
├ Creator :  [@${OWNER_NAME}](${OWNER[0]})
├ Library :  [@BotFather](https://t.me/BotFather)
├ Prefix :   ${prefix}
├ Pengguna :   ${pengguna}
├ Speed : ${latensii.toFixed(4)} Second
├ Memory Used : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
├ Hostname : ${os.hostname()}
├ Platform : ${os.platform()}
╰❒ Runtime : ${aze_bot.runtime(process.uptime())}

╭─❒ 「 Date Info 」 
├ Tanggal Server : ${moment.tz('Asia/Jakarta').format('DD/MM/YY')}
├ Waktu Server : ${moment.tz('Asia/Jakarta').format('HH:mm:ss')}
╰❒

╭─❒ 「 User Info 」 
├ Name : ${pushname}
├ Profile : [@${pushname}](https://t.me/${username})
╰❒ Owner : ${isCreator ? 'True' : `False`}
`
var button = [
    [{
        text: 'All Menu 🧩',
        callback_data: 'allmenucmd*' + user_id
    },
    {
        text: 'Creator 🎯',
        callback_data: 'ownercmd*' + user_id
    }]
]
    try {
        await aze.editMessageMedia({
            type: "photo",
            media: {
                source: thumbnail
            },
            caption: anu,
            parse_mode: "MARKDOWN",
            disable_web_page_preview: true
        }, {
            reply_markup: {
                inline_keyboard: button
            }
        })
    } catch {
        await aze.replyWithPhoto({
            source: thumbnail
        }, {
            caption: anu,
            parse_mode: "MARKDOWN",
            disable_web_page_preview: true,
            reply_markup: {
                inline_keyboard: button
            }
        })
    }
}

exports.allmenu = async (aze, pushname, thumbnail) => {
    var menu = `
_Hallo Kak ${pushname} 👋_

╭──❒ 「 *All MENU BOT* 」
│
├• *OPENAI*
├• 📌 /ai (text)
├• 📌 /img (text)
│
├• *DOWNLOADER*
├• 📌 /tiktoknowm (link)
├• 📌 /tiktokmp3 (link)
├• 📌 /ytmp4 (link)
├• 📌 /ytmp3 (link)
├• 📌 /ytshorts (link)
├• 📌 /apkdownload (package)
├• 📌 /mediafire (link)
│
├• *INTERNET*
├• 📌 /gitclone (url<>repo)
├• 📌 /whoisip (ip<>address)
├• 📌 /shortlink (url)
├• 📌 /getidchat
├• 📌 /getidgroup
├• 📌 /toaudio (text)
│
├• *STALKER*
├• 📌 /stalkgithub (username)
├• 📌 /stalkinstagram (username)
├• 📌 /stalktiktok (username)
├• 📌 /stalktwitter (username)
│
├• *RANDOM ANIME*
├• 📌 /anime
├• 📌 /waifu
├• 📌 /husbu
├• 📌 /neko
├• 📌 /shinobu
├• 📌 /megumin
│
├• *RANDOM IMAGE*
├• 📌 /darkjoke
├• 📌 /memeindo
├• 📌 /meme
├• 📌 /patrick
├• 📌 /profil
│
├• *CREATOR / OWNER*
├• 📌 /ping
├• 📌 /restart
├• 📌 /getip
├• 📌 /sendnotify (tel<>id|mess)
├• 📌 /banned (tel<>id)
├• 📌 /unbanned (tel<>id)
│
├• *SUPPORT CREATOR*
├• 📌 /owner
├• 📌 /donasi
├• 📌 /rules
├• 📌 /script
├• 📌 /buysourcecode
│
╰❑ 「 *THANK YOU* 」
`
var button = [
    [{
        text: 'Next ⏭',
        callback_data: 'menu2cmd*' + user_id
    }]
]
aze.replyWithPhoto({
    source: thumbnail
}, {
    caption: menu,
    parse_mode: "MARKDOWN",
    disable_web_page_preview: true,
    reply_markup: {
        inline_keyboard: button
    }
})
}

exports.menu2 = async (aze, pushname, thumbnail) => {
    var menu = `
_Hallo Kak ${pushname} 👋_

╭──❒ 「 *ADVANCED MENU* 」
│
├• *INFORMATION*
├• 📌 /gempa
├• 📌 /cuaca (kota)
│
├• *INTERNET*
├• 📌 /translate (text)
├• 📌 /fetch (endpoint)
│
├• *IMAGE MAKER*
├• 📌 /nulis (text)
│
├• *JAIL TOOL*
├• 📌 /spam (tel<>id|count|mess)
│
├• *CREATOR / OWNER*
├• 📌 /broadnotif (text)
│
╰❑ 「 *THANK YOU* `
aze.replyWithPhoto({
    source: thumbnail
}, {
    caption: menu,
    parse_mode: 'MARKDOWN'
})
}

exports.donasi = async (aze, donasi) => {
    aze.replyWithPhoto({
        source: donasi
    }, {
        caption: '_Scan QR CODE ini untuk mendapatkan alamat BTC setelah itu lakukan donasi sesuai dengan nominal yang anda inginkan._',
        parse_mode: 'MARKDOWN'
    });
}

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});