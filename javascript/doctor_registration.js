document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');

    if (form) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const age = document.getElementById('age').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const specialization = document.getElementById('specialization').value.trim();

            // Get selected shift days
            const shiftDays = [...document.querySelectorAll('input[name="shift_time[]"]:checked')]
                .map(checkbox => checkbox.value);

            // Validate fields
            if (!name) return alert('Please enter your name');
            if (!age || isNaN(age) || parseInt(age) <= 0) return alert('Please enter a valid age');
            if (!specialization) return alert('Please enter your specialization');
            if (!isValidEmail(email)) return alert('Please enter a valid email address');
            if (!isValidPhone(phone)) return alert('Please enter a valid phone number');
            if (shiftDays.length === 0) return alert('Please select at least one shift day');
            if (!password) return alert('Please enter a password');
            if (password !== confirmPassword) return alert('Passwords do not match');

            // Construct user data object
            const userData = {
                name,
                age: parseInt(age),
                specialization,
                email,
                phone,
                shift_time: shiftDays,
                password
            };

            try {
                // Send the data to the backend API
                const response = await fetch('https://hcms-api-production.up.railway.app/api/register/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Registration failed. Please try again.');
                }

                alert('Registration successful! Redirecting to login page...');
                window.location.href = '/login';

            } catch (error) {
                console.error('Error:', error);
                alert(error.message); // Show specific error message to user
            }
        });
    }

    // Helper functions
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        return /^\d{9,15}$/.test(phone);
    }
});
