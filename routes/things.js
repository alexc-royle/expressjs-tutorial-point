var express = require('express');

module.exports = (function() {
	'use strict';
	var router = express.Router();

	router.get('/', function(req, res) {
		res.send('GET route on things.');
	});
	router.post('/', function(req, res) {
		res.send('POST route on things.');
	});
	return router;
})();