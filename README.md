# Discord Message Logger Alpha 0.0.1

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/woodendoors7/DiscordMessageLogger/graphs/commit-activity)
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
[![GitHub release](https://img.shields.io/badge/Version-0.0.1-blue)](https://GitHub.com/woodendoors7/DiscordMessageLogger/releases/)

Discord Message Logger is a Discord.JS self bot that logs deleted messages of servers you are in.


**Warning:** I am not responsible for any account suspension caused by self-botting.
You are using this script with your own responsibility


## How to use

**Installation:**
Make sure that you have [NODE.js](https://nodejs.org) and [Node Package Manager (npm)](https://nodejs.org) installed on your computer.

Run the `SETUP.bat` file, or type these commands line by line in Command Prompt (CMD):
```
npm install discord.js
npm install discord.js-self
```
**Set up:** Open the `Settings and database` folder. Open the file `SETTINGS.json` in a text editor, preferably a text editor designed to edit JSON.

1. Put your discord token into the `token` part in the JSON. ([how to get your discord token]())
2. Whitelist the servers that you want to log by copying their IDs and putting them into `serverWhitelist`. You can add more lines, make sure each is separated by a comma
3. Put the ID of the channel you want to log the messages in into `logsChannelID`. Make sure that it is a private server, otherwise, someone might report you for breaking TOS


**Starting:** Open the `START.bat` file, or type `node index.js` in cmd. Wait for it to load your settings and log on, this can take a minute. Once It's logged in, you can try it. 




### License
[MPL 2.0](https://choosealicense.com/licenses/mpl-2.0/)

