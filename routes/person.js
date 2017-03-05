var express = require('express');
var Person = require('../schema/person.js');

module.exports = (function() {
	'use strict';
	var router = express.Router();
	router.get('/', function(req, res) {
		Person.find({}).then(function(doc){
			//res.json(doc);
			res.render('person', {people: doc});
		});
	});//[i love you],[i love you too, princesss!]
	router.get('/:id', function(req, res) {
		Person.findById(req.params.id).then(function(doc) {
			res.json(doc);
		})
	});
	router.get('/name/:name', function(req, res) {
		Person.find({name: req.params.name}).then(function(doc) {
			res.json(doc);
		})
	});
	router.get('/nameone/:name', function(req, res) {
		Person.findOne({name: req.params.name}).then(function(doc) {
			res.json(doc);
		})
	});
	router.get('/add', function(req, res) {
		res.render('person-add-form');
	});
	router.post('/add', function(req, res) {
		var personInfo = req.body;
		if(!personInfo.name || !personInfo.age || !personInfo.nationality) {
			res.render('show_message', {message: 'Sorry, you provided the wrong info.', type: 'error'});
		}
		else {
			var newPerson = new Person({
				name: personInfo.name,
				age: personInfo.age,
				nationality: personInfo.nationality
			});
			newPerson.save().then(function() {
				console.log('success');
				res.render('show_message', {message: 'Success: New person added', type: 'success', person: personInfo});					
			}, function(err) {
				console.log('failed');
				res.render('show_message', {message: 'Database error', type: 'error'});
			})
		}
	});
	

	return router;
})();