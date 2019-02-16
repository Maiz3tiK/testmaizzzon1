const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = ("*")

bot.on('ready', function () {
    bot.user.setGame("Command: *help");
    console.log("Connectedç");
});

bot.login("NTQ2NDAxODg4Nzc4ODQ2MjA5.D0n5oQ.CWo-P4IvzvJo0rs_zXURM0BH1Pc");


bot.on('message',message => {
    if (message.content === prefix + "help"){
        message.channel.sendMessage("Liste des commandes: \n -*help ");
    }

    if (message.content === "Salut"){
        message.reply("Hello here.");
        console.log("Commande Salut effectué");
    }
});
