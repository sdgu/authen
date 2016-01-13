var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");

var charSchema = mongoose.Schema(
{
	author: String,
	character:
	{
		name: String,
		formes: [String],
		abilities: [String],
		description: String,
		level: Number

	}
});

var authorSchema = mongoose.Schema(
{
	author: String,
	characters: [String],
	stories: [String]
});

var charcoll = mongoose.model("charcoll", charSchema, "characters");

var workscoll = mongoose.model("workscoll", authorSchema, "authors");

///////////////////////////////////////
//changes the character page to /characters

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) 
  	{ 
  		return true; //next(); 
  	}
  else return false;
  req.session.error = 'Please sign in!';
  //res.redirect('/login');
}

router.get('/', function(req, res, next) 
{
	
	if (ensureAuthenticated(req, res, next))
	{
		res.render('characters', 
  		{ 
  			title: 'OCAPPA Characters',
  			user: req.user
  		});
	}
	else
	{
		res.render('characters', 
  		{ 
  			title: 'OCAPPA Characters',
  			user: ""
  		});
	}


});
/////////////////////////////////


router.get("/characterlist", function(req, res)
{
	var db = req.db;
	var collection = charcoll;
	collection.find({}, {}, function(err, docs)
	{
		res.json(docs);
	});
});


router.post("/addchar", function(req, res)
{
	var db = req.db;
	var collection = charcoll;

	var authorscoll = workscoll;




	var author = req.body.author;
	var charName = req.body.name;
	var formes = req.body.formes;
	var abilities = req.body.abilities;
	var desc = req.body.description;


	//require unique name
	var newChar = collection(
	{
		author: author,
		character:
		{
			name: charName,
			formes: [formes],
			abilities: [abilities],
			description: desc,
			level: 0

		}
	});

	authorscoll.findOneAndUpdate(
	{
		author: author
	}, 
	{
		"$push": {characters : charName}
	}, 
	{
		safe: true, upsert: true
	},
	function(err, docs)
	{
		console.log(err);
		console.log(docs);
		console.log(newChar);


		newChar.save(function(err)
		{
			res.send(
				(err == null) ? {msg: ""} : {msg: err});
		});
	});

	// var newAuthor = authorscoll(
	// {
	// 	author: author,
	// 	characters: [charName]
	// });

	// newAuthor.save(function(err)
	// {
	// 	res.send(
	// 		(err == null) ? {msg: ""} : {msg: err});
	// });






});


module.exports = router;
