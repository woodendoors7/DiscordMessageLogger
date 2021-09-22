# Discord Message Logger Beta 0.1.0

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/woodendoors7/DiscordMessageLogger/graphs/commit-activity)
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
[![GitHub release](https://img.shields.io/badge/Version-0.1.0-blue)](https://GitHub.com/woodendoors7/DiscordMessageLogger/releases/)

Discord Message Logger is a Discord.JS self bot that logs deleted messages of servers you are in.

# BIG PLANS!

**I am currently working on giving the app an UI and trying to switch from Discord.js to coding a web socket connection ourselves.**

<div class="topDiv"> <img class="profileImg" src="https://cdn.discordapp.com/avatars/427861168284106762/5913153f6f32c41cafd25246d2f44d64.png?size=4096" alt=""> <div class="textDiv"> <p class="textPar">Message</p></div><div class="serverBack"></div><img src="https://cdn.discordapp.com/emojis/814655058385436672.png?v=1" class="serverImg"></img> <p class="authorName">Author: woodendoors7#6052</p><p class="serverChannel">Channel: #general</p><p class="serverName">Server: Pog Server</p><p class="messageID">Message ID: 192312381231</p><form action="https://youtu.be/dQw4w9WgXcQ"> <button class="buttonServer" type="submit">Button</button> </form></div><style>@font-face{font-family: "Whitney"; src: url("https://cdn.discordapp.com/attachments/808366944830619669/890323968224018472/whitneybook.otf");}.authorName{position: absolute; width: 278px; height: 23px; left: 53px; top: 13px; margin-top: 0%; font-family: Whitney; font-style: normal; font-weight: 500; font-size: 14px; line-height: 16px; color: #FFFFFF; text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);}.buttonServer{position: absolute; width: 124px; height: 15px; left: 530px; top: 67px; font-family: Whitney; background: #C4C4C4; border-radius: 30px; font-size: 10px; padding: 0;}.messageID{position: absolute; width: 124px; height: 11px; left: 530px; top: 17px; font-family: Whitney; font-style: normal; font-weight: 500; font-size: 8px; line-height: 9px; color: #FFFFFF;}.serverName{position: absolute; width: 200px; height: 9px; left: 530px; top: 28px; font-family: Whitney; font-style: normal; font-weight: 500; font-size: 8px; line-height: 9px; color: #FFFFFF;}.serverChannel{position: absolute; width: 200px; height: 9px; left: 530px; top: 39px; font-family: Whitney; font-style: normal; font-weight: 500; font-size: 8px; line-height: 9px; color: #FFFFFF;}.serverBack{position: absolute; width: 160px; height: 82px; left: 512px; top: 9px; background: #2E2E2E; border-radius: 30px;}.serverDiv{position: absolute; width: 160px; height: 82px; left: 512px; top: 9px;}.serverImg{position: absolute; width: 23px; height: 23px; left: 639px; top: 18px; background: url(ca8f095b0f8a458ccec03ba6228a9f7c.png); border-radius: 71px;}</style><style>.profileImg{position: absolute; width: 30px; height: 30px; left: 17px; top: 13px; background: url(5913153f6f32c41cafd25246d2f44d64.png); border: 1px solid #666666; box-sizing: border-box; border-radius: 26px;}.textPar{position: absolute; width: 400px; height: 32px; left: 20px; top: 5px; margin-top: 7px; font-family: Whitney; font-style: normal; font-weight: 500; font-size: 14px; line-height: 16px; color: #FFFFFF;}.textDiv{position: absolute; width: 437px; height: 52px; left: 53px; top: 39px; background: #3E3E3E; border-radius: 20px;}.topDiv{position: absolute; width: 691px; height: 100px; /*left: 65px; top: 138px;*/ background: #464545; border: 1px solid #000000; box-sizing: border-box; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); border-radius: 30px;}</style>

*I kinda dislike CSS so I helped myself with Figma*


## How to use

**Warning:** I am not responsible for any account suspension caused by self-botting.
You are using this script with your own responsibility

**Installation:**
Make sure that you have [NODE.js](https://nodejs.org) and [Node Package Manager (npm)](https://nodejs.org) installed on your computer.

Run the `SETUP.bat` file, or type these commands line by line in Command Prompt (CMD):
```
npm install discord.js
npm install discord.js-self
npm install xmlhttprequest
```
**Set up:** Open the `Settings and database` folder. Open the file `SETTINGS.json` in a text editor, preferably a text editor designed to edit JSON.

1. Put your discord token into the `token` part in the JSON. ([how to get your discord token]())
2. Whitelist the servers that you want to log by copying their IDs and putting them into `serverWhitelist`. You can add more lines, make sure each is separated by a comma
3. Put the ID of the channel you want to log the messages in into `logsChannelID`. Make sure that it is a private server, otherwise, someone might report you for breaking TOS


**Starting:** Open the `START.bat` file, or type `node index.js` in cmd. Wait for it to load your settings and log on, this can take a minute. Once It's logged in, you can try it. 




### License
[MPL 2.0](https://choosealicense.com/licenses/mpl-2.0/)

