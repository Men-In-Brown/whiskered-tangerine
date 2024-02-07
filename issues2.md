---
layout: page
title: Issues
---

<head>
  <link href="https://fonts.googleapis.com/css?family=Oxygen&display=swap" rel="stylesheet">
</head>

<div id="issue-form">
  <h2>Create a new issue</h2>
  <form id="new-issue-form">
    <input type="text" id="title2" name="title" placeholder="Title">
    <textarea id="desc" name="desc" placeholder="Description"></textarea>
    <input type="text" id="username" name="username" placeholder="Username">
    <button type="submit">Submit</button>
  </form>
</div>

<div id="issuesDiv"></div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
  $(document).ready(function() {
    $('#new-issue-form').on('submit', function(e) {
      e.preventDefault();
      var title = $('#title2').val();
      var desc = $('#desc').val();
      var username = $('#username').val();
      $.post('http://localhost:8087/api/issues/post', { title: title, desc: desc, username: username });
    });

    $.ajax({
      url: "http://localhost:8087/api/issues/",
      type: "GET",
      success: function(data) {
        var issues = data;
        var html = '';
        for (var i = 0; i < issues.length; i++) {
          var issue = issues[i];
          html += '<div style="border:1px solid #333; margin:0px; padding:5px;">';
          html += '<h3 style="font-size: 1.6em; font-weight: bold; font-family: Oxygen;"><a href="/whiskered-tangerine/issues.html/?id=' + issue.id + '" style="text-decoration: underline;">' + issue.title + '</a></h3>';
          var desc = issue.desc;
          if (desc.length > 100) {
            desc = desc.substring(0, 100) + '...';
          }
          html += '<p style="font-family: Oxygen;">' + desc + '</p>';
          html += '<button class="reply-button" data-id="' + issue.id + '">Reply</button>';
          html += '<div id="reply-form-' + issue.id + '" style="display: none;">';
          html += '<form class="reply-form" data-id="' + issue.id + '">';
          html += '<textarea name="reply" placeholder="Your reply"></textarea>';
          html += '<button type="submit">Submit reply</button>';
          html += '</form>';
          html += '</div>';
          html += '</div>';
        }
        $('#issuesDiv').html(html);
      }
    });

    $(document).on('click', '.reply-button', function() {
      var id = $(this).data('id');
      $('#reply-form-' + id).show();
    });

    $(document).on('submit', '.reply-form', function(e) {
      e.preventDefault();
      var id = $(this).data('id');
      var reply = $(this).find('textarea[name="reply"]').val();
      $.post('http://localhost:8087/api/issues/comment', { id: id, reply: reply });
    });
  });
</script>
