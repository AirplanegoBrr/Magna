module.exports = {
    name: 'unban',
    description: 'unban command.',
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
                const banList = await message.guild.fetchBans();
                console.log(banList)

                const bannedUser = banList.find(user => user.id === idUser);
                console.log(bannedUser)
                if (bannedUser){
                    message.guild.members.unban(idUser)
                }else{
                    message.channel.send("I was unable to find that person or they arent banned!")
                }
            } catch (error) {
                console.error(error)
            }
        }
    }
}