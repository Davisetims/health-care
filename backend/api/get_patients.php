<?php
require __DIR__ . '/../vendor/autoload.php'; // Include Composer autoload
require __DIR__ . '/../config/db.php'; // Ensure database connection is loaded 

use MongoDB\Client;

try {
    // Select the patients collection
    $collection = $db->patients;

    // Query all documents
    $patients = $collection->find();

    // Convert results to an array
    $patientList = iterator_to_array($patients);

    // Output as JSON
    header('Content-Type: application/json');
    echo json_encode($patientList, JSON_PRETTY_PRINT);
} catch (Exception $e) {
    echo "❌ Error fetching patients: " . $e->getMessage();
}
?>
