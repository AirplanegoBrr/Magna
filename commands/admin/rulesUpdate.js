const other = require("../../other")

module.exports = {
    name: 'rulesupdate',
    description: 'Update rules',
    long_description: 'Update rules. Will try to find the old message in the channel and update it',
    permissions: ["MANAGE_CHANNELS"],
    args: ['command'],
    usage: 'ruleUpdate',
    type: 'admin',
    async execute(client, Discord, message, guild) {
        const channelID = await other.get(guild.id, 'rules_channel')
        const channel = client.channels.cache.get(channelID)
        if (!channel) return message.channel.send('No rules channel found')
        const rules = await other.get(guild.id, 'rules_message')
        if (!rules) return message.channel.send('No rules message found. Set some rules!')

        if (channel){
            channel.messages.fetch({ limit: 100 }).then(async (msg) => {
                if (msg.size > 0) {
                    msg.forEach(async (forMsg) => {
                        if (forMsg.author.id == client.user.id) {
                            forMsg.edit(rules)
                            return;
                        }
                    })
                } else {
                    channel.send(rules)
                }
            })
        }
    }
}