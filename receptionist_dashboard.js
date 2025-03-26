document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://hcms-api-production.up.railway.app/api/register/user/";

    // Fetch patient data from API
    function fetchPatients() {
        fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("patients", JSON.stringify(data)); // Store in local storage
            displayPatients(data);
        })
        .catch(error => console.error("Error fetching patients:", error));
    }

    // Display patients in the UI
    function displayPatients(patients) {
        const patientList = document.querySelector(".patients-list");
        patientList.innerHTML = ""; // Clear existing data

        patients.forEach(patient => {
            const patientItem = document.createElement("div");
            patientItem.classList.add("patient-item");
            patientItem.innerHTML = `
                <div class="patient-icon">
                    <img src="https://via.placeholder.com/50" alt="Patient">
                </div>
                <div class="patient-details">
                    <h3>${patient.name}</h3>
                    <p>Registered: ${patient.registration_date}</p>
                </div>
                <div class="patient-actions">
                    <button class="btn-view" onclick="viewPatient('${patient.id}')">View</button>
                </div>
            `;
            patientList.appendChild(patientItem);
        });
    }

    // Open Modal
function openModal() {
    document.getElementById("addPatientModal").style.display = "flex";
}

// Close Modal
function closeModal() {
    document.getElementById("addPatientModal").style.display = "none";
}

// Close modal when clicking outside the content
window.onclick = function(event) {
    let modal = document.getElementById("addPatientModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};


    // Function to view a specific patient
    function viewPatient(patientId) {
        alert(`Viewing patient details for ID: ${patientId}`);
    }

    // Redirect to add patient page
    function addPatient() {
        window.location.href = "add_patient.html";
    }
    

    // Attach click event to the Add Patient button
    document.querySelector(".action-item[onclick='addPatient()']").addEventListener("click", addPatient);

    // Load patients on page load
    fetchPatients();
    
    // JavaScript Functions
    function checkIn() {
        alert("Patient checked in successfully!");
    }

    function cancelAppointment() {
        if (confirm("Are you sure you want to cancel this appointment?")) {
            alert("Appointment canceled!");
        }
    }

    function viewPatient() {
        alert("Viewing patient details...");
    }

    function addPatient() {
        openModal();
    }

    function generateBill() {
        alert("Generating bill...");
    }

    function printReports() {
        alert("Printing reports...");
    }

    function markPaid() {
        alert("Bill marked as paid!");
    }

    // Modal Functions
    function openModal() {
        document.getElementById('addPatientModal').style.display = 'block';
    }

    function closeModal() {
        document.getElementById('addPatientModal').style.display = 'none';
    }

    // Close modal when clicking outside of it
    window.onclick = function(event) {
        const modal = document.getElementById('addPatientModal');
        if (event.target == modal) {
            closeModal();
        }
    }

    // Handle form submission
    document.getElementById('patientForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the data to your backend
        const formData = {
            fullName: document.getElementById('fullName').value,
            dob: document.getElementById('dob').value,
            gender: document.getElementById('gender').value,
            contact: document.getElementById('contact').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value
        };
        
        console.log('Form submitted:', formData);
        alert('Patient added successfully!');
        closeModal();
        this.reset();
    });
});
