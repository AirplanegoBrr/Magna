const fs = require("fs")

module.exports = {
    name: 'message',
    execute(message, client, Discord) {
        const { token, owner, debugMode } = require("../config.json");
        var { prefix } = require("../config.json")
        var rawdata = fs.readFileSync('./data.json');

        if (message.author.bot) return;
        if (message.guild === null) {
            message.channel.send("Im sorry **BUT** this bot only works in servers! Have a good day!");
            return;
        }

        const member = message.author;
        const guild = message.guild;

        //Use
        var data = JSON.parse(rawdata);

        //Will add old data so we can edit it
        var saveJson = data;

        if (saveJson.servers){
        }else{
            saveJson.servers = {}
            saveJson.servers[guild.id] = {}
        }
        if (saveJson.servers[guild.id]){
        }else{
            saveJson.servers = {}
            saveJson.servers[guild.id] = {}
        }

        if (saveJson.servers[guild.id].prefix){
            prefix = saveJson.servers[guild.id].prefix
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
        if (!client.commands.has(command)) return;

        try {
            client.commands.get(command).execute(client, Discord, message, guild);
        } catch (error) {
            console.error(error);
            message.reply(`there was an error trying to execute that command!`);
        }

        var save = JSON.stringify(saveJson);
        fs.writeFileSync('./data.json', save);
    },
};