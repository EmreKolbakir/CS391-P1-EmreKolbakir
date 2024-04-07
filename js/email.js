document.addEventListener('DOMContentLoaded', function() {
    const sendEmailButton = document.getElementById('sendEmailButton');
    const emailInput = document.getElementById('email');

    if (sendEmailButton && emailInput) {
        sendEmailButton.addEventListener('click', function() {
            const emailAddress = emailInput.value;
            const subject = 'Your Subject Here';
            const body = 'Your email body content here.';

            const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            window.open(mailtoLink); 
        });
    }
});
