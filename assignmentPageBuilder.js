var url = new URL(window.location.href);
var id = url.searchParams.get("id");

$.get("http://localhost:8087/api/assignments/" , function(data) {
 // The data from the server is now the assignment
    var html;
    var html2;
    
    // Check if an object with the specified id exists in the array
    /*var entryExists = data.some(function(item) {
      return item.id === id;
    });*/

    //if(entryExists) {
      var assignment = data[id-1];
        if (assignment) {
            html = '<h1 style="font-size: 2.2em; font-weight: bold; margin-bottom: 0; font-family: Oxygen;">' + assignment.title + '</h1>';
            html += '<p style="font-size: 0.8em; font-style: italic; margin-bottom: 0; font-family: Oxygen;">Worth ' + assignment.maxPoints + ' Points --- <a href="' + assignment.link + '" style="text-decoration: underline;">Corresponding Notebook</a></p>';
            html += '<p style="font-size: 1.1em; font-family: Oxygen;">' + assignment.desc + '</p>';
        
            for (var username in assignment.submissions) {
              var submission = assignment.submissions[username];
              html2 = '<div style="border:1px solid #333; margin:0px; padding:5px;">';
              html2 += '<h3 style="font-size: 1.6em; font-weight: bold; font-family: Oxygen;"><a href="' + submission.link + '" style="text-decoration: underline;">' + submission.title + '</a></h3>';
              html2 += '<p style="font-style: italic; font-family: Oxygen;">Posted by ' + username + ' -- Contributed to by ' + submission.contributors.join(', ') + '</p>';
              html2 += '<p style="font-family: Oxygen;">' + submission.desc + '</p>';
              html2 += '</div>';
            } 
    } else {
        html = '<h1 style="font-size: 2.2em; font-weight: bold; margin-bottom: 0; font-family: Oxygen;">No assignment with id ' + id + ' exists</h1>'
    }
  
    $('#assignmentDiv').html(html);
    $('#submission').html(html2);
  /*} else {
    $('#assignmentDiv').html('<p>Assignment at id ' + id + ' not found.</p>');
  }*/
});