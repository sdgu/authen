var express = require('express');
var router = express.Router();
var Account = require("../models/account");
var passport = require("passport");


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
		res.render('index', 
  		{ 
  			title: 'OCAPPA',
  			user: req.user
  		});
	}
	else
	{
		res.render('index', 
  		{ 
  			title: 'OCAPPA',
  			user: ""
  		});
	}
});

router.get("/register", function(req, res)
{
	res.render("register", {});
});

router.post("/register", function(req, res)
{
	Account.register(new Account(
	{
		username: req.body.username
	}), req.body.password, function(err, account)
	{
		if (err)
		{
			return res.render("register", {account : account});
		}

		passport.authenticate("local")(req, res, function()
		{
			res.redirect("/");
		});
	});
});

router.get("/login", function(req, res)
{
	console.log(req.route.path);
	res.render("login", {user: req.user});
});

//change where you redirect to based on what page you were on

router.post("/login", passport.authenticate("local"), function(req, res)
{
	res.redirect("/");
});

router.get("/logout", function(req, res)
{
	req.logout();
	res.redirect("/");
});

router.get("/ping", function(req, res)
{
	res.status(200).send("pong");
});


module.exports = router;
