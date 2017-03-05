var mongoose = require('mongoose');

module.exports = (function() {
	'use strict';
	var personSchema = mongoose.Schema({
		name: String,
		age: Number,
		nationality: String
	});
	var Person = mongoose.model("Person", personSchema);
	return Person;
})();