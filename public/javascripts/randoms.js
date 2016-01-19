var storyListData = [];
var charListData = [];

$(document).ready(function()
{
	populateRandomStories();
    populateRandomChars();
    $("#randStories table tbody").on("click", "td a.linkshowstory", showStoryInfo);
    $("#randChars table tbody").on("click", "td a.linkshowchar", showCharInfo);


});


function populateRandomStories()
{
    var tableContent = "";



    $.getJSON("/stories/storylist", function(data)
    {

        storyListData = data;
        var len = data.length;

        //http://stackoverflow.com/questions/2380019/generate-unique-random-numbers-between-1-and-100

        var arr = []
        while(arr.length < 3)
        {
            var randomnumber = Math.floor(Math.random()*len)
            var found = false; 
            for(var i = 0; i < arr.length; i++)
            {
                if(arr[i] == randomnumber)
                {
                    found=true;break
                }
            }
            if(!found) arr[arr.length]=randomnumber;
        }


        var randStory1 = arr[0];
        var randStory2 = arr[1];
        var randStory3 = arr[2];

        var s1 = data[randStory1];
        var s2 = data[randStory2];
        var s3 = data[randStory3];

        //alert("story 1 is: " + s1.title);

        tableContent += "<tr>";
        tableContent += '<td><a href="#" class="linkshowstory" rel="' + s1.title + '">' + s1.title + '</a></td>';
        tableContent += "<td>" + s1.author + "</td>";
        tableContent += "</tr>";

        tableContent += "<tr>";
        tableContent += '<td><a href="#" class="linkshowstory" rel="' + s2.title + '">' + s2.title + '</a></td>';
        tableContent += "<td>" + s2.author + "</td>";
        tableContent += "</tr>";

        tableContent += "<tr>";
        tableContent += '<td><a href="#" class="linkshowstory" rel="' + s3.title + '">' + s3.title + '</a></td>';
        tableContent += "<td>" + s3.author + "</td>";
        tableContent += "</tr>";

        $('#randStories table tbody').html(tableContent);

    });
}

function populateRandomChars()
{
    var tableContent = "";

    $.getJSON("/characters/characterlist", function(data)
    {
        charListData = data;
        var len = data.length;

        var arr = []
        while(arr.length < 3)
        {
            var randomnumber = Math.floor(Math.random()*len)
            var found = false; 
            for(var i = 0; i < arr.length; i++)
            {
                if(arr[i] == randomnumber)
                {
                    found=true;break
                }
            }
            if(!found) arr[arr.length]=randomnumber;
        }


        var randChar1 = arr[0];
        var randChar2 = arr[1];
        var randChar3 = arr[2];

        var s1 = data[randChar1];
        var s2 = data[randChar2];
        var s3 = data[randChar3];

        tableContent += "<tr>";
        tableContent += '<td><a href="#" class="linkshowchar" rel="' + s1.character.name + '">' + s1.character.name + '</a></td>';
        tableContent += "<td>" + s1.author + "</td>";
        tableContent += "</tr>";

        tableContent += "<tr>";
        tableContent += '<td><a href="#" class="linkshowchar" rel="' + s2.character.name + '">' + s2.character.name + '</a></td>';
        tableContent += "<td>" + s2.author + "</td>";
        tableContent += "</tr>";

        tableContent += "<tr>";
        tableContent += '<td><a href="#" class="linkshowchar" rel="' + s3.character.name + '">' + s3.character.name + '</a></td>';
        tableContent += "<td>" + s3.author + "</td>";
        tableContent += "</tr>";

        $('#randChars table tbody').html(tableContent);
    });
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
    $("#storyChars").text(thisStoryObject.characters);
    $("#storyTags").text(thisStoryObject.tags);
    $("#storyItself").text(thisStoryObject.story);

    $("#authorName").text("");
    $('#charInfoName').text("");
    $('#charInfoFormes').text("");
    $('#charInfoAb').text("");
    $('#charInfoDesc').text("");

    //alert(thisStoryObject.title);
}

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

    $("#storyTitle").text("");
    $("#storyChars").text("");
    $("#storyTags").text("");
    $("#storyItself").text("");

};