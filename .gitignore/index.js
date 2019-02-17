const Discord = require('discord.js');
const bot = new Discord.Client();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapters = new FileSync('database.json');
const db = low(adapters);

db.defaults({ histoires : [], xp: []}).write()

var prefix = ("+")

bot.on('ready', function () {
    bot.user.setGame("Command: +help");
    console.log("Connectedç");
});

bot.login(process.env.TOKEN);

bot.on('message', message => {
   
    var msgauthor = message.author.id
 
    if(message.author.bot)return;
 
    if(!db.get("xp").find({user : msgauthor}).value()){
        db.get("xp").push({user : msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user : msgauthor}).find("xp").value();
        console.log(userxpdb)
        var userxp = Object.values(userxpdb)
        console.log(userxp)
        console.log(`Nombre d'xp: ${userxp[1]}`)
 
        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();
 
        if(message.content === prefix + "xp"){
            var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
            var xpfinal = Object.values(xp);
            var xp_embed = new Discord.RichEmbed()
                .setTitle(`Stat des XP de : ${message.author.username}`)
                .setColor('#F4D03F')
                .addField("XP", `${xpfinal[1]} xp`)
                .setFooter("Enjoy :p")
            message.channel.send({embed : xp_embed})
        }
    }
})


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
        break;
        case "ping"
        message.channel.sendMessage('Temp de latence avec le serveur: `' + `${message.createdTimestamp - Date.now()}` + ' ms`');

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
