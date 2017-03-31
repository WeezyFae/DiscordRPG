class main {
	constructor() {

	}

	info(author) {

	}

	help(author) {
		this.help = "To interact with a bot you do `@botname command` theres a list, of commands in #RulesAndInfo";
		author.sendMessage(this.help);
	}
}

module.exports = main;