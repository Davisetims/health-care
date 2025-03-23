// Sample records for fallback if API fails
const sampleRecords = [
  {
      id: '1',
      patientName: 'John Doe',
      patientId: 'P12345',
      date: '2023-05-15',
      diagnosis: 'Hypertension',
      treatment: 'Prescribed Lisinopril 10mg daily',
      doctor: 'Dr. Sarah Johnson',
      notes: 'Patient advised to reduce sodium intake and increase physical activity.'
  },
  {
      id: '2',
      patientName: 'Jane Smith',
      patientId: 'P67890',
      date: '2023-05-10',
      diagnosis: 'Type 2 Diabetes',
      treatment: 'Prescribed Metformin 500mg twice daily',
      doctor: 'Dr. Michael Chen',
      notes: 'Patient advised to monitor blood glucose levels and follow up in 3 months.'
  },
  {
      id: '3',
      patientName: 'Robert Brown',
      patientId: 'P24680',
      date: '2023-05-05',
      diagnosis: 'Seasonal Allergies',
      treatment: 'Prescribed Cetirizine 10mg daily',
      doctor: 'Dr. Emily Wilson',
      notes: 'Patient advised to avoid known allergens and follow up if symptoms worsen.'
  }
];

// DOM elements
const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const emptyState = document.getElementById('empty-state');
const recordsGrid = document.getElementById('records-grid');
const errorMessage = document.getElementById('error-message');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');

// State
let allRecords = [];
let filteredRecords = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  fetchMedicalRecords();
  setupEventListeners();
});

// Set up event listeners
function setupEventListeners() {
  // Search functionality
  searchInput.addEventListener('input', filterRecords);
  
  // Sort functionality
  sortSelect.addEventListener('change', sortRecords);
}

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
      
        if (Array.isArray(data) && data.length > 0) {
            allRecords = data;
            filteredRecords = [...allRecords];
            renderRecords(filteredRecords);
        } else {
            console.log('API returned empty data, using sample records');
            allRecords = sampleRecords;
            filteredRecords = [...allRecords];
            renderRecords(filteredRecords);
        }
    } catch (error) {
        console.error('Failed to fetch medical records:', error);
        
        // Use sample data as fallback
        console.log('Using sample data due to API error');
        allRecords = sampleRecords;
        filteredRecords = [...allRecords];
        renderRecords(filteredRecords);
        
        // Show error message but still display sample data
        showErrorState('Could not connect to the medical records API. Showing sample data instead.');
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
                  <p class="patient-id">ID: ${escapeHTML(record.patientId)}</p>
              </div>
              <span class="record-badge">Medical Record</span>
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
                      <p>${escapeHTML(record.date)}</p>
                  </div>
              </div>
              
              <div class="detail-item">
                  <svg class="detail-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                  <div class="detail-content">
                      <p>Diagnosis</p>
                      <p>${escapeHTML(record.diagnosis)}</p>
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
              <p class="treatment-label">Treatment</p>
              <p class="treatment-text">${escapeHTML(record.treatment)}</p>
          </div>
          
          <a href="#" class="view-details" data-id="${escapeHTML(record.id)}">View Full Details</a>
      </div>
  `;
  
  // Add event listener to the "View Full Details" button
  const viewDetailsBtn = card.querySelector('.view-details');
  viewDetailsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const recordId = viewDetailsBtn.getAttribute('data-id');
      viewRecordDetails(recordId);
  });
  
  return card;
}

// View record details (placeholder function)
function viewRecordDetails(recordId) {
  const record = allRecords.find(r => r.id === recordId);
  if (record) {
      alert(`Record Details for ${record.patientName}:\n\nDiagnosis: ${record.diagnosis}\nTreatment: ${record.treatment}\nNotes: ${record.notes}`);
  }
}

// Filter records based on search input
function filterRecords() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  
  if (searchTerm === '') {
      filteredRecords = [...allRecords];
  } else {
      filteredRecords = allRecords.filter(record => {
          return (
              record.patientName.toLowerCase().includes(searchTerm) ||
              record.patientId.toLowerCase().includes(searchTerm) ||
              record.diagnosis.toLowerCase().includes(searchTerm) ||
              record.doctor.toLowerCase().includes(searchTerm)
          );
      });
  }
  // This is a comment
  
  sortRecords();
}

// Sort records based on selected option
function sortRecords() {
  const sortOption = sortSelect.value;
  
  switch (sortOption) {
      case 'latest':
          filteredRecords.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
      case 'oldest':
          filteredRecords.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
      case 'name':
          filteredRecords.sort((a, b) => a.patientName.localeCompare(b.patientName));
          break;
  }
  
  renderRecords(filteredRecords);
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