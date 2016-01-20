var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");

var storySchema = mongoose.Schema(
{
	title: String,
	author: String,
	characters: [String],
	tags: [String],
	story: String

});

var authorSchema = mongoose.Schema(
{
	author: String,
	characters: [String],
	stories: [String]
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
	else //maybe redirect to login so that req.body.routes.path works fine
	{
		res.render("stories",
		{
			title: "OCAPPA Stories",
			user: ""
		});
	}
});

router.get("/storylist", function(req, res)
{
	var db = req.db;
	var collection = storycoll;
	collection.find({}, {}, {sort: {'_id': 1}}, function(err, docs)
	{
		res.json(docs);
	});
});


var works = mongoose.model("works", authorSchema, "authors");



router.put("/updatestory", function(req, res, next)
{
	var collection = storycoll;
	var storyToUpdate = req.body.id;
	var title = req.body.title;
	var characters = req.body.characters;
	var tags = req.body.tags;
	var story = req.body.story;


	if (characters.indexOf(", ") > -1)
	{
		charArr = characters.split(", ");
	}
	else if (characters.indexOf(",") > -1)
	{
		charArr = characters.split(",");
	}
	else if (characters.indexOf("\n") > -1)
	{
		charArr = characters.split("\n");
	}
	else
	{
		charArr = [characters];
	}

	if (tags.indexOf(", ") > -1)
	{
		tagArr = tags.split(", ");
	}
	else if (tags.indexOf(",") > -1)
	{
		tagArr = tags.split(",");
	}
	else if (tags.indexOf("\n") > -1)
	{
		tagArr = tags.split("\n");
	}
	else
	{
		tagArr = [tags];
	}

	collection.findOneAndUpdate(
	{
		_id : storyToUpdate
	},
	{
		"title" : title,
		"characters" : charArr,
		"tags" : tagArr,
		"story" : story
	}, function(err, docs)
	{
		//collection.character.name = "pasta";
		console.log(docs);
		res.send((err == null) ? {msg: ""} : {msg: err});

	});


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

	if (characters.indexOf(", ") > -1)
	{
		charArr = characters.split(", ");
	}
	else if (characters.indexOf(",") > -1)
	{
		charArr = characters.split(",");
	}
	else if (characters.indexOf("\n") > -1)
	{
		charArr = characters.split("\n");
	}
	else
	{
		charArr = [characters];
	}

	if (tags.indexOf(", ") > -1)
	{
		tagArr = tags.split(", ");
	}
	else if (tags.indexOf(",") > -1)
	{
		tagArr = tags.split(",");
	}
	else if (tags.indexOf("\n") > -1)
	{
		tagArr = tags.split("\n");
	}
	else
	{
		tagArr = [tags];
	}

	var newStory = collection(
	{
		author: author,
		title: title,
		characters: charArr,
		tags: tagArr,
		story: story
	});

	console.log(req.body);

	works.findOneAndUpdate(
	{
		author: author
	},
	{
		"$push": {stories : title}
	},
	function(err, docs)
	{
		console.log("this is before the save: " + err);
		newStory.save(function(err)
		{
			console.log("after: " + err);
			res.send(
				(err == null) ? {msg: ""} : {msg: err});
		});
	});



});

module.exports = router;
