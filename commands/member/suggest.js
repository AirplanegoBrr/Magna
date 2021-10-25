const fs = require("fs")
const other = require("../../other")

module.exports = {
    name: 'suggest',
    description: 'Suggest something!',
    long_description: 'Will add suggestion to the seggestion channel if one is set',
    permissions: [],
    args: ['suggestion'],
    usage: 'suggest <suggestion>',
    type: 'member',
    async execute(client, Discord, message, guild) {
        var channelID = await other.get(guild.id, "suggestion_channel")
        var channel = message.guild.channels.cache.find(channel => channel.id === channelID)
        if (channel) {
            var x = message.content.split(" ").slice(1).join(" ");
            const exampleEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(x)
                //.setURL()
                .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
                //.setDescription("Server: " + guild.name + "\nServerID:" + guild.id + "\nMember Count:" + guild.memberCount)
                .setTimestamp()
                .setFooter('Bot by !!AirplaneGoBrr!!#1613', 'https://cdn.discordapp.com/avatars/250029754076495874/bdf3953b71edb421776e43d24e7651fe.webp');

            channel.send(exampleEmbed)
                .then(async (sugMsg)=> {
                    var upvote = await other.get(guild.id, "upvote");
                    var downvote = await other.get(guild.id, "downvote");
                    if (upvote || downvote) {
                        sugMsg.react(upvote);
                        sugMsg.react(downvote);
                    } else {
                        sugMsg.react("👍");
                        sugMsg.react("👎");
                    }

                }).catch((err)=> {
                    console.log(err)
                    //Something
                });

            message.channel.send("Done! Added suggestion! Check it out here: <#" + channel + ">");
        } else {
            message.channel.send("We don't have a suggestion channel set. Tell an admin to set one with **m!config suggestion_channel <channel@>**");
        }
    }
}