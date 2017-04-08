const Discord = require("discord.js"),
	client = new Discord.Client(),
	mongoose = require("mongoose"),
	UserSchema = require('./schemas/user'),
	items = require('../items/index'),
	config = require('./config.json'),
	funcs = require('./funcs'),
	token = config.token,
	prefix = '&';

mongoose.connect("mongodb://KingCosmic:Abstuddard9311@ds147070.mlab.com:47070/discordrpg");
var User = mongoose.model("users", UserSchema);

var dialog = ["weird dialog", "thing two"];

var npc = require('../npcbases/index.js');
var overSeer = new npc.normal("overSeer", dialog);

client.login(token);

client.on('ready', () => {
	console.log("I am working master");
});

client.on('guildMemberAdd', member => {
	member.sendMessage(member.user + ' Welcome to ' + guild.name);
});

client.on('message', msg => {
	if (msg.content == prefix + "create char") {
		funcs.createChar(msg.author, User, msg, items, funcs);
	}
	if (msg.content.startsWith(prefix + 'equipp')) {
		funcs.equipp(msg.author, User, msg);
	}
	if (msg.content == prefix + 'inventory') {
		funcs.inventory(msg.author, User, msg);
	}
	if (msg.content == prefix + 'info') {
		funcs.info(msg, User, Discord);
	}
})