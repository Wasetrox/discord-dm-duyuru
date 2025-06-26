const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const emoji = {
    members: '👥',
    online: '🟢',
    voice: '🎙️',
    boost: '💎'
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('istatistik')
        .setDescription('Sunucu istatistiklerini gösterir'),
    async execute(interaction) {
        const guild = interaction.guild;
        await guild.members.fetch();

        const totalMembers = guild.memberCount;
        const onlineMembers = guild.members.cache.filter(m => m.presence?.status === 'online' || m.presence?.status === 'idle' || m.presence?.status === 'dnd').size;
        const voiceMembers = guild.members.cache.filter(m => m.voice.channel).size;
        const boostCount = guild.premiumSubscriptionCount;

        const embed = new EmbedBuilder()
            .setColor('#2F3136')
            .setTitle(`${emoji.members} Sunucu İstatistikleri`)
            .setThumbnail(guild.iconURL())
            .addFields(
                { name: `${emoji.members} Toplam Üye`, value: totalMembers.toString(), inline: true },
                { name: `${emoji.online} Çevrimiçi Üye`, value: onlineMembers.toString(), inline: true },
                { name: `${emoji.voice} Seste Olanlar`, value: voiceMembers.toString(), inline: true },
                { name: `${emoji.boost} Boost Sayısı`, value: boostCount.toString(), inline: true }
            )
            .setTimestamp()
            .setFooter({ text: guild.name, iconURL: guild.iconURL() });

        await interaction.reply({ embeds: [embed] });
    }
};