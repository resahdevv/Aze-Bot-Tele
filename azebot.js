/**
 * Source Code By RezaDevv
 * Don't Forget Smile
 * This Bot Telegram Using Api Official
 * Thank You
 */

require("./configuration/config");
const { Telegraf, Context } = require('telegraf')
const { message, editedMessage, channelPost, editedChannelPost, callbackQuery } = require("telegraf/filters");
const chalk = require('chalk');
const { exec } = require("child_process");
const fs = require('fs');
const fetch = require('node-fetch');
const os = require('os');
const speed = require('performance-now');
const util = require('util');
const { aze_bot } = require('./myfunc/function');
const { Configuration, OpenAIApi } = require("openai");
const axios = require("axios");

//Database
const signup = JSON.parse(fs.readFileSync('./src/user.json'));
const banned = JSON.parse(fs.readFileSync('./src/banned.json'));

module.exports = aze = async (aze, bot) => {
    //console.log(aze)
    try {
        const body = aze.message.text || aze.message.caption || ''
        const budy = (typeof aze.message.text == 'string' ? aze.message.text : '')
        const { isUrl } = aze_bot;
        const isCmd = /^[°•π÷×¶∆£¢€¥®™�✓_=|~!?#/$%^&.+-,\\\©^]/.test(body)
        const prefix = isCmd ? body[0] : ''
        const command = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : ''
        const args = body.trim().split(/ +/).slice(1)
        const text = q = args.join(" ")
        const user = aze_bot.getUserName(aze.message.from)
        const pushname = user.full_name;
        const user_id = aze.message.from.id + " "
        const username = aze.message.from.username ? aze.message.from.username : "unknown";
        const isCreator = OWNER[0].replace("https://t.me/", '') == aze.update.message.from.username
        const from = aze.message.chat.id
        const opts = { parse_mode: 'MARKDOWN' };

        //Groups
        const isGroup = aze.chat.type.includes('group')
        const groupName = isGroup ? aze.chat.title : ''
        const newMember = aze.message.new_chat_member;
        const leftMember = aze.message.left_chat_member;

        const isBanned = banned.includes("" + from)
        const isImage = aze.message.hasOwnProperty('photo')
        const isVideo = aze.message.hasOwnProperty('video')
        const isAudio = aze.message.hasOwnProperty('audio')
        const isSticker = aze.message.hasOwnProperty('sticker')
        const isContact = aze.message.hasOwnProperty('contact')
        const isLocation = aze.message.hasOwnProperty('location')
        const isDocument = aze.message.hasOwnProperty('document')
        const isAnimation = aze.message.hasOwnProperty('animation')
        const isMedia = isImage || isVideo || isAudio || isSticker || isContact || isLocation || isDocument || isAnimation
        const quotedMessage = aze.message.reply_to_message || {}
        const isQuotedImage = quotedMessage.hasOwnProperty('photo')
        const isQuotedVideo = quotedMessage.hasOwnProperty('video')
        const isQuotedAudio = quotedMessage.hasOwnProperty('audio')
        const isQuotedSticker = quotedMessage.hasOwnProperty('sticker')
        const isQuotedContact = quotedMessage.hasOwnProperty('contact')
        const isQuotedLocation = quotedMessage.hasOwnProperty('location')
        const isQuotedDocument = quotedMessage.hasOwnProperty('document')
        const isQuotedAnimation = quotedMessage.hasOwnProperty('animation')
        const isQuoted = aze.message.hasOwnProperty('reply_to_message')
        const isUser = signup.includes("" + from)
        const timestampi = speed();
        const latensii = speed() - timestampi

        const reply = async (text) => {
            for (var x of aze_bot.range(0, text.length, 4096)) { //maks 4096 character, jika lebih akan eror
                return await aze.replyWithMarkdown(text.substr(x, 4096), {
                    disable_web_page_preview: true
                })
            }
        }
        const getStyle = (style_, style, style2) => {
            listt = `${LANGUAGE_IND.getStyle(style, style2)}`
            for (var i = 0; i < 300; i++) {
                listt += '» `' + style_[i] + '`\n'
            }
            reply(listt)
        }

        //Get type message 
        var typeMessage = body.substr(0, 50).replace(/\n/g, '')
        if (isImage) typeMessage = 'Image'
        else if (isVideo) typeMessage = 'Video'
        else if (isAudio) typeMessage = 'Audio'
        else if (isSticker) typeMessage = 'Sticker'
        else if (isContact) typeMessage = 'Contact'
        else if (isLocation) typeMessage = 'Location'
        else if (isDocument) typeMessage = 'Document'
        else if (isAnimation) typeMessage = 'Animation'

        //Push message to console
        if (aze.message) {
            console.log(chalk.black(chalk.bgWhite('[ PESAN ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(body || typeMessage)) + '\n' + chalk.magenta('=> From'), chalk.green(pushname) + '\n' + chalk.blueBright('=> In'), chalk.green(isGroup ? groupName : 'Private Chat', aze.message.chat.id))
            if (newMember) {
                const memberId = newMember.id;
                const memberUsername = newMember.username;
                const chatId = aze.chat.id;
                console.log(`New member joined: ${memberId} (${memberUsername})`);
                bot.telegram.sendMessage(chatId, `_Selamat datang, ${memberUsername}!_`, opts);
            } else if (leftMember) {
                const memberId = leftMember.id;
                const memberUsername = leftMember.username;
                const chatId = aze.chat.id;
                console.log(`Member left: ${memberId} (${memberUsername})`);
                bot.telegram.sendMessage(chatId, `_Sampai jumpa, ${memberUsername}!_`, opts);
            }
        }

        //Push user to database
        if (isCmd && !isUser && !isGroup) {
            signup.push("" + from)
            bot.telegram.sendMessage(from, `╭──❒ *USER BARU TERDETEKSI*\n├• 📌 Id: ${from}\n├• 📌 Name: ${pushname}\n├• 📌 Username: @${username ? username : 'Unknown'}\n╰❑\n\n*Selamat datang gunakan bot dengan bijak!. Patuhi Syarat & Ketentuan yang berlaku /rules Terimakasih.*\n\n[@${OWNER_NAME}](${OWNER[0]})`, opts)
            setTimeout(() => {
                bot.telegram.sendMessage(OWNERID, `╭──❒ *ADA USER BARU*\n├• 📌 Id: ${from}\n├• 📌 Name: ${pushname}\n├• 📌 Username: @${username ? username : 'Unknown'}\n╰❑`, opts)
            }, 3000)
            fs.writeFileSync('./src/user.json', JSON.stringify(signup, null, 2))
        }
        switch (command) {
            case "tes": {
                if (isBanned) return reply(LANGUAGE_IND.mess.banned)
                reply("I'm here")
            }
            break
            case "owner": case "creator": {
                await aze.sendContact(OWNER_NUMBER, OWNER_NAME)
                reply(`This owner [${OWNER_NAME}](${OWNER[0]}) 👑`)
            }
            break
            case "menu": case "help": {
                if (isBanned) return reply(LANGUAGE_IND.mess.banned)
                LANGUAGE_IND.menu(aze, THUMBNAIL, pushname, OWNER_NAME, OWNER, prefix, latensii, os, aze_bot, username, signup.length, isCreator, user.id.toString())
            }
            break
            case "donasi": case "donate": {
                LANGUAGE_IND.donasi(aze, DONASI)
            }
            break
            case "script": {
                if (isBanned) return reply(LANGUAGE_IND.mess.banned)
                aze.reply("Source code this bot...", {
                    reply_markup: {
                        inline_keyboard: [
                            [{
                                text: 'Github',
                                url: "https://github.com/resahdevv/Aze-Bot-Tele"
                            }, {
                                text: 'WhatsApp',
                                url: "https://wa.me/+6285742632270"
                            }]
                        ]
                    }
                })
            }
            break
            case "rules": {
                if (isBanned) return reply(LANGUAGE_IND.mess.banned)
                reply(LANGUAGE_IND.rules)
            }
            break 
            case "ping": case "botsatus": {
                if (!isCreator) return reply(LANGUAGE_IND.mess.owner)
                const used = process.memoryUsage()
                const cpus = os.cpus().map(cpu => {
                    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
                    return cpu
                })
                const cpu = cpus.reduce((last, cpu, _, { length }) => {
                    last.total += cpu.total
                    last.speed += cpu.speed / length
                    last.times.user += cpu.times.user
                    last.times.nice += cpu.times.nice
                    last.times.sys += cpu.times.sys
                    last.times.idle += cpu.times.idle
                    last.times.irq += cpu.times.irq
                    return last
                }, {
                    speed: 0,
                    total: 0,
                    times: {
                        user: 0,
                        nice: 0,
                        sys: 0,
                        idle: 0,
                        irq: 0
                    }
                })
                let timestamp = speed()
                let latensi = speed() - timestamp
                neww = performance.now()
                oldd = performance.now()
                respon = `_Kecepatan Respon_ ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\n_Runtime_ : ${aze_bot.runtime(process.uptime())}\n\n💻 _Server Information_\nRAM: ${aze_bot.formatp(os.totalmem() - os.freemem())} / ${aze_bot.formatp(os.totalmem())}\n_NodeJS Memory Usaage_\n${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${aze_bot.formatp(used[key])}`).join('\n')}\n\n${cpus[0] ? `_Total CPU Usage_\n${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}\n_CPU Core(s) Usage (${cpus.length} Core CPU)_\n\n${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}`.trim()
                reply(respon)
            }
            break
            case 'anime': case 'waifu': case 'husbu': case 'neko': case 'shinobu': case 'megumin': {
                if (isBanned) return reply(LANGUAGE_IND.mess.banned)
                reply(LANGUAGE_IND.mess.wait)
                const image_url = api('zenz', '/randomanime/' + command, {}, 'apikey')
                var button = [
                    [{
                        text: 'Next ⏭',
                        callback_data: command + '*' + user_id
                    }]
                ]
                aze.replyWithPhoto({
                    url: image_url
                }, {
                    caption: 'Successfull Generate ' + command.replace('anime', 'Anime').replace('waifu', 'Waifu').replace('husbu', 'Husbu').replace('neko', 'Neko').replace('shinobu', 'Shinobu').replace('megumin', 'Megumin'),
                    parse_mode: "MARKDOWN",
                    disable_web_page_preview: true,
                    reply_markup: {
                        inline_keyboard: button
                    }
                })
            }
            break
            case "getidchat": case "getidgroup": {
                if (isBanned) return reply(LANGUAGE_IND.mess.banned)
                if (command === 'getidchat') {
                    if (isGroup) return reply(LANGUAGE_IND.mess.private)
                    reply('ID Chat: ' + from)
                } else if (command === 'getidgroup') {
                    if (!isGroup) return reply(LANGUAGE_IND.mess.grup)
                    reply('ID Group: ' + from)
                }
            }
            break
            case "restart": {
                if (!isCreator) return reply(LANGUAGE_IND.mess.owner)
                await reply(`Restarting ${BOT_NAME}`)
                try{
                    await bot.telegram.sendMessage(from, {text: LANGUAGE_IND.mess.success})
                    await aze_bot.sleep(3000)
                    exec(`npm start`)
                } catch (err) {
                    exec(`node index.js`)
                    await aze_bot.sleep(4000)
                    reply('Sukses')
                }
            }
            break
            case"gempa": {
                if (isBanned) return reply(LANGUAGE_IND.mess.banned)
                reply(LANGUAGE_IND.mess.waitdata)
                let anu = await aze_bot.fetchJson(api('zenz', '/information/bmkg/gempa', {}, 'apikey'))
                if (anu.status == false) return reply(anu.result.message)
                aze.replyWithPhoto({
                    url: anu.result.shakemap
                }, {
                    caption: `⭔ Tanggal : ${anu.result.tanggal}\n⭔ Jam : ${anu.result.jam}\n⭔ Date Time : ${anu.result.datetime}\n⭔ Coordinate : ${anu.result.coordinates}\n⭔ Lintang : ${anu.result.lintang}\n⭔ Bujur : ${anu.result.bujur}\n⭔ Magnitude : ${anu.result.magnitude}\n⭔ Kedalaman : ${anu.result.kedalaman}\n⭔ Wilayah : ${anu.result.wilayah}\n⭔ Potensi : ${anu.result.potensi}\n⭔ Dirasakan : ${anu.result.dirasakan}` 
                })
            }
            break
            case "tiktoknowm": case "tiktok": {
                if (isBanned) return reply(LANGUAGE_IND.mess.banned)
                if (!args[0]) return reply('Masukkan Query Link!')
                if (!isUrl(args[0])) return reply('Link Invalid')
                const tiktokDomains = ['vt.tiktok.com', 'tiktok.com'];
                const url = new URL(args[0]);
                if (!tiktokDomains.includes(url.hostname)) {
                    return reply('Link bukan dari TikTok!')
                }
                reply(LANGUAGE_IND.mess.wait)
                let anu = await aze_bot.fetchJson(api('zenz', '/downloader/tiktok', { url: args[0] }, 'apikey'))
                if (anu.status == false) return reply(anu.result.message)
                aze.replyWithVideo({
                    url: anu.result.url[0].url
                }, {
                    caption: 'Download From ' + args[0]
                })
            }
            break
            case "darkjoke": case "memeindo": case "meme": case "patrick": case "profil": {
                if (isBanned) return reply(LANGUAGE_IND.mess.banned)
                reply(LANGUAGE_IND.mess.wait)
                const image_url = api('zenz', '/randomimage/' + command, {}, 'apikey')
                var button = [
                    [{
                        text: 'Next ⏭',
                        callback_data: command + '*' + user_id
                    }]
                ]
                aze.replyWithPhoto({
                    url: image_url
                }, {
                    caption: 'Successfull Generate ' + command.replace('darkjoke', 'Darkjoke').replace('memeindo', 'Memeindo').replace('meme', 'Meme').replace('patrick', 'Patrick').replace('profil', 'Profil'),
                    parse_mode: "MARKDOWN",
                    disable_web_page_preview: true,
                    reply_markup: {
                        inline_keyboard: button
                    }
                })
            }
            break
            case "tiktokmp3": case "tiktokaudio": {
                if (isBanned) return reply(LANGUAGE_IND.mess.banned)   
                if (!args[0]) return reply('Masukkan Query Link!')   
                if (!isUrl(args[0])) return reply('Link Invalid')
                const tiktokDomains = ['vt.tiktok.com', 'tiktok.com'];
                const url = new URL(args[0]);
                if (!tiktokDomains.includes(url.hostname)) {
                    return reply('Link bukan dari TikTok!')
                }
                reply(LANGUAGE_IND.mess.wait)
                let anu = await aze_bot.fetchJson(api('zenz', '/downloader/tiktok', { url: args[0] }, 'apikey'))
                if (anu.status == false) return reply(anu.result.message)
                aze.replyWithAudio({
                    url: anu.result.url[1].url,
                    filename: 'Tiktok Audio.mp3'
                }, {
                    caption: 'Download From ' + args[0]
                })
            }
            break
            case "gitclone": {
                if (isBanned) return reply(LANGUAGE_IND.mess.banned)
                if (!args[0]) return reply(`Example: ${prefix + command} UrlRepo`);
                let regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
                if (!regex.test(args[0])) return reply('```Link Incorrect```');
                let [, user, repo] = args[0].match(regex) || [];
                if (!repo) return reply('```Repository not found```');
                repo = repo.replace(/.git$/, '');
                let url = `https://api.github.com/repos/${user}/${repo}/zipball`;
                reply(`_Cloning Repository_\n\n🌟 _User: ${user}_\n🌟 _Repo: ${repo}_\n\n_Loading!..._`);
                aze.replyWithDocument({
                    url: url,
                    filename: repo + '.zip'
                }, {
                    caption: `_${LANGUAGE_IND.mess.success}_`,
                    parse_mode: 'MARKDOWN'
                })
            }
            break
            case "ai": {
                try {
                    if (isBanned) return reply(LANGUAGE_IND.mess.banned)
                    if (KEY_OPENAI === "ISI_APIKEY_OPENAI_DISINI") return reply("_Mohon isi apikey di config.js_");
                    if (!text) return reply(`Chat dengan AI.\n\nContoh:\n${prefix}${command} Presiden Indonesia ?`);
                    reply(LANGUAGE_IND.mess.wait)
                    const configuration = new Configuration({
                        apiKey: KEY_OPENAI,
                    });
                    const openai = new OpenAIApi(configuration);
                    const response = await openai.createChatCompletion({
                        model: "gpt-3.5-turbo",
                        messages: [{role: "user", content: text}],
                    });
                    reply(`${response.data.choices[0].text}`);
                } catch (error) {
                    if (error.response) {
                        console.log(error.response.status);
                        console.log(error.response.data);
                        console.log(`${error.response.status}\n\n${error.response.data}`);
                    } else {
                        console.log(error);
                        reply("Maaf, sepertinya ada yang error :"+ error.message);
                    }
                }
                
            }
            case "img": {
                try {
                    if (isBanned) return reply(LANGUAGE_IND.mess.banned)
                    if (KEY_OPENAI === "ISI_APIKEY_OPENAI_DISINI") return reply("_Mohon isi apikey di config.js_");
                    if (!text) return reply(`Chat dengan AI.\n\nContoh:\n${prefix}${command} Gril Cute`);
                    reply(LANGUAGE_IND.mess.wait)
                    const configuration = new Configuration({
                        apiKey: KEY_OPENAI,
                    });
                    const openai = new OpenAIApi(configuration);
                    const response = await openai.createImage({
                        prompt: text,
                        n: 1,
                        size: "512x512",
                    });
                    aze.replyWithPhoto({
                        url: response.data.data[0].url,
                    }, {
                        caption: `_${text}_`,
                        parse_mode: 'MARKDOWN'
                    });
                } catch (error) {
                    if (error.response) {
                        console.log(error.response.status);
                        console.log(error.response.data);
                        console.log(`${error.response.status}\n\n${error.response.data}`);
                    } else {
                        console.log(error);
                        reply("Maaf, sepertinya ada yang error :"+ error.message);
                    }
                }
                
            }
            break
            case "whoisip": {
                if (isBanned) return reply(LANGUAGE_IND.mess.banned)
                if (!args[0]) return reply(`Example: ${prefix + command} 192.168.10.20`)
                reply(LANGUAGE_IND.mess.wait)
                try {
                    let anu = await aze_bot.fetchJson(api('lol', '/api/ipaddress/' + args[0], {}, 'apikey'))
                    bot.telegram.sendMessage(from, {text: `⭔ Country : ${anu.result.country}\n⭔ Country Code : ${anu.result.countryCode}\n⭔ Region : ${anu.result.region}\n⭔ Region Name : ${anu.result.regionName}\n⭔ City : ${anu.result.city}\n⭔ Zip : ${anu.result.zip}\n⭔ Lat : ${anu.result.lat}\n⭔ Lon : ${anu.result.lon}\n⭔ Time Zone : ${anu.result.timezone}\n⭔ Isp : ${anu.result.isp}\n⭔ Org : ${anu.result.org}\n⭔ As : ${anu.result.as}\n⭔ Query : ${anu.result.query}`}, opts)
                } catch (error) {
                    console.error('Error fetching JSON:', error);
                    reply('_Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti._');
                }
            }
            break
            case "getip": {
                if (!isCreator) return reply(LANGUAGE_IND.mess.owner)
                reply("My public IP address is: " + ipserver);
            }
            break
            case "shortlink": {
                if (isBanned) return reply(LANGUAGE_IND.mess.banned)
                if (!args[0]) return reply(`Example ${prefix + command} https://google.com`)
                let anu = await aze_bot.fetchJson(api('lol', '/api/shortlink', {url: args[0]}, 'apikey'))
                bot.telegram.sendMessage(from, {text: `*${LANGUAGE_IND.mess.success}*\n⭔ Url : ${anu.result ? anu.result : 'Unknow'}`}, opts)
            }
            break
            case "banned": {
                if (!isCreator) return reply(LANGUAGE_IND.mess.owner)
                if (!args[0]) return reply(`Example: ${prefix + command} 1283353379`)
                if (args[0] === OWNERID) return reply('_Id Owner Di Larang!_')
                let telgram_id = args[0].replace(/[^0-9]/g, '')
                let banned_ = []
                if (fs.existsSync('./src/banned.json')) {
                    banned_ = JSON.parse(fs.readFileSync('./src/banned.json'))
                }
                if (banned_.includes(telgram_id)) {
                    reply(`_Id ${telgram_id} Telah Terbanned_`)
                } else {
                    banned.push(telgram_id)
                    fs.writeFileSync('./src/banned.json', JSON.stringify(banned))
                    reply(`_Success Banned ${telgram_id}_`)
                }
            }
            break
            case "unbanned": {
                if (!isCreator) return reply(LANGUAGE_IND.mess.owner)
                if (!args[0]) return reply(`Example: ${prefix + command} 1283353379`)
                let telgram_id = args[0].replace(/[^0-9]/g, '')
                let banned_ = JSON.parse(fs.readFileSync('./src/banned.json'))
                let unp = banned_.indexOf(telgram_id)
                if (unp !== -1) {
                    banned.splice(unp, 1)
                    fs.writeFileSync('./src/banned.json', JSON.stringify(banned))
                    reply(`_Success Unbanned ${telgram_id}_`)
                } else {
                    reply(`_Id ${telgram_id} Not Found_`)
                }
            }
            break
            case "ytmp3": {
                if (isBanned) return reply(LANGUAGE_IND.mess.banned)   
                if (!args[0]) return reply('Masukkan Query Link!')   
                if (!isUrl(args[0])) return reply('Link Invalid')
                const youtubeDomains = ['youtube.com', 'www.youtube.com', 'youtu.be'];
                const url = new URL(args[0]);
                if (!youtubeDomains.includes(url.hostname)) {
                    return reply('Link bukan dari Youtube!')
                }
                reply(LANGUAGE_IND.mess.wait)
                let anu = await fetch(api('lol', '/api/ytaudio', { url: args[0] }, 'apikey'))
                if (!anu.ok) throw await anu.text()
                var result = await anu.json()
                var { id, thumbnail, title } = result.result
                var { link, bitrate, size } = result.result.link
                let key = "「 *YOUTUBE AUDIO* 」\n\n"
                key += `• _Id: ${id}_\n`
                key += `• _Bitrate: ${bitrate}_\n`
                key += `• _Size: ${size}_\n`
                await aze.replyWithPhoto({
                    url: thumbnail
                }, {
                    caption: key,
                    parse_mode: 'MARKDOWN'
                })
                await aze.replyWithAudio({
                    url: link,
                    filename: title
                })
            }
            break
            case "ytmp4": case "ytshorts": {
                if (isBanned) return reply(LANGUAGE_IND.mess.banned)   
                if (!args[0]) return reply('Masukkan Query Link!')   
                if (!isUrl(args[0])) return reply('Link Invalid')
                const youtubeDomains = ['youtube.com', 'www.youtube.com', 'youtu.be'];
                const url = new URL(args[0]);
                if (!youtubeDomains.includes(url.hostname)) {
                    return reply('Link bukan dari Youtube!')
                }
                reply(LANGUAGE_IND.mess.wait)
                let anu = await fetch(api('lol', '/api/ytvideo', { url: args[0] }, 'apikey'))
                if (!anu.ok) throw await anu.text()
                var result = await anu.json()
                var { id, thumbnail } = result.result
                var { link, type, resolution, size } = result.result.link
                let key = "「 *YOUTUBE VIDEO* 」\n\n"
                key += `• _Id: ${id}_\n`
                key += `• _Type: ${type}_\n`
                key += `• _Resolusi: ${resolution}_\n`
                key += `• _Size: ${size}_\n`
                await aze.replyWithPhoto({
                    url: thumbnail
                }, {
                    caption: key,
                    parse_mode: 'MARKDOWN'
                })
                aze.replyWithVideo({
                    url: link
                }, {
                    caption: LANGUAGE_IND.mess.success
                })
            }
            break
            case "toaudio": {
                if (isBanned) return reply(LANGUAGE_IND.mess.banned)   
                if (!text) return reply(`Example: ${prefix + command} Hello World`)
                reply(LANGUAGE_IND.mess.wait)
                let anu = (api('lol', '/api/gtts/id', { text: text }, 'apikey'))
                aze.replyWithAudio({
                    url: anu,
                    filename: 'Google Audio.mp3'
                })
            }
            break
            case "stalkgithub": case "stalkinstagram": case "stalktiktok": case "stalktwitter": {
                if (isBanned) return reply(LANGUAGE_IND.mess.banned)
                if (!text) return reply(`Example: ${prefix + command} username`)
                if (command === 'stalkgithub') {
                    reply(LANGUAGE_IND.mess.wait)
                    let anu = await fetch(api('lol', '/api/github/' + text, {}, 'apikey'))
                    if (!anu.ok) throw await anu.text()
                    var result = await anu.json()
                    var {avatar, url, name, followers, following, public_repos, public_gists, type, company, location, email, bio} = result.result
                    var get_link = await aze_bot.fetchJson(`https://tinyurl.com/api-create.php?url=${url}`)
                    let key = "「 *STALKER GITHUB* 」\n\n"
                    key += `• _Name: ${name}_\n`
                    key += `• _Followers: ${followers}_\n`
                    key += `• _Following: ${following}_\n`
                    key += `• _Public Repo: ${public_repos}_\n`
                    key += `• _Public Gists: ${public_gists}_\n`
                    key += `• _Type: ${type}_\n`
                    key += `• _Company: ${company}_\n`
                    key += `• _Location: ${location}_\n`
                    key += `• _Email: ${email}_\n`
                    key += `• _Bio: ${bio}_\n`
                    key += `• _Url: ${get_link}_\n`
                    await aze.replyWithPhoto({
                        url: avatar
                    }, {
                        caption: key,
                        parse_mode: 'MARKDOWN'
                    })
                } else if (command === 'stalkinstagram') {
                    reply(LANGUAGE_IND.mess.wait)
                    let anu = await fetch(api('lol', '/api/stalkig/' + text, {}, 'apikey'))
                    if (!anu.ok) throw await anu.text()
                    var result = await anu.json()
                    var { photo_profile, fullname, posts, followers, following, bio } = result.result
                    let key = "「 *STALKER INSTAGRAM* 」\n\n"
                    key += `• _Username: ${result.result.username}_\n`
                    key += `• _Full Name: ${fullname}_\n`
                    key += `• _Posts: ${posts}_\n`
                    key += `• _Followers: ${followers}_\n`
                    key += `• _Following: ${following}_\n`
                    key += `• _Bio: ${bio}_\n`
                    await aze.replyWithPhoto({
                        url: photo_profile
                    }, {
                        caption: key,
                        parse_mode: 'MARKDOWN'
                    })
                } else if (command === 'stalktiktok') {
                    reply(LANGUAGE_IND.mess.wait)
                    let anu = await fetch(api('lol', '/api/stalktiktok/' + text, {}, 'apikey'))
                    if (!anu.ok) throw await anu.text()
                    var result = await anu.json()
                    var { user_picture, nickname, bio, followers, followings, likes, video } = result.result
                    let key = "「 *STALKER TIKTOK* 」\n\n"
                    key += `• _Username: ${result.result.username}_\n`
                    key += `• _Nickname: ${nickname}_\n`
                    key += `• _Bio: ${bio}_\n`
                    key += `• _Followers: ${followers}_\n`
                    key += `• _Following: ${followings}_\n`
                    key += `• _Like: ${likes}_\n`
                    key += `• _Video: ${video}_\n`
                    await aze.replyWithPhoto({
                        url: user_picture
                    }, {
                        caption: key,
                        parse_mode: 'MARKDOWN'
                    })
                } else if (command === 'stalktwitter') {
                    reply(LANGUAGE_IND.mess.wait)
                    let anu = await fetch(api('lol', '/api/twitter/' + text, {}, 'apikey'))
                    if (!anu.ok) throw await anu.text()
                    var result = await anu.json()
                    var { name, screen_name, description, profile_picture, followers, following, tweet, joined } = result.result
                    let key = "「 *STALKER TWITTER* 」\n\n"
                    key += `• _Name: ${name}_\n`
                    key += `• _Screen Name: ${screen_name}_\n`
                    key += `• _Followers: ${followers}_\n`
                    key += `• _Following: ${following}_\n`
                    key += `• _Tweet: ${tweet}_\n`
                    key += `• _Joined: ${joined}_\n`
                    key += `• _Description: ${description}_\n`
                    await aze.replyWithPhoto({
                        url: profile_picture
                    }, {
                        caption: key,
                        parse_mode: 'MARKDOWN'
                    })
                }
            }
            break 
            case "apkdownload": {
                if (isBanned) return reply(LANGUAGE_IND.mess.banned)
                if (!text) return reply(`Example: ${prefix + command} com.whatsapp`)
                reply(LANGUAGE_IND.mess.wait)
                let anu = await fetch(api('lol', '/api/apkdownloader', {package: text }, 'apikey'))
                if (!anu.ok) throw await anu.text()
                var result = await anu.json()
                var { apk_name, apk_icon, apk_version, apk_author, apk_link } = result.result
                var get_link = await aze_bot.fetchJson(`https://tinyurl.com/api-create.php?url=${apk_link}`)
                let key = "「 *APK DOWNLOADER* 」\n\n"
                key += `• _Apk Name: ${apk_name}_\n`
                key += `• _Apk Version: ${apk_version}_\n`
                key += `• _Apk Author: ${apk_author}_\n`
                key += `• _Link: ${get_link}_\n`
                await aze.replyWithPhoto({
                    url: apk_icon
                }, {
                    caption: key,
                    parse_mode: 'MARKDOWN'
                })
                aze.replyWithDocument({
                    url: apk_link,
                    filename: apk_name + '.apk'
                }, {
                    caption: LANGUAGE_IND.mess.success
                })
            }
            break
            case "mediafire": {
                if (isBanned) return reply(LANGUAGE_IND.mess.banned)   
                if (!args[0]) return reply('Masukkan Query Link!')   
                if (!isUrl(args[0])) return reply('Link Invalid')
                const youtubeDomains = ['mediafire.com', 'www.mediafire.com'];
                const url = new URL(args[0]);
                if (!youtubeDomains.includes(url.hostname)) {
                    return reply('Link bukan dari Mediafire!')
                }
                reply(LANGUAGE_IND.mess.wait)
                let anu = await fetch(api('lol', '/api/mediafire', {url: args[0] }, 'apikey'))
                if (!anu.ok) throw await anu.text()
                var result = await anu.json()
                var { filename, filetype, filesize, uploaded, link } = result.result
                let key = "「 *MEDIAFIRE DOWNLOADER* 」\n\n"
                key += `• _Type: ${filetype}_\n`
                key += `• _Size: ${filesize}_\n`
                key += `• _Upload: ${uploaded}_\n`
                await reply(key)
                if (filename.includes(".zip")) {
                    aze.replyWithDocument({
                        url: link,
                        filename: filename
                    })
                } else if (filename.includes(".mp4")) {
                    aze.replyWithVideo({
                        url: link
                    }, {
                        caption: LANGUAGE_IND.mess.success
                    })
                } else if (filename.includes(".mp3")) {
                    aze.replyWithAudio({
                        url: link,
                        filename: filename
                    })
                } else {
                    reply("_Invalid media type_")
                }
            }
            break
            case "cuaca": {
                if (isBanned) return reply(LANGUAGE_IND.mess.banned) 
                if (!text) return reply(`Example: ${prefix + command} banjar`)
                reply(LANGUAGE_IND.mess.wait)
                let anu = await fetch(api('lol', '/api/cuaca/' + text, {}, 'apikey'))
                if (!anu.ok) throw await anu.text()
                var result = await anu.json()
                var { tempat, latitude, longitude, cuaca, angin, description, kelembapan, suhu, udara, permukaan_laut } = result.result
                let key = "「 *INFORMASI CUACA* 」\n\n"
                key += `• _Tempat: ${tempat}_\n`
                key += `• _Latitude: ${latitude}_\n`
                key += `• _Longitude: ${longitude}_\n`
                key += `• _Cuaca: ${cuaca}_\n`
                key += `• _Angin: ${angin}_\n`
                key += `• _Description: ${description}_\n`
                key += `• _Kelembapan: ${kelembapan}_\n`
                key += `• _Suhu: ${suhu}_\n`
                key += `• _Udara: ${udara}_\n`
                key += `• _Permukaan Laut: ${permukaan_laut}_\n`
                await reply(key)
            }
            break
            case "nulis": {
                if (isBanned) return reply(LANGUAGE_IND.mess.banned)
                if (!text) return reply(`Example: ${prefix + command} Hello World`)
                reply(LANGUAGE_IND.mess.wait)
                let anu = await api('lol', '/api/nulis', {text: text }, 'apikey')
                aze.replyWithPhoto({
                    url: anu
                }, {
                    caption: LANGUAGE_IND.mess.success,
                    parse_mode: 'MARKDOWN'
                });

            }
            break
            case "sendnotify": {
                if (!isCreator) return reply(LANGUAGE_IND.mess.owner)
                let telegram_id = text.split('|')[0]
                let pesan = text.split('|')[1]
                if (telegram_id === OWNERID) return reply('_Id Owner Di Larang_')
                if (!pesan && !telegram_id) return reply(`Example: ${prefix + command} Id|Hallo`)
                bot.telegram.sendMessage(telegram_id, pesan, opts)
                await reply(LANGUAGE_IND.mess.success)
            }
            break 
            case "spam": {
                if (!isCreator) return reply(LANGUAGE_IND.mess.owner)
                let tel_id = text.split('|')[0]
                let count = text.split('|')[1]
                let mess = text.split('|')[2]
                if (tel_id === OWNERID) return reply('_Id Owner Di Larang_')
                if (!tel_id && !count && !mess) return reply(`Example: ${prefix + command} 123xxx|20|Hi`)
                let i = 1;
                let isWaitingDisplayed = false;
                function sendSpamMess() {
                    if (!isWaitingDisplayed) {
                        // Menampilkan pesan "Menunggu..." hanya sekali sebelum proses pengiriman pesan dimulai
                        reply("_Mengirim Spam..._");
                        isWaitingDisplayed = true;
                    }
                    bot.telegram.sendMessage(tel_id.replace(/[^0-9]/g, ''), { text: mess }, opts);
                    i++;
                    if (i <= count) {
                        setTimeout(sendSpamMess, 1000); // kirim pesan setiap 1 detik
                    } else {
                        // Menampilkan bahwa pesan spam berhasil di kirim
                        reply("_Success Spam..._");
                    }
                }
                sendSpamMess();
            }
            break
            case "translate": {
                if (isBanned) return reply(LANGUAGE_IND.mess.banned)
                if (!text) return reply(`Example: ${prefix + command} Hello World`)
                reply(LANGUAGE_IND.mess.wait)
                let anu = await fetch(api('lol', '/api/translate/auto/id', {text: text }, 'apikey'))
                if (!anu.ok) throw await anu.text()
                var result = await anu.json()
                var { to, original, translated, pronunciation } = result.result
                let key = "「 *HASIL TRANSLATE* 」\n\n"
                key += `• _From: ${result.result.from}_\n`
                key += `• _To: ${to}_\n`
                await reply(key)
                reply(original)
                reply(translated)
                reply(pronunciation)
            }
            break
            case "fetch": {
                if (isBanned) return reply(LANGUAGE_IND.mess.banned)
                if (!text) return reply(`Example: ${prefix + command} EndPoint`)
                if (!isUrl(text)) return reply('Link Invalid!')
                reply(LANGUAGE_IND.mess.wait)
                async function fetchData() {
                    try {
                        const response = await fetch(text);
                        if (!response.ok) {
                            throw new Error('Response error: ' + response.status);
                        }
                        const data = await response.json();
                        let file_name = aze_bot.getRandom("json")
                        fs.writeFile(file_name, JSON.stringify(data), (err) => {
                            if (err) {
                                console.error('Error:', err);
                            } else {
                                console.log('Response saved successfully.');
                            }
                        });
                        aze.replyWithDocument({
                            source: './' + file_name,
                            filename: 'response.json'
                        }, {
                            caption: `_${LANGUAGE_IND.mess.success}_`,
                            parse_mode: 'MARKDOWN'
                        })
                        setTimeout(() => {
                            fs.unlink(file_name, (err) => {
                              if (err) {
                                console.error('Error deleting file:', err);
                              } else {
                                console.log('File deleted successfully.');
                              }
                            });
                          }, 3000);
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }
                fetchData();
            }
            break
            case "buysourcecode": {
                aze.replyWithPhoto({
                    source: PRICE
                }, {
                    caption: '_Untuk melakukan pembelian contact_ [Click Here](https://wa.me/+6285742632270)',
                    parse_mode: "MARKDOWN"
                })
            }
            
        }
        
    } catch (e) {
        aze.reply(util.format(e))
        console.log('[ ERROR ] ' + e)
    }
}

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});