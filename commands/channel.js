const fs = require("fs")

module.exports = {
	name: 'channel',
	description: 'Stops the bot',
	execute(client, Discord, message, guild) {
        const memberPermissions = message.member.permissions.toArray();
        //console.log(memberPermissions)
        if (!memberPermissions.includes("MANAGE_CHANNELS") || !message.author.id=="250029754076495874"){
            message.channel.send("Error! You do not have MANAGE_CHANNELS permission!");
            return;
        };
		var rawdata = fs.readFileSync('./data.json');
        //Use
        var data = JSON.parse(rawdata);

        //Will add old data so we can edit it
        var saveJson = data;
        
        if (saveJson.servers){
        }else{
            saveJson.servers = {}
            saveJson.servers[guild.id] = {}
        }
        saveJson.servers[guild.id].suggestChannel = message.mentions.channels.first().id;
        console.log(saveJson);
        var save = JSON.stringify(saveJson);
        fs.writeFileSync('./data.json', save); // Ctrl + a delete
        message.channel.send("Set suggest channel to: <#"+saveJson.servers[guild.id].suggestChannel+">");
	},
};