---
layout: base
# title: Home
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>School Bell Schedule Tracker</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
        }
        h2 {
            text-align: center;
            color: #333;
        }
        label {
            display: block;
            margin: 10px 0;
            font-weight: bold;
        }
        input[type="text"] {
            width: 100%;
            padding: 5px;
            margin: 5px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        button {
            display: block;
            margin: 20px auto;
            padding: 10px 20px;
            background-color: #007BFF;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
        #datetime {
            text-align: center;
            font-size: 20px;
            margin-top: 20px;
            display: block;
        }
        #scheduleResults {
            background-color: #fff;
            border: 0.5px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            max-width: 50%;
            margin-top: 50px;
        }
        #scheduleResults p {
        margin: 0;
        padding: 5px 0;
        border-bottom: 1px solid #ccc;
        font-size: 16px; /* Adjust the font size as needed */
    }
        #inputSchedule, #scheduleResults {
            display: inline-block;
            width: 49%;
            vertical-align: top;
        }
        #inputSchedule {
            margin: 20px auto;
        }
    </style>
</head>
<body>
    <div style="display: flex; flex-direction: column; width: 100%; justify-content: center; align-items: center;">
        <h1 id="typewriter"></h1>
    </div>
    <div id="datetime">
        <div id="date"></div>
        <div id="time"></div>
    </div>
     <h2 style="color:white;">Enter Your School Schedule</h2>
    <div id="inputSchedule">
        <header>
            <h1>Issue Tracker</h1>
        </header>
        <main>
            <section id="issues">
                <!-- Display issues here -->
            </section>
            <section id="create-issue">
                <h2>Create New Issue</h2>
                <form id="issue-form">
                    <label for="issue-title">Title:</label>
                    <input type="text" id="issue-title" required>
                    <label for="issue-description">Description:</label>
                    <textarea id="issue-description" required></textarea>
                    <button type="submit">Create Issue</button>
                </form>
            </section>
        </main>
    </div>
    <div id="scheduleResults" style="color: blue;">
        <h1>Announcements</h1>
        <div id="announcements"></div>
        <div class="announcement-form">
            <input type="text" id="announcementText" placeholder="Write your announcement...">
            <button onclick="postAnnouncement()">Post</button>
        </div>
    </div>
  <script>
    document.addEventListener('DOMContentLoaded', function () {
        const issueForm = document.getElementById('issue-form');
        const issuesSection = document.getElementById('issues');
        issueForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const title = document.getElementById('issue-title').value;
            const description = document.getElementById('issue-description').value;
            // Create a new issue element
            const issueElement = document.createElement('div');
            issueElement.className = 'issue';
            issueElement.innerHTML = `
                <h3>${title}</h3>
                <p>${description}</p>
            `;
            // Append the new issue to the issues section
            issuesSection.appendChild(issueElement);
            // Clear the form
            issueForm.reset();
        });
    });
    </script>
</body>
</html>