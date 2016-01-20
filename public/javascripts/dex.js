$(document).ready(function() 
{
	$("#btnKeySearch").on("click", getByKeyword);






});


$(".goTo").on("click", test);
function test(event)
{
	event.preventDefault();
	var subject = $(this).attr("rel");
	alert(subject);
	//scrolling doesn't seem to work
    $("html, body").animate({ scrollTop: $('#' + subject).offset().top }, 1000);
}

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
			
			charQueryContent += '<script>$(".goTo").on("click", test); function test(event) { event.preventDefault(); var subject = $(this).attr("rel"); alert(subject); $("html, body").animate({ scrollTop: $('#' + subject).offset().top }, 1000); }</script>';
			// '<script>
			// 	$(".goTo").on("click", function(){alert("pasta");});
			// </script>';

			charQueryContent += "<strong>Characters</strong> <br /><div id='toc'>";

			charDetailContent += '<table class="variousInfo">';
			charDetailContent += '<tr><td><h2>Character Info</h2></td></tr>';
			charDetailContent += '<tr><td>';

			$.each(charRes, function(index, value)
			{
				
				charQueryContent += '<a href="#" class="goTo" rel="' + this.character.name + '">' + this.character.name + '</a><br />';

				charDetailContent += '<div class="charInfo" id="' + this.character.name + '">';

				charDetailContent += '<table>';

				charDetailContent += '<tr>';
				charDetailContent += '<td class="titl"><strong>Character Name: </strong></td>';
				charDetailContent += '<td>' + this.character.name + '</td></tr>';

				charDetailContent += '<tr>';
				charDetailContent += '<td class="titl"><strong>Formes: </strong></td>';
				charDetailContent += '<td>' + this.character.formes.join(", ") + '</td></tr>';

				charDetailContent += '<tr>';
				charDetailContent += '<td class="titl"><strong>Abilities: </strong></td>';
				charDetailContent += '<td>' + this.character.abilities.join(", ") + '</td></tr>';

				charDetailContent += '<tr>';
				charDetailContent += '<td class="titl"><strong>Description: </strong></td>';
				charDetailContent += '<td>' + this.character.description + '</td></tr>';

				charDetailContent += '<tr>';
				charDetailContent += '<td class="titl"><strong>Author: </strong></td>';
				charDetailContent += '<td>' + this.author + '</td></tr>'

				charDetailContent += '</table>';

				charDetailContent += '</div>';
				
			});

			charDetailContent += '</td></tr></table>';

			charQueryContent += '</div>';

			//alert(query);

			var options2 = 
			{
				keys: ["title"],
				id: "",
				threshold: 0.33
			}

			var f = new Fuse(dataStories, options2);
			storyRes = f.search(query);

			storyQueryContent = "<strong>Stories</strong> <br />"

			storyDetailContent += '<table class="variousInfo">';
			storyDetailContent += '<tr><td><h2>Story Info</h2></td></tr>';
			storyDetailContent += '<tr><td>';

			$.each(storyRes, function(index, vaule)
			{
				storyQueryContent += '<a href="#" class="goTo" rel="' + this.title + '">' + this.title + "</a><br />";

				storyDetailContent += '<div class="storyInfo" id="' + this.title + '">';

				storyDetailContent += '<table>';

				storyDetailContent += '<tr>';
				storyDetailContent += '<td class="titl"><strong>Story Title: </strong></td>';
				storyDetailContent += '<td>' + this.title + '</td></tr>';

				storyDetailContent += '<tr>';
				storyDetailContent += '<td class="titl"><strong>Characters: </strong></td>';
				storyDetailContent += '<td>' + this.characters.join(", ") + '</td></tr>';

				storyDetailContent += '<tr>';
				storyDetailContent += '<td class="titl"><strong>Tags: </strong></td>';
				storyDetailContent += '<td>' + this.tags.join(", ") + '</td></tr>';

				storyDetailContent += '<tr>';
				storyDetailContent += '<td class="titl"><strong>Story: </strong></td>';
				storyDetailContent += '<td>' + this.story + '</td></tr>';

				storyDetailContent += '</table>';

				storyDetailContent += '</div>';

			});

			storyDetailContent += '</td></tr></table>';

			$("#displayHere").html(charQueryContent + "<br />" + storyQueryContent);
			$("#displayDetails").html(charDetailContent + "<br />" + storyDetailContent);
			//$("#displayHere").html("<strong>Characters</strong> <br />" + charRes.join("<br />") + "<br />" + "<br /> <strong>Stories</strong> <br />" + storyRes.join("<br />"));

		});

	});



}