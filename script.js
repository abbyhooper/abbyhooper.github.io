

document.addEventListener('DOMContentLoaded', function () {
    const pendingJobsContainer = document.getElementById('pending-jobs');
    const approvedJobsContainer = document.getElementById('approved-jobs');
    const approvedPostingsPageContainer = document.getElementById('approved-postings-page');
    
    const isAdminPage = window.location.pathname.includes('admin');
    
    const jobForm = document.getElementById('job-form');
    if (jobForm) {
        jobForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const jobTitle = document.getElementById('job-title').value;
            const employer = document.getElementById('employer').value;
            const payRange = document.getElementById('pay-range').value;
            const jobType = document.getElementById('job-type').value;
            const employerContact = document.getElementById('employer-contact').value;
            const location = document.getElementById('location').value;
            const applicationDeadline = document.getElementById('application-deadline').value;
            const jobDescription = document.getElementById('job-description').value;

            if (!jobTitle || !employer || !payRange || !jobType || !employerContact || !location || !applicationDeadline || !jobDescription) {
                alert('Please fill out the entire form');
                return;
            }

            const jobPostings = JSON.parse(localStorage.getItem('jobPostings')) || [];
            jobPostings.push({
                title: jobTitle,
                employer: employer,
                payRange: payRange,
                jobType: jobType,
                employerContact: employerContact,
                location: location,
                applicationDeadline: applicationDeadline,
                description: jobDescription,
                approved: false
            });

            localStorage.setItem('jobPostings', JSON.stringify(jobPostings));

            alert('Job submitted for approval');
            displayJobPostings();
        });
    }

    function displayJobPostings() {
    if (pendingJobsContainer) {
        // Clear current list
        pendingJobsContainer.innerHTML = '';

        const jobPostings = JSON.parse(localStorage.getItem('jobPostings')) || [];
        jobPostings.forEach((job, index) => {
            if (job.approved) return;

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
                    ${isAdminPage ? `<button class="approve-btn" data-index="${index}">Approve</button>` : ''}
                    ${isAdminPage ? `<button class="delete-btn" data-index="${index}">Delete</button>` : ''}
                </div>
            `;
            pendingJobsContainer.appendChild(jobElement);
        });

        document.querySelectorAll('.approve-btn').forEach(button => {
            button.addEventListener('click', approveJob);
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', deleteJob);
        });
    }
}


    function approveJob(event) {
        const index = event.target.getAttribute('data-index');
        const jobPostings = JSON.parse(localStorage.getItem('jobPostings')) || [];
        jobPostings[index].approved = true;

        localStorage.setItem('jobPostings', JSON.stringify(jobPostings));

        displayJobPostings();
        displayApprovedJobs();
    }

    function deleteJob(event) {
        const index = event.target.getAttribute('data-index');
        const jobPostings = JSON.parse(localStorage.getItem('jobPostings')) || [];
        jobPostings.splice(index, 1);

        localStorage.setItem('jobPostings', JSON.stringify(jobPostings));

        displayJobPostings();
    }

    function displayApprovedJobs() {
        if (approvedJobsContainer) {
            approvedJobsContainer.innerHTML = '';

            const jobPostings = JSON.parse(localStorage.getItem('jobPostings')) || [];
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
                            ${isAdminPage ? `<button class="remove-approved-btn" data-index="${index}">Remove</button>` : ''}
                        </div>
                    `;
                    approvedJobsContainer.appendChild(jobElement);
                }
            });

            if (isAdminPage) {
                document.querySelectorAll('.remove-approved-btn').forEach(button => {
                    button.addEventListener('click', removeApprovedJob);
                });
            }
        }
    }

    function removeApprovedJob(event) {
        const index = event.target.getAttribute('data-index');
        const jobPostings = JSON.parse(localStorage.getItem('jobPostings')) || [];
        jobPostings.splice(index, 1);

        localStorage.setItem('jobPostings', JSON.stringify(jobPostings));

        displayApprovedJobs();
    }

    if (approvedPostingsPageContainer) {
        const jobPostings = JSON.parse(localStorage.getItem('jobPostings')) || [];
        jobPostings.forEach((job) => {
            if (job.approved) {
                const jobElement = document.createElement('div');
                jobElement.classList.add('job-post');
                jobElement.innerHTML = `
                    <div class="job-listing">
                        <h3>${job.title}</h3>
                        <p>${job.description}</p>
                    </div>
                `;
                approvedPostingsPageContainer.appendChild(jobElement);
            }
        });
    }

    displayJobPostings();
    displayApprovedJobs();
});
console.log("LocalStorage content:", localStorage.getItem('jobApplications'));

