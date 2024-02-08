---
layout: page
icon: fa-book
title: Grades
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grade Search</title>
</head>
<body>
    <h2>Select Student:</h2>
    <!-- Dropdown to display student names -->
    <select id="studentDropdown">
        <option value="" disabled selected>Select Student</option>
    </select>
    <!-- Display selected student ID -->
    <p>Selected Student ID: <span id="selectedStudentId"></span></p>
    <button onclick="searchGrade()">Search</button>
    <div id="result"></div>

<script>
    document.addEventListener('DOMContentLoaded', function () {
    // Fetch student data from your server
    fetch('http://localhost:8087/api/grade/')
        .then(response => response.json())
        .then(data => {
            // Populate the dropdown with student names and IDs
            const dropdown = document.getElementById('studentDropdown');
            data.forEach(student => {
                const option = document.createElement('option');
                option.value = student.id;
                option.textContent = student.name;
                dropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching student data:', error);
        });

    // Event listener for dropdown change
    document.getElementById('studentDropdown').addEventListener('change', function () {
        const selectedStudentId = this.value;
        document.getElementById('selectedStudentId').textContent = selectedStudentId;
    });
});
function searchGrade() {
            // Get the value from the input field
            //var name = document.getElementById("option").textContent;
            //alert(name);
            // Make a GET request to the search endpoint
            const studentId = document.getElementById('selectedStudentId').textContent;
            alert(studentId);
            fetch(`http://localhost:8087/api/grade/${studentId}`)
                .then(response => response.json())
                .then(data => {
                // .then(response => {
                //     alert(response);
                //     if (!response.ok) {
                //         alert("error");
                //         throw new Error(`HTTP error! Status: ${response.status}`);
                //     }
                //     alert(response.json());
                //     return response.json();
                // })
                // .then(data => {
                    // Handle the data received from the server 
                    alert("display");
                    displayResults(data);
                })
                .catch(error => {
                    alert("error catch");
                    console.error('Error:', error);
                });
        }
        function displayResults(data) {
            var resultDiv = document.getElementById("result");
            // Clear previous results
            resultDiv.innerHTML = '';
            if (data.length === 0) {
                resultDiv.innerHTML = 'No grades found with the given name.';
            } else {
                // Display each grade
                //data.forEach(grade => {
                    alert("print data");
                    resultDiv.innerHTML += `Grade: Name: ${data.name}, ${data.score}<br>`;
                //});
            }
        }
    </script>
</body>
</html>

