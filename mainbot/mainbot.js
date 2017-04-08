const Discord = require("discord.js"),
	client = new Discord.Client(),
	config = require('./config.json'),
	funcs = require('./funcs'),
	token = config.token,
	prefix = '&';

var npc = require('../npcbases/index.js');
var overSeer = new npc.normal("overSeer");

client.login(token);

client.on('ready', () => {
	console.log("I am working master");
});

client.on('guildMemberAdd', member => {
	member.sendMessage(member.user + ' Welcome to ' + guild.name);
});

client.on('message', msg => {
	if (msg.content == prefix + "create char") {
		funcs.createChar(msg);
	}
	if (msg.content.startsWith(prefix + 'equipp')) {
		funcs.equipp(msg);
	}
	if (msg.content == prefix + 'inventory') {
		funcs.inventory(msg);
	}
	if (msg.content == prefix + 'info') {
		funcs.info(msg);
	}
})