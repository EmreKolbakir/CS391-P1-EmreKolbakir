document.addEventListener('DOMContentLoaded', function() {
    // Extract username from URL parameter and update header
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username');
    const usernameElement = document.getElementById('username');
    if (usernameElement && username) {
        usernameElement.textContent = username;
    }
});
