var express = require('express');
var router = express.Router();
var Account = require("../models/account");
var passport = require("passport");

var mongoose = require("mongoose");

var entrySchema = mongoose.Schema(
{
	word: String,
	pronunciation: String,
	partofspeech: String,
	description: String,
	example: String,
	synonyms: [String],
	author: String
});

var Entry = mongoose.model("Entry", entrySchema);

function ensureAuthenticated(req, res, next) {

	if (req.isAuthenticated()) 
	{ 
		if (req.user.username == "Shawn")
		{
			return true;
		}
		else
		{
			return false;
			//res.redirect("/")
		}
  		
  	}
  	else
  	{
  		return false;
  		//req.session.error = 'Please sign in!';
  		//res.redirect("/")
  	}
}


		// "author" : $("#author").text(),
		// "word" : $("#inputWord").val(),
		// "pronunciation" : $("#inputPronunciation").val(),
		// "part" : $("#inputPart").val(),
		// "desc" : $("#inputDesc").val(),
		// "example" : $("#inputEx").val(),
		// "synonyms" : $("#inputSyn").val()


router.put("/updateentry", function(req, res)
{
	var db = req.db;
	var collection = Entry;
	var bod = req.body;

	var id = bod.id;

	var word = bod.word;
	var pro = bod.pronunciation;
	var part = bod.part;
	var desc = bod.desc;
	var exam = bod.example;
	var syn = bod.synonyms;

	var synArr = [];

	if (syn.indexOf(", ") > -1)
	{
		synArr = syn.split(", ");
	}
	else
	{
		synArr = [syn];
	}


	collection.findOneAndUpdate(
	{
		_id : id
	},
	{
		word : word,
		pronunciation : pro,
		partofspeech : part,
		description : desc,
		example : exam,
		synonyms : synArr,
	}, function(err, docs)
	{
		res.send((err == null) ? {msg: ""} : {msg: err});
	});

});


router.post("/addentry", function(req, res)
{
	var db = req.db;
	var collection = Entry;
	var bod = req.body;

	var author = bod.author;
	var word = bod.word;
	var pro = bod.pronunciation;
	var part = bod.part;
	var desc = bod.desc;
	var exam = bod.example;
	var syn = bod.synonyms;

	var synArr = [];

	if (syn.indexOf(", ") > -1)
	{
		synArr = syn.split(", ");
	}
	else
	{
		synArr = [syn];
	}

	var newEntry = collection(
	{
		word : word,
		pronunciation : pro,
		partofspeech : part,
		description : desc,
		example : exam,
		synonyms : synArr,
		author : author

	});

	newEntry.save(function(err)
	{
		res.send((err == null) ? {msg: ""} : {msg: err});
	});


});



router.get("/entrylist", function(req, res)
{
	var db = req.db;
	var collection = Entry;
	collection.find({}, {}, {sort: {'word': 1}}, function(err, docs)
	{
		res.json(docs);
	});
});

router.get('/', function(req, res, next) 
{

	//console.log(req.user);
	if (ensureAuthenticated(req, res, next))
	{
		res.render('dictionary', 
  		{ 
  			title: 'Dictionary',
  			user: req.user
  		});
	}
	else
	{
		res.render("dictionary",
		{
			title: "Dictionary",
			user: ""
		});
	}

});

router.post("/login", passport.authenticate("local"), function(req, res)
{
	res.redirect("/dictionary");
});







module.exports = router;