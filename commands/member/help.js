module.exports = {
    name: 'help',
    description: 'help command.',
    execute(client, Discord, message, guild) {
        const example = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Help")
            //.setURL()
            .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
            //.setDescription("Server: " + guild.name + "\nServerID:" + guild.id + "\nMember Count:" + guild.memberCount)
            .setTimestamp()
            .setFooter('Bot by !!AirplaneGoBrr!!#1613', 'https://cdn.discordapp.com/avatars/250029754076495874/bdf3953b71edb421776e43d24e7651fe.webp');


        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Help command")
            .setURL("https://cdn.discordapp.com/avatars/250029754076495874/bdf3953b71edb421776e43d24e7651fe.webp")
            .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
            //.setDescription('Some description here')
            //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
            .addFields(
                //{ name: 'Regular field title', value: 'Some value here' },
                //{ name: '\u200B', value: '\u200B' },
                //{ name: 'Inline field title', value: 'Some value here', inline: true },
                //{ name: 'Inline field title', value: 'Some value here', inline: true },
                { name: "help" , value: "Shows this message!", inline: true },
                { name: "suggest", value: "Suggest a suggestion!", inline: true },
                { name: "Admin Commands"},
                { name: "channel", value: "set the suggestion channel (this will be replaced with config!)"},
                { name: "kick", value: "Kick the pinged user. Will send them a DM"},
                { name: "unban", value: "unban the ID of the user (needs the users ID)"},
                { name: "ban", value: "Ban the pinged user. Will send them a DM"},
                { name: "config", value: "Set some stuff!"}
            )
           //.setImage('https://i.imgur.com/wSTFkRM.png')
            .setTimestamp()
            .setFooter('Bot by !!AirplaneGoBrr!!#1613', 'https://cdn.discordapp.com/avatars/250029754076495874/bdf3953b71edb421776e43d24e7651fe.webp');

        message.channel.send(Embed);

    }
}