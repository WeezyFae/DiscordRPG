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
	client.guilds.forEach(server => {
		server.defaultChannel.sendMessage("I " + overSeer.name + ", HAVE ARISEN!");
	});
	console.log("I am working master");
});

client.on('message', msg => {
	if (msg.mentions.users.first() == client.user) {
		let ms = msg.content.split(" ");
		if (ms[1] = 'Hello') {
			msg.reply(overSeer.rdialog());
		}
	}
})