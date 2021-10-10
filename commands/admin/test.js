const other = require('../../other');

module.exports = {
    name: 'test',
    description: 'help command.',
    async execute(client, Discord, message, guild) {
        message.channel.send('```json\n'+JSON.stringify(await other.getAll(guild.id))+'\n```');
        other.save(guild.id, "data", "test");
        message.channel.send(other.get(guild.id, "data", "test"));
    }
}