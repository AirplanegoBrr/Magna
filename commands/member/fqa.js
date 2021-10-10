module.exports = {
    name: 'faq',
    description: 'ad command.',
    execute(client, Discord, message, guild) {
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("FAQ")
            .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
            //.setDescription('Some description here')
            //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
            .addFields(
                //{ name: 'Regular field title', value: 'Some value here' },
                //{ name: '\u200B', value: '\u200B' },
                //{ name: 'Inline field title', value: 'Some value here', inline: true },
                //{ name: 'Inline field title', value: 'Some value here', inline: true },
                { name: "Will you update to discord.JS v13? (aka buttons and slash commands)", value: "Meh. Im not sure. I think alot of the bots commands would break. Plus I want to start working on Guilded bot when the API comes out... I MIGHT add slash commands. Im not sure. Buttons are way to hard to understand thats why I haven't added them"},
                { name: "When will you work on the bot more??", value: "I dont plan to add alot more to this bot mainly wanna make guilded bots when the API comes out"},
                { name: "What is Guilded? Why do you talk about it?", value: "Guilded is a way better discord it has more stuff and it has no pay to use stuff."}
            )
            .setTimestamp()
            .setFooter('Bot by !!AirplaneGoBrr!!#1613', 'https://cdn.discordapp.com/avatars/250029754076495874/bdf3953b71edb421776e43d24e7651fe.webp');
        
            message.channel.send(embed)
    }
}