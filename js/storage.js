document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createAccountForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            // Capture the form data
            const userData = {
                name: document.getElementById('name').value,
                surname: document.getElementById('surname').value,
                email: document.getElementById('email').value,
                department: document.getElementById('department').value,
                address: document.getElementById('address').value,
                date: document.getElementById('date').value,
            };

            // Store it in localStorage
            localStorage.setItem('planwiseUserData', JSON.stringify(userData));

            // Redirect to the home page with the username as a URL parameter
            const username = userData.name; // Assuming 'name' is the username field
            window.location.href = `../pages/home.html?username=${username}`;
        });
    }
});
