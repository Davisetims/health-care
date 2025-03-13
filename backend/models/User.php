<?php
require '../config/db.php'; // MongoDB connection

class User {
    private $collection;

    public function __construct($db) {
        $this->collection = $db->users; // 'users' collection
    }

    // Create a new user (Doctor or Patient)
    public function createUser($data) {
        $result = $this->collection->insertOne($data);
        return $result->getInsertedId();
    }

    // Get user by ID
    public function getUserById($id) {
        return $this->collection->findOne(["_id" => new MongoDB\BSON\ObjectId($id)]);
    }

    // Get all users (Doctors and Patients)
    public function getAllUsers() {
        return $this->collection->find()->toArray();
    }

    // Update user by ID
    public function updateUser($id, $updateData) {
        return $this->collection->updateOne(
            ["_id" => new MongoDB\BSON\ObjectId($id)],
            ['$set' => $updateData]
        );
    }

    // Delete user by ID
    public function deleteUser($id) {
        return $this->collection->deleteOne(["_id" => new MongoDB\BSON\ObjectId($id)]);
    }
}
?>
