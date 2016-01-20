$(document).ready(function() 
{
	$("#btnKeySearch").on("click", getByKeyword);
	$("#btnAuthSearch").on("click", getByAuthor);
	$("#btnTagSearch").on("click", getByTag);

});


// $(".goTo").on("click", test);
// function test(event)
// {
// 	event.preventDefault();
// 	var subject = $(this).attr("rel").replace(" ", "_");
// 	$("html, body").animate({ scrollTop: $("#" + subject).offset().top }, 1000);    
// }





// function intersect_safe(arr1, arr2) {
//      var r = [], o = {}, l = arr2.length, i, v;
//      for (i = 0; i < l; i++) {
//          o[arr2[i]] = true;
//          alert("o: " + o.title);
//      }
//      l = arr1.length;
//      for (i = 0; i < l; i++) {
//          v = arr1[i];
//          alert(v.title);
//          if (v in o) {
//              r.push(v);
//          }
//      }
//      return r;
// }

// function intersect_safe(a, b)
// {
//   var ai=0, bi=0;
//   var result = [];	


//   while( ai < a.length && bi < b.length )
//   {
// 	  alert(ai);

//      if      (a[ai].title < b[bi].title){ ai++; }
//      else if (a[ai].title > b[bi].title ){ bi++; }
//      else /* they're equal */
//      {
//        result.push(a[ai]);
//        ai++;
//        bi++;
//      }
//   }

//   return result;
// }

