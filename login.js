document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Retrieve username cookie
        const savedUsername = getCookie('username');

        if (savedUsername === username) {
            alert('Login successful!');
            // Optionally, redirect to another page
            // window.location.href = "dashboard.html";
        } 
        else {
            alert('Invalid username or password!');
        }
    });

    // Function to retrieve cookie value
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
});
