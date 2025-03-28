document.addEventListener("DOMContentLoaded", function() {
    // Mobile menu toggle
    const menuItems = document.querySelectorAll('.menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // User profile dropdown
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            // Code for user dropdown menu
            console.log('User profile clicked');
            // Here you would typically toggle a dropdown menu
        });
    }

    // Notifications panel
    const notifications = document.querySelector('.notifications');
    if (notifications) {
        notifications.addEventListener('click', function() {
            // Code for notifications panel
            console.log('Notifications clicked');
            // Here you would typically toggle a notifications panel
        });
    }

    // Quick action buttons
    const actionItems = document.querySelectorAll('.action-item');
    actionItems.forEach(item => {
        item.addEventListener('click', function() {
            const actionType = this.querySelector('span').textContent;
            console.log(`Quick action clicked: ${actionType}`);
            // Here you would handle the action click based on type
        });
    });

    // Appointment action buttons
    setupActionButtons('btn-reschedule', 'Appointment rescheduled for: ');
    setupActionButtons('btn-cancel', 'Appointment cancelled: ');
    setupActionButtons('btn-refill', 'Prescription refill requested for: ');

    // Add some animation for better UX
    addHoverEffects();
    
    // Simulate loading indicators
    simulateLoading();
});

function setupActionButtons(className, message) {
    const buttons = document.querySelectorAll(`.${className}`);
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            // Get the parent item
            const item = this.closest('.appointment-item') || this.closest('.prescription-item');
            // Get the name of doctor or medication
            const name = item.querySelector('h3').textContent;
            console.log(`${message} ${name}`);
            
            // Show visual feedback
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
            
            // Here you would handle the specific action
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const userProfileImg = document.querySelector(".user-profile img");
    const usernameSpan = document.querySelector(".user-profile span");
    const welcomeMessage = document.querySelector(".dashboard-content h1");
    
    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    
    if (userData) {
        // Set user profile image or default placeholder
        userProfileImg.src = userData.personal_details?.profile_picture || "/api/placeholder/40/40";
        userProfileImg.alt = userData.username || "User Profile";
        
        // Set username
        usernameSpan.textContent = userData.username || "Unknown User";
        
        // Update welcome message
        if (welcomeMessage) {
            welcomeMessage.textContent = `Welcome back, ${userData.username || "User"}!`;
        }
    } else {
        // Redirect to login page if user data is missing
        window.location.href = "login.html";
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logoutButton');

    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            // Clear local storage
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');

            // Redirect to landing page
            window.location.href = '../index.php';
        });
    }
});

// Modal for the fetching of the appointments via api
document.addEventListener("DOMContentLoaded", function () {
    const appointmentsLink = document.querySelector('.menu li a[href="#appointments"]');
    const viewAllAppointmentsLink = document.querySelector('.view-all[href="#appointments"]');
    const appointmentsModal = document.getElementById('appointmentsModal');
    const closeAppointmentsModal = appointmentsModal.querySelector('.close');
    const appointmentsList = document.getElementById('appointmentsList');

    const user = JSON.parse(localStorage.getItem('user'));
    const accessToken = localStorage.getItem('access_token');

    // Common function for fetching and showing appointments
    async function showAppointmentsModal() {
        try {
            // Open the modal
            appointmentsModal.style.display = 'block';

            // Clear existing appointments
            appointmentsList.innerHTML = '<p>Loading appointments...</p>';

            // Fetch appointments from the API
            const response = await fetch('https://hcms-api-production.up.railway.app/api/get/user/appointments/', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch appointments.');
            }

            const data = await response.json();

            if (data.appointments && data.appointments.length > 0) {
                appointmentsList.innerHTML = '';
                data.appointments.forEach(appointment => {
                    const appointmentItem = document.createElement('div');
                    appointmentItem.classList.add('appointment-item');
                    appointmentItem.innerHTML = `
                        <div class="appointment-details">
                            <h3>Dr. ${appointment.doctor_details.first_name} ${appointment.doctor_details.last_name}</h3>
                            <p>Notes: ${appointment.notes || 'No notes provided'}</p>
                            <div class="appointment-time">
                                <i class="far fa-calendar-alt"></i>
                                <span>${new Date(appointment.date).toLocaleDateString()}</span>
                                <i class="far fa-clock"></i>
                                <span>${new Date(appointment.date).toLocaleTimeString()}</span>
                            </div>
                            <p>Status: ${appointment.status}</p>
                        </div>
                    `;
                    appointmentsList.appendChild(appointmentItem);
                });
            } else {
                appointmentsList.innerHTML = '<p>No appointments found.</p>';
            }
        } catch (error) {
            console.error(error);
            appointmentsList.innerHTML = `<p>Error fetching appointments: ${error.message}</p>`;
        }
    }

    // Attach event listeners
    if (appointmentsLink) {
        appointmentsLink.addEventListener('click', function (e) {
            e.preventDefault();
            showAppointmentsModal();
        });
    }

    if (viewAllAppointmentsLink) {
        viewAllAppointmentsLink.addEventListener('click', function (e) {
            e.preventDefault();
            showAppointmentsModal();
        });
    }

    // Close the modal
    closeAppointmentsModal.addEventListener('click', function () {
        appointmentsModal.style.display = 'none';
    });

    // Close modal if clicking outside
    window.addEventListener('click', function (event) {
        if (event.target === appointmentsModal) {
            
            appointmentsModal.style.display = 'none';
        }
    });
});

