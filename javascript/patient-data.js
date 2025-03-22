// patient-data.js - Handles patient data fetching and display

/**
 * Fetches patient data from the API and displays it on the page
 */
async function loadPatientData() {
    const patientList = document.getElementById('patientList');
    patientList.innerHTML = '<div class="loading">Loading patient data...</div>';
    
    try {
        // Replace with your actual patients API endpoint
        const apiUrl = 'https://hcms-api-production.up.railway.app/api/get/patients';
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const patients = await response.json();
        displayPatients(patients);
    } catch (error) {
        console.error("Error fetching patient data:", error);
        patientList.innerHTML = `<div class="error">Error loading patient data: ${error.message}</div>`;
    }
}

/**
 * Displays the list of patients
 * @param {Array} patients - The list of patients from the API
 */
function displayPatients(patients) {
    const patientList = document.getElementById('patientList');
    patientList.innerHTML = '';
    
    if (!patients || patients.length === 0) {
        patientList.innerHTML = '<div class="no-data">No patients found.</div>';
        return;
    }
    
    // Create patient cards for each patient
    patients.forEach(patient => {
        const patientCard = document.createElement('div');
        patientCard.className = 'patient-card';
        
        patientCard.innerHTML = `
            <h2>${patient.name || 'Unknown Patient'}</h2>
            <div class="patient-info">
                <p><strong>Patient ID:</strong> ${patient.id || 'N/A'}</p>
                <p><strong>Age:</strong> ${patient.age || 'N/A'}</p>
                <p><strong>Phone:</strong> ${patient.phone || 'N/A'}</p>
                <p><strong>Last Visit:</strong> ${formatDate(patient.lastVisit) || 'N/A'}</p>
            </div>
            <button onclick="initPrescriptionPopup('${patient.id}')">View Prescriptions</button>
        `;
        
        patientList.appendChild(patientCard);
    });
}

/**
 * Formats a date string
 * @param {string} dateString - The date string to format
 * @returns {string} - The formatted date
 */
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    } catch (error) {
        console.error("Error formatting date:", error);
        return dateString;
    }
}

// Load patient data when the page loads
document.addEventListener('DOMContentLoaded', loadPatientData);