require('dotenv').config();

const fs = require('fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// Reserved for future
client.log = (message) => console.log(message)

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	client.log(`Listening for event ${event.name}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute([client, ...args]));
	} else {
		client.on(event.name, (...args) => event.execute([client, ...args]));
	}
}

client.login(process.env.DISCORD_TOKEN);