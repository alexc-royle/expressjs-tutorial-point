var express = require('express');

module.exports = (function() {
	'use strict';
	var router = express.Router();

	router.get('/:id([0-9]{5})', function(req,res) {
		res.send('your 5 number long id is: ' + req.params.id);
	})
	router.get('/:id', function(req, res) {
		res.send('The id you specified is ' + req.params.id);
	});
	router.get('/:name/:id', function(req, res) {
		res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
	});
	return router;
})();