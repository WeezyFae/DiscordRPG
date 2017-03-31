const Discord = require("discord.js"),
	client = new Discord.Client(),
	mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	config = require("./data/config.json"),
	token = config.token;

client.login(token)