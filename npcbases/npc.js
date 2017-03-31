class npc {
	constructor(name, dialog) {
		this.name = name;
		this.dialog = dialog;

	}
	rdialog() {
		this.tts = this.dialog[Math.floor(Math.random() * this.dialog.length)];
		return this.tts;
	}
}

module.exports = npc;