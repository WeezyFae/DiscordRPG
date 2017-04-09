const npc = require('./npc'),
	mongoose = require("mongoose"),
	UserSchema = require('./schemas/user'),
	items = require('../items/index'),
	enemies = require('../enemies/index'),
	Discord = require('discord.js'),
	config = require('./config.json');


mongoose.connect(config.url);
var User = mongoose.model("users", UserSchema);

class main extends npc {
	constructor(name, dialog) {
		super();
		this.name = name;
		this.dialog = dialog;
	}
	createChar(msg) {
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
					main.tutorial(msg);
				})
			}
		});
	}

	tutorial(msg) {
		msg.reply("Now for a simple Tutorial. We're going to go over how to equipp items first, all you have to do is type `equipp itemname` replace itemname with the items name. Use `inventory` to check your inventory.");
	}

	equipp(msg) {
		var itemname = msg.content.slice(8);
		User.findOne({id: msg.author.id}, function(err, usser) {
			for(var i = 0; i < usser.inventory.length; i++) {
				if (usser.inventory[i].name == itemname) {
					var Item = usser.inventory[i];
					for (var j = 0; j < usser.equipped.length; j++) {
						if (Item.type == usser.equipped[j].type) {
							var UI = usser.equipped[j].name;
							usser.equipped.push(Item);
							usser.inventory.splice(j, 1);
							usser.inventory.push(usser[0].equipped[j]);
							usser.equipped.splice(j, 1);
							msg.reply(Item.name + ": Has been equipped and " + UI + ": has been unequipped.");
							usser.save(function(err, ussser) {
								return;
							});
						}
					}
					usser.equipped.push(Item);
					usser.inventory.splice(i, 1);
					msg.reply(Item.name + ": Has been equipped.");
					usser.save(function(err, ussser) {
						return;
					});
				}
			}
			if (!itemname) {
				msg.reply("Please specify a item");
			}
		})
	}

	inventory(msg) {
		User.findOne({id: msg.author.id}, function(err, user) {
			var ms = "";
			for (var i = 0; i < user.inventory.length; i++) {
				ms += user.inventory[i].name;
				if (user.inventory.length > 1) {
					ms += ", "
				}
			}
			msg.channel.sendMessage(ms);
		});
	}

	info (msg) {
		var mentioneddude = msg.mentions.users.first();
		if (mentioneddude) {
			User.findOne({id: mentioneddude.id}, function(err, usser) {
				const embed = new Discord.RichEmbed()
				.setTitle("Character Info", "gold:" + usser.gold)
				.setAuthor(mentioneddude.username, mentioneddude.avatarURL)

				.setColor(0x00AE86)
				.addField("stats", "list of stats")
				.addField("str", usser.stats.str)
				.addField("vit", usser.stats.vit)
				.addField("dex", usser.stats.dex)
				msg.channel.sendEmbed(embed);
			});
			return;
		}
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

	blessing(msg) {
		msg.guild.fetchMember(msg.author)
		.then(bd => {
			if (bd.highestRole.hasPermission('ADMINISTRATOR')) {
				User.findOne({id: msg.author.id}, function(err, user) {
					user.inventory = [items.armor.creatorsHelm, items.armor.creatorsChest, items.armor.creatorsGauntlets, items.armor.creatorsBoots, items.weapons.creatorsSword];
					user.save(function(err, usser) {
						msg.reply("You have been Honored for being a Creator");
					});
				});
			};
		});
	}

	battling(channel, battler) {
		var enemy = enemies.plains.wolf
		User.findOne({id: battler.id}, function(err, user) {
			channel.sendMessage(battler.username + ": " + enemy.name + " has jumped out what will you do? (to attack use moveNumber such as move1 1-4 are the usable moves")
			.then(() => {
				channel.awaitMessages(response => response.content.startsWith('move') , {
					max: 1,
					time: 30000,
					errors: ['time'],
				})
				.then(collected => {
					channel.sendMessage(collected.first());
					attack(collected, enemy, user, channel);
				})
				.catch(() => {
					channel.sendMessage("you didnt make a move in time its the enemies turn");
					defend(enemy, user);
				})
			})
		})
	}

}

function attack(collected, enemy, user, channel) {
		if (collected == 'move 1') {
			enemy.hp -= user.moves.move1.dmg;
			if (enenmy.hp <= 0) {
				channel.sendMessage("you killed " + enemy.name + " gaining " + enemy.exp + "")
				return;
			} else {
				channel.sendMessage("You did " + user.moves.move1.dmg + " lowering its hp to " + enemy.hp);
				defend(enemy, user, collected);
			}
		}
		if (collected == 'move 2') {
			enemy.hp -= user.moves.move2.dmg;
			if (enenmy.hp <= 0) {
				channel.sendMessage("you killed " + enemy.name + " gaining " + enemy.exp + "")
				return;
			} else {
				channel.sendMessage("You did " + user.moves.move2.dmg + " lowering its hp to " + enemy.hp);
				defend(enemy, user, collected);
			}
		}
		if (collected == 'move 3') {
			enemy.hp -= user.moves.move3.dmg;
			if (enenmy.hp <= 0) {
				channel.sendMessage("you killed " + enemy.name + " gaining " + enemy.exp + "")
				return;
			} else {
				channel.sendMessage("You did " + user.moves.move3.dmg + " lowering its hp to " + enemy.hp);
				defend(enemy, user, collected);
			}
		}
		if (collected == 'move 4') {
			enemy.hp -= user.moves.move4.dmg;
			if (enenmy.hp <= 0) {
				channel.sendMessage("you killed " + enemy.name + " gaining " + enemy.exp + "")
				return;
			} else {
				channel.sendMessage("You did " + user.moves.move4.dmg + " lowering its hp to " + enemy.hp);
				defend(enemy, user, channel);
			}
		}
	}

function defend(enemy, user, channel) {
		user.hp -= enemy.moves.move1.dmg;
		if (user.hp <= 0) {
			channel.sendMessage("You have died D:");
			return;
		} else {
			channel.sendMessage("The monster did " + enemy.moves.move1.dmg + " what will you do?")
			.then(() => {
				collected.channel.awaitMessages(response => response.content.startsWith('move'), {
					max: 1,
					time: 30000,
					errors: ['time'],
				})
				.then(collected => {
					attack(collected, user);
				})
				.catch(() => {
					channel.sendMessage("you didnt make a move in time its the enemies turn");
					defend(enemy, user);
				})
			})
		}
	}

module.exports = main;
