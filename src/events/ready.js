const { ActivityType, ChannelType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const cnf = require('../../config.json');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Bot ${client.user.tag} olarak giriş yaptı!`);

        client.user.setActivity('Wasetrox 🍻 NovaDev', { 
            type: ActivityType.Streaming, 
            url: 'https://www.twitch.tv/wasetrox' 
        });

        const guild = client.guilds.cache.get(cnf.sunucuId);
        if (!guild) {
            console.log('Sunucu bulunamadı! Sunucu ID:', cnf.sunucuId);
            return;
        }

        const channel = guild.channels.cache.get(cnf.sesId);
        if (!channel) {
            console.log('Ses kanalı bulunamadı! Kanal ID:', cnf.sesId);
            return;
        }
        if (channel.type !== ChannelType.GuildVoice) {
            console.log('Kanal ses kanalı değil! Tür:', channel.type);
            return;
        }

        try {
            joinVoiceChannel({
                channelId: channel.id,
                guildId: guild.id,
                adapterCreator: guild.voiceAdapterCreator,
            });
            console.log(`${channel.name} ses kanalına bağlandı!`);
        } catch (error) {
            console.error('Ses kanalına bağlanırken hata oluştu:', error);
        }
    },
};