const npc = require('./npc'),
	items = require('../items/index'),
	enemies = require('../enemies/index'),
	Discord = require('discord.js');

var User;

var that;
var main = class main extends npc {
	constructor(name, dialog) {
		super(name, dialog);
		User = this.User;
		that = this;

	}
	createChar(msg) {
		User.findOne({id: msg.author.id}, function(err, usser) {
			if (err) throw err;
			if (usser) {
				msg.reply("user already exists");
			}else {
				var newuser = new User({
					id: msg.author.id,
					name: msg.author.username,
					hp: 100,
					maxhp: 100,
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
					tutorial(msg);
				})
			}
		});
	}

	equipp(msg) {
		var itemname = msg.content.slice(8);
		var USSER
		User.findOne({id: msg.author.id}, async function(err, usser) {
			if (!usser) {
				msg.reply("make a character with `&create char`");
				return;
			}
			USSER = usser;
			for(var i = 0; i < USSER.inventory.length; i++) {
				if (USSER.inventory[i].name == itemname) {
					var Item = USSER.inventory[i];
					for (var j = 0; j < USSER.equipped.length; j++) {
						if (Item.type == USSER.equipped[j].type) {
							var UI = USSER.equipped[j];
							USSER.equipped.push(Item);
							USSER.inventory.splice(i, 1);
							USSER.inventory.push(UI);
							USSER.equipped.splice(j, 1);
							msg.reply(Item.name + ": Has been equipped and " + UI.name + ": has been unequipped.");
							await USSER.save();
							return;
						}
					}
					USSER.equipped.push(Item);
					USSER.inventory.splice(i, 1);
					msg.reply(Item.name + ": Has been equipped.");
					USSER.save(function(err, ussser) {
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
			if (!user) {
				msg.reply("make a character with `&create char`");
				return;
			}
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
				if (!usser) {
					msg.reply("make a character with `&create char`");
					return;
				}
				const embed = new Discord.RichEmbed()
				.setTitle("Character Info")
				.setAuthor(mentioneddude.username, mentioneddude.avatarURL)

				.setColor(0x00AE86)
				.addField("hp", usser.maxhp)
				.addField("gold", usser.gold)
				.addField("stats", "**str**:" + usser.stats.str + " **vit**:" + usser.stats.vit + " **dex**:" + usser.stats.dex)
				.addField("exp", usser.exp)
				msg.channel.sendEmbed(embed);
			});
			return;
		}
		User.findOne({id: msg.author.id}, function(err, usser) {
			if (!usser) {
				msg.reply("make a character with `&create char`");
				return;
			}
			const embed = new Discord.RichEmbed()
			.setTitle("Character Info")
			.setAuthor(msg.author.username, msg.author.avatarURL)

			.setColor(0x00AE86)
			.addField("hp", usser.maxhp)
			.addField("gold", usser.gold)
			.addField("stats", "**str**:" + usser.stats.str + " **vit**:" + usser.stats.vit + " **dex**:" + usser.stats.dex)
			.addField("exp", usser.exp)
			msg.channel.sendEmbed(embed);
		});
	}

	blessing(msg) {
		msg.guild.fetchMember(msg.author)
		.then(bd => {
			if (bd.highestRole.hasPermission('ADMINISTRATOR')) {
				User.findOne({id: msg.author.id}, function(err, user) {
					if (!user) {
						msg.reply("make a character with `&create char`");
						return;
					}
					user.inventory = [items.armor.creatorsHelm, items.armor.creatorsChest, items.armor.creatorsGauntlets, items.armor.creatorsBoots, items.weapons.creatorsSword];
					user.save(function(err, usser) {
						msg.reply("You have been Honored for being a Creator");
					});
				});
			};
		});
	}

	battling(channell, battler) {
		let channel = channell;
		var enemy;
		if (channel.name == 'plains') {
			enemy = enemies.plains[Math.floor(Math.random() * enemies.plains.length)];
		}
		let msg;
		let didattack = false;
		User.findOne({id: battler.id}, function(err, user) {
			if (!user) {
				msg.reply("make a character with `&create char`");
				return;
			}
			channel.sendMessage(battler.username + ": " + enemy.name + " has jumped out what will you do? (to attack use moveNumber such as move 1 1-4 are the usable moves")
			.then(() => {
				channel.awaitMessages(response => response.content.startsWith('move')  , {
					max: 1,
					time: 15000,
					errors: ['time'],
				})
				.then(collected => {
					msg = collected.first();
					attackmonster(msg.content, enemy, user, channel);
					didattack = true;
					return;
				})
				.catch(() => {
					if (didattack == false) {
						channel.sendMessage("you didnt make a move in time its the enemies turn");
						defendmonster(enemy, user, channel);
					}
				})
			})
		})
	}

	duel(msg) {
		var d = msg.mentions.users.first();
		var yes;
		var no = '🚫';
		var Challenger;
		var Defender;
		msg.guild.emojis.forEach(emoji => {
			if (emoji.name == 'yes') {
				yes = emoji;
			}
		})
		if (d) {
			User.findOne({id: msg.author.id}, function(err, Challengerr) {
				if (!Challengerr) {
					msg.reply("make a character with `&create char`");
					return;
				}
				that.Challenger = Challengerr;
				User.findOne({id: d.id}, async function(err, Defenderr) {
					if (!Defenderr) {
						msg.reply("they dont have an acount");
						return;
					}
					that.Defender = Defenderr;
					const duelembed = new Discord.RichEmbed()
					.setTitle("Duel")
					.setAuthor(that.Challenger.name)
					.addField("CHALLEGED", that.Defender.name + ": you have ben challenged by, " + that.Challenger.name)
					.addField("Do you accept?")
					that.duelmsg = await msg.channel.sendEmbed(duelembed);
					await that.duelmsg.react(yes);
					that.duelmsg.react(no);
				})
			})
		} else {
			msg.reply("mention someone to duel");
		}
	}

	AcceptDuel(msg, Defender, Challenger) {
		const duelaccept = new Discord.RichEmbed()
		.setAuthor("CHALLENGE ACCEPTED")
		DefendersTurn(msg, Defender, Challenger);
		msg.edit({embed: duelaccept});
	}

	DeclineDuel(msg, Defender, Challenger) {
		const dueldecline = new Discord.RichEmbed()
		.setAuthor("CHALLENGE DECLINED")
		msg.clearReactions();
		msg.edit({embed: dueldecline});
	}

}

function lvling(user, channel) {
	if (user.exp >= 100) {
		user.maxhp = 130;
		user.lvl += 1;
		channel.sendMessage("you lvled up and are lvl 2");
	}
	// etc etc
	
	user.save();
}

function loot(enemy, user, channel) {
	user.hp = user.maxhp;
	user.gold += enemy.gold;
	user.exp += enemy.exp;
	user.save();
	lvling(user, channel);

}

function DefendersTurn(msg, Defender, Challenger) {
	const DTurn = new Discord.RichEmbed()
	.setTitle("Defenders Turn")
	.addField(Defender.name + "'s turn", "which move will you do?")
	msg.edit({embed: DTurn});
	attack(msg, Defender, Challenger, "A");
}

function Attack(msg, Defender, Challenger, turn) {
	if (turn == "A") {

	}
}

function tutorial(msg) {
	msg.reply("Now for a simple Tutorial. We're going to go over how to equipp items first, all you have to do is type `equipp itemname` replace itemname with the items name. Use `inventory` to check your inventory.");
}

function attackmonster(move, enemy, user, channel) {
	let weapon;
	let dmgdone;
	for (w = 0; w < user.equipped.length; w++) {
		if (user.equipped[w].type == "Weapon") {
			weapon = user.equipped[w];
		}
	}
		if (move == 'move 1') {
			dmgdone = user.moves.move1.dmg + weapon.dmg;
			enemy.hp -= user.moves.move1.dmg + weapon.dmg;
			if (enemy.hp <= 0) {
				channel.sendMessage("you did " + dmgdone + " dmg and killed " + enemy.name + " gaining " + enemy.exp + " exp, " + enemy.gold + " gold");
				loot(enemy, user, channel);
				return;
			}
			channel.sendMessage("You did " + user.moves.move1.dmg + "dmg lowering its hp to " + enemy.hp);
			defendmonster(enemy, user, channel);
		}
		if (move == 'move 2') {
			dmgdone = user.moves.move2.dmg + weapon.dmg;
			enemy.hp -= user.moves.move2.dmg + weapon.dmg;
			if (enemy.hp <= 0) {
				channel.sendMessage("you did " + dmgdone + " dmg and killed " + enemy.name + " gaining " + enemy.exp + " exp, " + enemy.gold + " gold");
				loot(enemy, user, channel);
				return;
			}
			channel.sendMessage("You did " + user.moves.move2.dmg + "dmg lowering its hp to " + enemy.hp);
			defendmonster(enemy, user, channel);
		}
		if (move == 'move 3') {
			dmgdone = user.moves.move3.dmg + weapon.dmg;
			enemy.hp -= user.moves.move3.dmg + weapon.dmg;
			if (enemy.hp <= 0) {
				channel.sendMessage("you did " + dmgdone + "dmg and killed " + enemy.name + " gaining " + enemy.exp + " exp, " + enemy.gold + " gold");
				loot(enemy, user, channel);
				return;
			}
			channel.sendMessage("You did " + user.moves.move3.dmg + "dmg lowering its hp to " + enemy.hp);
			defendmonster(enemy, user, channel);
		}
		if (move == 'move 4') {
			dmgdone = user.moves.move4.dmg + weapon.dmg;
			enemy.hp -= user.moves.move4.dmg + weapon.dmg;
			if (enemy.hp <= 0) {
				channel.sendMessage("you did " + dmgdone + " and killed " + enemy.name + " gaining " + enemy.exp + " exp, " + enemy.gold + " gold");
				loot(enemy, user, channel);
				return;
			}
			channel.sendMessage("You did " + user.moves.move4.dmg + "dmg lowering its hp to " + enemy.hp);
			defendmonster(enemy, user, channel);
		}
	}

function defendmonster(enemy, user, channel) {
		user.hp -= enemy.moves.move1.dmg;
		var msg;
		var didattack2;
		if (user.hp <= 0) {
			channel.sendMessage("You have died D:");
			return;
		} else {
			channel.sendMessage("The monster did " + enemy.moves.move1.dmg + " dmg you have " + user.hp +" hp left, what will you do?")
			.then(() => {
				channel.awaitMessages(response => response.content.startsWith('move'), {
					max: 1,
					time: 15000,
					errors: ['time'],
				})
				.then(collected => {
					msg = collected.first();
					attackmonster(msg.content, enemy, user, channel);
					didattack2 = true;
					return;
				})
				.catch(() => {
					if (didattack2 == false) {
						channel.sendMessage("you didnt make a move in time its the enemies turn");
						defendmonster(enemy, user, channel);
					}
				})
			})
		}
	}


module.exports = main;