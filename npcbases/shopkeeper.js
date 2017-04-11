const npc = require('./npc');

var that;
var User

class shopkeeper extends npc {
	constructor(name, dialog, items) {
		super(name, dialog);
		this.items = items;
		User = this.User;
		that = this;
	}

	showitems(msg) {
		for (var l = 0; l < this.items.length; l++) {
			var itemss = "";
			itemss += this.items[l].name;
			if (l > 0 && l < this.items.length) {
				itemss += ", ";
			}
		}
		msg.reply(itemss);
	}

	buying(itemname, msg) {
		User.findOne({id: msg.author.id}, function(err, usser) {
			for (var k = 0; k < that.items.length; k ++) {
				if (itemname == that.items[k].name) {
					if (usser.gold >= that.items[k].price) {
						usser.gold -= that.items[k].price;
						usser.inventory.push(that.items[k]);
						usser.save(function(err, ussser) {
							msg.reply("You've bought " + that.items[k].name + " for " + that.items[k].price + ".");
							return;
						});
					} else {
						msg.reply("You don't have enough gold for, " + that.items[k].name);
						return;
					}
				}
			}
			msg.reply("I'm sorry but I don't have that item");
			return;
		});
	}

	selling(itemname, msg) {
		var itemsold = false;
		var iprice;
		User.findOne({id: msg.author.id}, function(err, usser) {
			if (err) console.error(err);
			for (var h = 0; h < usser.inventory.length; h++) {
				if (itemname == usser.inventory[h].name) {
					iprice = usser.inventory[h].price;
					usser.gold += usser.inventory[h].price;
					usser.inventory.splice(h, 1);
					usser.save(function(err, ussser) {
						msg.reply("You have sold " + itemname + " for " + iprice);
						itemsold = true;
						return;
					});
				} if (h = usser.inventory.length && itemsold == false) {
					msg.reply("You don't have that item to sell!");
				}
			}
		});
	}
}

module.exports = shopkeeper;
