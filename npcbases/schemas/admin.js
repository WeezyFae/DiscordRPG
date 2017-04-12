var AdminSchema = Schema({
	id: String,
	name: String,
	warnings: Number,
	kicks: Number,
	pardons: Number
});

module.exports = AdminSchema;
