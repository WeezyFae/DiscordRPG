const Discord = require('discord.js'),
	client = new Discord.Client(),
	items = require('../items/index'),
	config = require('./config.json'),
	npc = require('../npcbases/index'),
	token = config.token,
	prefix = "@";


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
		BentoBox.buying(itemname, msg);
	};
	if (msg.content.startsWith(prefix + "sell")) {
		var itemname = msg.content.slice(6);
		BentoBox.selling(itemname, msg);
	}
});

client.login(token);