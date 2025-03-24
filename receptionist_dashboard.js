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
});
