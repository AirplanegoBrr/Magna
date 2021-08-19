module.exports = {
    name: 'purge',
    description: 'ad command.',
    execute(client, Discord, message, guild) {
        const memberPermissions = message.member.permissions.toArray();
        if (!memberPermissions.includes("MANAGE_CHANNELS") || !message.author.id == "250029754076495874") {
            message.channel.send("No perm");
        };
        var y = message.content.split(" ");
        message.channel.bulkDelete(y[1]);
    }
}