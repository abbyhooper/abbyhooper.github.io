document.addEventListener('DOMContentLoaded', function () {
            const urlParams = new URLSearchParams(window.location.search);

            // Pre-filling the form fields with job data from URL parameters
            document.getElementById('job-title').value = urlParams.get('jobTitle') || '';
            document.getElementById('employer').value = urlParams.get('employer') || '';
            document.getElementById('employer-contact').value = urlParams.get('employerContact') || '';
        });
        document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser || currentUser.role !== 'user') {
        
        window.location.href = 'index.html';
    }
});
document.getElementById('application-form').addEventListener('submit', function (event) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser || currentUser.role !== 'user') {
        alert('You must be logged in as a user to apply for jobs.');
        event.preventDefault(); // Prevent form submission
        window.location.href = 'index.html'; // Redirect to home page
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser || currentUser.role !== 'user') {
        // Redirect with a query parameter to show the message
        window.location.href = 'index.html?message=not-authorized-user';
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
                
                document.getElementById('username-display').innerHTML = 'Not logged in';
            }
        });