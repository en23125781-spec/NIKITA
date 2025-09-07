<?php
session_start();

// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "placement_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input
    $name = trim($_POST['name']);
    $dob = trim($_POST['dob']);
    $email = trim($_POST['email']);
    $phone = trim($_POST['phone']);
    $gender = trim($_POST['gender']);
    $occupation = trim($_POST['occupation']);
    $address = trim($_POST['address']);
    $ssc_school = trim($_POST['ssc-school']);
    $ssc = trim($_POST['ssc']);
    $hsc_college = trim($_POST['hsc-college']);
    $hsc = trim($_POST['hsc']);
    $degree = trim($_POST['degree']);
    $degree_percentage = trim($_POST['degree-percentage']);
    $college = trim($_POST['college']);
    $cgpa = trim($_POST['cgpa']);
    $year = trim($_POST['year']);

    // Email and phone validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email format");
    }
    if (!preg_match("/^[0-9]{10}$/", $phone)) {
        die("Invalid phone number");
    }

    // Handle photo upload
    $photo = '';
    if (isset($_FILES['photo']) && $_FILES['photo']['error'] == 0) {
        $upload_dir = 'uploads/';
        if (!is_dir($upload_dir)) {
            mkdir($upload_dir, 0755, true);
        }
        $allowed_types = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!in_array($_FILES['photo']['type'], $allowed_types)) {
            die("Only JPG and PNG files are allowed.");
        }
        $photo_name = uniqid() . '_' . basename($_FILES['photo']['name']);
        $photo = $upload_dir . $photo_name;
        if (!move_uploaded_file($_FILES['photo']['tmp_name'], $photo)) {
            die("Error uploading file.");
        }
    }

    // Insert using prepared statements
    $stmt = $conn->prepare("INSERT INTO applications (name, dob, email, phone, gender, occupation, address, photo, ssc_school, ssc_percentage, hsc_college, hsc_percentage, degree, degree_percentage, college, cgpa, year)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    $stmt->bind_param("sssssssssssssssss", $name, $dob, $email, $phone, $gender, $occupation, $address, $photo, $ssc_school, $ssc, $hsc_college, $hsc, $degree, $degree_percentage, $college, $cgpa, $year);

    if ($stmt->execute()) {
        $_SESSION['success'] = "Record saved successfully!";
        header("Location: student_dashboard.html");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
