const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

var User = new Schema({
	id: String,
	name: String,
	lvl: Number,
	xp: Number,
	items: Array,
	moves: {
		move1: {
			name: String,
			dmg: Number
		},
		move2: {
			name: String,
			dmg: Number
		},
		move3: {
			name: String,
			dmg: Number
		},
		move4: {
			name: String,
			dmg: Number
		}
	}
});

module.exports = User;