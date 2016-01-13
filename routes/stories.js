var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");

var storySchema = mongoose.Schema(
{
	author: String,
	characters: [String],
	tags: [String],
	story: String

});

var storycoll = mongoose.model("storycoll", storySchema, "stories");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) 
  	{ 
  		return true; //next(); 
  	}
  else return false;
  req.session.error = 'Please sign in!';
  //res.redirect('/login');
}

router.get("/", function(req, res, next)
{
	//authenticate later, figure out how to redirect to correct place
	if (ensureAuthenticated(req, res, next))
	{
		res.render("stories",
		{
			title: "OCAPPA Stories",
			user: req.user
		});
	}
	else
	{
		res.render("stories",
		{
			title: "OCAPPA Stories",
			user: ""
		});
	}
});

router.post("/addstory", function(req, res, next)
{
	var db = req.db;
	var collection = storycoll;
	

	var title = req.body.title;
	var characters = req.body.characters;
	var tags = req.body.tags;
	var story = req.body.story;
	var author = req.body.author;

	console.log(req.body);



});

module.exports = router;
