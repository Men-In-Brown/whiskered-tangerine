---
layout: page
search_exclude: true
title: Flashcards
permalink: flashcards
------
layout: page
search_exclude: true
title: Flashcards
permalink: flashcards
---
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flashcards App</title>
    <link href="https://fonts.googleapis.com/css?family=Oxygen&display=swap" rel="stylesheet">
</head>
<body>
    <div id="topic-buttons">
        <!-- Buttons will be dynamically populated -->
    </div>
    <div id="flashcard-container">
        <div id="existing-flashcards">
            <!-- Existing flashcards will be dynamically populated here -->
        </div>
        <div id="flashcard-list"></div>
        <form id="flashcard-form">
            <label for="topic">Topic:</label>
            <input type="text" id="topic" name="topic" required>
            <label for="question">Question:</label>
            <input type="text" id="question" name="question" required>
            <label for="answer">Answer:</label>
            <input type="text" id="answer" name="answer" required>
            <button type="submit">Create Flashcard</button>
        </form>
    </div>
    <script>
        const existingFlashcardsContainer = document.getElementById('existing-flashcards');
        const topicButtons = document.getElementById('topic-buttons');
        const flashcardList = document.getElementById('flashcard-list');
        function loadTopicsAndCreateButtons() {
            // You can replace this URL with the actual backend API endpoint
            fetch('http://localhost:8087/api/flashcards/topics')
            .then(response => response.json())
            .then(data => {
                // Clear existing buttons
                topicButtons.innerHTML = '';
                // Populate buttons based on available topics
                data.forEach(topic => {
                    const button = document.createElement('button');
                    button.textContent = topic;
                    button.onclick = function() {
                        loadFlashcardsByTopic(topic);
                    };
                    topicButtons.appendChild(button);
                });
                // Trigger loading flashcards based on the initial selected topic (first button)
                if (data.length > 0) {
                    loadFlashcardsByTopic(data[0]);
                }
            })
            .catch(error => {
                console.error('Error fetching topics:', error);
            });
        }
        function loadExistingFlashcards() {
            // Fetch existing flashcards from the backend
            fetch('http://localhost:8087/api/flashcards/')
                .then(response => response.json())
                .then(data => {
                    // Clear existing flashcards
                    existingFlashcardsContainer.innerHTML = '';
                    // Populate existing flashcards section with the fetched data
                    data.forEach(flashcard => {
                        const flashcardItem = document.createElement('div');
                        flashcardItem.innerHTML = `<strong>Topic:</strong> ${flashcard.topic}<br><strong>Question:</strong> ${flashcard.question}<br><strong>Answer:</strong> ${flashcard.answer}`;
                        existingFlashcardsContainer.appendChild(flashcardItem);
                    });
                })
                .catch(error => {
                    console.error('Error fetching existing flashcards:', error);
                });
        }
        function loadFlashcardsByTopic(selectedTopic) {
            // You can replace this URL with the actual backend API endpoint
            fetch(`http://localhost:8087/api/flashcards?topic=${selectedTopic}`)
            .then(response => response.json())
            .then(data => {
                // Clear the flashcard list
                flashcardList.innerHTML = '';
                // Populate the flashcard list with the fetched data
                data.forEach(flashcard => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `<strong>Topic:</strong> ${flashcard.topic}<br><strong>Question:</strong> ${flashcard.question}<br><strong>Answer:</strong> ${flashcard.answer}
                        <button data-flashcard-id="${flashcard.id}">Delete</button>`;
                    flashcardList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Error fetching flashcards:', error);
            });
        }
        // Initial load of existing flashcards, topics, and creation of buttons
        loadExistingFlashcards();
        loadTopicsAndCreateButtons();
    </script>
</body>
