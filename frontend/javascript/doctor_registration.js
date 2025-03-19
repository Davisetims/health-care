document.addEventListener('DOMContentLoaded', function () {
    // Password visibility toggle
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirmPassword');

    if (togglePassword) {
        togglePassword.addEventListener('click', function () {
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            // Toggle icon
            this.querySelector('img').src = type === 'password' ? 'eye-icon.svg' : 'eye-slash-icon.svg';
        });
    }

    if (toggleConfirmPassword) {
        toggleConfirmPassword.addEventListener('click', function () {
            const type = confirmPasswordField.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordField.setAttribute('type', type);
            // Toggle icon
            this.querySelector('img').src = type === 'password' ? 'eye-icon.svg' : 'eye-slash-icon.svg';
        });
    }

    // Form validation and submission
    const form = document.getElementById('registrationForm');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            // Basic validation
            const name = document.getElementById('name').value.trim();
            const age = document.getElementById('age').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const specialization = document.getElementById('specialization').value.trim();

            // Get selected shift days
            const shiftDays = [];
            const checkboxes = document.querySelectorAll('input[name="shift_time[]"]:checked');
            checkboxes.forEach(checkbox => {
                shiftDays.push(checkbox.value);
            });

            // Validate form fields
            if (name === '') {
                alert('Please enter your name');
                return;
            }

            if (age === '' || isNaN(age) || parseInt(age) <= 0) {
                alert('Please enter a valid age');
                return;
            }

            if (specialization === '') {
                alert('Please enter your specialization');
                return;
            }

            if (email === '' || !isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            if (phone === '' || !isValidPhone(phone)) {
                alert('Please enter a valid phone number');
                return;
            }

            if (shiftDays.length === 0) {
                alert('Please select at least one shift day');
                return;
            }

            if (password === '') {
                alert('Please enter a password');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            // If validation passes, create user data object
            const userData = {
                personal_details: {
                    name: name,
                    age: parseInt(age)
                },
                specialization: specialization,
                contact: {
                    phone: phone,
                    email: email
                },
                shift_time: shiftDays
            };

            // Send the data to the server
            submitRegistration(userData);
        });
    }

    // Helper functions
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function isValidPhone(phone) {
        const phonePattern = /^\d{9,15}$/; // Simple validation for phone numbers
        return phonePattern.test(phone);
    }

    function submitRegistration(userData) {
        // Create a FormData object to send to PHP
        const formData = new FormData();
        formData.append('userData', JSON.stringify(userData));

        // Send data using fetch API
        fetch('/../frontend/css/doctor_registration.php', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    alert('Registration successful! Redirecting to login page...');
                    window.location.href = 'login.php';
                } else {
                    alert('Registration failed: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});
// comment
