<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HMS Login Page</title>

  

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;700&display=swap" rel="stylesheet">

    <style>
        body {
            font-family: "Noto Sans", sans-serif;
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f8f9fa;
        }

        .container {
            max-width: 900px;
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        }

        .left-section {
            background: linear-gradient(135deg, #007bff, #0056b3);
            color: white;
            padding: 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
        }

        .left-section h2 {
            font-weight: 700;
            margin-bottom: 10px;
        }

        .left-section img {
            width: 100%;
            max-width: 300px;
            margin: 20px auto;
        }

        .right-section {
            padding: 40px;
        }

        .form-control {
            border-radius: 8px;
        }

        .btn-primary {
            width: 100%;
            border-radius: 8px;
            background-color: #007bff;
            border: none;
            padding: 10px;
        }

        .btn-primary:hover {
            background-color: #0056b3;
        }

        .forgot-password {
            float: right;
            font-size: 14px;
        }

        .signup-link {
            text-align: center;
            margin-top: 15px;
        }
    </style>
</head>
<body>


<div class="container row">
    <!-- Left Section (Illustration) -->
    <div class="col-md-6 left-section">
        <h2>Smart Healthcare</h2>
        <p>Seamless access for all</p>
        <img src="./assets/logo.png" alt="Healthcare Illustration">
    </div>

    <!-- Right Section (Login Form) -->
    <div class="col-md-6 right-section">
        <h3 class="text-center">HMS Portal</h3>
        <p class="text-center">Welcome back! Please enter your details.</p>
        
        <form>
            <div class="mb-3">
                <label for="email" class="form-label">Email ID</label>
                <input type="email" id="email" class="form-control" placeholder="Enter your email">
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" id="password" class="form-control" placeholder="Enter your password">
            </div>

            <div class="d-flex justify-content-between">
                <div>
                    <input type="checkbox" id="rememberMe">
                    <label for="rememberMe">Remember Me</label>
                </div>
                <a href="#" class="forgot-password">Forgot Password?</a>
            </div>

            <button type="submit" class="btn btn-primary mt-3">LOGIN</button>

            <p class="signup-link">Don't have an account? <a href="signup.php">Sign Up as Patient</a></p>
        </form>
    </div>
</div>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</body>
</html>
