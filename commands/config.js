const fs = require("fs")

module.exports = {
    name: 'config',
    description: 'config command.',
    execute(client, Discord, message, guild) {
        var rawdata = fs.readFileSync('./data.json');
        //Use
        var data = JSON.parse(rawdata);

        //Will add old data so we can edit it
        var saveJson = data;


        var x = message.content.split(" ").slice(1).join(" ")
        var y = message.content.split(" ")
        var memberPermissions = message.member.permissions.toArray();

        if (!memberPermissions.includes("MANAGE_CHANNELS") || !message.author.id=="250029754076495874"){
            message.channel.send("Error! You do not have MANAGE_CHANNELS permission!");
            return;
        };

        if (!x) {
            message.channel.send("```diff\n+ Config options\n- suggestion_channel\n- prefix``` suggestion_channel isnt working atm")
        }

        if (y[1] == "prefix") {
            if (!y[2]) {
                var { prefix } = require("../config.json")
                saveJson.servers[guild.id].prefix = prefix;
                message.channel.send("The prefix is now: " + saveJson.servers[guild.id].prefix);
            } else {
                saveJson.servers[guild.id].prefix = y[2];
                message.channel.send("The prefix is now: " + saveJson.servers[guild.id].prefix);
            }
        }

        if (y[1] == "suggestion_channel"){
            if (saveJson.servers){
            }else{
                saveJson.servers = {}
                saveJson.servers[guild.id] = {}
            }
            saveJson.servers[guild.id].suggestChannel = message.mentions.channels.first().id;
            message.channel.send("Set suggest channel to: <#"+saveJson.servers[guild.id].suggestChannel+">");
        }

        var save = JSON.stringify(saveJson);
        fs.writeFileSync('./data.json', save);
    }
}