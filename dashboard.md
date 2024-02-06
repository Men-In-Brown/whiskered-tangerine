---
layout: page
---

<head>
    <link href="https://fonts.googleapis.com/css?family=Oxygen&display=swap" rel="stylesheet">
</head>


<h1>Assignments Dashboard</h1>
<div id="assignments"></div>


<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
        $.ajax({
            url: "http://localhost:8087/api/assignments/",
            type: "GET",
            success: function(data) {
        var assignments = data; 
        var html = '';
        for (var i = 0; i < assignments.length; i++) {
            var assignment = assignments[i];
            html += '<div style="border:1px solid #333; margin:0px; padding:5px;">';
            html += '<h3 style="font-size: 1.6em; font-weight: bold; font-family: Oxygen;"><a href="/whiskered-tangerine/assignments/?id=' + assignment.id + '" style="text-decoration: underline;">' + assignment.title + '</a></h3>';
            var desc = assignment.desc;
            if (desc.length > 100) {
            desc = desc.substring(0, 100) + '...';
            }
            html += '<p style="font-family: Oxygen;">' + desc + '</p>';
            html += '</div>';
        }
        $('#assignments').html(html);
        }
    });
</script>
