var express = require('express');
var router = express.Router();

var mongoose = require("mongoose");

// var charSchema = mongoose.Schema(
// {
// 	author: String,
// 	character:
// 	{
// 		name: String,
// 		formes: [String],
// 		abilities: [String],
// 		description: String

// 	}
// });

var authorSchema = mongoose.Schema(
{
	author: String,
	characters: [String],
	stories: [String]
});

var auths = mongoose.model("auths", authorSchema, "authors");

router.get("/chars", function(req, res)
{
	var db = req.db;
	var collection = auths;
	collection.find({}, {}, function(err, docs)
	{
		res.json(docs);
	});
});

module.exports = router;