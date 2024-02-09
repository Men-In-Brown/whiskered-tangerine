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
    <style>
        body {
            font-family: 'Oxygen', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }
        a {
            text-decoration: none;
            color: #4caf50;
            margin-bottom: 10px;
        }
        a button {
            background-color: #4caf50;
            color: #fff;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        a button:hover {
            background-color: #45a049;
        }
        #flashcard-container {
            max-width: 400px;
            width: 100%;
        }
        form {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 100%;
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
        }
        input, select {
            width: 100%;
            padding: 5px;
            margin-bottom: 16px;
            box-sizing: border-box;
        }
        button {
            background-color: #4caf50;
            color: #fff;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
        }
        button:hover {
            background-color: #45a049;
        }
        ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        li {
            background-color: #fff;
            margin-bottom: 10px;
            padding: 10px;
            border-radius: 4px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        }
        li button {
            background-color: #e74c3c;
            color: #fff;
            padding: 5px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <a href="#">
        <button>Back</button>
    </a>
    <div id="flashcard-container">
        <div id="flashcard-list"></div>
        <form id="flashcard-form">
            <label for="question">Question:</label>
            <input type="text" id="question" name="question" required>
            <label for="answer">Answer:</label>
            <input type="text" id="answer" name="answer" required>
            <button type="submit">Create Flashcard</button>
        </form>
    </div>
    <script>
        const flashcardForm = document.getElementById('flashcard-form');
        const flashcardList = document.getElementById('flashcard-list');
        flashcardForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const question = document.getElementById('question').value;
            const answer = document.getElementById('answer').value;
            // You can replace this URL with the actual backend API endpoint
            fetch('http://localhost:8087/api/flashcards/post/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question,
                    answer,
                }),
            })
            .then(response => response.json())
            .then(data => {
                // Handle success, e.g., update UI or show a success message
                console.log('Flashcard created successfully:', data);
                // Clear the form fields
                document.getElementById('question').value = '';
                document.getElementById('answer').value = '';
                // Refresh the flashcard list
                loadFlashcards();
            })
            .catch(error => {
                // Handle error, e.g., show an error message
                console.error('Error creating flashcard:', error);
            });
        });
        flashcardList.addEventListener('click', function(event) {
            if (event.target.tagName === 'BUTTON') {
                const flashcardId = event.target.dataset.flashcardId;
                // You can replace this URL with the actual backend API endpoint
                fetch(`http://localhost:8087/api/flashcards/delete/${flashcardId}`, {
                    method: 'DELETE',
                })
                .then(response => {
                    if (response.ok) {
                        // Handle success, e.g., update UI or show a success message
                        console.log('Flashcard deleted successfully');
                        // Refresh the flashcard list
                        loadFlashcards();
                    } else {
                        // Handle other HTTP status codes
                        console.error('Error deleting flashcard:', response.statusText);
                    }
                })
                .catch(error => {
                    // Handle error, e.g., show an error message
                    console.error('Error deleting flashcard:', error);
                });
            }
        });
        function loadFlashcards() {
            // You can replace this URL with the actual backend API endpoint
            fetch('http://localhost:8087/api/flashcards/')
            .then(response => response.json())
            .then(data => {
                // Clear the flashcard list
                flashcardList.innerHTML = '';
                // Populate the flashcard list with the fetched data
                data.forEach(flashcard => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `<strong>Question:</strong> ${flashcard.question}<br><strong>Answer:</strong> ${flashcard.answer}
                    <button data-flashcard-id="${flashcard.id}">Delete</button>`;
                    flashcardList.appendChild(listItem);
                });
            })
            .catch(error => {
                // Handle error, e.g., show an error message
                console.error('Error fetching flashcards:', error);
            });
        }
        // Initial load of flashcards
        loadFlashcards();
    </script>

</body>
</html>
