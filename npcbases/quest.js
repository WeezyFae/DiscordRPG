const npc = require('./npc');

// still work in progress

class quest extends npc {
	quest(name, description, reward, reward2, reward3) {
		this.name = name;
		this.description = description;
		this.reward = reward;
		this.reward2 = reward2;
		this.reward3 = reward3;
		return;
	}
}