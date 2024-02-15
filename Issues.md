---
layout: page
title: Issues Frontend
display: none
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Issue Tracker</title>
</head>
<style>
    body {
        /* font-family: Arial, sans-serif; */
        margin: 0;
        padding: 0;
    }
    header {
        /* background-color: #333; */
        color: white;
        text-align: center;
        padding: 1em 0;
    }
    main {
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
    }
    section {
        margin-bottom: 20px;
    }
    label {
        display: block;
        margin-bottom: 5px;
    }
    input,
    textarea {
        width: 100%;
        padding: 8px;
        margin-bottom: 10px;
    }
    button {
        background-color: #4caf50;
        color: white;
        padding: 10px;
        border: none;
        cursor: pointer;
    }
    button:hover {
        background-color: #45a049;
    }
</style>
<body>
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
</body>
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
</html>
