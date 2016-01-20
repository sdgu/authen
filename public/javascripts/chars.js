var charListData = [];


$(document).ready(function() 
{


    //alert($("#addChar fieldset p#author").text());
    // Populate the user table on initial page load
    populateTable();
   
    
    $('#charList table tbody').on('click', 'td a.linkshowchar', showCharInfo);

    $("#charList table tbody").on("click", "td a.linkshowauth", showAuthorInfo);

    $("#charList table tbody").on("click", "td a.linkupdate", loadCharInfo);
    //also make it jump down to the relevant area


    $("#btnAddChar").on("click", addChar);
    

    $("#btnUpdateChar").on("click", updateChar);
    //when page is loaded, number to display goes back to default 5
    $("#howMany option:eq(0)").prop("selected", true);


});

var selectedToDisplay = 5;
$("#howMany").change(function()
{
    selectedToDisplay = $(this).val();
    //alert(selectedToDisplay);
    populateTable();
});

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

function populateTable() 
{


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
                    //tableContent += '<td><a href="#" class="linkshowauth" rel="' + this.author + '">' + this.author + '</a></td>';
                    tableContent += '<td>'+ this.author + '</td>';
                    tableContent += '<td><a href="#" class="linkupdate" rel="' + this._id + '">Update</a></td>';
                    tableContent += '<td><a href="#" class="linkdeletechar" rel="' + this._id + '">Delete</a></td>';
                    tableContent += '</tr>';
                }
            }
            else
            {
                tableContent += '<tr>';
                tableContent += '<td><a href="#" class="linkshowchar" rel="' + this.character.name + '">' + this.character.name + '</a></td>';
                tableContent += '<td>' + this.author + '</td>';
                //tableContent += '<td><a href="#" class="linkshowauth" rel="' + this.author + '">' + this.author + '</a></td>';
                tableContent += '<td><a href="#" class="linkupdate" rel="' + this._id + '">Update</a></td>';
                tableContent += '<td><a href="#" class="linkdeletechar" rel="' + this._id + '">Delete</a></td>';
                tableContent += '</tr>';
            }

            
        });

        // Inject the whole content string into our existing HTML table
        $('#charList table tbody').html(tableContent);
    });
};

function showCharInfo(event) 
{


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

function loadCharInfo(event) 
{


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

// function showAuthorInfo(event)
// {

//     event.preventDefault();

//     var allChars = "";

//     var thisAuthorName = $(this).attr("rel");

//     //alert("author clicked: " + thisAuthorName);

//     $.getJSON( '/authors/chars', function( data )
//     {
//         $.each(data, function(index, value)
//         {
//             // alert("thisAuthorName: " + thisAuthorName + " this.author: " + this.author);
//             // alert("characterName: " + this.character.name);

//             //alert(this.characters);

//             if (thisAuthorName == this.author) allChars = this.characters;

            
//         });

//         $("#otherCreations").text(allChars.join(", "));

//     });

//    // alert(allChars);
// }