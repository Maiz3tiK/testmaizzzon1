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
        message.channel.sendMessage("Liste des commandes: \n *sondage");
    }

    if (message.content === prefix + "infodiscord"){
        var embed = new Discord.RichEmbed()
        .setDescription("Information du discord")
        .addField("Nom du discord", message.guild.name)
        .addField("Discord crée le", message.guild.createdAt)
        .addField("Rejoins le", message.member.joinedAt)
        .addField("Nombres d'utilisateur sur le discord", message.guild.memberCount)
        .setColor("#e93b3b")
    message.channel.sendEmbed(embed)

    }

    if (message.content.startsWith(prefix + "sondage")) {
        if(message.author.is == "546401888778846209"){
            let args = message.content.split("").slice(1);
            let thingToEcho = args.join("")
            var embed = new Discord.RichEmbed()
                .setDescription("sondage")
                .addField(thingToEcho, "Répondre avec :white_check_mark: ou bien avec :x:")
                .setColor("#e93b3b")
                .setTimestamp()
            message.guild.channels.find("name", "sondage").sendEmbed(embed)
            .then(function(message) {
                message.react("✅")
                message.react("❌")
            }).catch(function() {
            });
            }else{
                return message.reply("vous ne possedez pas les droits pour utiliser cette commande")
}}})
