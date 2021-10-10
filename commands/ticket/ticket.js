const other = require('../../other.js');

module.exports = {
    name: 'ticket',
    description: 'ad command.',
    async execute(client, Discord, message, guild) {
        // make a new channel and make sure it doesnt exist in the ticket category
        const cat = await other.get(guild.id, 'ticketcat')
        const support = await other.get(guild.id, 'supportrole')
        let channel = client.channels.cache.find(ch => ch.name === message.author.id);
        if (!channel) {
            channel = message.guild.channels.create(message.author.id)
                .then((ch) => {
                    ch.setParent(cat);
                    ch.updateOverwrite(message.author, {
                        VIEW_CHANNEL: true,
                        SEND_MESSAGES: true
                    });
                    ch.send(`${message.author}`);
                    ch.send(`<@${support}>`);
                    const embed = new Discord.MessageEmbed()
                        .setTitle('Ticket Created')
                        .setDescription(`${message.author}, We will be ready to assist you as soon as possible. In the meantime, please describe your issue/problem with as much detail as possible. (Pictures, User IDs, ECT)`)
                        .setColor('#00ff00')
                    ch.send(embed);
                    message.channel.send(`${message.author}, your ticket has been created.`);
                    // Set channel permission to only allow the message author to read and send messages
                });
        }
    }
}