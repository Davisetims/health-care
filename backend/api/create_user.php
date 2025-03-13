<?php
require __DIR__ . '/../config/db.php';
require '/../models/User.php';

$userModel = new User($db);

$data = [
    "role" => "doctor", // "doctor" or "patient"
    "personal_details" => ["first_name" => "Alice", "last_name" => "Doe"],
    "contact" => ["email" => "alice@example.com", "phone" => "+123456789"],
    "specialization" => "Cardiologist", // Only for doctors
    "shift_time" => ["Monday 8 AM - 4 PM"], // Only for doctors
    "ratings" => 4.7 // Only for doctors
];

$insertedId = $userModel->createUser($data);
echo json_encode(["success" => true, "id" => (string)$insertedId]);
?>
