const mongoose = require("mongoose"),
	UserSchema = require('./schemas/user'),
	items = require('../items/index'),
	Discord = require('discord.js'),
	config = require('../npcbases/config.json');


mongoose.connect(config.url);
var User = mongoose.model("users", UserSchema);

exports.createChar = function(msg) {
	User.find({id: msg.author.id}, function(err, usser) {
		if (err) throw err;
		if (usser.length) {
			msg.reply("user already exists");
		}else {
			var newuser = new User({
				id: msg.author.id,
				name: msg.author.username,
				stats: {
					str: 10,
					vit: 10,
					dex: 10
				},
				gold: 100,
				lvl: 1,
				exp: 0,
				inventory: [items.armor.starterHelm, items.armor.starterChest, items.armor.starterGauntlets, items.armor.starterBoots, items.weapons.starterSword, items.consumables.healthPotion],
				equipped: [],
				moves: {
					move1: {
						name: "Slash",
						dmg: 12
					},
					move2: {
						name: "Stab",
						dmg:10
					},
					move3: {
						name: "Thrust",
						dmg: 8
					},
					move4: {
						name: "OverHead Strike",
						dmg: 15
					}
				}

			});

			newuser.save(function(err, usser) {
				if (err) {
					msg.reply("Something went wrong");
				}
				msg.channel.sendMessage("Character: " + msg.author.username + ", has been created");
				exports.tutorial(msg);
			})
		}
	});
}

exports.tutorial = function(msg) {
	msg.reply("Now for a simple Tutorial. We're going to go over how to equipp items first, all you have to do is type `equipp itemname` replace itemname with the items name. Use `inventory` to check your inventory.");
}

exports.equipp = function(msg) {
	var itemname = msg.content.slice(8);
	User.find({id: msg.author.id}, function(err, usser) {
		for(i = 0; i < usser[0].inventory.length; i++) {
			if (usser[0].inventory[i].name == itemname) {
				var Item = usser[0].inventory[i];
				for (j = 0; j < usser[0].equipped.length; j++) {
					if (Item.type == usser[0].equipped[j].type) {
						var UI = usser[0].equipped[j].name;
						usser[0].equipped.push(Item);
						usser[0].inventory.splice(j, 1);
						usser[0].inventory.push(usser[0].equipped[j]);
						usser[0].equipped.splice(j, 1);
						msg.reply(Item.name + ": Has been equipped and " + UI + ": has been unequipped.");
						usser[0].save(function(err, ussser) {
							return;
						});
					}
				}
				usser[0].equipped.push(Item);
				usser[0].inventory.splice(i, 1);
				msg.reply(Item.name + ": Has been equipped.");
				usser[0].save(function(err, ussser) {
					return;
				});
			}
		}
		if (!itemname) {
			msg.reply("Please specify a item");
		}
	})
}

exports.inventory = function(msg) {
	User.findOne({id: msg.author.id}, function(err, user) {
		var ms = "";
		console.log(user.inventory)
		for (i = 0; i < user.inventory.length; i++) {
			ms += user.inventory[i].name;
			if (user.inventory.length > 1) {
				ms += ", "
			}
		}
		msg.channel.sendMessage(ms);
	});
}

exports.info = function(msg) {
	User.findOne({id: msg.author.id}, function(err, usser) {
		const embed = new Discord.RichEmbed()
		.setTitle("Character Info", "gold:" + usser.gold)
		.setAuthor(msg.author.username, msg.author.avatarURL)

		.setColor(0x00AE86)
		.addField("stats", "list of stats")
		.addField("str", usser.stats.str)
		.addField("vit", usser.stats.vit)
		.addField("dex", usser.stats.dex)
		msg.channel.sendEmbed(embed);
	});
}
