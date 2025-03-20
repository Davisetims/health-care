document.addEventListener("DOMContentLoaded", function() {
    // Mobile menu toggle
    const menuItems = document.querySelectorAll('.menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // User profile dropdown
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            // Code for user dropdown menu
            console.log('User profile clicked');
            // Here you would typically toggle a dropdown menu
        });
    }

    // Notifications panel
    const notifications = document.querySelector('.notifications');
    if (notifications) {
        notifications.addEventListener('click', function() {
            // Code for notifications panel
            console.log('Notifications clicked');
            // Here you would typically toggle a notifications panel
        });
    }

    // Quick action buttons
    const actionItems = document.querySelectorAll('.action-item');
    actionItems.forEach(item => {
        item.addEventListener('click', function() {
            const actionType = this.querySelector('span').textContent;
            console.log(`Quick action clicked: ${actionType}`);
            // Here you would handle the action click based on type
        });
    });

    // Appointment action buttons
    setupActionButtons('btn-reschedule', 'Appointment rescheduled for: ');
    setupActionButtons('btn-cancel', 'Appointment cancelled: ');
    setupActionButtons('btn-refill', 'Prescription refill requested for: ');

    // Add some animation for better UX
    addHoverEffects();
    
    // Simulate loading indicators
    simulateLoading();
});

function setupActionButtons(className, message) {
    const buttons = document.querySelectorAll(`.${className}`);
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            // Get the parent item
            const item = this.closest('.appointment-item') || this.closest('.prescription-item');
            // Get the name of doctor or medication
            const name = item.querySelector('h3').textContent;
            console.log(`${message} ${name}`);
            
            // Show visual feedback
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
            
            // Here you would handle the specific action
        });
    });
}