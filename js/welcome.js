document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username');
    const usernameElement = document.getElementById('username');
    if (usernameElement && username) {
        usernameElement.textContent = username;
    }
});
