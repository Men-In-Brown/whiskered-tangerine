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
<style>
    table {
        border-collapse: collapse;
        width: 100%;
    }
    th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
    }
    tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    th {
        background-color: #4CAF50;
        color: white;
    }
</style>
<body>
    <h2>Select Student:</h2>
    <!-- Dropdown to display student names -->
    <input type="hidden" id="id" name="id" readonly>
    <select id="studentDropdown">
        <option value="" disabled selected>Select Student</option>
    </select>
    <select id="assignmentDropdown">
        <option value="" disabled selected>Select Assignment</option>
    </select>
    <!-- Display selected student ID -->
    <p>Selected Student Email: <span id="selectedStudentEmail"></span></p>
    <p>Selected Assignment Name: <span id="selectedAssignmentName"></span></p>
    <p>Selected Assignment Name: <span id="selectedAssignmentMaxPoints" type="hidden"></span></p>
    <button onclick="searchGrade()">Search</button>
    <div id="result"></div>
    <div id="resultTable"></div>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // Fetch student data from your server
            fetch('http://localhost:8087/api/grade/')
                .then(response => response.json())
                .then(data => {
                    const dropdown = document.getElementById('studentDropdown');
                    data.forEach(student => {
                        const option = document.createElement('option');
                        option.value = student.email;
                        option.textContent = student.name;
                        dropdown.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Error fetching student data:', error);
                });
            document.getElementById('studentDropdown').addEventListener('change', function () {
                const selectedStudentEmail = this.value;
                document.getElementById('selectedStudentEmail').textContent = selectedStudentEmail;
            });
            // Fetch assignment data from server
            fetch('http://localhost:8087/api/assignments/') 
                .then(response => response.json())
                .then(data => {
                    const dropdown = document.getElementById('assignmentDropdown');
                    data.forEach(assignment => {
                        const option = document.createElement('option');
                        option.textContent = assignment.title;
                        dropdown.appendChild(option);
                    });
                })
                .catch(error => {
                    console.error('Error fetching assignment data:', error);
                });
            document.getElementById('assignmentDropdown').addEventListener('change', function () {
                const selectedAssignmentName = this.textContent;
                const maxScore = this.value;
                document.getElementById('selectedAssignmentName').textContent = selectedAssignmentName;
                document.getElementById('selectedAssignmentMaxPoints').textContent = maxScore;
            });
        });
        function searchGrade() {
            const studentEmail = document.getElementById('selectedStudentEmail').textContent;
            fetch(`http://localhost:8087/api/grade/email/${studentEmail}`)
            .then(response => response.json())
            .then(data => {
                displayResults(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
        function displayResults(data) {
            var resultDiv = document.getElementById("result");
            resultDiv.innerHTML = '';
            if (data.length === 0) {
                resultDiv.innerHTML = 'No grades found with the given name.';
            } else {
                const resultContainer = document.getElementById("resultTable");
                resultContainer.innerHTML = ''; // Clear previous table data
                // Construct Table header
                const headerRow = document.createElement("tr");
                const headers = ["Email", "Assignment", "Max Score","Grade", "Update"];
                headers.forEach(headerText => {
                    const th = document.createElement("th");
                    th.textContent = headerText;
                    headerRow.appendChild(th);
                });
                resultContainer.appendChild(headerRow);
                // Add data rows
                data.forEach(student => {
                    const row = document.createElement("tr");
                    const emailCell = document.createElement("td");
                    emailCell.textContent = student.email;
                    const assignmentCell = document.createElement("td");
                    assignmentCell.textContent = student.assignment;
                    const maxscoreCell = document.createElement("td");
                    maxscoreCell.textContent = student.maxPoints; // Set maxPoints
                    const gradeCell = document.createElement("td");
                    const gradeInput = document.createElement("input");
                    gradeInput.type = "text";
                    gradeInput.value = student.score;
                    gradeInput.addEventListener('input', function() {
                        student.score = this.value;
                    });
                    gradeCell.appendChild(gradeInput);
                    const updateCell = document.createElement("td"); // Changed from button to td
                    const updateButton = document.createElement("button");
                    updateButton.textContent = "Update";
                    updateButton.addEventListener('click', function() {
                        // alert(student.id + student.email + student.assignment + student.score);
                        const requestOptions = {
                            method: ['PUT'],
                            // body: JSON.stringify(body),
                            headers: {
                                "content-type": "application/json",
                                'Authorization': 'Bearer my-token',
                            },
                        };
                        fetch(`http://localhost:8087/api/grade/update/${student.id}?newEmail=${student.email}&newAssignment=${student.assignment}&newMaxPoints=${student.maxPoints}&newScore=${student.score}`, requestOptions)
                        .then(response => {
                            // trap error response from Web API
                            if (response.status !== 200) {
                                const errorMsg = 'Invalid Input - Database Update error: ' + response.status;
                                console.log(errorMsg);
                                alert(errorMsg);
                                return;
                            }
                            // response contains valid result
                            response.json().then(data => {
                                resultDiv.innerHTML = response.status;
                            })
                        })
                    });
                    updateCell.appendChild(updateButton);
                    row.appendChild(emailCell);
                    row.appendChild(assignmentCell);
                    row.appendChild(maxscoreCell);
                    row.appendChild(gradeCell);
                    row.appendChild(updateCell);
                    resultContainer.appendChild(row);
                });
            }
        }
    </script>
</body>
</html>