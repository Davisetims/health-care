// DOM elements
const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const emptyState = document.getElementById('empty-state');
const recordsGrid = document.getElementById('records-grid');
const errorMessage = document.getElementById('error-message');

// State
let allRecords = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  fetchMedicalRecords();
});

// Fetch medical records from the API
async function fetchMedicalRecords() {
    showLoadingState();
  
    try {
        // Retrieve user data and access token from local storage
        const user = JSON.parse(localStorage.getItem('user'));
        const accessToken = localStorage.getItem('access_token');

        // Check if the user and access token exist
        if (!user || !accessToken) {
            throw new Error('User not authenticated. Please log in.');
        }

        // Fetch options with the access token for authentication
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        };

        // Attempt to fetch from the API
        const response = await fetch('https://hcms-api-production.up.railway.app/api/get/user/medical-records/', options);
      
        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }
      
        const data = await response.json();
      
        if (data.medical_records && data.medical_records.length > 0) {
            // Transform API data to match our expected format
            allRecords = data.medical_records.map(record => ({
                id: record._id,
                patientName: `${record.patient_details.first_name} ${record.patient_details.last_name}`,
                patientId: record.patient_id,
                date: record.uploaded_at,
                recordType: record.record_type,
                description: record.description,
                fileUrl: record.file_url,
                doctor: `${record.doctor_details.first_name} ${record.doctor_details.last_name}`,
                doctorSpecialization: record.doctor_details.specialization,
                patientAge: record.patient_details.age,
                patientGender: record.patient_details.gender
            }));
            
            renderRecords(allRecords);
        } else {
            showEmptyState();
        }
    } catch (error) {
        console.error('Failed to fetch medical records:', error);
        showErrorState('Failed to load medical records. Please try again later.');
    }
}

// Render the medical records to the DOM
function renderRecords(records) {
  hideAllStates();
  
  if (records.length === 0) {
      showEmptyState();
      return;
  }
  
  // Clear the grid
  recordsGrid.innerHTML = '';
  
  // Create and append record cards
  records.forEach(record => {
      const recordCard = createRecordCard(record);
      recordsGrid.appendChild(recordCard);
  });
  
  // Show the grid
  recordsGrid.style.display = 'grid';
}

// Create a record card element
function createRecordCard(record) {
  const card = document.createElement('div');
  card.className = 'record-card';
  
  card.innerHTML = `
      <div class="card-content">
          <div class="card-header">
              <div class="patient-info">
                  <h3>${escapeHTML(record.patientName)}</h3>
                  <p class="patient-id">${record.patientAge} years, ${escapeHTML(record.patientGender)}</p>
                  <p class="patient-id">ID: ${escapeHTML(record.patientId)}</p>
              </div>
              <span class="record-badge">${escapeHTML(record.recordType)}</span>
          </div>
          
          <div class="record-details">
              <div class="detail-item">
                  <svg class="detail-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <div class="detail-content">
                      <p>Date</p>
                      <p>${formatDate(record.date)}</p>
                  </div>
              </div>
              
              <div class="detail-item">
                  <svg class="detail-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                  <div class="detail-content">
                      <p>Record Type</p>
                      <p>${escapeHTML(record.recordType)}</p>
                  </div>
              </div>
              
              <div class="detail-item">
                  <svg class="detail-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <div class="detail-content">
                      <p>Doctor</p>
                      <p>${escapeHTML(record.doctor)}</p>
                  </div>
              </div>
          </div>
          
          <div class="treatment-section">
              <p class="treatment-label">Description</p>
              <p class="treatment-text">${escapeHTML(record.description)}</p>
          </div>
          
          ${record.fileUrl ? `<a href="${escapeHTML(record.fileUrl)}" class="view-details" target="_blank">View File</a>` : ''}
      </div>
  `;
  
  return card;
}

// Show loading state
function showLoadingState() {
  hideAllStates();
  loadingState.style.display = 'block';
}

// Show error state
function showErrorState(message) {
  errorMessage.textContent = message || 'Failed to load medical records. Please try again later.';
  errorState.style.display = 'block';
}

// Show empty state
function showEmptyState() {
  hideAllStates();
  emptyState.style.display = 'block';
}

// Hide all states
function hideAllStates() {
  loadingState.style.display = 'none';
  errorState.style.display = 'none';
  emptyState.style.display = 'none';
  recordsGrid.style.display = 'none';
}

// Helper function to escape HTML to prevent XSS
function escapeHTML(str) {
  if (!str) return '';
  return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
}

// Helper function to format date
function formatDate(dateString) {
  if (!dateString) return 'Unknown date';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return dateString; // Return original if parsing fails
  }
}