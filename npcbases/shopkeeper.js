const npc = require('./npc'),
	mongoose = require('mongoose'),
	UserSchema = require('../database/schemas/user');

mongoose.connect("mongodb://KingCosmic:Abstuddard9311@ds147070.mlab.com:47070/discordrpg");
var User = mongoose.model("users", UserSchema);
var that;

class shopkeeper extends npc {
	constructor(name, dialog, items) {
		super();
		this.name = name;
		this.dialog = dialog;
		this.items = items;
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
		User.find({id: msg.author.id}, function(err, usser) {
			for (var k = 0; k < that.items.length; k ++) {
				if (itemname == that.items[k].name) {
					if (usser[0].gold >= that.items[k].price) {
						usser[0].gold -= that.items[k].price;
						usser[0].inventory.push(that.items[k]);
						usser[0].save(function(err, ussser) {
							msg.reply("You've bought " + that.items[k].name + " for " + that.items[k].price + ".");
							return;
						});
					} else {
						msg.reply("you dont have enough gold for, " + that.items[k].name);
						return;
					}
				}
			}
			msg.reply("I'm sorry but I dont have that item");
			return;
		});
	}

	selling(itemname, msg) {
		User.find({id: msg.author.id}, function(err, usser) {
			if (err) console.error(err);
			for (var h = 0; h < usser[0].inventory.length; h++) {
				if (itemname == usser[0].inventory[h].name) {
					var iprice = usser[0].inventory[h].price;
					usser[0].gold += usser[0].inventory[h].price;
					usser[0].inventory.splice(h, 1);
					msg.reply("you have sold " + itemname + " for " + iprice);
					usser[0].save(function(err, ussser) {
						return;
					});
				}
			}
			msg.reply("You dont have " + itemname + " to sell");
		});
	}
}

module.exports = shopkeeper;