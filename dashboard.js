document.addEventListener("DOMContentLoaded", function() {
    // Function to get cookie value by name
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Get the username from the cookie
    const username = getCookie("username");

    // Display the username on the dashboard
    if (username) {
        document.getElementById("usernameDisplay").innerText = "Logged in as: " + username;
    } 
    else {
        document.getElementById("usernameDisplay").innerText = "Not logged in";
    }
});
