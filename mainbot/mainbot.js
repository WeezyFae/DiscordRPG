const Discord = require("discord.js"),
	client = new Discord.Client(),
	config = require('./config.json'),
	token = config.token,
	prefix = '&';

var npc = require('../npcbases/index.js');
var overSeer = new npc.main("overSeer");

client.login(token);

client.on('ready', () => {
	console.log("I am working master");
});

client.on('guildMemberAdd', member => {
	member.sendMessage(member.user + ' Welcome to ' + guild.name);
});

client.on('message', msg => {
	if (msg.content == prefix + "create char") {
		overSeer.createChar(msg);
	}
	if (msg.content.startsWith(prefix + 'equipp')) {
		overSeer.equipp(msg);
	}
	if (msg.content == prefix + 'inventory') {
		overSeer.inventory(msg);
	}
	if (msg.content.startsWith(prefix + 'info')) {
		overSeer.info(msg);
	}
	if (msg.content == prefix + 'bless') {
		overSeer.blessing(msg);
	}
})