// Utility function to sanitize strings for HTML
function sanitize(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Format date for display
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    try {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    } catch {
        return dateString;
    }
}

// Check if date is today (timezone aware)
function isToday(dateString) {
    if (!dateString) return false;
    try {
        const today = new Date();
        const date = new Date(dateString);
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    } catch {
        return false;
    }
}

async function fetchData() {
    try {
        // Show loading state
        document.querySelector('.appointments-list').innerHTML = '<div class="loading">Loading appointments...</div>';
        document.querySelector('.patients-list').innerHTML = '<div class="loading">Loading patients...</div>';

        const response = await fetch("https://hcms-api-production.up.railway.app/api/register/user/");
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error('Invalid data format received from API');
        }

        // Store data in localStorage for later use
        localStorage.setItem("patientsData", JSON.stringify(data));

        // Populate Appointments & Patient Records
        populateAppointments(data);
        populatePatients(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        // Show error to user
        document.querySelector('.appointments-list').innerHTML = 
            `<div class="error">Failed to load appointments: ${sanitize(error.message)}</div>`;
        document.querySelector('.patients-list').innerHTML = 
            `<div class="error">Failed to load patients: ${sanitize(error.message)}</div>`;
    }
}

// Populate Today's Appointments
function populateAppointments(data) {
    const appointmentsList = document.querySelector(".appointments-list");
    
    // Clear existing content
    appointmentsList.innerHTML = "";

    // Filter and process appointments
    const todayAppointments = data.filter(patient => 
        patient.appointment_date && isToday(patient.appointment_date)
    );

    if (todayAppointments.length === 0) {
        appointmentsList.innerHTML = '<div class="no-appointments">No appointments scheduled for today</div>';
        return;
    }

    // Create document fragment for efficient DOM updates
    const fragment = document.createDocumentFragment();

    todayAppointments.forEach(patient => {
        const appointmentItem = document.createElement('div');
        appointmentItem.className = 'appointment-item';
        appointmentItem.innerHTML = `
            <div class="appointment-icon">
                <img src="${patient.photo_url || 'https://via.placeholder.com/50'}" alt="Patient">
            </div>
            <div class="appointment-details">
                <h3>${sanitize(patient.name || 'Unknown')}</h3>
                <p>${sanitize(patient.department || "General Checkup")}</p>
                <div class="appointment-time">
                    <i class="far fa-calendar-alt"></i> <span>Today</span>
                    <i class="far fa-clock"></i> <span>${sanitize(patient.appointment_time || "10:00 AM")}</span>
                </div>
            </div>
            <div class="appointment-actions">
                <button class="btn-check-in" data-patient-id="${patient.id}">Check In</button>
                <button class="btn-cancel" data-patient-id="${patient.id}">Cancel</button>
            </div>
        `;
        fragment.appendChild(appointmentItem);
    });

    appointmentsList.appendChild(fragment);

    // Add event listeners
    appointmentsList.querySelectorAll('.btn-check-in').forEach(btn => {
        btn.addEventListener('click', () => checkIn(btn.dataset.patientId));
    });
    
    appointmentsList.querySelectorAll('.btn-cancel').forEach(btn => {
        btn.addEventListener('click', () => cancelAppointment(btn.dataset.patientId));
    });
}

// Populate Patients List
function populatePatients(data) {
    const patientsList = document.querySelector(".patients-list");
    patientsList.innerHTML = ""; // Clear existing content

    if (data.length === 0) {
        patientsList.innerHTML = '<div class="no-patients">No patients found</div>';
        return;
    }

    const fragment = document.createDocumentFragment();

    data.forEach(patient => {
        const patientItem = document.createElement('div');
        patientItem.className = 'patient-item';
        patientItem.innerHTML = `
            <div class="patient-icon">
                <img src="${patient.photo_url || 'https://via.placeholder.com/50'}" alt="Patient">
            </div>
            <div class="patient-details">
                <h3>${sanitize(patient.name || 'Unknown')}</h3>
                <p>Registered: ${formatDate(patient.registration_date)}</p>
            </div>
            <div class="patient-actions">
                <button class="btn-view" data-patient-id="${patient.id}">View</button>
            </div>
        `;
        fragment.appendChild(patientItem);
    });

    patientsList.appendChild(fragment);

    // Add event listeners
    patientsList.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', () => viewPatient(btn.dataset.patientId));
    });
}

// Example function to view patient details
function viewPatient(patientId) {
    console.log("Viewing details for patient ID:", patientId);
    // Implement actual view functionality
}

// Example function for check-in
function checkIn(patientId) {
    console.log("Checking in patient ID:", patientId);
    // Implement actual check-in functionality
}

// Example function to cancel appointment
function cancelAppointment(patientId) {
    console.log("Canceling appointment for patient ID:", patientId);
    // Implement actual cancellation functionality
}

// Initialize the page
document.addEventListener('DOMContentLoaded', fetchData);
