<?php
include 'apply_job.php';

session_start();
$student_id = $_SESSION['student_id'] ?? 1; // Use session-based student ID
$company_id = $_GET['company_id'] ?? 0;

if ($company_id == 0) {
    echo "Invalid Company ID!";
    exit;
}

$sql = "INSERT INTO applications (student_id, company_id, status) VALUES ('$student_id', '$company_id', 'Applied')";
if ($conn->query($sql)) {
    echo "Application submitted successfully!";
} else {
    echo "Error: " . $conn->error;
}
?>
