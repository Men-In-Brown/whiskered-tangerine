---
layout: base
title: Demo Frontend
---

<html lang="en">
<style>
    body {
        background-color: #333;
        color: #fff;
        /* font-family: Arial, sans-serif; */
    }
    .container {
        max-width: 800px;
        margin: 10px auto;
        display: flex;
        flex-direction: column;
    }
    .announcement-container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .announcement-left {
        flex-grow: 1;
    }
    .announcement-right {
        flex-shrink: 0;
        margin-left: 10px;
    }
    h1 {
        text-align: center;
    }
    .announcement-form {
        display: flex;
        margin-top: 20px;
    }
    input[type="text"] {
        flex: 1;
        padding: 10px;
        border: none;
        border-radius: 4px;
        margin-right: 10px;
        background-color: #ADD8E6;
        color: #fff;
    }
    button {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: #fff;
        cursor: pointer;
    }
    button:hover {
        background-color: #0056b3;
    }
    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: #333;
    }
    ::-webkit-scrollbar-thumb {
        background: #a0daf2;
        border-radius: 4px;
        width: 4px; 
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #FFF;
        width: 4px;
    }
</style>
<body>
    <div class="container">
        <h1>Announcements</h1>
        <div id="announcements"></div>
        <div class="announcement-form">
            <input type="text" id="announcementText" placeholder="Write your announcement...">
            <button onclick="postAnnouncement()">Post</button>
        </div>
    </div>
    <script src="script.js"></script>
</body>
<script>
// Get the announcements from local storage
var announcements = JSON.parse(localStorage.getItem('announcements'));
if (!announcements) {
    announcements = [];
}
function postAnnouncement() {
    var announcementText = document.getElementById('announcementText').value;
    if (announcementText.trim() !== '') {
        var announcement = {
            text: announcementText,
            timestamp: Date.now(),
            email: (localStorage.getItem("localEmail"))
        };
        announcements.push(announcement);
        localStorage.setItem('announcements', JSON.stringify(announcements));
        renderAnnouncements();
        document.getElementById('announcementText').value = '';
    }
}
function renderAnnouncements() {
    var announcementsDiv = document.getElementById('announcements');
    announcementsDiv.innerHTML = '';
    for (var i = 0; i < announcements.length; i++) {
        var announcement = announcements[i];
        var announcementContainer = document.createElement('div');
        announcementContainer.className = 'announcement-container';
        var announcementLeft = document.createElement('div');
        announcementLeft.className = 'announcement-left';
        announcementLeft.innerHTML = announcement.text;
        var announcementRight = document.createElement('div');
        announcementRight.className = 'announcement-right';
        announcementRight.innerHTML = announcement.email + '<br>' + new Date(announcement.timestamp).toLocaleString();
        announcementContainer.appendChild(announcementLeft);
        announcementContainer.appendChild(announcementRight);
        announcementsDiv.appendChild(announcementContainer);
    }
}
renderAnnouncements();
</script>
</html>
