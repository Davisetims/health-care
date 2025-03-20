document.addEventListener('DOMContentLoaded', async () => {
    const doctorListContainer = document.getElementById('doctor-list');
    const searchInput = document.getElementById('doctor-search');

    // Function to fetch doctors from backend API
    async function fetchDoctors() {
        try {
            const response = await fetch('https://hcms-api-production.up.railway.app/api/doctors/');
            const doctors = await response.json();
            displayDoctors(doctors);
        } catch (error) {
            console.error('Error fetching doctor data:', error);
            doctorListContainer.innerHTML = '<p>Error loading doctor information.</p>';
        }
    }

    // Function to display doctors on dashboard
    function displayDoctors(doctors) {
        doctorListContainer.innerHTML = '';
        doctors.forEach(doctor => {
            const doctorCard = document.createElement('div');
            doctorCard.className = 'doctor-card';
            doctorCard.innerHTML = `
                <h3>${doctor.name}</h3>
                <p>Specialization: ${doctor.specialization}</p>
                <p>Contact: ${doctor.contact}</p>
                <p>Available Days: ${doctor.available_days}</p>
            `;
            doctorListContainer.appendChild(doctorCard);
        });
    }

    // Search functionality
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const doctorCards = document.querySelectorAll('.doctor-card');
        doctorCards.forEach(card => {
            const doctorName = card.querySelector('h3').textContent.toLowerCase();
            card.style.display = doctorName.includes(query) ? 'block' : 'none';
        });
    });

    // Initialize doctor list
    fetchDoctors();
});
