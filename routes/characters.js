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
  		return true; //
  		//next(); 
  	}
  else return false;
  req.session.error = 'Please sign in!';
  //req.session.returnTo = req.path;
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
	collection.find({}, {}, {sort: {'_id': 1}}, function(err, docs)
	{
		res.json(docs);
	});
});

router.put("/updatechar", function(req, res)
{
	var collection = charcoll;
	//console.log("o.o");
	var charToUpdate = req.body.id;
	var auth = req.body.author;
	var name = req.body.name;
	var formes = req.body.formes;
	var abi = req.body.abilities;
	var desc = req.body.desc;

	console.log(charToUpdate);

	collection.findOneAndUpdate(
	{
		_id : charToUpdate
	},
	{
		"character.name" : name,
		"character.formes" : formes,
		"character.abilities" : abi,
		"character.description" : desc
	}, function(err, docs)
	{
		//collection.character.name = "pasta";
		console.log(docs);
		res.send((err == null) ? {msg: ""} : {msg: err});

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

	if (formes.indexOf(", ") > -1)
	{
		formesArr = formes.split(", ");
	}
	else if (formes.indexOf("\n") > -1)
	{
		formesArr = formes.split("\n");
	}
	else
	{
		formesArr = [formes];
	}

	if (abilities.indexOf(", ") > -1)
	{
		abilitiesArr = abilities.split(", ");
	}
	else if (abilities.indexOf("\n") > -1)
	{
		abilitiesArr = abilities.split("\n");
	}
	else
	{
		abilitiesArr = [abilities];
	}


	//require unique name
	var newChar = collection(
	{
		author: author,
		character:
		{
			name: charName,
			formes: formesArr,
			abilities: abilitiesArr,
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