document.addEventListener('DOMContentLoaded', function () {
    const jobApply = document.getElementById('application-form');
    if (jobApply) {
        jobApply.addEventListener('submit', function (event) {
            event.preventDefault();

            const applyName = document.getElementById('student-name').value;
            const applyEmail = document.getElementById('student-email').value;
            const applyResume = document.getElementById('student-resume').value;
            const applyTitle = document.getElementById('job-title').value;
            const applyEmployer = document.getElementById('employer').value;
            const applyContact = document.getElementById('employer-contact').value;
            
            if (!applyName || !applyEmail || !applyResume) {
                alert('Please fill out the entire form');
                return;
            }
            if (!applyTitle || !applyEmployer || !applyContact) {
                alert('You have no job selected, please go to the browse page and find one');
                return;
            }

            // Create the application object
            const application = {
                studentName: applyName,
                studentEmail: applyEmail,
                studentResume: applyResume,
                jobTitle: applyTitle,
                employer: applyEmployer,
                employerContact: applyContact,
                appliedAt: new Date().toISOString(),
                status: 'pending' // Default status is 'pending'
            };

            // Retrieve existing applications
            let jobApplications = JSON.parse(localStorage.getItem('jobApplications')) || [];

            // Add the new application
            jobApplications.push(application);

            // Save updated applications back to localStorage
            localStorage.setItem('jobApplications', JSON.stringify(jobApplications));

            // Log to ensure it's saved correctly
            console.log("Saved applications:", jobApplications);

            // Call displayApplications to update the UI immediately
            displayApplications();

            alert('Your application has been submitted!');
            window.location.href = 'index.html'; // Redirect after submission
        });
    }

    // Display applications on page load
    displayApplications();
});


// Function to display applications
function displayApplications() {
    const applicationsContainer = document.getElementById('applications-container');
    console.log("Displaying applications...");

    // Clear the current displayed applications
    applicationsContainer.innerHTML = '';

    // Retrieve job applications from localStorage (if they exist)
    let jobApplications = JSON.parse(localStorage.getItem('jobApplications')) || [];
    console.log("Retrieved job applications:", jobApplications);

    // Check if there are applications to display
    if (jobApplications.length === 0) {
        console.log("No applications to display.");
        return;  // Exit if there are no applications
    }

    // Loop through each application and display it
    jobApplications.forEach((app, index) => {
        const jobElement = document.createElement('div');
        jobElement.classList.add('application-post');

        jobElement.innerHTML = `
            <h3>Job: ${app.jobTitle}</h3>
            <p><strong>Student Name:</strong> ${app.studentName}</p>
            <p><strong>Student Email:</strong> ${app.studentEmail}</p>
            <p><strong>Employer:</strong> ${app.employer}</p>
            <p><strong>Employer Contact:</strong> ${app.employerContact}</p>
            <p><strong>Resume:</strong> <a href="${app.studentResume}" target="_blank">View Resume</a></p>
            <p><strong>Status:</strong> ${app.status.charAt(0).toUpperCase() + app.status.slice(1)}</p>
            <button class="approve-application-btn" data-index="${index}">Approve</button>
            <button class="delete-application-btn" data-index="${index}">Delete</button>
        `;

        applicationsContainer.appendChild(jobElement);
    });

    // Add event listeners to approve and delete buttons
    document.querySelectorAll('.approve-application-btn').forEach(button => {
        button.addEventListener('click', approveApplication);
    });

    document.querySelectorAll('.delete-application-btn').forEach(button => {
        button.addEventListener('click', deleteApplication);
    });
}



// Approve application
function approveApplication(event) {
    const applicationIndex = event.target.getAttribute('data-index');
    let jobApplications = JSON.parse(localStorage.getItem('jobApplications')) || [];
    jobApplications[applicationIndex].status = 'approved';
    localStorage.setItem('jobApplications', JSON.stringify(jobApplications));
    displayApplications(); // Re-render applications
}

// Delete application
function deleteApplication(event) {
    const applicationIndex = event.target.getAttribute('data-index');
    let jobApplications = JSON.parse(localStorage.getItem('jobApplications')) || [];
    jobApplications.splice(applicationIndex, 1);
    localStorage.setItem('jobApplications', JSON.stringify(jobApplications));
    displayApplications(); // Re-render applications
}

