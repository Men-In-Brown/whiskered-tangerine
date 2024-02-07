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

<br><br><br>

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
        .done(function() {
        location.reload();
        });
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
          html += '<h3 style="font-size: 1.6em; font-weight: bold; font-family: Oxygen;"><a " style="text-decoration: underline;">' + issue.title + '</a></h3>';
          var desc = issue.desc;
          if (desc.length > 100) {
            desc = desc.substring(0, 100) + '...';
          }
          html += '<p style="font-family: Oxygen;">' + desc + '</p>';
          // Display replies
          var replies = issue.replies;
          for (var j in replies) {
            var reply = replies[j];
            var replyStyle = reply.bot ? 'style="background-color: #f0f0f0; border-radius: 10px;"' : '';
            html += '<div ' + replyStyle + '>';
            html += '<p>' + reply.desc + '</p>';
            html += '<p style="font-style: italic;">- By: ' + reply.username + '</p>';
            html += '</div>';
          }
          html += '<button class="reply-button" data-id="' + issue.id + '">Reply</button>';
          html += '<div id="reply-form-' + issue.id + '" style="display: none;">';
          html += '<form class="reply-form" data-id="' + issue.id + '">';
          html += '<input type="text" name="username" placeholder="Your username">';
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
    var username = $(this).find('input[name="username"]').val();
    var reply = $(this).find('textarea[name="reply"]').val();
    $.ajax({
        url: 'http://localhost:8087/api/issues/comment',
        type: 'POST',
        data: JSON.stringify({ id: id.toString(), username: username, desc: reply }),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: false,
        success: function(msg) {

        }
    });
    });

  });
</script>
