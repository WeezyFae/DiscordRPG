const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'bot token';


client.on('ready', () => {
  console.log('AdminBot is awake!');
});

var admin = {
  name: Name,
  id: id
}

function Commando(str, msg) {
  return msg.content.isLowerCase().startsWith('#' + str);
}

function fwarning(channel, msg, user) {
  admin.warnings += 1;
  admin.save();
}

client.on('message', (msg) =>{
  if (Commando('warn', msg)) {
    var Warner = msg.author.username;
    var badBoy = msg.mentions.users.first();
    const warnEmbed = new discord.RichEmbed()
    .setTitle(Warner + " just warned " + badBoy + " for reason: " + warnReason)
    .setAuthor("AdminBot -> Warning", msg.author.avatarURL)

    .setColor(0x00AE86)
    message.channel.sendEmbed(warnEmbed);
    fwarning(channel, msg, user)
  }
})

module.exports = AdminBot;
client.login(token);
