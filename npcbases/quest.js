const npc = require('./npc');

// still work in progress

class quest extends npc {
	constructor(name, dialog) {
		super();
		this.name = name;
		this.dialog = dialog;
	}
	quest(questname, description, reward, reward2, reward3) {
		this.questname = questname;
		this.description = description;
		this.reward = reward;
		// if theyres a second reward we make a variable for it
		if (reward2) this.reward2 = reward2;
		// if theyres a third reward we make a variable for it 
		if (reward3) this.reward3 = reward3;

		
		
	}
}