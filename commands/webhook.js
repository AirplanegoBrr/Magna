module.exports = {
    name: 'webhook',
    description: 'ad command.',
    execute(client, Discord, message, guild) {
        var y = message.content.split(" ")
        const { owner } = require("../config.json")

        if (message.author == owner) {
            if (y[1]=="true"){
            var webhookClient = new Discord.WebhookClient('no.', 'f u');
            var x = message.content.split(" ").slice(2).join(" ")
            }else{
                var webhookClient = new Discord.WebhookClient(y[1], y[2]);
                var x = message.content.split(" ").slice(3).join(" ")
            }
        } else {
            var webhookClient = new Discord.WebhookClient(y[1], y[2]);
            var x = message.content.split(" ").slice(3).join(" ")
        }



        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(x)
            .setDescription("This message is from:\nServer: " + guild.name + "\nServerID:" + guild.id + "\nMember Count:" + guild.memberCount)
            .setAuthor(message.author.username, message.author.avatarURL(), message.author.avatarURL())
            .setTimestamp()
            .setFooter('Bot by !!AirplaneGoBrr!!#1613', 'https://cdn.discordapp.com/avatars/250029754076495874/bdf3953b71edb421776e43d24e7651fe.webp');

        webhookClient.send('', {
            username: message.author.username,
            avatarURL: message.author.avatarURL(),
            embeds: [embed],
        });

    }
}