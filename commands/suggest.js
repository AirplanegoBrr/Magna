const fs = require("fs")

module.exports = {
    name: 'suggest',
    description: 'Stops the bot',
    execute(client, Discord, message, guild) {
        var rawdata = fs.readFileSync('./data.json');
        //Use
        var data = JSON.parse(rawdata);

        //Will add old data so we can edit it
        var saveJson = data;

        var x = message.content.split(" ").slice(1).join(" ");

        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(x)
            //.setURL()
            .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
            //.setDescription("Server: " + guild.name + "\nServerID:" + guild.id + "\nMember Count:" + guild.memberCount)
            .setTimestamp()
            .setFooter('Bot by !!AirplaneGoBrr!!#1613', 'https://cdn.discordapp.com/avatars/250029754076495874/bdf3953b71edb421776e43d24e7651fe.webp');

        guild.channels.cache.get(saveJson.servers[guild.id].suggestChannel).send(exampleEmbed)
            .then(function (message) {
                if (saveJson.servers[guild.id].upvote || saveJson.servers[guild.id].downvote) {
                    message.react(saveJson.servers[guild.id].upvote);
                    message.react(saveJson.servers[guild.id].downvote);
                } else {
                    message.react("👍");
                    message.react("👎");
                }

            }).catch(function () {
                //Something
            });
        message.channel.send("Done! Added suggestion! Check it out here: <#" + saveJson.servers[guild.id].suggestChannel + ">");
    }
}