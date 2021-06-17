const Discord = require('discord.js-self');
const client = new Discord.Client();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require('fs');
var dltmsg;
var version = "0.0.3";
var thefilenamething = "./Settings and database/deletedmsg.json"
var data;
var options;


const sleep = (milliseconds) => {
	return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

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

		checkVer();
	});

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
			console.log("\x1b[31m\x1b[36mYou are currently running on version \x1b[46m\x1b[30m" + version + "\x1b[0m\x1b[31m\x1b[36mWhile The new version is \x1b[46m\x1b[30m" + newVersion.version + "\x1b[0m")

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
							await sleep(4000)

							var url = 'https://github.com/woodendoors7/DiscordMessageLogger';
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
					else{
						
						loadSettings()
					} 
				}
			}

		}

	}
	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", reqListener);
	oReq.open("GET", "https://raw.githubusercontent.com/woodendoors7/DiscordMessageLogger/main/version.json");
	oReq.send();
}


async function loadSettings() {
	console.log("\x1b[1mApplying settings . . .\n")
	console.log("\x1b[41m(make sure you have edited SETTINGS.json properly, otherwise this will fail)\x1b[0m\n")
	options = { token: data["login"].token, serverWhitelist: data["options"].serverWhitelist, logschannelID: data["options"].logsChannelID }
	await sleep(1000)
	var people = [["TOKEN:", "********"], ["Whitelist IDs:", options.serverWhitelist.length + " servers chosen"], ["Logs channel ID:", options.logschannelID], ["Logs to JSON:", "Enabled"]]
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

	let Embed = new Discord.MessageEmbed({
		"plainText": "New message logged!",
		"title": "New message deleted!",
		"description": "New message deleted in **" + messageToLog.serverName + "**",
		"color": 53380,
		"thumbnail": messageToLog.serverIcon,
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
	client.channels.cache.get(channelID).send(Embed);
}

function loginAccount(tokenToLogin, test) {
	console.log("\n\x1b[43m\x1b[30mUnloading tokens from memory. . .\x1b[0m\n")
	console.log("\x1b[36mLogging in into your account. . .\x1b[0m\n\x1b[2m (this might take a minute)\x1b[0m\n")
	client.login(tokenToLogin);
	options["token"] = "";
	tokenToLogin = "";

}

