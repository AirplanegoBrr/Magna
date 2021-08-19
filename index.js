const fs = require('fs')
const Discord = require('discord.js');
const { Client } = require('discord.js');
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const { token } = require("./config.json");

const commandFolders = fs.readdirSync('./commands');
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

console.log("Loading Commands");
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}
console.log("Loading Events");
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client, Discord));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client, Discord));
    }
}

console.log("All loaded");

client.login(token);