var storyListData = [];

$(document).ready(function() {


    //alert($("#addChar fieldset p#author").text());
    // Populate the user table on initial page load
   
    populateStoryTable();
    

    //also make it jump down to the relevant area

    $("#storyList table tbody").on("click", "td a.linkshowstory", showStoryInfo);

    $("#storyList table tbody").on("click", "td a.linkupdatestory", loadStoryInfo);

    //when page is loaded, number to display goes back to default 5
    $("#btnAddStory").on("click", addStory);
    $("#btnUpdateStory").on("click", updateStory);
    $("#howMany option:eq(0)").prop("selected", true);


});

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
            tableContent += '<td>' + this.author + '</td>';
            //tableContent += '<td><a href="#" class="linkshowauth" rel="' + this.author + '">' + this.author + '</a></td>';
            tableContent += '<td><a href="#" class="linkupdatestory" rel="' + this._id + '">Update</a></td>';
            tableContent += '<td><a href="#" class="linkdeletechar" rel="' + this._id + '">Delete</a></td>';
            tableContent += '</tr>';


        });

        $('#storyList table tbody').html(tableContent);
    });
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