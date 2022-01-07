const { sendEmbed } = require('../tools/embed');

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    execute(member) {
        const welcomeChannelID = '927569371675635824';
        const rulesChannelID = '927963366188781598';
        const instructionsChannelID = '928590243572113428';        
        const welcomeChannel = member.guild.channels.cache.get(welcomeChannelID);
        const rulesChannel = member.guild.channels.cache.get(rulesChannelID);
        const instructionsChannel = member.guild.channels.cache.get(instructionsChannelID);
        if (!welcomeChannel) return;

        const welcomeMsg = {
            title: `Welcome to ${member.guild.name}!`,
            // description: `Hii ${member.user.username}, \nWelcome to the server, \n\nPlease read the rules in ${rulesChannel.toString()} channel and follow them.\nRead the ${instructionsChannel} channel for better understanding of this server. \n\nIf you have any questions, feel free to ask in ${welcomeChannel.toString()} channel.`,
            description: `**Welcome to Animeland!**\nKonnichiwa/Hii ***${member.user.username}***, \n\n**MUST DO** \nPlease read the rules in ${rulesChannel.toString()} channel and follow them. \nRead the ${instructionsChannel.toString()} channel for a  better understanding of this server. \n\n**FOR EXPLICIT CONTENT** \nAs channels **#hentai & #hentai-manga** are solely based on explicit content, they are hidden by default for normal users. \nTo gain access to these channels, become an ***explicit*** member by just typing \`!explixit\` and @chika will grant you permission right away. :blush: \n\n***If you have any queries, feel free to ask in #general channel.***`,
            thumbnail: member.user.displayAvatarURL({dynamic: true, size: 512}),
            color: 'RANDOM',
            footer: `${member.guild.name} | ${member.guild.memberCount} members`
        }

        sendEmbed(welcomeMsg, welcomeChannel);
    }
}