<?php
  // Include necessary PHP files and configurations
  // include_once('config.php');
  
  // Page title
  $pageTitle = "Pharmail - The Future of Health";
  
  // Get doctors from database (sample data for now)
  $doctors = [
    [
      'name' => 'Dr. Gustavo Baptista',
      'specialty' => 'General',
      'rating' => '4.9',
      'reviews' => '175'
    ],
    [
      'name' => 'Dr. Omar Stanton',
      'specialty' => 'Pediatrics',
      'rating' => '4.8',
      'reviews' => '124'
    ],
    [
      'name' => 'Dr. Roger Horwitz',
      'specialty' => 'Heart',
      'rating' => '4.9',
      'reviews' => '193'
    ],
    [
      'name' => 'Dr. Davis Westerevett',
      'specialty' => 'Dermatology',
      'rating' => '4.8',
      'reviews' => '155'
    ]
  ];
  
  // FAQ questions
  $faqQuestions = [
    ['id' => '01', 'question' => 'CANCER', 'expanded' => false],
    ['id' => '02', 'question' => 'PANCREATIC PAIN', 'expanded' => false],
    ['id' => '03', 'question' => 'GERD', 'expanded' => false],
    ['id' => '04', 'question' => 'CORONA VIRUS (COVID-19)', 'expanded' => false],
    ['id' => '05', 'question' => 'STOMACH ACHES', 'expanded' => false],
    ['id' => '06', 'question' => 'VERTIGO', 'expanded' => false]
  ];
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo $pageTitle; ?></title>
  <link rel="stylesheet" href="css/landing.css">

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
  <!-- Header Section -->
  <header class="main-header">
    <nav class="navbar">
      <div class="logo">
      <img src="<?php echo 'assets\logo.jpg'; ?>" alt="Pharmail Logo">

        <span>Pharmail</span>
      </div>
      <div class="nav-links">
        <a href="#" class="active">Home</a>
        <a href="#">Services</a>
        <a href="#">About Us</a>
        <a href="#">Find Doctor</a>
      </div>
      <div class="login-btn">
        <button onclick="location.href='/pages/doctor_registration.html'">Register as Doctor</button>
      </div>

    </nav>
  </header>

  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-content">
      <h1>The future<br>of health</h1>
      <p>Streamlined patient care scheduling for a better healthcare experience and reduced waiting times for doctors and patients alike.</p>
      <div class="app-buttons">
        <a href="#" class="app-btn"><img src="assets/app-store.png" alt="App Store"></a>
        <a href="#" class="app-btn"><img src="assets/google-play.png" alt="Google Play"></a>
      </div>
    </div>

    <div class="appointment-card">
      <h3>Visit type and date</h3>
      <div class="appointment-type">
        <div class="type active">
          <i class="fas fa-user-md"></i>
          <span>Doctor</span>
        </div>
        <div class="type">
          <i class="fas fa-video"></i>
          <span>Video</span>
        </div>
        <div class="type">
          <i class="fas fa-phone"></i>
          <span>Phone</span>
        </div>
        <div class="type">
          <i class="fas fa-heart"></i>
          <span>Heart</span>
        </div>
      </div>
      <div class="appointment-time">
        <div class="time-select">
          <label>Time</label>
          <select>
            <option>10:30 AM</option>
            <option>11:00 AM</option>
            <option>11:30 AM</option>
          </select>
        </div>
        <div class="date-select">
          <label>Date</label>
          <select>
            <option>Monday, Oct 5th</option>
            <option>Tuesday, Oct 6th</option>
            <option>Wednesday, Oct 7th</option>
          </select>
        </div>
      </div>
      <button class="book-btn">Book</button>
    </div>
  </section>

  <!-- Partner Logos -->
  <div class="partner-logos">
    <div class="logo-container">
      <img src="assets/oscar.png" alt="Oscar">
      <img src="assets/allianz.png" alt="Allianz">
      <img src="assets/multicare.png" alt="Multicare">
      <img src="assets/medclinik.png" alt="Medclinic">
      <img src="assets/cigna.png" alt="Cigna">
      <img src="assets/buphealth.png" alt="Bup Health">
    </div>
  </div>

  <!-- Features Section -->
  <section class="features">
    <div class="features-header">
      <div>
        <h2>Our Features</h2>
        <p>We make the future simple and convenient for diagnosing health and implementing them at work.</p>
      </div>
      <div>
        <button class="meet-experts-btn">Meet our experts</button>
      </div>
    </div>

    <div class="features-grid">
      <?php
        $features = [
          [
            'title' => 'Diagnostic Examination',
            'description' => 'Certified medical checkups with professional doctors',
            'icon' => 'assets/diagnostic-icon.jpg'
          ],
          [
            'title' => 'Children\'s Ophthalmology',
            'description' => 'Specialized eye care for children of all ages',
            'icon' => 'assets/ophthalmology-icon.jpg'
          ],
          [
            'title' => 'Consultation',
            'description' => 'In-person or telehealth options to discuss your health concerns',
            'icon' => 'assets/consultation-icon.jpg'
          ]
        ];
        
        foreach($features as $feature) {
          echo '<div class="feature-card">';
          echo '<img src="' . $feature['icon'] . '" alt="' . $feature['title'] . '">';
          echo '<h3>' . $feature['title'] . '</h3>';
          echo '<p>' . $feature['description'] . '</p>';
          echo '</div>';
        }
      ?>
    </div>
  </section>

  <!-- Doctors Section -->
  <section class="doctors">
    <h2>Our dedicated doctors</h2>
    <div class="doctor-tabs">
      <button class="tab-btn active">General</button>
      <button class="tab-btn">Dentist</button>
      <button class="tab-btn">Pediatric</button>
      <button class="tab-btn">Heart</button>
      <button class="tab-btn"><i class="fas fa-search"></i></button>
    </div>

    <div class="doctors-grid">
      <?php foreach($doctors as $doctor) : ?>
      <div class="doctor-card">
        <div class="doctor-img">
          <!-- Image would typically be dynamically loaded from database -->
          <img src="assets/doctor-<?php echo strtolower(explode(' ', $doctor['name'])[1]); ?>.jpg" alt="<?php echo $doctor['name']; ?>">
        </div>
        <h3><?php echo $doctor['name']; ?></h3>
        <div class="doctor-specialty"><?php echo $doctor['specialty']; ?></div>
        <div class="doctor-rating">
          <div class="stars">
            <i class="fas fa-star"></i>
            <span><?php echo $doctor['rating']; ?></span>
          </div>
          <div class="reviews">
            <i class="fas fa-comment"></i>
            <span><?php echo $doctor['reviews']; ?></span>
          </div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- Care Section -->
  <section class="care-section">
    <h2>We care about your condition</h2>
    
    <div class="care-grid">
      <div class="care-discount blue">
        <div class="discount-tags">
          <span class="tag">Cancer</span>
          <span class="tag">Diabetes</span>
          <span class="tag">Allergies</span>
          <span class="tag">Heart</span>
        </div>
        <h3>50%</h3>
        <p>For first time patients who need regular checkups with our doctors</p>
        <button class="discount-btn">Get discount</button>
      </div>
      
      <div class="care-discount teal">
        <h3>25%</h3>
        <p>Discount for all new patients at our dental health clinics</p>
        <button class="discount-btn">Get discount</button>
      </div>
      
      <div class="care-message">
        <h3>#WeCareAboutYou</h3>
        <blockquote>
          "Trust us to the care we are proud to provide. From check-ups to emergency care."
        </blockquote>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="faq-section">
    <h2>Question from our clients</h2>
    <p>A comprehensive disease index for diagnosing health and implementing them at work</p>
    
    <div class="faq-container">
      <?php foreach($faqQuestions as $faq) : ?>
      <div class="faq-item">
        <div class="faq-question">
          <span class="faq-number"><?php echo $faq['id']; ?></span>
          <span class="faq-text"><?php echo $faq['question']; ?></span>
          <span class="faq-toggle">+</span>
        </div>
        <div class="faq-answer" style="display: none;">
          <p>Detailed information about <?php echo strtolower($faq['question']); ?> would be displayed here, including symptoms, treatments, and when to see a doctor.</p>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
    
    <div class="faq-more">
      <button class="find-more-btn">Find out more</button>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="testimonials">
    <h2>What others say about us</h2>
    <p>A comprehensive network of users with proven feedback</p>
    
    <div class="testimonials-grid">
      <?php
        $testimonials = [
          [
            'text' => '"From the time I clicked on the website link to the time a nurse came to the door, the care was exemplary! Amazing care!"',
            'name' => 'Charles Prins',
            'image' => 'assets/testimonial1.jpg'
          ],
          [
            'text' => '"Bill was fantastic! Full cleaner and more competent than other medical services. The registration mixture is incredibly helpful. Highly recommended."',
            'name' => 'Tania Ferrugia',
            'image' => 'assets/testimonial2.jpg'
          ],
          [
            'text' => '"My experience was AMAZING! Nurse came to see us in 1 hour. Told us what to do. I will definitely be using them again!"',
            'name' => 'Sarah Morgan',
            'image' => 'assets/testimonial3.jpg'
          ],
          [
            'text' => '"Just went beyond excellent. Better for me. Very convenient."',
            'name' => 'Jason Lee',
            'image' => 'assets/testimonial4.jpg'
          ]
        ];
        
        foreach($testimonials as $testimonial) {
          echo '<div class="testimonial-card">';
          echo '<p class="testimonial-text">' . $testimonial['text'] . '</p>';
          echo '<div class="testimonial-author">';
          echo '<img src="' . $testimonial['image'] . '" alt="' . $testimonial['name'] . '">';
          echo '<span>' . $testimonial['name'] . '</span>';
          echo '</div>';
          echo '</div>';
        }
      ?>
    </div>
  </section>

  <!-- App Promotion Section -->
  <section class="app-promo">
    <div class="promo-content">
      <h2>Trust us, it will all look much easier</h2>
      <div class="app-buttons">
        <a href="#" class="app-btn"><img src="assets/app-store.png" alt="App Store"></a>
        <a href="#" class="app-btn"><img src="assets/google-play.png" alt="Google Play"></a>
      </div>
    </div>
    <div class="promo-image">
      <img src="assets/app-preview.png" alt="App Preview">
    </div>
  </section>

  <!-- Footer -->
  <footer class="main-footer">
    <div class="footer-content">
      <div class="footer-logo">
        <img src="assets/logo.png" alt="Pharmail Logo">
        <span>Pharmail</span>
        <p>© Pharmail 2023</p>
      </div>
      
      <div class="footer-links">
        <div class="footer-column">
          <h4>CONTACT US</h4>
          <ul>
            <li><a href="#">PRIVACY POLICY</a></li>
            <li><a href="#">TERMS OF USE</a></li>
          </ul>
        </div>
        
        <div class="footer-column">
          <h4>ABOUT US</h4>
          <ul>
            <li><a href="#">FAQS</a></li>
            <li><a href="#">DISCLAIMER</a></li>
            <li><a href="#">BLOG</a></li>
          </ul>
        </div>
        
        <div class="footer-column">
          <h4>FOLLOW US</h4>
          <div class="social-icons">
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
          </div>
          <div class="contact-phone">
            <p>(877) 234-4556</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <script src="../javascript/index.js"></script>

</body>
</html>