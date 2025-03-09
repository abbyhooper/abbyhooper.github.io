document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user)); // Save logged-in user with role
        window.location.href = 'index.html'; // Redirect to main page
    } else {
        alert('Invalid credentials');
    }
});
