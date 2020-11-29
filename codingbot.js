const {Discord, Client, ReactionCollector} = require('discord.js');
const rps = require('./rockpaperscissors.js');
const fs = require('fs');

const bot = new Client({
    ws: {
        intents: ['GUILD_MESSAGES', 'GUILDS', 'GUILD_MESSAGE_REACTIONS']
    },
    partials: ['MESSAGE','CHANNEL','REACTION','USER']
});

bot.on('ready', () => {
    console.log("Bonjour");
});

bot.on('message', function(message) {
    let fair = -1;
    if(message.content.toLowerCase().startsWith("bennison fair rps")) {
        fair = false;
    }
    if(message.content.toLowerCase().startsWith("bennison rigged rps")) {
        fair = true;
    }

    if(fair == true || !fair) {
        let filter = m => m.author.id === message.author.id;
        message.channel.send("Rock, paper, or scissors?").then(() => {
            message.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            })
            .then(response => {
                response = response.first();
                if(response.content.toLowerCase() == 'rock' || response.content.toLowerCase() == 'paper' || response.content.toLowerCase() == 'scissors') {
                    message.channel.send(rps.reply(response.content, fair));
                }
            }).catch(collected => {
                console.log(collected);
                message.channel.send("Your rock paper scissors game timed out.");
            })
        })
    } 

})

bot.on('messageReactionAdd', async (messageReaction, user) => {
    if (messageReaction.message.partial) await messageReaction.message.fetch();
    if (messageReaction.partial) await messageReaction.fetch();
    if (user.partial) await user.fetch();

    if (messageReaction.message.channel.id == '776151200805683260') {
        
    }
});


const secret = fs.readFileSync("secret.txt","utf8");
bot.login(secret);

