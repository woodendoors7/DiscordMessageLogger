@echo off
color 4F
echo -----
echo This will guide you through the installation of Discord Message Logger
echo by woodendoors7
echo -----
echo.
echo.
SET /P variable=Continue...
cls

echo Make sure you read the Github documentation first. 
echo This will now take you to the github page.
echo.
echo.
SET /P variable=Continue...
cls
explorer "https://github.com/woodendoors7/DiscordMessageLogger"
echo https://github.com/woodendoors7/DiscordMessageLogger opened in your browser
echo.
echo.
SET /P variable=Continue...
cls
echo Make sure you have Node.js and Node Package Manager (npm) installed, otherwise this won't work.
echo.
SET /P variable=Continue...
cls
echo This will now install discord.js and discord.js-selfbot, two needed dependencies.
echo.
SET /P variable=Continue...
cls
echo Starting install...
start cmd /c npm install discord.js
start cmd /c npm install discord.js-selfbot
echo.
echo Continue once both are installed.
SET /P variable=Continue...
cls
echo There, you are set!
echo Now just open RUN.bat or type the command yourself 
echo (to run the command yourself, change directory to the directory with index.js and type ""node index.js"")
pause
