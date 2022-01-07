const { sendEmbed } = require('../tools/embed');

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    execute(member) {
        const welcomeChannelID = '927569371675635824';
        const rulesChannelID = '927963366188781598';
        const welcomeChannel = member.guild.channels.cache.get(welcomeChannelID);
        const rulesChannel = member.guild.channels.cache.get(rulesChannelID);
        if (!welcomeChannel) return;

        const welcomeMsg = {
            title: `Welcome to ${member.guild.name}!`,
            description: `Hii ${member.user.username}, \nWelcome to the server, \n\nPlease read the rules in ${rulesChannel.toString()} channel and follow them. \n\nIf you have any questions, feel free to ask in ${welcomeChannel.toString()} channel.`,
            thumbnail: member.user.displayAvatarURL({dynamic: true, size: 512}),
            color: 'RANDOM',
            footer: `${member.guild.name} | ${member.guild.memberCount} members`
        }

        sendEmbed(welcomeMsg, welcomeChannel);
    }
}