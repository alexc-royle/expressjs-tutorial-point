var express = require('express');

module.exports = (function() {
	'use strict';
	var router = express.Router();

	router.post('/', function(req, res) {
		console.log(req.body);
		res.send("received your request!");
	});
	router.get('/', function(req, res) {
		res.render('simple-form');
	});
	
	
	return router;
})();