---
layout: page
icon: fa-home
title: Login
---

<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login and Signup</title>
</head>

<body>
    <!-- Login Form -->
    <form id="login-form">
        <label for="login-username">Username:</label>
        <input type="text" id="login-username" name="login-username" required>
        <label for="login-password">Password:</label>
        <input type="password" id="login-password" name="login-password" required>
        <button type="button" onclick="submitLoginForm()">Login</button>
    </form>
    <!-- Signup Form -->
    <form id="signup-form" style="display: none;">
        <label for="signup-username">Username:</label>
        <input type="text" id="signup-username" name="signup-username" required>
        <label for="signup-password">Password:</label>
        <input type="password" id="signup-password" name="signup-password" required>
        <label for="signup-name">Name:</label>
        <input type="text" id="signup-name" name="signup-name" required>
        <label for="signup-dob">Date of Birth:</label>
        <input type="date" id="signup-dob" name="signup-dob" required>
        <button type="button" onclick="submitSignupForm()">Sign Up</button>
    </form>
    <p class="signup-link">Don't have an account? <a href="#" onclick="toggleForms()">Sign up</a></p>
    <script>
        async function submitLoginForm() {
            var username = document.getElementById('login-username').value;
            var password = document.getElementById('login-password').value;
            // Perform login action (AJAX request to the server)
            try {
                const response = await fetch('http://localhost:8087/api/authenticate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: username,
                        password: password,
                    }),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Login successful:', data);
            } catch (error) {
                console.error('Login failed:', error);
            }
        }
        async function submitSignupForm() {
            var username = document.getElementById('signup-username').value;
            var password = document.getElementById('signup-password').value;
            var name = document.getElementById('signup-name').value;
            var dob = document.getElementById('signup-dob').value;
            // Perform signup action (AJAX request to the server)
            try {
                const response = await fetch('http://localhost:8087/api/person/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        githubUsername: username,
                        password: password,
                        name: name,
                        dob: dob,
                    }),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Signup successful:', data);
            } catch (error) {
                console.error('Signup failed:', error);
            }
        }
        function toggleForms() {
            var loginForm = document.getElementById('login-form');
            var signupForm = document.getElementById('signup-form');
            if (loginForm.style.display === 'none') {
                loginForm.style.display = 'block';
                signupForm.style.display = 'none';
            } else {
                loginForm.style.display = 'none';
                signupForm.style.display = 'block';
            }
        }
    </script>
</body>

</html>