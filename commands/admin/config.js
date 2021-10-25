const other = require("../../other")

module.exports = {
    name: 'config',
    description: 'config command.',
    long_description: 'Config for channels, emojis and ECT',
    permissions: ["MANAGE_CHANNELS"],
    args: ['value', 'set'],
    usage: 'config <value> <value>',
    type: 'admin',
    async execute(client, Discord, message, guild) {
        //m!config coolValue set
        var x = message.content.split(" ").slice(1).join(" ") //-> [m!cofig]
        var y = message.content.split(" ") //-> [m!cofig,coolValue, set]

        var memberPermissions = message.member.permissions.toArray();

        if (!memberPermissions.includes("MANAGE_CHANNELS") || !message.author.id == "250029754076495874") {
            message.channel.send("Error! You do not have MANAGE_CHANNELS permission!");
            return;
        };

        if (!x) {
            message.channel.send("```diff\n+ Config options\n- suggestion_channel\n- prefix\n- upvote\n- downvote\n- rules```")
        }
        other.make(guild.id)

        switch (y[1]) {
            case "suggestion_channel": {
                if (y[2]) {
                    other.save(guild.id, "suggestion_channel", message.mentions.channels.first().id)
                    message.channel.send("Set suggestion channel to " + y[2])
                } else {
                    message.channel.send("Suggestion channel is " + other.get(guild.id, "suggestion_channel"))
                }
                break;
            }
            case "prefix": {
                if (y[2]) {
                    other.save(guild.id, "prefix", y[2])
                    message.channel.send("Set prefix to " + y[2])
                } else {
                    message.channel.send("Prefix is " + other.get(guild.id, "prefix"))
                }
                break;
            }
            case "upvote": {
                if (y[2]) {
                    other.save(guild.id, "upvote", y[2])
                    message.channel.send("Set upvote to " + y[2])
                } else {
                    message.channel.send("Upvote is " + other.get(guild.id, "upvote"))
                }
                break;
            }
            case "downvote": {
                if (y[2]) {
                    other.save(guild.id, "downvote", y[2])
                    message.channel.send("Set downvote to " + y[2])
                } else {
                    message.channel.send("Downvote is " + other.get(guild.id, "downvote"))
                }
                break;
            }
            case "rules": {
                if (y[2]) {
                    switch (y[2]) {
                        case "setRulesChannel": {
                            if (y[3]) {
                                other.save(guild.id, "rules_channel", message.mentions.channels.first().id)
                                message.channel.send("Set rules channel to " + message.mentions.channels.first().id)
                            } else {
                                message.channel.send("Rules channel is " + other.get(guild.id, "rules_channel"))
                            }
                            break;
                        }
                        case "setRulesMessage": {
                            if (y[3] || y[4]) {
                                // Join message together
                                var rules = y.slice(3).join(" ")
                                other.save(guild.id, "rules_message", rules)
                                message.channel.send("Set rules message to:\n" + rules + '\nRun rulesUpdate to update the rules!')
                            } else {
                                var rule = await other.get(guild.id, "rules_message")
                                message.channel.send("Rules message is " + rule)
                            }
                            break;
                        }
                    }
                } else {
                    message.channel.send("```diff\n+ Rules options\n- setRulesChannel\n- setRulesMessage```")
                }
                break;
            }

        }
    }
}