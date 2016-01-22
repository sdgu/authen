var entryList = [];

$(document).ready(function()
{
	
	displayWordList();
	$("#btnAddEntry").on("click", addEntry);
	$("#btnUpdateEntry").on("click", updateEntry);
	
	$('#storyList table tbody').on('click', 'td a.showdef', showDef);
	$("#storyList table tbody").on("click", "td a.update", loadDef);

	//$(".showdef").on("click", showDef);
	
});



function displayWordList()
{
	var wordList = "";

	$.getJSON("/dictionary/entrylist", function(data)
	{
		entryList = data;
		//wordList += '<script>$(".showdef").on("click", function() { alert("test"); });</script>';
		//wordList += '<table id="wordList">';

		$.each(data, function(index, value)
		{
			wordList += '<tr>';
			wordList += '<td class="titl">';
			wordList += '<a href="#" class="showdef" rel="' + this.word + '">' + this.word + '</a>';
			wordList += "<div id='showdefof" + this.word + "'></div>";
			wordList += '</td>';
			wordList += '<td>';
			wordList += '<a href="#" class="update" rel="' + this._id + '">' + 'Update' + '</a>';
			wordList += '</td>';
			wordList += '</tr>';
		});

		//wordList += '</table>';

		$("#storyList table tbody").html(wordList);
	});

}

function showDef(event)
{
	event.preventDefault();

    $("html, body").animate({ scrollTop: $('#storyInfo').offset().top }, 500);

	var thisWord = $(this).attr("rel"); 

	var arrayPosition = entryList.map(function(arrayItem) 
    { 
        return arrayItem.word; 
    }).indexOf(thisWord);

    var thisEle = entryList[arrayPosition];

    $("#word").text(thisEle.word);
    $("#pro").text(thisEle.pronunciation);
    $("#speech").text(thisEle.partofspeech);
    $("#desc").text(thisEle.description);
    $("#exam").text(thisEle.example);
    $("#syn").text(thisEle.synonyms);
}

function addEntry(event)
{
	event.preventDefault();

	var newEntry = 
	{
		"author" : $("#author").text(),
		"word" : $("#inputWord").val(),
		"pronunciation" : $("#inputPronunciation").val(),
		"part" : $("#inputPart").val(),
		"desc" : $("#inputDesc").val(),
		"example" : $("#inputEx").val(),
		"synonyms" : $("#inputSyn").val()
	}

	$.ajax(
	{
		type: "POST",
		data: newEntry,
		url: "/dictionary/addentry",
		dataType: "JSON"
	}).done(function(res)
	{
		if (res.msg == "")
        {
            //when submitting, form gets refreshed
            alert("Entry Added Successfully.");
            $('html,body').scrollTop(0);
            $("#addEntry fieldset input").val("");
            $("#addEntry fieldset textarea").val("");
            displayWordList();
           
        }
        else
        {
            alert("Error: " + res.msg);
        }
	});
}

function updateEntry(event)
{
	event.preventDefault();

	var stuffToUpdate = 
	{
		"id" : $("#updatingID").text(),
		"word" : $("#updateWord").val(),
		"pronunciation" : $("#updatePronunciation").val(),
		"part" : $("#updatePart").val(),
		"desc" : $("#updateDesc").val(),
		"example" : $("#updateEx").val(),
		"synonyms" : $("#updateSyn").val()
	}

	$.ajax(
	{
		type: "PUT",
		data: stuffToUpdate,
		url: "/dictionary/updateentry",
		dataType: "JSON"
	}).done(function(res)
	{
		if (res.msg == "")
        {
            //when submitting, form gets refreshed
            alert("Update Successful.");
            $('html,body').scrollTop(0);
            $("#updateEntry fieldset input").val("");
            $("#updateEntry fieldset textarea").val("");
            displayWordList();
           
        }
        else
        {
            alert("Error: " + res.msg);
        }
	});
}


function loadDef(event)
{
	event.preventDefault();

    $("html, body").animate({ scrollTop: $('#updateEntry').offset().top }, 1000);

    var thisWord = $(this).attr("rel");

    var arrayPosition = entryList.map(function(arrayItem) 
    { 
        return arrayItem._id; 
    }).indexOf(thisWord);

    var thisEle = entryList[arrayPosition];

    $("#updatingID").text(thisWord);

    $("#updateWord").val(thisEle.word);
    $("#updatePronunciation").val(thisEle.pronunciation);
    $("#updatePart").val(thisEle.partofspeech);
    $("#updateDesc").val(thisEle.description);
    $("#updateEx").val(thisEle.example);
    $("#updateSyn").val(thisEle.synonyms);

}