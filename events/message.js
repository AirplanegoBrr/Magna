const fs = require("fs")
const other = require("../other")

module.exports = {
    name: 'message',
    async execute(message, client, Discord) {
        const { token, owner, debugMode } = require("../config.json");
        var { prefix } = require("../config.json")

        if (message.author.bot) return;
        if (message.guild === null) {
            message.channel.send("Im sorry **BUT** this bot only works in servers! Have a good day!");
            return;
        }

        const member = message.author;
        const guild = message.guild;

        other.make(guild.id)

        if (await other.get(guild.id, "prefix") != null || await other.get(guild.id, "prefix") != undefined) {
            prefix = await other.get(guild.id, "prefix")
        }



        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (debugMode == 1) {
            console.log(args);
            console.log(command);
            console.log(member);
            console.log(guild);
        }

        if (message.content == "<@!" + client.user.id + ">") {
            client.commands.get("help").execute(client, Discord, message, guild);
        }

        //Checks if message has the prefix
        if (!message.content.startsWith(prefix)) return;
        //Checks if there is a command with that name
        if (!client.commands.has(command)) {
            console.log(command)
            message.channel.send("I don't know that command!");
            return;
        }
        //Check if member has permission to use that command

        function hasPermission(list) {
            arr = new Array();
            if (list == arr) {
                arr.push(true);
            } else {
                list.forEach(val => {
                    if (message.member.hasPermission(val)) {
                        // Has permission
                        arr.push(true);
                    } else {
                        //Doesn't have permission
                        arr.push(false);
                    }
                });
            }
            return !arr.includes(false);
        }

        if (!hasPermission(client.commands.get(command).permissions)) {
            message.channel.send("You do not have permission to use this command!\n" + client.commands.get(command).permissions.toString());
            return;
        }

        try {
            client.commands.get(command).execute(client, Discord, message, guild);
        } catch (error) {
            console.error(error);
            message.reply(`there was an error trying to execute that command!`);
        }
    },
};