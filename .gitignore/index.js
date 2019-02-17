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

if(message.content.startsWith(prefix + "giveaway")) {
      

    var messageArray = message.content.split(" ");
    var time;
    var gagnant;
        gagnant = Number(messageArray[1]);      
        if(!gagnant) return message.reply("**ERREUR**\n__MAUVAIS USAGE!__\n**Combien y aura-t-il de gagnants? **\n\nExemple d'utilisation:\n`r!giveaway 1 120 un superbe t-shirt!`");  // verification pour les gagnants
     if(isNaN(gagnant)) return message.reply("**ERREUR**\n__MAUVAIS USAGE!__\n**Combien y aura-t-il de gagnants? **\n\nExemple d'utilisation:\n`r!giveaway 1 120 un superbe t-shirt!`");
    
        time = Number(messageArray[2]);
        if(!time) return message.reply("**ERREUR**\n__MAUVAIS USAGE!__\nQuel est la durée de votre giveaway en seconde?\n\nExemple d'utilisation:\n`r!giveaway 1 120 un superbe t-shirt!`")
        if(isNaN(time)) return message.reply("**ERREUR**\n__MAUVAIS USAGE!__\nQuel est la durée de votre giveaway en seconde?\n\nExemple d'utilisation:\n`r!giveaway 1 120 un superbe t-shirt!`")  // verification pour le timer en seconde

    let pari = message.content.split(" " + gagnant + " " + time + " ").slice(1);
            var item = pari
            if(!item) return message.reply("**ERREUR**\n__MAUVAIS USAGE!__\n**Que voulez-vous faire gagner?**\n\nExemple d'utilisation:\n`r!giveaway 60 1 un superbe t-shirt!`");  // verification pour le prix (si rien ne se passe il va rien afficher)

          
            let member = message.author
            var embedgiveaway = new Discord.RichEmbed() //création de l'embed d'annonce du giveaway
            .setAuthor(member.username, member.displayAvatarURL)
            .addField(":tada: GIVEAWAY ! :tada:", "** **") 
            .addField("Prix:", `** ${item} **`)
            .addField("Nombre de gagnants :", `** ${gagnant} ** gagnant(s)`)
            .addField("Fin du Giveaway dans:", `**${time}** secondes`)
            .addField("Pour participer, réagissez avec :tada: !!", "** **")
            .setFooter(`Giveaway`)
            .setTimestamp()
            var embedgiveawaySent = await message.channel.send(embedgiveaway);
embedgiveawaySent.react("\uD83C\uDF89"); // un emoji :tada: en unicode

            setTimeout(function() {
              embedgiveawaySent.reactions.forEach(r=>r.remove(bot.user));
             var peopleReacted = embedgiveawaySent.reactions.get("\uD83C\uDF89").users.array(); // vérification des users dans la liste des réacts
              var winners = embedgiveawaySent.reactions.get("\uD83C\uDF89").count
             var inodex = Math.floor(Math.random() * peopleReacted.length); // tirage au sort
              
             var ggg = [];
             var gggmessage = "";  
             for (var i = 0; i < gagnant; i++){
            ggg.push(peopleReacted[inodex]);
            inodex = Math.floor(Math.random() * peopleReacted.length);
             }
             for (var i = 0; i < ggg.length; i++){
                 if (ggg[i].id === bot.user.id){
                 ggg.slice(i, 1);
                     continue;
                 }
               gggmessage += (ggg[i].toString() + " ");
             }
              
          
             var haveHas = "a";  // changement pour du pluriel si nécessaire
              var Win = "NOUVEAU GAGNANT"
             if (ggg.length == 1){
                 haveHas = " vient de gagner: ";
               var Win = "NOUVEAU GAGNANT";
             }else{
                 haveHas = " viennent de gagner: ";
              var Win = "NOUVEAUX GAGNANTS";
             }
             let gigg = ggg
             
             if(gagnant > winners) { // si il y a moins de participants que le nombre de winner
               message.channel.send("Malheureusement, pas assez de personne ont pu être sélectionné,\nVous avez demandé` " + gagnant + " `possibles gagnant(s) mais vous avez eu que `" + winners + "` participant(s)")
             return;
             }
             
             message.channel.send(":tada: " + Win + " ! :tada: \n\n" + gigg  + haveHas + " " + `${item}`); // anonce du gagnant
            }, time * 1000);
    
    
       setTimeout(function() { 
    embedgiveawaySent.reactions.forEach(r=>r.remove(bot.user));
    }, time * 950)  // pour éviter que le bot s'auto choisit lor du tirage, il retire sa réaction peu avant le tirage, si il n'y a pas de participant il s'auto choisit quand meme!
    
        }
