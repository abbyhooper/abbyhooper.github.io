 document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser || currentUser.role !== 'employer') {
        // If the user is not logged in or not an employer, redirect to the home page
        window.location.href = 'index.html';
    }
});
document.getElementById('job-form').addEventListener('submit', function (event) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser || currentUser.role !== 'employer') {
        alert('You must be logged in as an employer to post a job.');
        event.preventDefault(); // Prevent form submission
        window.location.href = 'index.html'; // Redirect to home page
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser || currentUser.role !== 'employer') {
        // Redirect with a query parameter to show a message
        window.location.href = 'index.html?message=not-authorized-employer';
    }
});
document.addEventListener('DOMContentLoaded', function () {
            const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Retrieve current user from localStorage

            if (currentUser) {
                // Display the username in the top-right corner
                document.getElementById('username-display').innerHTML = `Logged in as: ${currentUser.email}`;
                // Optionally, display a logout button
                const logoutButton = document.createElement('button');
                logoutButton.textContent = 'Logout';
                logoutButton.onclick = function () {
                    // Clear the stored user data and redirect to login page
                    localStorage.removeItem('currentUser');
                    window.location.href = 'login.html';
                };
                document.getElementById('username-display').appendChild(logoutButton);
            } else {
                // If no username is stored, show a login prompt
                document.getElementById('username-display').innerHTML = 'Not logged in';
            }
        });