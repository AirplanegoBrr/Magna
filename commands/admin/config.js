const fs = require("fs")
const other = require("../../other")

module.exports = {
    name: 'config',
    description: 'config command.',
    long_description: 'Config for channels, emojis and ECT',
    permissions: ["MANAGE_CHANNELS"],
    args: ['value', 'set'],
    usage: 'config <value> <value>',
    type: 'admin',
    execute(client, Discord, message, guild) {


        var x = message.content.split(" ").slice(1).join(" ")
        var y = message.content.split(" ")
        var memberPermissions = message.member.permissions.toArray();

        if (!memberPermissions.includes("MANAGE_CHANNELS") || !message.author.id == "250029754076495874") {
            message.channel.send("Error! You do not have MANAGE_CHANNELS permission!");
            return;
        };

        if (!x) {
            message.channel.send("```diff\n+ Config options\n- suggestion_channel\n- prefix\n- upvote\n- downvote```")
        } else {
        }
        other.make(guild.id)

        switch (y[1]) {
            case "prefix":
                if (!y[2]) {
                    var { prefix } = require("../../config.json")
                    saveJson.servers[guild.id].prefix = prefix;
                    message.channel.send("The prefix is now: " + saveJson.servers[guild.id].prefix);
                } else {
                    saveJson.servers[guild.id].prefix = y[2]
                    message.channel.send("The prefix is now: " + saveJson.servers[guild.id].prefix);
                }
                save(saveJson);
                break;
            case "upvote":
                if (!y[2]) {
                    saveJson.servers[guild.id].upvote = "👍"
                    message.channel.send("Upvote: " + saveJson.servers[guild.id].upvote);
                } else {
                    saveJson.servers[guild.id].upvote = y[2];
                    message.channel.send("Upvote: " + saveJson.servers[guild.id].upvote);
                }
                save(saveJson);
                break;
            case "downvote":
                if (!y[2]) {
                    saveJson.servers[guild.id].downvote = "👎";
                    message.channel.send("Downvote: " + saveJson.servers[guild.id].downvote);
                } else {
                    saveJson.servers[guild.id].downvote = y[2];
                    message.channel.send("Downvote: " + saveJson.servers[guild.id].downvote);
                }
                save(saveJson);

                break;
            case "suggestion_channel":
                saveJson.servers[guild.id].suggestChannel = message.mentions.channels.first().id;
                message.channel.send("Set suggest channel to: <#" + saveJson.servers[guild.id].suggestChannel + ">");
                console.log("good")
                save(saveJson);
                break
            default:
                message.channel.send("```diff\n+ Config options\n- suggestion_channel\n- prefix\n- upvote\n- downvote```")
                break;
            }
    }
}