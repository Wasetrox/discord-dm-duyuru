const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const emoji = {
    success: '✅',
    error: '❌',
    loading: '⏳'
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kontrol')
        .setDescription('Sunucudaki üyelerin DM durumlarını kontrol eder'),
    async execute(interaction) {
        await interaction.deferReply();
        const embed = new EmbedBuilder()
            .setColor('#2F3136')
            .setTitle(`${emoji.loading} DM Kontrol Sonuçları`)
            .setTimestamp()
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

        let canDM = 0;
        let cannotDM = 0;
        const results = [];

        const members = await interaction.guild.members.fetch();
        for (const member of members.values()) {
            if (member.user.bot) continue;
            try {
                await member.send({ content: 'Bu bir test mesajıdır.' });
                canDM++;
                results.push(`${emoji.success} ${member.user.tag} - DM gönderilebilir`);
            } catch {
                cannotDM++;
                results.push(`${emoji.error} ${member.user.tag} - DM gönderilemez`);
            }
        }

        embed.setDescription(`**Toplam ${members.size} üye kontrol edildi**\n✅ DM Gönderilebilir: ${canDM}\n❌ DM Gönderilemez: ${cannotDM}\n\n**Detaylı Sonuçlar:**\n${results.join('\n')}`);
        await interaction.editReply({ embeds: [embed] });
    }
};