function getByKeyword(event)
{
	event.preventDefault();

//$("html, body").animate({ scrollTop: $("#" + subject).offset().top }, 1000);
	

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
			var query;
			var query = $("#keywordSearch").val();
			

			// if (queryArr.indexOf(", ") > -1)
			// {
			// 	query = queryArr.split(", ");
			// }
			// else if (queryArr.indexOf(",") > -1)
			// {
			// 	query = queryArr.split(",");
			// }
			// else
			// {
			// 	query = [queryArr];
			// }

			//alert(query[0]);

			var options = 
			{
				keys: ["character.name"],
				id: "",
				threshold: 0.33
			}

			var f = new Fuse(data, options);
			
			
			charQueryContent += '<script>$(".goTo").on("click", test); function test(event) { event.preventDefault(); var subject = $(this).attr("rel"); $("html, body").animate({ scrollTop: $("#" + subject).offset().top }, 1000); }</script>';
			// '<script>
			// 	$(".goTo").on("click", function(){alert("pasta");});
			// </script>';

			charQueryContent += "<strong>Characters</strong> <br />";

			var overlapping = [];

		//for (var i = 0; i < query.length; i++)
		{	

			//alert(charRes);
			//var temp;

			//temp = charRes;
			//alert(temp);

			charRes = f.search(query);
			//alert(charRes);

			// if (intersect_safe(temp, charRes).length > 0)
			// {
			// 	overlapping.push(intersect_safe(temp, charRes));
			// 	alert(overlapping[0][0].character.name);
			// }
			
			//charQueryContent += "Found by " + '"' + query + '"' + "<br />";
			
		
			charDetailContent += '<div id="toc">';
			charDetailContent += '<table class="variousInfo">';
			charDetailContent += '<tr><td><h2>Character Info</h2></td></tr>';
			charDetailContent += '<tr><td>';

			$.each(charRes, function(index, value)
			{
				
				charQueryContent += '<a href="#" class="goTo" rel="char' + index + '">' + this.character.name + '</a><br />';

				charDetailContent += '<div class="charInfo" id="char' + index + '">';

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
		}
			//alert(query);

			var options2 = 
			{
				keys: ["title"],
				id: "",
				threshold: 0.33
			}

			var f2 = new Fuse(dataStories, options2);
			

			storyQueryContent = "<strong>Stories</strong> <br />"

			storyRes = f2.search(query);

			storyDetailContent += '<table class="variousInfo">';
			storyDetailContent += '<tr><td><h2>Story Info</h2></td></tr>';
			storyDetailContent += '<tr><td>';

			$.each(storyRes, function(index, vaule)
			{
				storyQueryContent += '<a href="#" class="goTo" rel="story' + index + '">' + this.title + "</a><br />";

				storyDetailContent += '<div class="storyInfo" id="story' + index + '">';

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

function getByAuthor(event)
{
	event.preventDefault();

	var charRes = "";
	var storyRes = "";

	var charQueryContent = "";
	var storyQueryContent = "";

	var charDetailContent = "";
	var storyDetailContent = "";

	$.getJSON("/characters/characterlist", function(charData)
	{
		$.getJSON("/stories/storylist", function(storyData)
		{
			var query = $("#authSearch").val();

			var charOptions = 
			{
				keys: ["author"],
				id: "",
				threshold: 0.34
			}

			var f = new Fuse(charData, charOptions);
			charRes = f.search(query);

			charQueryContent += '<script>$(".goTo").on("click", test); function test(event) { event.preventDefault(); var subject = $(this).attr("rel"); $("html, body").animate({ scrollTop: $("#" + subject).offset().top }, 1000); }</script>';

			charQueryContent += "<strong>Characters</strong> <br /><div id='toc'>";

			charDetailContent += '<table class="variousInfo">';
			charDetailContent += '<tr><td><h2>Character Info</h2></td></tr>';
			charDetailContent += '<tr><td>';

			$.each(charRes, function(index, value)
			{
				
				charQueryContent += '<a href="#" class="goTo" rel="char' + index + '">' + this.character.name + '</a><br />';

				charDetailContent += '<div class="charInfo" id="char' + index + '">';

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


			var storyOptions = 
			{
				keys: ["author"],
				id: "",
				threshold: 0.34
			}

			var f = new Fuse(storyData, storyOptions);
			storyRes = f.search(query);

			storyQueryContent = "<strong>Stories</strong> <br />"

			storyDetailContent += '<table class="variousInfo">';
			storyDetailContent += '<tr><td><h2>Story Info</h2></td></tr>';
			storyDetailContent += '<tr><td>';

			$.each(storyRes, function(index, vaule)
			{
				storyQueryContent += '<a href="#" class="goTo" rel="story' + index + '">' + this.title + "</a><br />";

				storyDetailContent += '<div class="storyInfo" id="story' + index + '">';

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

		});
	});

}
function intersect_safe(a, b) {
    var t;
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function (e) {
        if (b.indexOf(e) !== -1) return true;
    });
}


function getByTag(event)
{
	event.preventDefault();

//$("html, body").animate({ scrollTop: $("#" + subject).offset().top }, 1000);
	

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
		 	var query;
		 	var queryArr = $("#tagSearch").val();
			
{
		// 	//alert(query[0]);

		// 	var options = 
		// 	{
		// 		keys: [""],
		// 		id: "",
		// 		threshold: 0.33
		// 	}

		// 	var f = new Fuse(data, options);
			
			
		// 	charQueryContent += '<script>$(".goTo").on("click", test); function test(event) { event.preventDefault(); var subject = $(this).attr("rel"); $("html, body").animate({ scrollTop: $("#" + subject).offset().top }, 1000); }</script>';
		// 	// '<script>
		// 	// 	$(".goTo").on("click", function(){alert("pasta");});
		// 	// </script>';

		// 	charQueryContent += "<strong>Characters</strong> <br />";

		// 	var overlapping = [];

		// for (var i = 0; i < query.length; i++)
		// {	

		// 	//alert(charRes);
		// 	var temp;

		// 	temp = charRes;
		// 	//alert(temp);

		// 	charRes = f.search(query[i]);
		// 	//alert(charRes);

		// 	if (intersect_safe(temp, charRes).length > 0)
		// 	{
		// 		overlapping.push(intersect_safe(temp, charRes));
		// 		alert(overlapping[0][0].character.name);
		// 	}
			
		// 	charQueryContent += "found by " + overlapping + "<br />";
		// 	charQueryContent += "Found by " + '"' + query[i] + '"' + "<br />";
			
		
		// 	charDetailContent += '<div id="toc">';
		// 	charDetailContent += '<table class="variousInfo">';
		// 	charDetailContent += '<tr><td><h2>Character Info</h2></td></tr>';
		// 	charDetailContent += '<tr><td>';

		// 	$.each(charRes, function(index, value)
		// 	{
				
		// 		charQueryContent += '<a href="#" class="goTo" rel="char' + i + index + '">' + this.character.name + '</a><br />';

		// 		charDetailContent += '<div class="charInfo" id="char' + i + index + '">';

		// 		charDetailContent += '<table>';

		// 		charDetailContent += '<tr>';
		// 		charDetailContent += '<td class="titl"><strong>Character Name: </strong></td>';
		// 		charDetailContent += '<td>' + this.character.name + '</td></tr>';

		// 		charDetailContent += '<tr>';
		// 		charDetailContent += '<td class="titl"><strong>Formes: </strong></td>';
		// 		charDetailContent += '<td>' + this.character.formes.join(", ") + '</td></tr>';

		// 		charDetailContent += '<tr>';
		// 		charDetailContent += '<td class="titl"><strong>Abilities: </strong></td>';
		// 		charDetailContent += '<td>' + this.character.abilities.join(", ") + '</td></tr>';

		// 		charDetailContent += '<tr>';
		// 		charDetailContent += '<td class="titl"><strong>Description: </strong></td>';
		// 		charDetailContent += '<td>' + this.character.description + '</td></tr>';

		// 		charDetailContent += '<tr>';
		// 		charDetailContent += '<td class="titl"><strong>Author: </strong></td>';
		// 		charDetailContent += '<td>' + this.author + '</td></tr>'

		// 		charDetailContent += '</table>';

		// 		charDetailContent += '</div>';
				
		// 	});

		// 	charDetailContent += '</td></tr></table>';

		// 	charQueryContent += '</div>';
		// }
			//alert(query);
}
			if (queryArr.indexOf(", ") > -1)
			{
				query = queryArr.split(", ");
			}
			else if (queryArr.indexOf(",") > -1)
			{
				query = queryArr.split(",");
			}
			else
			{
				query = [queryArr];
			}

			//alert("query: " + query);

			var options2 = 
			{
				keys: ["tags"],
				id: "",
				threshold: 0.33
			}

			var f2 = new Fuse(dataStories, options2);
			
			storyQueryContent += '<script>$(".goTo").on("click", test); function test(event) { event.preventDefault(); var subject = $(this).attr("rel"); $("html, body").animate({ scrollTop: $("#" + subject).offset().top }, 1000); }</script>';

			storyQueryContent += "<strong>Stories</strong> <br />"

			var overlapping = [];

		for (var i = 0; i < query.length; i++)
		{	


			//storyRes is an array of the results matching the query
			var prevRes = [];
			prevRes = storyRes;





			storyQueryContent += "Stories tagged by " + '"' + query[i] + '" <br />';

			storyRes = f2.search(query[i]);
			//alert(overlapping.length);


			if (intersect_safe(prevRes, storyRes).length > 0)
			{
				overlapping.push(intersect_safe(prevRes, storyRes));
				//alert(overlapping[0][0].title);

			}


			storyDetailContent += '<table class="variousInfo">';
			storyDetailContent += '<tr><td><h2>Story Info</h2></td></tr>';
			storyDetailContent += '<tr><td>';

			$.each(storyRes, function(index, vaule)
			{
				storyQueryContent += '<a href="#" class="goTo" rel="story' + i + index + '">' + this.title + "</a><br />";

				storyDetailContent += '<div class="storyInfo" id="story' + i + index + '">';

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
		}

			var result = overlapping.shift().filter(function(v) 
			{
				return overlapping.every(function(a) {
					return a.indexOf(v) !== -1;
				});
			});
			//result[0] is an array of jsons
			alert(result[0]);

			$("#displayHere").html(charQueryContent + "<br />" + storyQueryContent);
			$("#displayDetails").html(charDetailContent + "<br />" + storyDetailContent);
			//$("#displayHere").html("<strong>Characters</strong> <br />" + charRes.join("<br />") + "<br />" + "<br /> <strong>Stories</strong> <br />" + storyRes.join("<br />"));

		});

	});

}
