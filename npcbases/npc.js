const mongoose = require("mongoose"),
	UserSchema = require('./schemas/user'),
	AdminSchema = require('./schemas/admin'),
	config = require('./config.json');

mongoose.connect(config.url);
var User = mongoose.model("users", UserSchema);
var Admin = mongoose.model("admins", AdminSchema);

class npc {
	constructor(name, dialog) {
		this.name = name;
		this.dialog = dialog;
		this.User = User;
	}
	rdialog() {
		this.tts = this.dialog[Math.floor(Math.random() * this.dialog.length)];
		return this.tts;
	}
}

module.exports = npc;
