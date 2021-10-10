module.exports = {
    name: 'shop',
    description: 'shop command.',
    permissions: [],
    args: [],
    usage: '',
    type: 'indev',
    execute(client, Discord, message, guild) {
        const { owner } = require("../config.json");
        if (!message.author.id == owner) {
            message.channel.send("This command is in testing.");
        } else {
            var x = message.content.split(" ").slice(1).join(" ")
            var y = message.content.split(" ")
            message.channel.send("Hi")
        }
    }
}