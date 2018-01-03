var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {colorize: true});

logger.level = 'debug';

// #####################################
//       FILL THIS WITH DATA
// #####################################
const admins = []; // example: ["name","name2","name3"]
const SID = ''; // server id
const queueCID = '': // queue channel id
const raidinCID = ''; // raiding channel id
const COMMANDNAME = ''; // word to use as command example 'movequeue'

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`	
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
			case 'hello':
				bot.sendMessage({
					to: channelID,
					message: 'Hello, human!'
				});
				logger.info(user + ' saluted the bot.');
            break;
			case 'exit':
				if(isAdmin(user)){
					bot.sendMessage({
						to: channelID,
						message: 'Okay, bye.'
					});
					logger.info('Bot has been disconnected by ' + user);
					bot.disconnect();
				}
            break;
			case COMMANDNAME:
				if(isAdmin(user)){
					var arrayKeys = Object.keys(bot.servers['392908610813820929'].channels['392908610813820933'].members);
					for(var y=0; y<arrayKeys.length;y++){
						bot.moveUserTo({
							serverID: '392908610813820929',
							userID: arrayKeys[y],
							channelID: '397834794857267201',
						});
					}
				}
				logger.info(user + ' moved everyone from queue.');
            break;
            // Just add any case commands if you want to..
        }
    }
});

function isAdmin(user){
	for(var x=0; x<admins.length; x++){
		if(user == admins[x]){
			return true;
		}
	}
	return false;
}
