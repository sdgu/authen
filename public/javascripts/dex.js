$(document).ready(function() 
{
	$("#btnKeySearch").on("click", getByKeyword);
});

function getByKeyword(event)
{
	event.preventDefault();

	$.getJSON("/characters/characterlist", function(data)
	{
		var options = 
		{
			keys: ["character.name"],
			id: "character.name"
		}

		var f = new Fuse(data, options);
		var result = f.search("test");

		alert(result);

	});

}