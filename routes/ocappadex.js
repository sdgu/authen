var express = require('express');
var router = express.Router();
var Account = require("../models/account");
var passport = require("passport");

var mongoose = require("mongoose");
var elmongo = require("elmongo");


var storySchema = new mongoose.Schema(
{
	title: String,
	author: String,
	characters: [String],
	tags: [String],
	story: String

});



// storySchema.plugin(elmongo, {url: "sdgu:pasta0@ds039145.mongolab.com:39145/ocappa"});
var Story = mongoose.model("Story", storySchema);


// Story.sync(function (err, numSynced)
// {
// 	console.log(err);
// 	console.log("num synced: ", numSynced);
// });


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) 
  	{ 
  		return true; //next(); 
  	}
  else return false;
  req.session.error = 'Please sign in!';
  //res.redirect('/login');
}


/* GET home page. */
router.get('/', function(req, res, next) 
{
	
	if (ensureAuthenticated(req, res, next))
	{
		res.render('ocappadex', 
  		{ 
  			title: 'The OCAPPA Dex',
  			user: req.user
  		});
	}
	else
	{
		res.render('ocappadex', 
  		{ 
  			title: 'The OCAPPA Dex',
  			user: ""
  		});
	}


});

module.exports = router;
