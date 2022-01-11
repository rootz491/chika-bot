const Discord = require('discord.js');
const Subscriber = require("../schemas/subscriber");

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message) {
        if (message.author.bot) return;

        const client = message.client;
        const prefix = '!';
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        /* LEGACY COMMANDS */
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


        /* CHECKING FOR ALERT USER */
        const catergories = ['songs', 'anime', 'manga'];  //  categories that are selected for the alert
        const msgCategory = message.channel.parent.name;    //  to get message's channel's category's name
        // console.log(catergories.includes(msgCategory));
        if (catergories.includes(msgCategory)) {
            // const user = message.author;
            const subscribers = await Subscriber.find();
            for (let subscriber of subscribers) {
                const user = await client.users.fetch(subscriber.userId);
                const msgEmbed = new Discord.MessageEmbed({
                    title: `***Alert*** from ${message.member.guild.name} Server`,
                    description: `**${message.author.username}** has sent a message in **${message.channel}** channel of ***${message.channel.parent.name}*** category.\n\nFirst-Line: \`\`\`${message.content.split('\n')[0]}\`\`\`\n`,
                    color: "RANDOM",
                    timestamp: new Date(),
                    footer: {
                        text: `${message.author.username}`,
                        icon_url: `${message.author.avatarURL()}`
                    }
                })
                user.send({ embeds: [msgEmbed] });
            }
        }
        
    }
}
