const mong = require("mongoose")
	Schema = mong.Schema;

var UserSchema = Schema({
	id: String,
	name: String,
	stats: {
		str: Number,
		vit: Number,
		dex: Number
	},
	gold: Number,
	lvl: Number,
	exp: Number,
	questKill: Number,
	inventory: Array,
	equipped: Array,
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

module.exports = UserSchema;
