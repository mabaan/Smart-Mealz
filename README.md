<div align="center">
  <a href="https://github.com/mabaan/Smart-Mealz">
    <img src="https://github.com/user-attachments/assets/819a48e9-05a4-431b-b9af-a2a0b9c68144" alt="Logo" width="200">
  </a>
  <h2 align="center">SmartMealz</h2>

  <p align="center">
    A dynamic, BMI-driven meal planning platform that tailors healthy meal recommendations based on your body profile 🥗✨.
    <br><br>
    <a href="https://github.com/mabaan/Smart-Mealz"><strong>🔗 Explore the code »</strong></a>
    <br><br>
    <a href="https://github.com/mabaan/Smart-Mealz/tree/main/Documentation"><strong>📚 View Detailed Documentation »</strong></a>
  </p>
</div>

<!-- SHIELDS -->
<p align="center">
  <a href="https://github.com/mabaan/Smart-Mealz/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/mabaan/Smart-Mealz.svg?style=for-the-badge"></a>
  <a href="https://github.com/mabaan/Smart-Mealz/network/members"><img alt="Forks" src="https://img.shields.io/github/forks/mabaan/Smart-Mealz.svg?style=for-the-badge"></a>
  <a href="https://github.com/mabaan/Smart-Mealz/stargazers"><img alt="Stargazers" src="https://img.shields.io/github/stars/mabaan/Smart-Mealz.svg?style=for-the-badge"></a>
</p>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>📑 Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project 🚀</a></li>
    <li><a href="#built-with">Built With 🛠️</a></li>
    <li><a href="#getting-started">Getting Started 🏁</a></li>
    <li><a href="#running-the-app">Running The App ▶️</a></li>
    <li><a href="#contributing">Contributing 🤝</a></li>
    <li><a href="#license">License 📄</a></li>
    <li><a href="#contact">Contact 📬</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project
<div align="center">
    <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzU3M2JoMGJyOWo1ZTRoenI1czhwZThzM2tsd3BtbXd6bnFzdndpMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UW7dETXIAsCK5m0tkM/giphy.gif" alt="GIF" width="250">
</div>
<br>
<p>SmartMealz is a web-based meal planning application that calculates your BMI and daily caloric needs, then recommends meals categorized into <strong>high-protein 💪</strong>, <strong>balanced 🥙</strong>, <strong>plant-based 🥦</strong>, and <strong>desserts 🍰</strong>. Its responsive UI ensures a seamless experience across devices. The core idea is to make personal nutrition effortless and ingenious, hence the name SmartMealz 🎯.</p>

**Personalized Meal Plans**  🎯<br>
Tailored recommendations based on BMI, goals, and dietary preferences.

**Smart Tracking**  ⌚<br>
Integration with SmartMealz Fit wearable for real-time health metrics.

**Chef-Crafted Recipes**  👨‍🍳<br>
Diverse options to satisfy every taste bud.

**Interactive Tools**  ✨<br>
BMI calculator, calorie tracker, and smooth scroll animations.

## Built With
<ul>
  <li>🧩 Java &mdash; Spring Boot, Thymeleaf</li>
  <li>🌐 HTML5 &amp; CSS3 &mdash; Bootstrap 5 for responsive design</li>
  <li>⚙️ JavaScript &mdash; Dynamic cart and BMI calculations</li>
  <li>🗄️ MySQL &mdash; InnoDB with UTF8-MB4, JDBC for database operations</li>
</ul>

## Getting Started
<p>Follow these instructions to set up SmartMealz locally 🖥️.</p>

### Prerequisites
<ul>
  <li>☕ Java 11+</li>
  <li>🔧 Maven</li>
  <li>🐬 MySQL 8.0+</li>
</ul>

### Installation
<pre><code># Clone the repo
git clone https://github.com/mabaan/Smart-Mealz.git
cd Smart-Mealz
# Configure database in src/main/resources/application.properties
# Create MySQL database and update credentials\ </code></pre>

## Running The App
<div align="center">
    <img src="https://github.com/user-attachments/assets/5c33fe72-1f9a-4b39-8855-69434895826e" width="600"><br><br>
    <img src="https://github.com/user-attachments/assets/7fa7d1bb-ed12-4d24-b5ab-3b7ed8eebdf2" width="600"><br><br>
    <img src="https://github.com/user-attachments/assets/31728a5c-e0d8-46aa-b233-b6fae0d31c6d" width="500"><br><br>
</div>

### Backend (Spring Boot)
<pre><code># Build and run
docker-compose up -d  # optional if using Docker
mvn spring-boot:run\ </code></pre>

### Frontend Integration
<p>The Thymeleaf templates are served directly by Spring Boot on port <code>8080</code>. Access <a href="http://localhost:8080">http://localhost:8080</a> in your browser 🌐.</p>

## Contributing
<p>Contributions are welcome! Please follow these steps 🤗:</p>
<ol>
  <li>Fork the Project 🍴</li>
  <li>Create your Feature Branch (<code>git checkout -b feature/YourFeature</code>)</li>
  <li>Commit your Changes (<code>git commit -m 'Add some feature'</code>)</li>
  <li>Push to the Branch (<code>git push origin feature/YourFeature</code>)</li>
  <li>Open a Pull Request 📬</li>
</ol>

## License
<p>Distributed under the MIT License. See <a href="https://github.com/mabaan/Smart-Mealz/blob/main/LICENSE">LICENSE</a> for more information.</p>

## Contact
👤Mohammed Abaan: <br>
<a href="mailto:abaan7500@gmail.com">
  <img src="https://img.shields.io/badge/Gmail-d5d5d5?style=for-the-badge&logo=gmail&logoColor=0A0209" alt="Email Abaan" />
</a>
<br><br>
👤Ahmed Mehaisi: <br>
<a href="mailto:mehaisiahmed@gmail.com">
  <img src="https://img.shields.io/badge/Gmail-d5d5d5?style=for-the-badge&logo=gmail&logoColor=0A0209" alt="Email Ahmed" />
</a>
<br><br>
👤Mohamed Alawadhi: <br>
<a href="mailto:b00094286@aus.edu">
  <img src="https://img.shields.io/badge/Gmail-d5d5d5?style=for-the-badge&logo=gmail&logoColor=0A0209" alt="Email Mohammed" />
</a>
<br><br>
👤Haider Raza: <br>
<a href="mailto:b00094286@aus.edu">
  <img src="https://img.shields.io/badge/Gmail-d5d5d5?style=for-the-badge&logo=gmail&logoColor=0A0209" alt="Email Haider" />
</a>
<br><br>
Project Link: [https://github.com/mabaan/Smart-Mealz](https://github.com/mabaan/Smart-Mealz)

## Acknowledgments
<ul>
  <li>📖 Bootstrap Documentation</li>
  <li>🔗 Spring Boot Guides</li>
  <li>✍️ Thymeleaf Documentation</li>
</ul>
