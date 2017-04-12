const npc = require('./npc');

var that;
var User;
var Items;

class shopkeeper extends npc {
	constructor(name, dialog, items) {
		super(name, dialog);
		this.items = items;
		Items = items;
		User = this.User;
		that = this;
	}

	showitems(msg) {
		var itemss = "";
		for (var l = 0; l < Items.length; l++) {
			itemss += Items[l].name;
			if (l < Items.length) {
				itemss += ", ";
			}
		}
		msg.reply(itemss);
	}

	buying(itemname, msg) {
		var Item;
		var found = false;
		User.findOne({id: msg.author.id}, function(err, usser) {
			if (!usser) {
				msg.reply("make a character with `&create char`");
				return;
			}
			for (var k = 0; k < Items.length; k ++) {
				if (itemname == Items[k].name) {
					Item = Items[k];
					if (usser.gold >= Item.price) {
						usser.gold -= Item.price;
						usser.inventory.push(Item);
						usser.save(function(err, ussser) {
						});
						msg.reply("You've bought " + Item.name + " for " + Item.price + ".");
						return;
					} else {
						msg.reply("You don't have enough gold for, " + Item.name);
						return;
					}
				}
			}
			msg.reply("I'm sorry but I don't have that item");
			return;

		});
	}

	selling(itemname, msg) {
		var iprice;
		User.findOne({id: msg.author.id}, function(err, usser) {
			if (!usser) {
				msg.reply("make a character with `&create char`");
				return;
			}
			if (err) console.error(err);
			for (var h = 0; h < usser.inventory.length; h++) {
				if (itemname == usser.inventory[h].name) {
					iprice = usser.inventory[h].price;
					usser.gold += iprice;
					usser.inventory.splice(h, 1);
					usser.save(function(err, ussser) {
					});
					msg.reply("You have sold " + itemname + " for " + iprice);
					return;
				}
			}
			msg.reply("You don't have that item to sell!");
		});
	}
}

module.exports = shopkeeper;
