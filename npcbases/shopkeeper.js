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
						msg.reply("you have sold " + itemname + " for " + iprice);
						itemsold = true;
						return;
					});
				} if (h = usser.inventory.length && itemsold == false) {
					msg.reply("you dont have that item to sell");
				}
			}
		});
	}
}

module.exports = shopkeeper;