// end of insertion of fetching the data

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('appointmentModal');
    const bookAppointmentBtn = document.getElementById('bookAppointmentBtn');
    const closeModal = document.querySelector('.close');
    const doctorSelect = document.getElementById('doctor');
    const appointmentForm = document.getElementById('appointmentForm');

    const apiDoctorsUrl = 'https://hcms-api-production.up.railway.app/api/all/users/?role=doctor';
    const bookingUrl = 'https://hcms-api-production.up.railway.app/api/book/appointments/';
    const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user
    const accessToken = localStorage.getItem('access_token'); // Get token

    if (!user) {
        alert('You must be logged in to book an appointment.');
        return;
    }

    // Open modal when clicking "Book Appointment"
    bookAppointmentBtn.addEventListener('click', function () {
        modal.style.display = 'block';
        loadDoctors(); // Fetch doctors when modal opens
    });

    // Close modal
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Close modal if user clicks outside it
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Fetch doctors from API
    async function loadDoctors() {
        try {
            const response = await fetch(apiDoctorsUrl);
            const data = await response.json();
            doctorSelect.innerHTML = '<option value="">Select a Doctor</option>'; // Reset dropdown

            if (data.users && data.users.length > 0) {
                data.users.forEach(doctor => {
                    const fullName = `${doctor.personal_details.first_name} ${doctor.personal_details.last_name}`;
                    doctorSelect.innerHTML += `<option value="${doctor._id}">${fullName}</option>`;
                });
            } else {
                doctorSelect.innerHTML = '<option value="">No doctors available</option>';
            }
        } catch (error) {
            console.error('Error fetching doctors:', error);
            doctorSelect.innerHTML = '<option value="">Failed to load doctors</option>';
        }
    }

    // Handle appointment booking
    appointmentForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const doctorId = doctorSelect.value;
        const appointmentDate = document.getElementById('appointment_date').value;
        const notes = document.getElementById('notes').value;

        if (!doctorId || !appointmentDate) {
            alert('Please select a doctor and appointment date.');
            return;
        }

        const appointmentData = {
            patient_id: user._id, // Logged-in patient ID
            doctor_id: doctorId,
            appointment_date: appointmentDate,
            status: 'Scheduled',
            notes: notes || ''
        };

        try {
            const response = await fetch(bookingUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(appointmentData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to book appointment.');
            }

            alert('Appointment booked successfully!');
            modal.style.display = 'none'; // Close modal on success
        } catch (error) {
            console.error('Booking Error:', error);
            alert(error.message);
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('appointmentModal');
    const bookAppointmentBtn = document.getElementById('bookAppointmentBtn');
    const closeModal = document.querySelector('.close');

    // Show modal when clicking the "Book Appointment" button
    bookAppointmentBtn.addEventListener('click', function () {
        modal.style.display = 'block';
    });

    // Close modal when clicking the close (X) button
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Close modal if user clicks outside the modal content
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const testResultsBtn = document.getElementById("testResultsBtn");
    const popupOverlay = document.getElementById("popupOverlay");
    const popupContainer = document.getElementById("popupContainer");
    const closePopup = document.getElementById("closePopup");
    const testResultsContent = document.getElementById("testResultsContent");
    const accessToken = localStorage.getItem('access_token')

    testResultsBtn.addEventListener("click", function () {
        popupOverlay.style.display = "block";
        popupContainer.style.display = "block";
        fetchTestResults();
    });

    closePopup.addEventListener("click", closePopupHandler);
    popupOverlay.addEventListener("click", closePopupHandler);

    function closePopupHandler() {
        popupOverlay.style.display = "none";
        popupContainer.style.display = "none";
    }

    function fetchTestResults() {
        testResultsContent.innerHTML = "<p>Loading...</p>";

        fetch("https://hcms-api-production.up.railway.app/api/get/user/test/results/", {
            method: "GET",
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
        })
        .then(response => response.json())
        .then(data => {
            if (data.test_results && data.test_results.length > 0) {
                let resultsHtml = data.test_results.map(test => `
                    <div class="test-result-item">
                        <strong>Test Name:</strong> ${test.test_name}<br>
                        <strong>Date:</strong> ${new Date(test.test_date).toLocaleString()}<br>
                        <strong>Uploaded By:</strong> ${test.uploaded_by}<br>
                        <strong>Status:</strong> ${test.status}<br>
                        <strong>Remarks:</strong> ${test.remarks}<br>
                        <strong>Results:</strong>
                        <ul>
                            ${Object.entries(test.results).map(([key, value]) => `<li>${key}: ${value}</li>`).join("")}
                        </ul>
                    </div>
                `).join("");
                testResultsContent.innerHTML = resultsHtml;
            } else {
                testResultsContent.innerHTML = "<p>No test results available.</p>";
            }
        })
        .catch(() => {
            testResultsContent.innerHTML = "<p>Error fetching test results. Please try again.</p>";
        });
    }
});

