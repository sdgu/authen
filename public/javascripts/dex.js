$(document).ready(function() 
{
	$("#btnKeySearch").on("click", getByKeyword);
});

function getByKeyword(event)
{
	event.preventDefault();

	var charRes = "";
	var storyRes = "";

	var charQueryContent = "";
	var storyQueryContent = "";

	var charDetailContent = "";
	var storyDetailContent = "";

	$.getJSON("/characters/characterlist", function(data)
	{

		$.getJSON("/stories/storylist", function(dataStories)
		{
		
			var query = $("#keywordSearch").val();
			//alert(query);

			var options = 
			{
				keys: ["character.name"],
				id: "",
				threshold: 0.33
			}

			var f = new Fuse(data, options);
			charRes = f.search(query);
			

			charQueryContent = "<strong>Characters</strong> <br />";

			charDetailContent += '<table class="variousInfo"><tr><td><h2>Character Info</h2></td></tr>';
			charDetailContent += '<tr><td>'

			$.each(charRes, function(index, value)
			{
				
				charQueryContent += this.character.name + "<br />";

				charDetailContent += '<div id="charInfo">';
				charDetailContent += '<table><tr>';
				charDetailContent += '<td class="titl"><strong>Character Name: </strong></td>';
				charDetailContent += '<td>' + this.character.name + '</td></tr>'
				


				charDetailContent += '</table>';



			});

			charDetailContent += '</div></table>';


	
			//alert(query);

			var options2 = 
			{
				keys: ["title"],
				id: "title",
				threshold: 0.33
			}

			var f = new Fuse(dataStories, options2);
			storyRes = f.search(query);
			storyQueryContent = "<strong>Stories</strong> <br />"
			$.each(storyRes, function(index, vaule)
			{
				storyQueryContent += this + "<br />";
			});


			$("#displayHere").html(charQueryContent + "<br />" + storyQueryContent);
			$("#displayDetails").html(charDetailContent);
			//$("#displayHere").html("<strong>Characters</strong> <br />" + charRes.join("<br />") + "<br />" + "<br /> <strong>Stories</strong> <br />" + storyRes.join("<br />"));

		});

	});



}