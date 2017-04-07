const Discord = require("discord.js"),
	client = new Discord.Client()
	mongoose = require("mongoose"),
	config = require('./config.json'),
	token = config.token,
	prefix = '&';

mongoose.connect("mongodb://KingCosmic:Abstuddard9311@ds147070.mlab.com:47070/rpg")

var dialog = ["weird dialog", "thing two"];

var npc = require('../npcbases/index.js');
var overSeer = new npc.normal("overSeer", dialog);

client.login(token);

client.on('ready', () => {
	console.log("I am working master");
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
})