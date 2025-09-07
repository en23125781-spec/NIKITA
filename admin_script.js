document.getElementById("adminLoginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let username = document.getElementById("adminUsername").value.trim();
    let password = document.getElementById("adminPassword").value.trim();

    // Basic validation
    if (username === "" || password === "") {
        alert("Please enter both username and password!");
        return;
    }

    // Show loading effect on button
    let loginButton = document.querySelector("button");
    loginButton.innerText = "Logging in...";
    loginButton.style.opacity = "0.6";
    loginButton.disabled = true;

    // Simulating server request (Replace with real fetch call)
    fetch("admin_login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = "admin_dashboard.html";  // Redirect to dashboard
        } else {
            alert("Invalid admin credentials");
            loginButton.innerText = "Login";
            loginButton.style.opacity = "1";
            loginButton.disabled = false;
        }
    });
});
