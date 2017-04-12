const npc = require('./npc');

// still work in progress

var User;

class quest extends npc {
	constructor(name, dialog) {
		super(name, dialog);
		User = this.User;
	}
	quest(questname, type, description, reward, reward2, reward3) {
		this.quest = {
			name: questname,
			description: description,
			reward: reward
		};
		// if theyres a second reward we make a variable for it
		if (reward2) this.quest.reward2 = reward2;
		// if theyres a third reward we make a variable for it 
		if (reward3) this.quest.reward3 = reward3;

		
		
	}
}