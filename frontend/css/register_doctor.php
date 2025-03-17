<?php
require __DIR__ . '/../vendor/autoload.php'; // Include Composer autoload
require __DIR__ . '/../config/db.php'; // Ensure database connection is loaded 

use MongoDB\Client;

$collection = $db->doctors;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'] ?? '';
    $age = $_POST['age'] ?? '';
    $specialization = $_POST['specialization'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $shift_time = $_POST['shift_time'] ?? [];

    // Prepare doctor data
    $doctorData = [
        "personal_details" => ["name" => $name, "age" => (int)$age],
        "specialization" => $specialization,
        "contact" => ["phone" => $phone, "email" => $email],
        "shift_time" => $shift_time,
        "role" => "doctor",
        "password" => $password
    ];

    // Insert into MongoDB
    $insertResult = $collection->insertOne($doctorData);

    if ($insertResult->getInsertedCount() > 0) {
        echo "<script>alert('Registration successful!'); window.location.href='../frontend/login.php';</script>";
    } else {
        echo "<script>alert('Registration failed! Please try again.'); window.history.back();</script>";
    }
}
?>
