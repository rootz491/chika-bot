const { sendEmbed } = require("../tools/embed");
const Subscriber = require("../schemas/subscriber");

module.exports =  {
    name: 'guildMemberRemove',
    once: false,
    async execute(member) {
        if (member.user.bot) return;
        
        /* GOOD BYE MESSAGE */
        const goodbyeChannelId = '927569371675635824' // #General Channel
        const channel = member.guild.channels.cache.get(goodbyeChannelId);
        const goodbyeMsg = {
            title: `${member.user.username} has left the server!`,
            description: `${member.user.username} has left the server. Let's Hope he/she will return soon!`,
            thumbnail: member.user.displayAvatarURL({dynamic: true, size: 512}),
            color: 'RANDOM',
            footer: `${member.guild.name} | ${member.guild.memberCount} members`
        }
        sendEmbed(goodbyeMsg, channel);

        /* CHECK & REMOVE IF SUBSCRIBED FROM BD */
        const subscriber = await Subscriber.findOne({userId: member.user.id});
        if (subscriber)
            await subscriber.delete();
    }
}