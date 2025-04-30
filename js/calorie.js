// Calorie Tracker Functions
function calculateCalories() {
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const activity = document.getElementById('activity').value;
    const goal = document.getElementById('goal').value;
    
    // Base metabolic rate (Harris-Benedict equation)
    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * document.getElementById('weight').value) + 
            (4.799 * document.getElementById('height').value) - 
            (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * document.getElementById('weight').value) + 
            (3.098 * document.getElementById('height').value) - 
            (4.330 * age);
    }
    
    // Activity multiplier
    let activityMultiplier;
    switch(activity) {
      case 'sedentary': activityMultiplier = 1.2; break;
      case 'light': activityMultiplier = 1.375; break;
      case 'moderate': activityMultiplier = 1.55; break;
      case 'active': activityMultiplier = 1.725; break;
      default: activityMultiplier = 1.2;
    }
    
    // Goal adjustment
    let goalAdjustment = 0;
    switch(goal) {
      case 'lose': goalAdjustment = -500; break;
      case 'gain': goalAdjustment = 500; break;
      default: goalAdjustment = 0;
    }
    
    dailyCalories = Math.round(bmr * activityMultiplier + goalAdjustment);
    document.getElementById('daily-calories').textContent = dailyCalories;
    document.getElementById('calories-remaining').textContent = `${dailyCalories - consumedCalories} remaining`;
    
    updateCalorieProgress();
  }
  
  function addFood() {
    const foodName = document.getElementById('food-name').value.trim();
    const foodCalories = parseInt(document.getElementById('food-calories').value);
    
    if (!foodName || isNaN(foodCalories)) {
      alert('Please enter valid food name and calories');
      return;
    }
    
    foodItems.push({ name: foodName, calories: foodCalories });
    consumedCalories += foodCalories;
    
    updateFoodList();
    updateCalorieProgress();
    
    // Clear inputs
    document.getElementById('food-name').value = '';
    document.getElementById('food-calories').value = '';
  }
  
  function updateFoodList() {
    const foodList = document.getElementById('food-list');
    foodList.innerHTML = '';
    
    foodItems.forEach((item, index) => {
      const foodItem = document.createElement('div');
      foodItem.className = 'food-item';
      foodItem.innerHTML = `
        <span>${item.name} - ${item.calories} cal</span>
        <button onclick="removeFood(${index})">×</button>
      `;
      foodList.appendChild(foodItem);
    });
  }
  
  function removeFood(index) {
    consumedCalories -= foodItems[index].calories;
    foodItems.splice(index, 1);
    updateFoodList();
    updateCalorieProgress();
  }
  
  function updateCalorieProgress() {
    const progress = (consumedCalories / dailyCalories) * 100;
    const progressBar = document.getElementById('calorie-progress');
    progressBar.style.width = `${Math.min(progress, 100)}%`;
    
    // Change color based on progress
    if (progress > 100) {
      progressBar.style.backgroundColor = '#ef4444'; // red
    } else if (progress > 80) {
      progressBar.style.backgroundColor = '#f59e0b'; // yellow
    } else {
      progressBar.style.backgroundColor = '#10b981'; // green
    }
    
    document.getElementById('calories-eaten').textContent = `${consumedCalories} eaten`;
    document.getElementById('calories-remaining').textContent = `${Math.max(0, dailyCalories - consumedCalories)} remaining`;
  }
  
  function submitCalories() {
    // Update report values
    document.getElementById('report-goal').textContent = dailyCalories;
    document.getElementById('report-consumed').textContent = consumedCalories;
    document.getElementById('report-remaining').textContent = Math.max(0, dailyCalories - consumedCalories);
    
    // Update recommendations based on calorie status
    const recommendationsList = document.getElementById('calorie-recommendations');
    const percentage = (consumedCalories / dailyCalories) * 100;
    
    if (percentage < 70) {
      recommendationsList.innerHTML = `
        <li>You're under your calorie goal - consider adding healthy snacks</li>
        <li>Focus on nutrient-dense foods to meet your needs</li>
        <li>Examples: nuts, avocados, whole grains, lean proteins</li>
      `;
    } else if (percentage <= 100) {
      recommendationsList.innerHTML = `
        <li>Good job meeting your calorie goals</li>
        <li>Maintain a balance of macronutrients</li>
        <li>Include variety of fruits and vegetables</li>
      `;
    } else {
      recommendationsList.innerHTML = `
        <li>You've exceeded your calorie goal - consider lighter options</li>
        <li>Focus on high-volume, low-calorie foods like vegetables</li>
        <li>Increase physical activity to balance intake</li>
      `;
    }
    
    // Create chart
    createCalorieChart();
    
    // Show modal
    openModal('calorie-report-modal');
  }
  
  function createCalorieChart() {
    const ctx = document.getElementById('calorie-chart').getContext('2d');
    
    // Destroy previous chart if it exists
    if (window.calorieChart) {
      window.calorieChart.destroy();
    }
    
    window.calorieChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Consumed', 'Remaining'],
        datasets: [{
          data: [consumedCalories, Math.max(0, dailyCalories - consumedCalories)],
          backgroundColor: [
            '#10b981',
            '#e5e7eb'
          ],
          borderWidth: 0
        }]
      },
      options: {
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
}
  
// Event listeners for calorie tracker
document.getElementById('age').addEventListener('input', calculateCalories);
document.getElementById('gender').addEventListener('change', calculateCalories);
document.getElementById('activity').addEventListener('change', calculateCalories);
document.getElementById('goal').addEventListener('change', calculateCalories);
document.getElementById('add-food-btn').addEventListener('click', addFood);
document.getElementById('submit-calories').addEventListener('click', submitCalories);