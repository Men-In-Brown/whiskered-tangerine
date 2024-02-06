---
layout: page
icon: fa-book
title: Assignment
---

<head>
    <link href="https://fonts.googleapis.com/css?family=Oxygen&display=swap" rel="stylesheet">
</head>

<body>
  <div id="assignmentDiv"></div>
  
  <form id="assignmentForm">
    <label for="title">Title:</label><br>
    <input type="text" id="title" name="title"><br>
    <label for="desc">Description:</label><br>
    <input type="text" id="desc" name="desc"><br>
    <label for="contributors">Contributors (comma separated):</label><br>
    <input type="text" id="contributors" name="contributors"><br>
    <label for="username">Username:</label><br>
    <input type="text" id="username" name="username"><br>
    <label for="link">Link:</label><br>
    <input type="text" id="link" name="link"><br>
    <input type="submit" value="Submit">
  </form>

  <div id="submissionsDiv"></div>

  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src=assignmentPageBuilder.js></script>
  <script src=submissionManager.js></script>
</body>