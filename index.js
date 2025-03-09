 // Ensure the Apply button inside the job listing directs the user to the applyjob.html
    document.addEventListener('DOMContentLoaded', function() {
        const approvedJobsContainer = document.getElementById('approved-jobs');
        
        // Populate the job listings
        displayApprovedJobs();
        
        function displayApprovedJobs() {
            const jobPostings = JSON.parse(localStorage.getItem('jobPostings')) || [];
            approvedJobsContainer.innerHTML = '';

            jobPostings.forEach((job, index) => {
                if (job.approved) {
                    const jobElement = document.createElement('div');
                    jobElement.classList.add('job-post');
                    jobElement.innerHTML = `
                        <div class="job-listing">
                            <h3>${job.title}</h3>
                            <p><strong>Employer:</strong> ${job.employer}</p>
                            <p><strong>Pay Range:</strong> ${job.payRange}</p>
                            <p><strong>Job Type:</strong> ${job.jobType}</p>
                            <p><strong>Employer Contact:</strong> ${job.employerContact}</p>
                            <p><strong>Location:</strong> ${job.location}</p>
                            <p><strong>Application Deadline:</strong> ${job.applicationDeadline}</p>
                            <p>${job.description}</p>
                            <a href="applyjob.html?jobTitle=${encodeURIComponent(job.title)}&employer=${encodeURIComponent(job.employer)}&employerContact=${encodeURIComponent(job.employerContact)}">
                                <button class="apply-btn">Apply</button>
                            </a>
                        </div>
                    `;
                    approvedJobsContainer.appendChild(jobElement);
                }
            });
        }
    }); 
    document.addEventListener('DOMContentLoaded', function () {
            const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Retrieve current user from localStorage

            if (currentUser) {
                // Display the username in the top-right corner
                document.getElementById('username-display').innerHTML = `Logged in as: ${currentUser.email}`;
                
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
   
        document.addEventListener('DOMContentLoaded', function () {
            // Get the URL parameters
            const urlParams = new URLSearchParams(window.location.search);
            const message = urlParams.get('message');

            
            if (message) {
                const messageContainer = document.getElementById('message-container');
                const messageText = document.getElementById('message-text');
                
                if (message === 'not-authorized-employer') {
                    messageText.textContent = 'You must be logged in as an employer to post a job.';
                } else if (message === 'not-authorized-user') {
                    messageText.textContent = 'You must be logged in as a user to apply for a job.';
                } 

                // Make the message visible
                messageContainer.style.display = 'block';

               
                document.getElementById('close-message').addEventListener('click', function () {
                    messageContainer.style.display = 'none';
                });
            }
        });