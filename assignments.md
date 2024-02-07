---
layout: page
icon: fa-book
title: Assignment
---

<head>
    <link href="https://fonts.googleapis.com/css?family=Oxygen&display=swap" rel="stylesheet">
    <style>
      #assignmentForm {
        font-size: 0.8em;
        padding:0px;
      }
      #assignmentForm input[type="text"] {
          font-size: 0.8em;
          width: 80%;
          padding: 5px; 
      }
      #assignmentForm label, #assignmentForm input {
          margin: 0;
          padding: 0;
      }
    </style>
</head>

<body>
  <a href="https://men-in-brown.github.io/whiskered-tangerine/dashboard.html">
    <button>Back</button>
  </a>

  <div id="assignmentDiv"></div>
  
  <form id="assignmentForm">
    <label for="title">Title:</label><br>
    <input type="text" id="title2" name="title"><br>
    <label for="desc">Description:</label><br>
    <input type="text" id="desc" name="desc"><br>
    <label for="contributors">Contributors (comma separated):</label><br>
    <input type="text" id="contributors" name="contributors"><br>
    <label for="username">Username:</label><br>
    <input type="text" id="username2" name="username"><br>
    <label for="link">Link:</label><br>
    <input type="text" id="link" name="link"><br>
    <input type="submit" value="Submit">
  </form>
  <br><br>

  <div id="submissionsDiv"></div>

  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>
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
                  html2 += '<div style="border:1px solid #333; margin:0px; padding:5px;">';
                  html2 += '<h3 style="font-size: 1.6em; font-weight: bold; font-family: Oxygen;"><a href="' + submission.link + '" style="text-decoration: underline;">' + submission.title + '</a></h3>';
                  html2 += '<p style="font-style: italic; font-family: Oxygen;">Posted by ' + username + ' -- Contributed to by ' + submission.contributors.join(', ') + '</p>';
                  html2 += '<p style="font-family: Oxygen;">' + submission.desc + '</p>';
                  html2 += '</div>';
                } 
        } else {
            html = '<h1 style="font-size: 2.2em; font-weight: bold; margin-bottom: 0; font-family: Oxygen;">No assignment with id ' + id + ' exists</h1>'
        }
      
        $('#assignmentDiv').html(html);
        $('#submissionsDiv').html(html2);
      /*} else {
        $('#assignmentDiv').html('<p>Assignment at id ' + id + ' not found.</p>');
      }*/
      location.reload();
    });
  </script>

  <script>
    window.onload = function() {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    document.getElementById('assignmentForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    var title = document.getElementById('title2').value;
    var desc = document.getElementById('desc').value;
    var contributors = document.getElementById('contributors').value.split(',');
    var username = document.getElementById('username2').value;
    var link = document.getElementById('link').value;
  
    console.log(id + title + desc + contributors + username + link);

    var data = {
      "id": id,
      "title": title,
      "desc": desc,
      "contributors": contributors,
      "username": username,
      "link": link
    };
  
    fetch('http://localhost:8087/api/assignments/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
  }
  </script>
</body>