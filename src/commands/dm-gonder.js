const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const emoji = {
    success: '✅',
    error: '❌',
    loading: '⏳'
};

// Gecikme fonksiyonu
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dm-gonder')
        .setDescription('Sunucu üyelerine DM gönderir')
        .addStringOption(option =>
            option.setName('mesaj')
                .setDescription('Gönderilecek mesaj')
                .setRequired(true))
        .addRoleOption(option =>
            option.setName('rol')
                .setDescription('Sadece bu role sahip olanlara gönder (isteğe bağlı)')
                .setRequired(false))
        .addRoleOption(option =>
            option.setName('muaf')
                .setDescription('Bu role sahip olanlara gönderilmez (isteğe bağlı)')
                .setRequired(false)),
    async execute(interaction) {
        await interaction.deferReply();
        const message = interaction.options.getString('mesaj');
        const targetRole = interaction.options.getRole('rol');
        const exemptRole = interaction.options.getRole('muaf');

        const embed = new EmbedBuilder()
            .setColor('#2F3136')
            .setTitle(`${emoji.loading} DM Gönderme İşlemi`)
            .setTimestamp()
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });

        let sent = 0;
        let failed = 0;
        const members = targetRole 
            ? interaction.guild.members.cache.filter(m => m.roles.cache.has(targetRole.id))
            : interaction.guild.members.cache;

        for (const member of members.values()) {
            if (member.user.bot) continue;
            if (exemptRole && member.roles.cache.has(exemptRole.id)) continue;

            try {
                await member.send(message);
                sent++;
                console.log(`✅ DM başarıyla gönderildi: ${member.user.tag}`);
            } catch (error) {
                failed++;
                console.log(`❌ DM gönderilemedi: ${member.user.tag} - Hata: ${error.message}`);
            }
            // Her DM arasında 1 saniye gecikme
            await delay(1000);
        }

        embed.setDescription(`${emoji.success} **Başarıyla gönderildi:** ${sent} üye\n${emoji.error} **Gönderilemedi:** ${failed} üye`);
        await interaction.editReply({ embeds: [embed] });
    }
};
