module.exports = {
    name: 'kick',
    description: 'kick someone.',
    long_description: 'Will kicked the @ed users. Will also send them a message with kick info',
    permissions: ["KICK_MEMBERS"],
    args: ['@user'],
    usage: 'kick @user',
    type: 'admin',
    execute(client, Discord, message, guild) {
        const memberPermissions = message.member.permissions.toArray();
        if (!memberPermissions.includes("KICK_MEMBERS") || !message.author.id == "250029754076495874") {
            message.channel.send("Error! You do not have KICK_MEMBERS permission!");
            return;
        }
        if (memberPermissions.includes("KICK_MEMBERS") || message.author.id == "250029754076495874") {
            const kickPerson = message.mentions.users.first();
            if (kickPerson) {
                var x = message.content.split(" ").slice(2).join(" ");
                client.users.cache.get(kickPerson["id"]).send("Hello " + kickPerson + " You have been kicked from " + guild["name"] + "\nServer owner: <@" + guild["ownerID"] + ">\nReason: " + x);

                message.mentions.members.first().kick({reason: "Mod: "+message.author.id+"\nReason:"+x })
                    .catch(() => {
                        message.channel.send("I do not have permissions to do this. Or they have a higher role then me!");
                    });
            } else {
                message.channel.send("Error! Did you forget to ping someone??");
            }
        }
    }
}