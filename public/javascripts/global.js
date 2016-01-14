// Charlist data array for filling in info box
var charListData = [];


    

// DOM Ready =============================================================
$(document).ready(function() {


    //alert($("#addChar fieldset p#author").text());
    // Populate the user table on initial page load
    populateTable();
    $('#charList table tbody').on('click', 'td a.linkshowchar', showCharInfo);

    $("#charList table tbody").on("click", "td a.linkshowauth", showAuthorInfo);

    $("#btnAddChar").on("click", addChar);
    //when page is loaded, number to display goes back to default 5
    $("#btnAddStory").on("click", addStory);
    $("#howMany option:eq(0)").prop("selected", true);


});

var selectedToDisplay = 5;
$("#howMany").change(function()
{
    selectedToDisplay = $(this).val();
    //alert(selectedToDisplay);
    populateTable();
})

// Functions =============================================================

function addChar(event)
{
    event.preventDefault();

    //error things maybe

    var newChar = 
    {
        "author" : $("#addChar fieldset p#author").text(),
        "name" : $("#addChar fieldset input#inputCharName").val(),
        "formes" : $("#addChar fieldset textarea#inputFormes").val(),
        "abilities" : $("#addChar fieldset textarea#inputAbilities").val(),
        "description" : $("#addChar fieldset textarea#inputDesc").val()
        
    }

    $.ajax(
    {
        type: "POST",
        data: newChar,
        url: "/characters/addchar",
        dataType: "JSON"
    }).done(function(res)
    {


        if (res.msg == "")
        {
            //when submitting, form gets refreshed
            $("#addChar fieldset input").val("");
            $("#addChar fieldset textarea").val("");
            

            populateTable();
        }
        else
        {
            alert("Error: " + res.msg);
        }
    });

}

function addStory(event)
{
    event.preventDefault();

    var newStory = 
    {
        "author" : $("#addStory fieldset p#storyAuthor").text(),
        "title" : $("#addStory fieldset input#inputStoryTitle").val(),
        "characters" : $("#addStory fieldset textarea#inputStoryCharacters").val(),
        "tags" : $("#addStory fieldset textarea#inputTags").val(),
        "story" : $("#addStory fieldset textarea#inputStory").val()
    }
   
    $.ajax(
    {
        type: "POST",
        data: newStory,
        url: "/stories/addstory",
        dataType: "JSON"
    }).done(function(res)
    {
        if (res.msg == "")
        {
            $("#addStory fieldset input").val("");
            $("#addStory fieldset textarea").val("");
        }
        else
        {
            alert("there's an error in the else?");
            alert("Error: " + res.msg);
        }
    });

}

// Fill table with data
function populateTable() {


    // Empty content string
    var tableContent = '';
  

    // jQuery AJAX call for JSON
    $.getJSON( '/characters/characterlist', function( data ) {

        charListData = data;

        // if (selectedToDisplay == 5)
        // {
        //     for (var i = 0; i < 5; i++)
        //     {
        //         tableContent += '<tr>';
                
        //         tableContent += '<td><a href="#" class="linkshowchar" rel="' + data[i].character.name + '">' + data[i].character.name + '</a></td>';
        //         tableContent += '<td>' + data[i].author + '</td>';
        //         tableContent += '<td><a href="#" class="linkdeletechar" rel="' + data[i]._id + '">delete</a></td>';
        //         tableContent += '</tr>';

        //     }
        // }

        // For each item in our JSON, add a table row and cells to the content string




        $.each(data.reverse(), function(index, value){

            if (selectedToDisplay != "all")
            {
                if (index < selectedToDisplay)
                {
                    tableContent += '<tr>';
                    tableContent += '<td><a href="#" class="linkshowchar" rel="' + this.character.name + '">' + this.character.name + '</a></td>';
                    tableContent += '<td><a href="#" class="linkshowauth" rel="' + this.author + '">' + this.author + '</a></td>';
                    tableContent += '<td><a href="#" class="linkdeletechar" rel="' + this._id + '">delete</a></td>';
                    tableContent += '</tr>';
                }
            }
            else
            {
                tableContent += '<tr>';
                tableContent += '<td><a href="#" class="linkshowchar" rel="' + this.character.name + '">' + this.character.name + '</a></td>';
                tableContent += '<td><a href="#" class="linkshowauth" rel="' + this.author + '">' + this.author + '</a></td>';
                tableContent += '<td><a href="#" class="linkdeletechar" rel="' + this._id + '">delete</a></td>';
                tableContent += '</tr>';
            }

            
        });

        // Inject the whole content string into our existing HTML table
        $('#charList table tbody').html(tableContent);
    });
};

// Show Char Info
function showCharInfo(event) {


    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisCharName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = charListData.map(function(arrayItem) 
        { 
            return arrayItem.character.name; 
        }).indexOf(thisCharName);

   

    var thisCharObject = charListData[arrayPosition];
    //alert(thisCharObject.character.formes);
    //Populate Info Box
    $("#authorName").text(thisCharObject.author);
    $('#charInfoName').text(thisCharObject.character.name);
    $('#charInfoFormes').text(thisCharObject.character.formes);
    $('#charInfoAb').text(thisCharObject.character.abilities);
    $('#charInfoDesc').text(thisCharObject.character.description);

};


function showAuthorInfo(event)
{

    event.preventDefault();

    var allChars = "";

    var thisAuthorName = $(this).attr("rel");

    //alert("author clicked: " + thisAuthorName);

    $.getJSON( '/authors/chars', function( data )
    {
        $.each(data, function(index, value)
        {
            // alert("thisAuthorName: " + thisAuthorName + " this.author: " + this.author);
            // alert("characterName: " + this.character.name);

            //alert(this.characters);

            if (thisAuthorName == this.author) allChars = this.characters;

            
        });

        $("#otherCreations").text(allChars);

    });

   // alert(allChars);
}