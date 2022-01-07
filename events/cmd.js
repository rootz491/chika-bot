module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message) {
        if (message.author.bot) return;

        const prefix = '!';
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (command === 'explicit') {
            try {
                const explicitRole = message.member.guild.roles.cache.find(role => role.name === 'explicit');
                if (!explicitRole) return;
                if (message.member.roles.cache.has(explicitRole.id)) {
                    message.member.roles.remove(explicitRole);
                    message.reply(`Hiii ${message.member.user.username}, explicit role removed.`);
                } else {
                    const hentaiChannel = message.member.guild.channels.cache.find(channel => channel.name === 'hentai').toString();
                    const hentaiMangaChannel = message.member.guild.channels.cache.find(channel => channel.name === 'hentai-manga').toString();
                    message.member.roles.add(explicitRole);
                    message.reply(`Hiii ${message.member.user.username}, explicit role added\nNow you can visit ${hentaiChannel} and ${hentaiMangaChannel} channels\nEnjoy 📍`);
                }
            } catch (error) {
                console.log(error);
                message.reply('Something went wrong. Please try again later.');
            }
        }
    }
}
