<?php
require __DIR__ . '/../vendor/autoload.php';  // Include Composer autoload

// MongoDB connection credentials
$mongoDBUri = "mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER>.mongodb.net/?retryWrites=true&w=majority";
$databaseName = "healthcare"; // Change to your database name

try {
    // Create MongoDB client
    $client = new MongoDB\Client($mongoDBUri);
    
    // Select database
    $db = $client->$databaseName;

    echo "✅ Connected successfully to MongoDB!";
} catch (Exception $e) {
    die(" Connection failed: " . $e->getMessage());
}
?>
