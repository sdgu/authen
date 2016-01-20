// Charlist data array for filling in info box
var charListData = [];
var storyListData = [];


    
//eventually separate index, story, and characters
// DOM Ready =============================================================
$(document).ready(function() {


    //alert($("#addChar fieldset p#author").text());
    // Populate the user table on initial page load
    populateTable();
    populateStoryTable();
    
    $('#charList table tbody').on('click', 'td a.linkshowchar', showCharInfo);

    $("#charList table tbody").on("click", "td a.linkshowauth", showAuthorInfo);

    $("#charList table tbody").on("click", "td a.linkupdate", loadCharInfo);
    //also make it jump down to the relevant area

    $("#storyList table tbody").on("click", "td a.linkshowstory", showStoryInfo);

    $("#storyList table tbody").on("click", "td a.linkupdatestory", loadStoryInfo);

    $("#btnAddChar").on("click", addChar);
    //when page is loaded, number to display goes back to default 5
    $("#btnAddStory").on("click", addStory);
    $("#btnUpdateChar").on("click", updateChar);
    $("#btnUpdateStory").on("click", updateStory);
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
            alert("Character Added Successfully.");
            $('html,body').scrollTop(0);
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

function updateChar(event)
{

    event.preventDefault();



   
    var charID = $("#updatingID").text();
    var authorFixed = $("#updatingAuthor").val();
    var newName = $("#updateCharName").val();
    var newFormes = $("#updateFormes").val();
    var newAbilities = $("#updateAbilities").val();
    var newDesc = $("#updateDesc").val();

    //alert(charID);

    var updateChara = 
    {
        "id" : charID,
        "author" : authorFixed,
        "name" : newName,
        "formes" : newFormes,
        "abilities" : newAbilities,
        "desc" : newDesc
    }

    $.ajax(
    {
        type: "PUT",
        data: updateChara,
        url: "/characters/updatechar",
        dataType: "JSON"
    }).done(function(response)
    {
        if (response.msg == "")
        {

            $("#updateChar fieldset input").val("");
            $("#updateChar fieldset textarea").val("");
            $('html,body').scrollTop(0);
            alert("Update Successful.");
        }
        else
        {
            alert("Error: " + response.msg);
        }

        populateTable();
    });

}

function updateStory(event)
{
    event.preventDefault();

    var storyID = $("#updatingStoryID").text();
    var newTitle = $("#updateStoryTitle").val();
    var newChars = $("#updateCharacters").val();
    var newTags = $("#updateTags").val();
    var newStory = $("#updateStoryText").val();

    var updateSt = 
    {
        "id" : storyID,
        "title" : newTitle,
        "characters" : newChars,
        "tags" : newTags,
        "story" : newStory
    }

    $.ajax(
    {
        type: "PUT",
        data: updateSt,
        url: "/stories/updatestory",
        dataType: "JSON"
    }).done(function(res)
    {
        if (res.msg == "")
        {
            $("#updateStory fieldset input").val("");
            $("#updateStory fieldset textarea").val("");
            $('html,body').scrollTop(0);
            alert("Update Successful.");
        }
        else
        {
            alert("Error: " + res.msg);
        }

        populateStoryTable();
    });

}

function populateStoryTable()
{
    var tableContent = "";

    $.getJSON("/stories/storylist", function(data)
    {
        //would become problematic if a lot of data
        storyListData = data;

        $.each(data.reverse(), function(index, vaule)
        {
            tableContent += "<tr>";
            tableContent += '<td><a href="#" class="linkshowstory" rel="' + this.title + '">' + this.title + '</a></td>';
            tableContent += '<td><a href="#" class="linkshowauth" rel="' + this.author + '">' + this.author + '</a></td>';
            tableContent += '<td><a href="#" class="linkupdatestory" rel="' + this._id + '">Update</a></td>';
            tableContent += '<td><a href="#" class="linkdeletechar" rel="' + this._id + '">Delete</a></td>';
            tableContent += '</tr>';


        });

        $('#storyList table tbody').html(tableContent);
    });
};





// Fill table with data
function populateTable() {


    // Empty content string
    var tableContent = '';
  

    // jQuery AJAX call for JSON
    $.getJSON( '/characters/characterlist', function( data ) {


        //would become problematic if a lot of data
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

        $.each(data.reverse(), function(index, value)
        {

            if (selectedToDisplay != "all")
            {
                if (index < selectedToDisplay)
                {
                    tableContent += '<tr>';
                    tableContent += '<td><a href="#" class="linkshowchar" rel="' + this.character.name + '">' + this.character.name + '</a></td>';
                    tableContent += '<td><a href="#" class="linkshowauth" rel="' + this.author + '">' + this.author + '</a></td>';
                    tableContent += '<td><a href="#" class="linkupdate" rel="' + this._id + '">Update</a></td>';
                    tableContent += '<td><a href="#" class="linkdeletechar" rel="' + this._id + '">Delete</a></td>';
                    tableContent += '</tr>';
                }
            }
            else
            {
                tableContent += '<tr>';
                tableContent += '<td><a href="#" class="linkshowchar" rel="' + this.character.name + '">' + this.character.name + '</a></td>';
                tableContent += '<td><a href="#" class="linkshowauth" rel="' + this.author + '">' + this.author + '</a></td>';
                tableContent += '<td><a href="#" class="linkupdate" rel="' + this._id + '">Update</a></td>';
                tableContent += '<td><a href="#" class="linkdeletechar" rel="' + this._id + '">Delete</a></td>';
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

    //$("html, body").animate({ scrollTop: $('.variousInfo').offset().top }, 1000);


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
    $('#charInfoFormes').text(thisCharObject.character.formes.join(", "));
    $('#charInfoAb').text(thisCharObject.character.abilities.join(", "));
    $('#charInfoDesc').text(thisCharObject.character.description);

};

function loadCharInfo(event) {


    // Prevent Link from Firing
    event.preventDefault();

    $("html, body").animate({ scrollTop: $('#updateHere').offset().top }, 1000);

    // Retrieve username from link rel attribute
    var thisCharID = $(this).attr('rel');
    //alert(thisCharID);

    // Get Index of object based on id value
    var arrayPosition = charListData.map(function(arrayItem) 
        { 
            return arrayItem._id; 
        }).indexOf(thisCharID);

    //alert(arrayPosition);

    var thisCharObject = charListData[arrayPosition];
    //Populate Info Box
    $("#updatingID").text(thisCharObject._id);
    $("#updatingAuthor").text(thisCharObject.author);

    $('#updateCharName').val(thisCharObject.character.name);
    $('#updateFormes').val(thisCharObject.character.formes);
    $('#updateAbilities').val(thisCharObject.character.abilities);
    $('#updateDesc').val(thisCharObject.character.description);

};

function loadStoryInfo(event)
{
    event.preventDefault();

    $("html, body").animate({ scrollTop: $('#updateStoryHere').offset().top }, 1000);

    var thisStoryID = $(this).attr("rel");

    var arrayPosition = storyListData.map(function(arrayItem)
    {
        return arrayItem._id;
    }).indexOf(thisStoryID);

    var thisStoryObject = storyListData[arrayPosition];

    $("#updatingStoryID").text(thisStoryObject._id);
    $("#updateStoryTitle").val(thisStoryObject.title);
    $("#updateCharacters").val(thisStoryObject.characters);
    $("#updateTags").val(thisStoryObject.tags);
    $("#updateStoryText").val(thisStoryObject.story);


}


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

        $("#otherCreations").text(allChars.join(", "));

    });

   // alert(allChars);
}

function showStoryInfo(event)
{
    event.preventDefault();

    var thisStory= $(this).attr("rel");
    var arrayPos = storyListData.map(function(arrayItem)
    {
        return arrayItem.title;
    }).indexOf(thisStory);

    var thisStoryObject = storyListData[arrayPos];

    $("#storyTitle").text(thisStoryObject.title);
    $("#storyChars").text(thisStoryObject.characters.join(", "));
    $("#storyTags").text(thisStoryObject.tags.join(", "));
    $("#storyItself").text(thisStoryObject.story);


    //alert(thisStoryObject.title);
}