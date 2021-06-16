const Discord = require('discord.js-selfbot');
const client = new Discord.Client();
const fs = require('fs');
var dltmsg;
var thefilenamething = "./database/deletedmsg.json"
var data;
var options;


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


client.on('ready', () => {
    console.clear()
    console.log("\n\n\n\n")
    console.log(`     ╔══════════\n     ║SUCCESS!\n     ║Logged in as ${client.user.tag}!\n     ╚══════════`);
});


startFunc();





function startFunc() {
    console.log("Loading settings . . .\n")
    fs.readFile("./Settings and database/SETTINGS.json", function (error, content) {
        data = JSON.parse(content);

        loadSettings();
    });
}

async function loadSettings() {
    console.log("Applying settings . . .\n")
    console.log("(make sure you have edited SETTINGS.json properly, otherwise this will fail)\n")

    options = { token: data["login"].token, serverWhitelist: data["options"].serverWhitelist, logschannelID: data["options"].logsChannelID }
    await sleep(1000)

    var people = [["TOKEN:", "*****..."], ["Whitelist IDs:", options.serverWhitelist.length + " servers chosen"], ["Logs channel ID:", options.logschannelID], ["Logs to JSON:", "Enabled"]]
    console.table(people)
    loginAccount(options.token, "test");
}






client.on('message', message => {

});

client.on("messageDelete", (messageDelete) => {

    if (options.serverWhitelist.includes(messageDelete.guild.id)) {
        let dltmsg = require(thefilenamething)

        dltmsg[messageDelete.id] = {
            messageAuthor: `${messageDelete.author.tag}`,
            messageContent: `${messageDelete.content}`,
            serverName: `${messageDelete.guild.name}`,
            serverId: `${messageDelete.guild.id}`
        }

        dltmsg1 = {
            messageAuthor: `${messageDelete.author.tag}`,
            messageContent: `${messageDelete.content}`,
            serverName: `${messageDelete.guild.name}`,
            serverId: `${messageDelete.guild.id}`,
            serverIcon: `${messageDelete.guild.iconURL()}`,
            channelName: `${messageDelete.channel.name}`
        }


        const stringified = JSON.stringify(dltmsg, null, 4, '\t\n');


        fs.writeFile(thefilenamething, stringified, (err) => {

            if (err) {
                throw err;
            }
            console.log("Money set");

            logInChannel(options.logschannelID, dltmsg1)
        });
    }

});



function logInChannel(channelID, messageToLog) {

    let Embed = new Discord.MessageEmbed(  {
        "plainText": "New message logged!",
        "title": "New message deleted!",
        "description": "New message deleted in **" + messageToLog.serverName+"**",
        "color": 53380,
        "thumbnail": messageToLog.serverIcon,
        "fields": [
            {
                "name": "Details:",
                "value": "**Channel:** " + messageToLog.channelName + "\n**Server:** " + messageToLog.serverName + "\n**Author:** " + messageToLog.messageAuthor+"\n\n",
                "inline": false
            },
            {
                "name": "Message:",
                "value": "```\n"+ messageToLog.messageContent+"\n```",
                "inline": false
            }
        ]
    })
console.log(messageToLog.serverIcon)

    client.channels.cache.get(channelID).send(Embed);
}


function loginAccount(tokenToLogin, test) {

    console.log("Logging in into your account. . .\n (this might take a minute)\n")
    client.login(tokenToLogin);

    options["token"] = "";
    tokenToLogin = "";
    console.log("Tokens cleared out of the memory . . .\n")
}
