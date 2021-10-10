module.exports = {
    name: 'help',
    description: 'help command.',
    long_description: 'Help command.... what else??',
    permissions: [],
    args: ['command'],
    usage: 'help <command>',
    type: 'member',
    execute(client, Discord, message, guild) {
        //Go through each command in client.commands and put them in an embed with there description
        var x = message.content.split(" ").slice(1).join(" ")
        var y = message.content.split(" ")

        if (!y[1]){
            blacklist = ["webhook", "commandnamehere", "help", "shop"]
            var done = new Array()
            const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Help')
                .setDescription('Here is a list of commands and their descriptions.')
                .setTimestamp();
            client.commands.forEach(command => {
                //Check if is in blacklist
                if (blacklist.includes(command.name)) return;
                //Add feild without description basied on type annd pull all commands matching type
                switch (command.type) {
                    case "admin":
                        if (!done.includes("admin")){
                            embed.addField('Admin Commands', '\u200b')
                            done.push("admin")
                        }
                        embed.addField(`${command.name || 'error'}`, `${command.description || 'error'}` || 'big error')
                        break;
                    case "mod":
                        if (!done.includes("mod")){
                            embed.addField('Moderator Commands', '\u200b')
                            done.push("mod")
                        }
                        embed.addField(`${command.name || 'error'}`, `${command.description || 'error'}` || 'big error')
                        break;
                    case "member":
                        if (!done.includes("member")){
                            embed.addField('Member Commands', '\u200b')
                            done.push("member")
                        }
                        embed.addField(`${command.name || 'error'}`, `${command.description || 'error'}` || 'big error')
                        break;
                    case "ticket":
                        if (!done.includes("ticket")){
                            embed.addField('Ticket Commands', '\u200b')
                            done.push("ticket")
                        }
                        embed.addField(`${command.name || 'error'}`, `${command.description || 'error'}` || 'big error')
                        break;
                    default:
                        if (!done.includes("errors")){
                            embed.addField(' ', '\u200b')
                            done.push("errors")
                        }
                        embed.addField(`${command.name || 'error'}`, `${command.description || 'error'}` || 'big error')
                        break;
                }
            });
            message.channel.send(embed);
        } else {
            // Give detals for command
            var embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(x)
                .addField('Description', client.commands.get(x).description || 'No Permissions')
                .addField('Long Description', client.commands.get(x).long_description || 'No Long Description')
                .addField('Usage', client.commands.get(x).usage || 'No Usage')
                .addField('Type', client.commands.get(x).type || 'No Type')
                .addField('Args', client.commands.get(x).args || 'No Args')
                .setTimestamp();
            if (client.commands.get(x).type == "admin") embed.setColor('#ff0000')
            if (client.commands.get(x).type == "mod") embed.setColor('#ff9900')
            if (client.commands.get(x).type == "member") embed.setColor('#0099ff')
            if (client.commands.get(x).type == "ticket") embed.setColor('#00ff00')
            message.channel.send(embed);
        }

    }
};