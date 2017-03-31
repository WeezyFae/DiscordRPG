const Discord = require("discord.js"),
	client = new Discord.Client()
	mongoose = require("mongoose"),
	config = require('./config.json'),
	token = config.token,
	UserSchema = require("./schemas/user");

/* mongoose */

mongoose.connect("mongodb://KingCosmic:Abstuddard9311@ds147070.mlab.com:47070/discordrpg")

const User = mongoose.model('users', UserSchema);

/* npc base */

var npc = require('../npcbases/index.js');

var overSeer = new npc.main();

/* items */

const items = require('../items/index.js');

/* functions */

const funcs = require('../database/functions');

/* discord */

var newname;

client.login(token);

client.on('ready', () => {
	// letting everyone know its online
	client.guilds.forEach(server => {
		server.defaultChannel.sendMessage("I, HAVE ARISEN!");
	});
	//visual confirmation
	console.log("I am working master");
});

client.on('guildmemberadd', person => {
	// adding new ppl to the database
	User.find({id: person.id}, function(err, userr) {
		if (err) {
			funcs.newuser(person);
		}
	})
})

client.on('message', msg => {
	if (msg.mentions.users.first() == client.user) {
		let ms = msg.content.split(" ");
		console.log(ms[1]);
		if (ms[1] == 'Help') {
			overSeer.help(msg.author);
		}
		if (msg[1] == 'Register') {
			funcs.newuser(msg.author);
		}
	}
})