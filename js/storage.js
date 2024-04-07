document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createAccountForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const userData = {
                name: document.getElementById('name').value,
                surname: document.getElementById('surname').value,
                email: document.getElementById('email').value,
                department: document.getElementById('department').value,
                address: document.getElementById('address').value,
                date: document.getElementById('date').value,
            };

            localStorage.setItem('planwiseUserData', JSON.stringify(userData));

            const username = userData.name; 
            window.location.href = `../pages/home.html?username=${username}`;
        });
    }
});
