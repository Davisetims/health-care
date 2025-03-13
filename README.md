# Health Management System

## 📌 Project Overview
The **Health Management System** is a simple web application built using **PHP** (without a framework) and **MongoDB**, hosted on **Railway**. This system allows users to manage basic health records efficiently.

## 🏗 Project Structure
```
health-care/
│── backend/             # PHP backend code
│   ├── config/          # Database connection and configurations
│   │   ├── db.php       # MongoDB connection setup
│   ├── routes/          # API endpoints
│   ├── models/          # Data models
│   ├── controllers/     # Business logic
│   ├── .env             # Environment variables (ignored in Git)
│── frontend/            # Frontend UI
│   ├── css/             # Stylesheets
│   │   ├── landing.css  # Main CSS file
│   ├── index.php        # Main entry file
│── .gitignore           # Ignore sensitive files like .env
│── README.md            # Project documentation
│── composer.json        # PHP dependencies
```

## 🚀 Setup and Installation

### 1️⃣ **Install PHP and Composer**
Ensure you have PHP and Composer installed:
```sh
php -v    # Check PHP version
composer -V  # Check Composer version
```
If not installed, download them:
- PHP: [https://www.php.net/downloads](https://www.php.net/downloads)
- Composer: [https://getcomposer.org/download/](https://getcomposer.org/download/)

### 2️⃣ **Clone the Repository**
```sh
git clone https://github.com/your-repo/health-care.git
cd health-care/backend
```

### 3️⃣ **Install Dependencies**
```sh
composer install
```

### 4️⃣ **Set Up Environment Variables**
Create a `.env` file inside `backend/` and add:
```
MONGO_URI=mongodb://mongo:your_password@mongodb.railway.internal:27017
MONGO_DB_NAME=health_management
```
**Important:** Add `.env` to `.gitignore` to avoid pushing sensitive data:
```
echo ".env" >> .gitignore
git rm --cached backend/.env
git commit -m "Removed .env from Git tracking"
git push origin main
```

### 5️⃣ **Start PHP Server**
Inside `backend/`, run:
```sh
php -S localhost:8000 -t backend
```
Access API via `http://localhost:8000`

Inside `frontend/`, run:
```sh
php -S localhost:8001 -t frontend
```
Access UI via `http://localhost:8001`

## 🔗 MongoDB Connection
Ensure MongoDB is running on Railway. The `db.php` file should include:
```php
<?php
require __DIR__ . '/../vendor/autoload.php';
use MongoDB\Client;

$mongoUrl = getenv("MONGO_URI");
$dbName = getenv("MONGO_DB_NAME");

try {
    $client = new Client($mongoUrl);
    $database = $client->selectDatabase($dbName);
    echo "✅ Connected to MongoDB!";
} catch (Exception $e) {
    echo "❌ Connection failed: " . $e->getMessage();
}
?>
```

## 🛠 Features
✔ User Registration & Authentication  
✔ Patient Records Management  
✔ Appointment Booking  
✔ Medical History Tracking  
✔ Secure Database with MongoDB

## 🏗 API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/register` | POST | Register a new user |
| `/login` | POST | Authenticate user |
| `/patients` | GET | Get all patient records |
| `/patients/{id}` | GET | Get a specific patient |
| `/appointments` | POST | Book an appointment |

## 📌 Frontend Linking
To link CSS correctly in `index.php`:
```html
<link rel="stylesheet" href="css/landing.css">
```
Ensure that `landing.css` is inside `frontend/css/`.

## 🚀 Deployment on Railway
### 1️⃣ Push to GitHub
```sh
git add .
git commit -m "Initial commit"
git push origin main
```
### 2️⃣ Deploy Backend on Railway
- Go to [Railway](https://railway.app/)
- Create a new project & select **Deploy from GitHub**
- Set up **MongoDB plugin** & copy its connection URL
- Add `.env` variables in Railway's dashboard

### 3️⃣ Deploy Frontend on Railway
- Use Railway's static site hosting
- Deploy `frontend/` as a static website

## 🛠 Technologies Used
- **PHP** (Pure, no framework)
- **MongoDB** (NoSQL Database)
- **Railway.app** (Cloud Hosting)
- **HTML, CSS** (Frontend)

## 📌 Contributors
- **Davis Were** - Lead Developer
- **	Pacific Wanza** - Developers

## 📜 License
Available for public use**.

