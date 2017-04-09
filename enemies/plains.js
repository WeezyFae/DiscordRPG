var items = require('../items/index');

exports.wolf = {
	name: "Wolf",
	gold: 6,
	lvl: 3,
	exp: 20,
	loot: [items.materials.wolfFur]
	moves: {
		move1: {
			name: "bite",
			dmg: 12
		}
	}
}