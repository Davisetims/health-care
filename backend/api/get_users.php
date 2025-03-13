<?php
require __DIR__ . '/../vendor/autoload.php'; // Include Composer autoload
require __DIR__ . '/../config/db.php'; // Ensure database connection is loaded 

use MongoDB\Client;

try {
    // Select the collection
    $collection = $db->Users;

    // Fetch all documents from the Users collection
    $users = $collection->find();

    // Check if any documents were found
    if ($users->isDead()) {
        echo "No users found.\n";
    } else {
        // Iterate through the documents and print them
        foreach ($users as $user) {
            echo json_encode($user, JSON_PRETTY_PRINT) . "\n";
        }
    }
} catch (Exception $e) {
    echo "An error occurred: " . $e->getMessage();
}
?>