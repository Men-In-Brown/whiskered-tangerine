document.getElementById('assignmentForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    var title = document.getElementById('title').value;
    var desc = document.getElementById('desc').value;
    var contributors = document.getElementById('contributors').value.split(',');
    var username = document.getElementById('username').value;
    var link = document.getElementById('link').value;
  
    var data = {
      id: id, //Id is already defined in assignmentPageBuilder.js
      title: title,
      desc: desc,
      contributors: contributors,
      username: username,
      link: link
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