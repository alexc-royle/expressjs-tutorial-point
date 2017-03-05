var express = require('express');

module.exports = (function() {
	'use strict';
	var router = express.Router();

	router.get('/', function(req, res) {
		res.send('Static routes base!');
	});
	router.get('/hello', function(req, res) {
		res.send('Hello world!');
	});
	router.post('/hello', function(req, res) {
		res.send('You just called the post method at /hello!\n');
		//Test request using 'curl -X POST "http://localhost:3000/hello"'
	});
	router.all('/test', function(req, res) {
		res.send('HTTP method has no effect on this route!');
	});
	return router;
})();