
exports.newuser = function(person) {
	person.sendMessage("Hello! you seem new let us get you setup with a character :3 what shall your name be?")
			.then(() => {
				person.dmChannel.awaitMessages((name) => {newname = name;},
				{
					max: 1,
					time: 30000,
					errors: ['time'],
				})
				.then((collected) => {
					person.sendMessage("your name is " + collected + " we hope to see you around :D");
					let newdude = new User({
						id: person.id,
						name: collected,
						lvl: 1,
						xp: 0,
						items: [items.armor.starterHealm, items.armor.starterChest, items.armor.starterGauntlets, items.armor.starterBoots, items.weapons.starterSword, items.consumables.healthPotion],
						moves: {
							move1: {
								name: "Rush",
								dmg: 12
							},
							move2: {
								name: "Downward Slash",
								dmg: 25
							},
							move3: {
								name: "Stab",
								dmg: 13
							},
							move4: {
								name: "Side Slash",
								dmg: 6
							}
						}
					})
					newdude.save(function(err) {
						if (err) throw err;
					})
				})
				.catch(() => {
					person.sendMessage("you didnt give me a name in the 30 seconds provided please use &register to try again");
				})
			})
}