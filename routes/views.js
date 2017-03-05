var express = require('express');

module.exports = (function() {
	'use strict';
	var router = express.Router();

	router.get('/first_template', function(req, res) {
		res.render('first_view');
	});
	router.get('/dynamic_view', function(req, res) {
		res.render('dynamic', {
			name: 'Csilla Megyesi',
			url: 'https://www.facebook.com/csillaam?fref=hovercard'
		})
	});
	router.get('/conditional-in', function(req, res) {
		res.render('conditional', {
			user : {
				name: "Csilla",
				age: "31"
			}
		})
	});
	router.get('/conditional-out', function(req, res) {
		res.render('conditional')
	});
	router.get('/components', function(req, res) {
		res.render('content')
	});
	router.get('/static-test', function(req, res) {
		res.render('static-test');
	});
	return router;
})();