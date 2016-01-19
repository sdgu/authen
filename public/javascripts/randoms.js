$(document).ready(function()
{
	populateRandomStories();


});


function populateRandomStories()
{
    var tableContent = "";



    $.getJSON("/stories/storylist", function(data)
    {

        var len = data.length;

        var randStory1 = Math.floor((Math.random() * len) + 1);
        var randStory2 = Math.floor((Math.random() * len) + 1);
        var randStory3 = Math.floor((Math.random() * len) + 1);

        var s1 = data[randStory1];
        var s2 = data[randStory2];
        var s3 = data[randStory3];

        tableContent += "<tr>";
        tableContent += "<td>" + s1.title + "</td>";
        tableContent += "<td>" + s1.author + "</td>";
        tableContent += "</tr>";

        $('#randStories table tbody').html(tableContent);

    });


}