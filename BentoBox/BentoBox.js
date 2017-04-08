const Discord = require('discord.js'),
	client = new Discord.Client(),
	mongoose = require('mongoose'),
	UserSchema = require('../database/schemas/user'),
	items = require('../items/index'),
	config = require('./config.json'),
	npc = require('../npcbases/index'),
	token = config.token,
	prefix = "@";


mongoose.connect("mongodb://KingCosmic:Abstuddard9311@ds147070.mlab.com:47070/discordrpg");
var User = mongoose.model("users", UserSchema);

var dialog = ["Hello there feel free to check my shop", "I have items in my shop"];

var itemstosell = [items.consumables.healthPotion];

var BentoBox = new npc.shopkeeper("BentoBox", dialog, itemstosell)

client.on('ready', () => {
	console.log("I am ready to sell Master");
	console.log(BentoBox);
});

client.on('message', msg => {
	if (msg.content == prefix + "items") {
		BentoBox.showitems(msg);
	};
	if (msg.content.startsWith(prefix + "buy")) {
		var itemname = msg.content.slice(5);
		BentoBox.buying(itemname, msg, User);
	};
	if (msg.content.startsWith(prefix + "sell")) {
		var itemname = msg.content.slice(6);
		BentoBox.selling(itemname, msg, User);
	}
});

client.login(token);