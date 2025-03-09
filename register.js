document.addEventListener('DOMContentLoaded', function () {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        alert("You are already logged in!");
        window.location.href = 'index.html'; // Redirect to home page if already logged in
    }
});

document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user already exists
    if (users.some(user => user.email === email)) {
        alert('User already exists');
        return;
    }

    const newUser = { email, password, role };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('User registered successfully');
    window.location.href = 'login.html'; // Redirect to login page after successful registration
});
