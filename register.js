document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let fullName = document.getElementById("fullName").value.trim();
    let email = document.getElementById("email").value.trim();
    let studentID = document.getElementById("studentID").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Basic validation
    if (fullName === "" || email === "" || studentID === "" || password === "" || confirmPassword === "") {
        alert("All fields are required!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters!");
        return;
    }

    // Show loading effect on button
    let registerButton = document.querySelector("button");
    registerButton.innerText = "Registering...";
    registerButton.style.opacity = "0.6";
    registerButton.disabled = true;

    // Simulating server request (Replace with real fetch call)
    fetch("register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, studentID, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Registration successful! Redirecting to login...");
            window.location.href = "student_login.html";
        } else {
            alert(data.message);
            registerButton.innerText = "Register";
            registerButton.style.opacity = "1";
            registerButton.disabled = false;
        }
    });
});
