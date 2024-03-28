document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registration-form');

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Set username as a cookie that expires in 30 seconds
        document.cookie = `username=${username}; max-age=30`;
        
        alert('Registration successful!');
        
        // Optionally, redirect to another page
        // window.location.href = "login.html";
    });
});
