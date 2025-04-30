// Global variables
let dailyCalories = 2000;
let consumedCalories = 0;
let foodItems = [];
let currentBMI = 22.0;
let currentCategory = "Normal Weight";

// Show/hide sections
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';
}

// Modal Functions
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Close modals when clicking outside
window.onclick = function(event) {
  if (event.target.className === 'modal') {
    event.target.style.display = 'none';
  }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  // Initialize BMI calculator
  if (document.getElementById('height')) {
    updateHeightValue();
    updateWeightValue();
    calculateBMI();
  }

  // Initialize calorie calculator
  if (document.getElementById('age')) {
    calculateCalories();
  }
});