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
	});

	router.get('/add', function(req, res) {
		res.render('person-add-form');
	});
	router.post('/add', function(req, res) {
		var personInfo = req.body;
		if(!personInfo.name || !personInfo.age || !personInfo.nationality) {
			res.render('show_message', {message: 'Sorry, you provided the wrong info.', type: 'error', url: '/person'});
		}
		else {
			var newPerson = new Person({
				name: personInfo.name,
				age: personInfo.age,
				nationality: personInfo.nationality
			});
			newPerson.save().then(function() {
				console.log('success');
				res.render('show_message', {message: 'Success: New person added', type: 'success', person: personInfo, url: '/person'});					
			}, function(err) {
				console.log('failed');
				res.render('show_message', {message: 'Database error', type: 'error', url: '/person'});
			})
		}
	});
	router.get('/update/:id', function(req, res) {
		Person.findById(req.params.id).then(function(doc) {
			res.render('person-update-form', {person: doc});
		}, function(err) {
			res.render('show_message', {message: 'Sorry, you provided the wrong info.', type: 'error', url: '/person'});
		})
	});
	router.post('/update', function(req, res) {
		var personInfo = req.body;

		if(!personInfo.name || !personInfo.age || !personInfo.nationality) {
			res.render('show_message', {message: 'Sorry, you provided the wrong info.', type: 'error', url: '/person'});
		}
		else {
			Person.findByIdAndUpdate(personInfo.id, { $set : personInfo }, {new: true}).then(function(doc) {
				console.log(doc);
				res.render('show_message', {message: 'Success: Person edited', type: 'success', person: doc, url: '/person'});	
			}, function(err) {
				res.render('show_message', {message: 'Database error', type: 'error', url: '/person'});
			});
		}
	});
	router.get('/delete/:id', function(req, res) {
		Person.findByIdAndRemove(req.params.id).then(function() {
			res.render('show_message', {message: 'Success: Person deleted', type: 'success', url: '/person'});
		}, function() {
			res.render('show_message', {message: 'Sorry, you provided the wrong info.', type: 'error', url: '/person'});
		})
	});
	
	router.get('/:id', function(req, res) {
		Person.findById(req.params.id).then(function(doc) {
			//res.json(doc);
			res.render('person-details', {person: doc});
		}, function(err) {
			res.render('show_message', {message: 'Sorry, you provided the wrong info.', type: 'error', url: '/person'});
		});
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
	return router;
})();