exports.createChar = function(user, User, msg, items, funcs) {
	User.find({id: user.id}, function(err, usser) {
		if (err) throw err;
		if (usser.length) {
			msg.reply("user already exists");
		}else {
			var newuser = new User({
				id: user.id,
				name: user.username,
				lvl: 1,
				exp: 0,
				inventory: [items.armor.starterHealm, items.armor.starterChest, items.armor.starterGauntlets, items.armor.starterBoots, items.weapons.starterSword, items.consumables.healthPotion],
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
					msg.reply("something went wrong");
				}
				msg.channel.sendMessage("Character: " + user.username + ", has been created");
				funcs.tutorial(msg.author, User, msg);
			})
		}
	});
}

exports.tutorial = function(user, User, msg) {
	msg.reply("Now for a simple Tutorial. we're going to go over how to equipp items first, all you do is type `equipp itemname` replace itemname with the items name use `inventory` to check your inventory");
}

exports.equipp = function(user, User, msg) {
	var itemname = msg.content.slice(8);
	console.log(itemname);
	User.find({id: user.id}, function(err, usser) {
		for(i = 0; i < usser[0].inventory.length; i++) {
			if (usser[0].inventory[i].name == itemname) {
				var Item = usser[0].inventory[i];
				for (j = 0; j < usser[0].equipped.length; j++) {
					if (Item.type == usser[0].equipped[j].type) {
						usser[0].equipped.push(Item);
						delete usser[0].inventory[i];
						usser[0].inventory.push(usser.equipped[j]);
						delete usser[0].equipped[j];
						msg.reply(Item.name + ": Has been equipped and " + usser.equipped[j].name + ": has been unequipped");
						usser.save(function(err, ussser) {
						return;
						});
					}
					if (j == usser[0].equipped.length -1) {
						usser[0].equipped.push(Item);
						delete usser[0].inventory[i];
						msg.reply(Item.name + ": Has been equipped");
						usser.save(function(err, ussser) {
							return;
						});
					}
				}
			}
		}
		if (!Item) {
			msg.reply("You dont have that Item");
		}
	})
}

exports.inventory = function(user, User, msg) {
	User.find({id: user.id}, function(err, usser) {
		var ms = "";
		for (i = 0; i < usser[0].inventory.length; i++) {
			ms += usser[0].inventory[i].name;
			if (usser[0].inventory.length > 1) {
				ms += ", "
			}
		}
		msg.channel.sendMessage(ms);
	});
}