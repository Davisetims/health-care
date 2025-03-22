// prescription.js - Prescription popup handler

/**
 * Initializes the prescription popup functionality
 * @param {string} patientId - The ID of the patient to fetch prescriptions for
 */
function initPrescriptionPopup(patientId) {
    const showPrescriptionBtn = document.getElementById("showPrescriptionBtn");
    const prescriptionForm = document.getElementById("prescriptionPopup");
    const closePrescriptionBtn = document.getElementById("closePrescriptionBtn");
    const prescriptionContent = document.getElementById("prescriptionContent");
    
    // Show prescription popup when button is clicked
    showPrescriptionBtn.addEventListener("click", () => {
        prescriptionForm.style.display = "block";
        fetchPrescriptionData(patientId);
    });
    
    // Hide prescription popup when close button is clicked
    closePrescriptionBtn.addEventListener("click", () => {
        prescriptionForm.style.display = "none";
    });
    
    /**
     * Fetches prescription data from the API
     * @param {string} patientId - The ID of the patient to fetch prescriptions for
     */
    async function fetchPrescriptionData(patientId) {
        try {
            prescriptionContent.innerHTML = '<p>Loading prescription data...</p>';
            
            const apiUrl = `https://hcms-api-production.up.railway.app/api/get/patient/prescription/${patientId}`;
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            
            const prescriptionData = await response.json();
            displayPrescriptionData(prescriptionData);
        } catch (error) {
            console.error("Error fetching prescription data:", error);
            prescriptionContent.innerHTML = `<p class="error">Error loading prescription data: ${error.message}</p>`;
        }
    }
    
    /**
     * Displays the prescription data in the popup
     * @param {Object} data - The prescription data returned from the API
     */
    function displayPrescriptionData(data) {
        // Clear loading message
        prescriptionContent.innerHTML = '';
        
        if (!data || data.length === 0) {
            prescriptionContent.innerHTML = '<p>No prescriptions found for this patient.</p>';
            return;
        }
        
        // Create prescription list
        const prescriptionList = document.createElement('div');
        prescriptionList.className = 'prescription-list';
        
        data.forEach(prescription => {
            const prescriptionItem = document.createElement('div');
            prescriptionItem.className = 'prescription-item';
            
            prescriptionItem.innerHTML = `
                <h3>Prescription #${prescription.id || 'N/A'}</h3>
                <p><strong>Date:</strong> ${formatDate(prescription.date) || 'N/A'}</p>
                <p><strong>Doctor:</strong> ${prescription.doctor || 'N/A'}</p>
                <p><strong>Medication:</strong> ${prescription.medication || 'N/A'}</p>
                <p><strong>Dosage:</strong> ${prescription.dosage || 'N/A'}</p>
                <p><strong>Instructions:</strong> ${prescription.instructions || 'N/A'}</p>
            `;
            
            prescriptionList.appendChild(prescriptionItem);
        });
        
        prescriptionContent.appendChild(prescriptionList);
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
  }
  
  // Export the function if using modules
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initPrescriptionPopup };
  }