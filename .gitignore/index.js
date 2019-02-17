const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = ("+")

bot.on('ready', function () {
    bot.user.setGame("Command: +help");
    console.log("Connectedç");
});

bot.login(process.env.TOKEN);


bot.on('message',message => {
    if (message.content === prefix + "help"){
        message.channel.sendMessage("Liste des commandes: \n +infodiscord \n +ping \n +rank");
    }

    if (message.content === prefix + "infodiscord"){
        var embed = new Discord.RichEmbed()
        .setDescription("**Infos Discord**")
        .addField("Nom du discord", message.guild.name)
        .addField("Discord crée le", message.guild.createdAt)
        .addField("Rejoins le", message.member.joinedAt)
        .addField("Nombres d'utilisateur sur le discord", message.guild.memberCount)
        .setColor("#fffbfa")
    message.channel.sendEmbed(embed)

    }

    if (message.content.startsWith(prefix + "sondage")) {
        if(message.author.id == "381939268718690305"){
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
