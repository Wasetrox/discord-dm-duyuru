const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const cnf = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences
    ]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`);
    client.commands.set(command.data.name, command);
}

const commands = client.commands.map(command => command.data.toJSON());
const rest = new REST({ version: '10' }).setToken(cnf.tokencik);

(async () => {
    try {
        console.log(`Komutlar kaydediliyor... (${commands.length} komut)`);
        await rest.put(
            Routes.applicationGuildCommands(cnf.clientId, cnf.sunucuId),
            { body: commands }
        );
        console.log('Komutlar başarıyla kaydedildi!');
    } catch (error) {
        console.error('Komutlar kaydedilirken hata oluştu:', error);
    }
})();

const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./src/events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

client.login(cnf.tokencik);