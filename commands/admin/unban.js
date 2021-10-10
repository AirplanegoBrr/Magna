module.exports = {
    name: 'unban',
    description: 'unban someone (userID)',
    long_description: 'Unbans someone. Must use userID',
    permissions: ["BAN_MEMBERS"],
    args: ['userID'],
    usage: 'unban <userID>',
    type: 'admin',
    async execute(client, Discord, message, guild) {
        const memberPermissions = message.member.permissions.toArray();
        if (!memberPermissions.includes("BAN_MEMBERS") || !message.author.id == "250029754076495874") {
            message.channel.send("Error! You do not have BAN_MEMBERS permission!");
            return;
        }
        if (memberPermissions.includes("BAN_MEMBERS") || message.author.id == "250029754076495874") {
            const args = message.content.split(" ")
            const idUser = args[1]
            try {
                if (await guild.fetchBan(idUser).catch(console.error)) {
                    message.guild.members.unban(idUser)
                    message.channel.send("Member unbanned!");
                } else {
                    message.channel.send("I was unable to find that person or they arent banned!");
                }
            } catch (error) {
                console.error(error)
            }
        }
    }
}