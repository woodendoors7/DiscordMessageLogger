   const Discord = require('discord.js-self');
const client = new Discord.Client();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require('fs');
var dltmsg;
var version = "0.1.1";
var thefilenamething = "./Settings and database/deletedmsg.json"
var data;
var options;
let Embed;
const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}
client.on('ready', () => {
	console.clear()
	console.log("\n\n\n\n")
	console.log(`     ╔══════════\n     ║\x1b[32mSUCCESS!\x1b[0m\n     ║Logged in as \x1b[31m${client.user.tag}\x1b[0m!\n     ╚══════════`);
});
beginFunc();
function beginFunc() {
	console.clear();
	console.log(`%c \x1b[31m\n
 ██████╗ ██╗███████╗ ██████╗ ██████╗ ██████╗ ██████╗         
 ██╔══██╗██║██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔══██╗        
 ██║  ██║██║███████╗██║     ██║   ██║██████╔╝██║  ██║         
 ██║  ██║██║╚════██║██║     ██║   ██║██╔══██╗██║  ██║        
 ██████╔╝██║███████║╚██████╗╚██████╔╝██║  ██║██████╔╝        
 ╚═════╝ ╚═╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝         
 ███╗   ███╗███████╗███████╗███████╗ █████╗  ██████╗ ███████╗
 ████╗ ████║██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝ ██╔════╝
 ██╔████╔██║█████╗  ███████╗███████╗███████║██║  ███╗█████╗  
 ██║╚██╔╝██║██╔══╝  ╚════██║╚════██║██╔══██║██║   ██║██╔══╝  
 ██║ ╚═╝ ██║███████╗███████║███████║██║  ██║╚██████╔╝███████╗
 ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝															
 ██╗      ██████╗  ██████╗  ██████╗ ███████╗██████╗          
 ██║     ██╔═══██╗██╔════╝ ██╔════╝ ██╔════╝██╔══██╗         
 ██║     ██║   ██║██║  ███╗██║  ███╗█████╗  ██████╔╝         
 ██║     ██║   ██║██║   ██║██║   ██║██╔══╝  ██╔══██╗         
 ███████╗╚██████╔╝╚██████╔╝╚██████╔╝███████╗██║  ██║         
 ╚══════╝ ╚═════╝  ╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝         `, "font-family:monospace")
	console.log("\x1b[1m\x1b[35mDiscord Message Logger \x1b[0m\x1b[36mVersion " + version)
	console.log("\x1b[33mby woodendoors7")
	console.log('\x1b[0m\x1b[32m\n    Press any key to load your settings');
	process.stdin.setRawMode(true);
	process.stdin.resume();
	process.stdin.on('data', function () {
		process.stdin.setRawMode(false);
		process.stdin.end()
		process.stdin.removeAllListeners()
		sleep(100)
		startFunc()
	});
}
function startFunc() {
	console.clear()
	console.log("\x1b[1mLoading settings . . .\n")
	fs.readFile("./Settings and database/SETTINGS.json", function (error, content) {
		data = JSON.parse(content);
		checkVer();
	});
}
async function loadSettings() {
	console.clear()
	console.log("\x1b[1mApplying settings . . .\n")
	console.log("\x1b[41m(make sure you have edited SETTINGS.json properly, otherwise this will fail)\x1b[0m\n")
	options = { token: data["login"].token, serverWhitelist: data["options"].serverWhitelist, deletedChannelID: data["options"].deletedChannelID, editedChannelID: data["options"].editedChannelID, editedChannelWebhook: data["userSettings"].editedChannelWebhook, deletedChannelWebhook: data["userSettings"].deletedChannelWebhook, logschannelID: data["options"].logsChannelID, webhookSetting: data["userSettings"].webhookOrUser, webhookURL: data["userSettings"].webHookUrl }

	await sleep(1000)
	var people = [["TOKEN:", "********"], ["Whitelist IDs:", options.serverWhitelist.length + " servers chosen"], ["Logs channel ID:", options.logschannelID], ["Logs to JSON:", "Enabled"]]
	console.table(people)
	loginAccount(options.token, "test");
}

client.on('message', message => {

});

