var items = require('../items/index');

var wolf = {
	name: "Wolf",
	hp: 100,
	gold: 6,
	lvl: 3,
	exp: 20,
	loot: [items.materials.wolfFur],
	moves: {
		move1: {
			name: "bite",
			dmg: 12
		}
	}
},
zombie = {
  name: "Zombie",
  gold: 10,
  lvl: 5,
  exp: 50,
  hp: 100,
  loot: [items.weapons.ironSword, items.consumables.healthPotion],
  moves: {
    move1: {
      name: "Bite",
      dmg: 10
    }
  }
},
slime = {
  name: "Slime",
  gold: 5,
  lvl: 1,
  exp: 10,
  dmg: 5,
  hp: 50,
  loot: [items.materials.slimeBall, items.consumables.healthPotion],
  moves: {
    move1: {
      name: "Jump",
      dmg: 5
    }
  }
}

var	enemies = [
		wolf, zombie, slime
	];

module.exports = enemies;
