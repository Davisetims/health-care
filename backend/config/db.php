<?php
require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . "/../");
$dotenv->load();

// Get MongoDB Credentials from `.env`
$mongoUrl = $_ENV["MONGO_URI"];
$dbName = $_ENV["MONGO_DB_NAME"];

try {
    $client = new MongoDB\Client($mongoUrl);
    $database = $client->selectDatabase($dbName);
    echo "✅ Connected to MongoDB!";
} catch (Exception $e) {
    echo " Connection failed: " . $e->getMessage();
}
?>