client.on('messageUpdate', (oldMessage, newMessage) => {
	if (oldMessage.content != newMessage.content) {
		if (options.serverWhitelist.includes(oldMessage.guild.id)) {
			let dltmsg = require(thefilenamething)
			dltmsg[oldMessage.id] = {
				messageAuthor: `${oldMessage.author.tag}`,
				messageContent: `${oldMessage.content}`,
				newMessageContent: `${newMessage.content}`,
				serverName: `${oldMessage.guild.name}`,
				serverId: `${oldMessage.guild.id}`
			}
			dltmsg1 = {
				messageAuthor: `${oldMessage.author.tag}`,
				messageContent: `${oldMessage.content}`,
				newMessageContent: `${newMessage.content}`,
				serverName: `${oldMessage.guild.name}`,
				serverId: `${oldMessage.guild.id}`,
				serverIcon: `${oldMessage.guild.iconURL()}`,
				channelName: `${oldMessage.channel.name}`
			}
			const stringified = JSON.stringify(dltmsg, null, 4, '\t\n');
			createEmbed(dltmsg1, 'edit')
		}
	}
})
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
			channelName: `${messageDelete.channel.name}`,
		}
		if (messageDelete.attachments.size > 0) {
			dltmsg1["attachmentImage"] = `${messageDelete.attachments.array()[0].url}`
		}
		const stringified = JSON.stringify(dltmsg, null, 4, '\t\n');
		createEmbed(dltmsg1, 'delete')
	}
});
async function createEmbed(messageToLog, editOrDelete) {
	if (editOrDelete == "delete") {
		Embed = new Discord.MessageEmbed({
			"plainText": "New message logged!",
			"title": "New message deleted!",
			"description": "New message deleted in **" + messageToLog.serverName + "**",
			"color": "ff0000",
			"thumbnail": messageToLog.attachmentImage,
			"image": "https://cdn.discordapp.com/attachments/798818231036805163/855880350639456256/italysteak.png",
			"fields": [
				{
					"name": "Details:",
					"value": "**Channel:** " + messageToLog.channelName + "\n**Server:** " + messageToLog.serverName + "\n**Author:** " + messageToLog.messageAuthor + "\n\n",
					"inline": false
				},
				{
					"name": "Message:",
					"value": "```\n" + messageToLog.messageContent + "\n```",
					"inline": false
				}
			]
		})
		Embed.setImage(messageToLog.attachmentImage)
		await sleep(100)
		if (options.webhookSetting == "webhook") {
			logWithWebhook(options.logschannelID, Embed, "deleted")
		}
		if (options.webhookSetting == "user") {
			logInChannel(options.logschannelID, Embed, "deleted")
		}
		console.clear();
		console.log("\n\n\n\n")
		console.log(`     ╔══════════\n     ║\x1b[32mSUCCESS!\x1b[0m\n     ║Logged in as \x1b[31m${client.user.tag}\x1b[0m!\n     ╚══════════`);
		if (messageToLog.messageContent.length < 10) {
			console.log("\x1b[32m\n\n\n              Last removed message: ")
			console.log("\x1b[35m             ╔═════════════════════════════╗\n\x1b[35m             ║\x1b[0m\x1b[36mServer name:\x1b[31m " + messageToLog.serverName + "\n\x1b[35m             ║\x1b[0m\x1b[36mAuthor:\x1b[31m " + messageToLog.messageAuthor + "\n\x1b[35m             ║\x1b[0m\x1b[36mLogged message:\x1b[31m " + messageToLog.messageContent + "\x1b[35m\n             ╚═════════════════════════════╝\x1b[0m")
		} else {
			console.log("\x1b[32m\n\n\n              Last removed message: ")
			console.log("\x1b[35m             ╔═════════════════════════════╗\n\x1b[35m             ║\x1b[0m\x1b[36mServer name:\x1b[31m " + messageToLog.serverName + "\n\x1b[35m             ║\x1b[0m\x1b[36mAuthor:\x1b[31m " + messageToLog.messageAuthor + "\n\x1b[35m             ║\x1b[0m\x1b[31mMessage was too long\x1b[35m\n             ╚═════════════════════════════╝\x1b[0m")
		}
	} else {
		Embed = new Discord.MessageEmbed({
			"plainText": "New message logged!",
			"title": "New message edited!",
			"description": "New message edited in **" + messageToLog.serverName + "**",
			"color": 53380,
			"thumbnail": messageToLog.serverIcon,
			"fields": [
				{
					"name": "Details:",
					"value": "**Channel:** " + messageToLog.channelName + "\n**Server:** " + messageToLog.serverName + "\n**Author:** " + messageToLog.messageAuthor + "\n\n",
					"inline": false
				},
				{
					"name": "Old Message:",
					"value": "```\n" + messageToLog.messageContent + "\n```",
					"inline": true
				},
				{
					"name": "New Message:",
					"value": "```\n" + messageToLog.newMessageContent + "\n```",
					"inline": true
				}
			]
		})
		await sleep(200)
		if (options.webhookSetting == "webhook") {
			logWithWebhook(options.logschannelID, Embed, "edited")
		} else if (options.webhookSetting == "user") {
			logInChannel(options.logschannelID, Embed, "edited")
		}
	}
}
function logWithWebhook(channelID, Embed, deletedOrNot) {
	if (deletedOrNot == "deleted") {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", options.deletedChannelWebhook, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(JSON.stringify({
			content: "New message logged!",
			embeds: [Embed]
		}));
	} else {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", options.editedChannelWebhook, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(JSON.stringify({
			content: "New message logged!",
			embeds: [Embed]
		}));
	}

}
function logInChannel(channelID, Embed, deletedOrNot) {
	if (deletedOrNot == "deleted") {
		client.channels.cache.get(options.deletedChannelID).send(Embed).catch((error) => {
			console.error(error);
		});
	} else {
		client.channels.cache.get(options.editedChannelID).send(Embed).catch((error) => {
			console.error(error);
		});
	}
}
function loginAccount(tokenToLogin, test) {
	console.log("\n\x1b[43m\x1b[30mUnloading tokens from memory. . .\x1b[0m\n")
	console.log("\x1b[36mLogging in into your account. . .\x1b[0m\n\x1b[2m   (this might take a minute)\x1b[0m\n")
	client.login(tokenToLogin);
	options["token"] = "";
	tokenToLogin = "";
}
function checkVer() {
	function reqListener() {
		var newVersion = this.responseText;
		var newVersion = JSON.parse(newVersion);
		if (newVersion.version == version.toString()) {
			console.log("\x1b[31mUp to date! \x1b[36mVersion " + version)
			loadSettings();
		}
		else {
			console.log("\x1b[31mNew version found!\x1b[0m")
			console.log("Changelog: \x1b[32m\n\n"+newVersion.changelog+"\n")

			console.log("\x1b[31m\x1b[36mYou are currently running on version \x1b[46m\x1b[30m" + version + "\x1b[0m\x1b[31m\x1b[36m, while The new version is \x1b[46m\x1b[30m" + newVersion.version + "\x1b[0m")
			const readline = require('readline').createInterface({
				input: process.stdin,
				output: process.stdout
			});
			readline.question('Do you want to download it? (yes/no)  ', data => {
				checkForInput(data)
				readline.close();
			});
			async function checkForInput(data) {
				if (data) {
					if (data.toLowerCase() == "y" || data.toLowerCase() == "yes") {
						if (newVersion.manual == "true") {
							console.clear();
							console.log("\n\n\x1b[31mUh, Oh!\x1b[0m\nThis update probably includes multiple files being changed.\n\x1b[1mPlease download it manually.")
							console.log("\x1b[1m\x1b[31mCHANGELOG: \n\x1b[0m" + newVersion.changelog)
							await sleep(3000)
							var url = 'https://codeload.github.com/woodendoors7/DiscordMessageLogger/zip/refs/heads/main';
							var start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
							require('child_process').exec(start + ' ' + url);
						}
						else {
							var oReq = new XMLHttpRequest();
							oReq.addEventListener("load", replaceFile);
							oReq.open("GET", "https://raw.githubusercontent.com/woodendoors7/DiscordMessageLogger/main/index.js");
							oReq.send();
							function replaceFile() {
								var downloadedData = this.responseText;
								if (downloadedData) {
									console.clear();
									console.log("\nDownloading data . . . \n")
									fs.writeFile("index.js", downloadedData, (err) => {
										if (err) {
											throw err;
										}
										console.log("\x1b[36mThe file has been saved.\x1b[0m\nPlease restart the logger.")
									});
								}
							}
						}
					}
					else {
						loadSettings()
					}
				}
			}
		}
	}
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", reqListener);
	oReq.open("GET", "https://raw.githubusercontent.com/woodendoors7/DiscordMessageLogger/main/version.json?test");
	oReq.send();
}
