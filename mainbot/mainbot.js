const Discord = require("discord.js"),
	client = new Discord.Client(),
	config = require('./config.json'),
	token = config.token,
	prefix = '&';

var npc = require('../npcbases/index.js');
var overSeer = new npc.main("overSeer");

client.login(token);

client.on('ready', () => {
	console.log("I am working master");
});

client.on('guildMemberAdd', member => {
	member.sendMessage(member.user + ' Welcome to ' + guild.name);
});

// setInterval(battletime, 30000);

var Challenger;
var Defender;
var yes;
var no;
var duelmsg;
var User = overSeer.User;

function battletime(msg) {
	if (msg) {
		overSeer.battling(msg.channel, msg.author);
	}
	client.guilds.forEach(Forsaken => {
		if (Forsaken.id == 296681619933102080) {
			Forsaken.channels.forEach(channel => {
				if (channel.id == 296730991853174795) {
					Forsaken.roles.forEach(Plains => {
						if (Plains.id == 297187308719833099) {
							Plains.members.array(members => {
								members.Random(FIGHT => {
									overSeer.battling(channel, FIGHT);
								})
							})
						}
					})
				}
			})
		}
	
	})
}

client.on('messageReactionAdd', function(MR, user) {
	if (overSeer.duelmsg) {
		if (user.id == overSeer.Defender.id && MR.emoji.name == 'yes') {
			overSeer.AcceptDuel(overSeer.duelmsg);
		}
	}
	if (overSeer.duelmsg) {
		if (user.id == overSeer.Defender.id && MR.emoji.name == 'yes') {
			overSeer.DeclineDuel(overSeer.duelmsg);
		}
	}
})

client.on('message',async msg => {
	if (msg.content == prefix + "create char") {
		overSeer.createChar(msg);
	}
	if (msg.content.startsWith(prefix + 'equipp')) {
		overSeer.equipp(msg);
	}
	if (msg.content == prefix + 'inventory') {
		overSeer.inventory(msg);
	}
	if (msg.content.startsWith(prefix + 'info')) {
		overSeer.info(msg);
	}
	if (msg.content == prefix + 'bless') {
		overSeer.blessing(msg);
	}
	if (msg.content.startsWith(prefix + 'duel')) {
		overSeer.duel(msg);// '🚫'
	}
	if (msg.content == prefix + 'battle me') {
		battletime(msg);
	}
})