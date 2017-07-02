var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	res.redirect('/burgers');
});

router.get('/burgers', function (req, res) {
	models.Burger.findAll().then(function(data){
		res.render('index', {burgers: data})
	});
});

router.post('/burgers/new', function (req, res) {
	var burger = req.body.burger;
	models.Burger.create({
		burger_name: burger,
		devoured: 0
	}).then(function(){
		res.redirect('/burgers');
	});
});

router.put('/burgers/update/:id', function (req, res) {
	var id = req.params.id;
	models.Burger.update({
		devoured: true
	}, {
		where: {
			id: id
		}
	}).then(function(){
		res.redirect('/burgers');
	});
});

router.delete('/burgers/delete/:id', function(req, res){
	var id = req.params.id;
	models.Burger.destroy({
		where: {
			id: id
		}
	}).then(function(){
		res.redirect('/burgers');
	});
});

module.exports = router;
