module.exports = {
    name: 'ping',
    description: 'ping command.',
    execute(client, Discord, message, guild) {
        const Embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)
            //.setURL()
            .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
            //.setDescription("Server: " + guild.name + "\nServerID:" + guild.id + "\nMember Count:" + guild.memberCount)
            .setTimestamp()
            //.setFooter('Bot by !!AirplaneGoBrr!!#1613', 'https://cdn.discordapp.com/avatars/250029754076495874/bdf3953b71edb421776e43d24e7651fe.webp');
        //message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
        message.channel.send(Embed);
    }
}