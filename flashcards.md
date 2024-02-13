---
layout: page
search_exclude: true
title: Flashcards
permalink: flashcards
---
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flashcards App</title>
    <link href="https://fonts.googleapis.com/css?family=Oxygen&display=swap" rel="stylesheet">
</head>
<body>
    <div id="flashcard-container">
        <div id="flashcard-set-list"></div>
        <div id="flashcard-set-details" style="display: none;">
            <h2 id="flashcard-set-title"></h2>
            <div id="flashcard-list"></div>
            <button id="edit-set-button">Edit Set</button>
        </div>
        <form id="flashcard-form">
            <label for="set-name">Set Name:</label>
            <input type="text" id="set-name" name="set-name" required>
            <button type="submit">Create Flashcard Set</button>
        </form>
    </div>
    <script>
        const flashcardForm = document.getElementById('flashcard-form');
        const flashcardSetList = document.getElementById('flashcard-set-list');
        const flashcardSetDetails = document.getElementById('flashcard-set-details');
        const flashcardList = document.getElementById('flashcard-list');
        const flashcardSetTitle = document.getElementById('flashcard-set-title');
        const editSetButton = document.getElementById('edit-set-button');
        flashcardForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const setName = document.getElementById('set-name').value;
            // You can replace this URL with the actual backend API endpoint
            fetch('http://localhost:8087/api/flashcard-sets/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    setName
                }),
            })
            .then(response => response.json())
            .then(data => {
                // Handle success, e.g., update UI or show a success message
                console.log('Flashcard set created successfully:', data);
                // Clear the form field
                document.getElementById('set-name').value = '';
                // Refresh the flashcard set list
                loadFlashcardSets();
            })
            .catch(error => {
                // Handle error, e.g., show an error message
                console.error('Error creating flashcard set:', error);
            });
        });
        flashcardSetList.addEventListener('click', function(event) {
            if (event.target.tagName === 'LI') {
                const flashcardSetId = event.target.dataset.flashcardSetId;
                // You can replace this URL with the actual backend API endpoint
                fetch(`http://localhost:8087/api/flashcard-sets/${flashcardSetId}`)
                .then(response => response.json())
                .then(data => {
                    // Display the flashcard set details
                    flashcardSetTitle.textContent = data.setName;
                    loadFlashcards(flashcardSetId);
                    flashcardSetList.style.display = 'none';
                    flashcardSetDetails.style.display = 'block';
                })
                .catch(error => {
                    // Handle error, e.g., show an error message
                    console.error('Error fetching flashcard set details:', error);
                });
            }
        });
        editSetButton.addEventListener('click', function() {
            // Implement logic to navigate to the set editing page or modal
            // You may want to use a library like React or Vue for more complex UI interactions
            alert('Edit set functionality will be implemented here.');
        });
        function loadFlashcardSets() {
            // You can replace this URL with the actual backend API endpoint
            fetch('http://localhost:8087/api/flashcard-sets')
            .then(response => response.json())
            .then(data => {
                // Clear the flashcard set list
                flashcardSetList.innerHTML = '';
                // Populate the flashcard set list with the fetched data
                data.forEach(flashcardSet => {
                    const listItem = document.createElement('li');
                    listItem.textContent = flashcardSet.setName;
                    listItem.dataset.flashcardSetId = flashcardSet.setId;
                    listItem.classList.add('flashcard-set');
                    flashcardSetList.appendChild(listItem);
                });
            })
            .catch(error => {
                // Handle error, e.g., show an error message
                console.error('Error fetching flashcard sets:', error);
            });
        }
        function loadFlashcards(setId) {
            // You can replace this URL with the actual backend API endpoint
            fetch(`http://localhost:8087/api/flashcard-sets/${setId}/flashcards`)
            .then(response => response.json())
            .then(data => {
                // Clear the flashcard list
                flashcardList.innerHTML = '';
                // Populate the flashcard list with the fetched data
                data.forEach(flashcard => {
                    const listItem = document.createElement('div');
                    listItem.classList.add('flashcard-item');
                    listItem.innerHTML = `<strong>Question:</strong> ${flashcard.question}<br><strong>Answer:</strong> ${flashcard.answer}`;
                    flashcardList.appendChild(listItem);
                });
            })
            .catch(error => {
                // Handle error, e.g., show an error message
                console.error('Error fetching flashcards:', error);
            });
        }
        // Initial load of flashcard sets
        loadFlashcardSets();
    </script>
</body>
</html>
