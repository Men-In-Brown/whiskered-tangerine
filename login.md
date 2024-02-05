<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login and Signup</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }
        form {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 300px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
        }
        input {
            width: 100%;
            padding: 8px;
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
        .signup-link {
            text-align: center;
            margin-top: 16px;
        }
    </style>
</head>
<body>
    <!-- Login Form -->
    <form id="login-form">
        <label for="login-email">Email:</label>
        <input type="email" id="login-email" name="login-email" required>
        <label for="login-password">Password:</label>
        <input type="password" id="login-password" name="login-password" required>
        <button type="submit">Login</button>
    </form>
    <!-- Signup Form -->
    <form id="signup-form" style="display: none;">
        <label for="signup-username">Username:</label>
        <input type="text" id="signup-username" name="signup-username" required>
        <label for="signup-email">Email:</label>
        <input type="email" id="signup-email" name="signup-email" required>
        <label for="signup-password">Password:</label>
        <input type="password" id="signup-password" name="signup-password" required>
        <label for="signup-dob">Date of Birth:</label>
        <input type="date" id="signup-dob" name="signup-dob" required>
        <button type="submit">Sign Up</button>
    </form>
    <p class="signup-link">Don't have an account? <a href="#" onclick="toggleForms()">Sign up</a></p>
    <script>
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
        function submitSignupForm() {
            var email = document.getElementById('signup-email').value;
            var password = document.getElementById('signup-password').value;
            var username = document.getElementById('signup-username').value;
            var dob = document.getElementById('signup-dob').value;
            // Prepare data for the POST request
            var data = new URLSearchParams();
            data.append('email', email);
            data.append('password', password);
            data.append('name', username);
            data.append('dob', dob);
            // Send AJAX request
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:8087/api/person/post/', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 201) {
                        alert('Signup successful! ' + xhr.responseText);
                    } else {
                        alert('Signup failed! ' + xhr.responseText);
                    }
                }
            };
            xhr.send(data);
        }
    </script>

</body>
</html>