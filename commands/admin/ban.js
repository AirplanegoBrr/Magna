module.exports = {
    name: 'ban',
    description: 'ban someone (@ them).',
    long_description: 'When banning it will TRY to send the banned user a message about why they got banned. It will also tell them the user that owns the server',
    permissions: ["BAN_MEMBERS"],
    args: ['@user'],
    usage: 'ban @user',
    type: 'admin',
    execute(client, Discord, message, guild) {
        const memberPermissions = message.member.permissions.toArray();
        if (!memberPermissions.includes("BAN_MEMBERS") || !message.author.id == "250029754076495874") {
            message.channel.send("Error! You do not have BAN_MEMBERS permission!");
            return;
        }
        if (memberPermissions.includes("BAN_MEMBERS") || message.author.id == "250029754076495874") {
            const banPerson = message.mentions.users.first();
            if (banPerson) {
                var x = message.content.split(" ").slice(2).join(" ");
                client.users.cache.get(banPerson["id"]).send("Hello " + banPerson + " You have been banned from " + guild["name"] + "\nServer owner: <@" + guild["ownerID"] + ">\nReason: " + x);

                message.mentions.members.first().ban({ reason: "Mod: " + message.author.id + "\nReason:" + x })
                    .catch(() => {
                        message.channel.send("I do not have permissions to do this. Or they have a higher role then me!");
                    });
            } else {
                message.channel.send("Error! Did you forget to ping someone??");
            }
        }
    }
}