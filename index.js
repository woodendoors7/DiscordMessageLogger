const Discord = require('discord.js-self');
	const client = new Discord.Client();
	const fs = require('fs');
	var dltmsg;
	var thefilenamething = "./Settings and database/deletedmsg.json"
	var data;
	var options;
	
	
	const sleep = (milliseconds) => {
	    return new Promise(resolve => setTimeout(resolve, milliseconds))
	}
	
	client.on('ready', () => {
	    console.clear()
	    console.log("\n\n\n\n")

		console.log(`     ╔══════════\n     ║\x1b[32mSUCCESS!\x1b[0m\n     ║Logged in as \x1b[31m${client.user.tag}\x1b[0m!\n     ╚══════════`);
	});
	
	startFunc();

	function startFunc() {
        console.clear()
	    console.log("\x1b[1mLoading settings . . .\n")
	    fs.readFile("./Settings and database/SETTINGS.json", function (error, content) {
	        data = JSON.parse(content);
	        loadSettings();
	    });
	
	}
	
	async function loadSettings() {
	    console.log("\x1b[1mApplying settings . . .\n")
	    console.log("\x1b[41m(make sure you have edited SETTINGS.json properly, otherwise this will fail)\x1b[0m\n")
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
	    client.channels.cache.get(channelID).send(Embed);
	}
	
	function loginAccount(tokenToLogin, test) {
		console.log("\n\x1b[43m\x1b[30mUnloading tokens from memory. . .\x1b[0m\n")
	    console.log("\x1b[36mLogging in into your account. . .\x1b[0m\n\x1b[2m (this might take a minute)\x1b[0m\n")
	    client.login(tokenToLogin);
	    options["token"] = "";
	    tokenToLogin = "";
	    
	}
	
