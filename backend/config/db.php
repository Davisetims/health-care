<?php
require 'vendor/autoload.php';

use Dotenv\Dotenv;
use MongoDB\Client;

// Load environment variables
$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

// Get MongoDB connection details from .env
$mongoUri = $_ENV['MONGO_URI'];
$databaseName = $_ENV['MONGO_DATABASE'];

try {
    // Connect to MongoDB
    $client = new Client($mongoUri);
    $db = $client->selectDatabase($databaseName);

    echo "✅ Connected successfully to MongoDB!";
} catch (Exception $e) {
    echo "Connection failed: " . $e->getMessage();
}
