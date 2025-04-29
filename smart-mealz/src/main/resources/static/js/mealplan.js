// Meal Plan Functions
function generateMealPlan() {
    const dietaryPreference = document.getElementById('dietary-preference').value;
    const mealPlanResult = document.getElementById('meal-plan-result');
    
    // Clear previous content
    mealPlanResult.innerHTML = '';
    
    // Generate meal suggestions based on BMI and calorie needs
    let breakfastItems, lunchItems, dinnerItems;
    
    if (currentBMI < 18.5) {
      // Underweight - higher calorie meals
      breakfastItems = [
        'Whole grain toast with peanut butter and banana',
        'Greek yogurt with granola and honey',
        'Oatmeal with nuts and dried fruit'
      ];
      lunchItems = [
        'Quinoa bowl with chicken, avocado, and olive oil dressing',
        'Whole wheat pasta with meatballs and parmesan cheese',
        'Salmon with sweet potato and sautéed vegetables'
      ];
      dinnerItems = [
        'Steak with mashed potatoes and buttered vegetables',
        'Chicken curry with rice and naan bread',
        'Burger with cheese and side of fries'
      ];
    } else if (currentBMI >= 25) {
      // Overweight - lower calorie meals
      breakfastItems = [
        'Vegetable omelet with whole grain toast',
        'Smoothie with spinach, berries, and protein powder',
        'Avocado and egg on whole grain toast'
      ];
      lunchItems = [
        'Grilled chicken salad with vinaigrette dressing',
        'Turkey and vegetable wrap with side of fruit',
        'Vegetable soup with whole grain crackers'
      ];
      dinnerItems = [
        'Grilled fish with roasted vegetables',
        'Stir-fried tofu with brown rice',
        'Lean beef with steamed broccoli and quinoa'
      ];
    } else {
      // Normal weight - balanced meals
      breakfastItems = [
        'Scrambled eggs with whole grain toast and fruit',
        'Greek yogurt parfait with granola and berries',
        'Whole grain pancakes with maple syrup and nuts'
      ];
      lunchItems = [
        'Grilled chicken sandwich with side salad',
        'Buddha bowl with grains, veggies, and protein',
        'Lentil soup with whole grain bread'
      ];
      dinnerItems = [
        'Baked salmon with roasted potatoes and asparagus',
        'Chicken stir-fry with brown rice',
        'Vegetable lasagna with side salad'
      ];
    }
    
    // Adjust for dietary preferences
    if (dietaryPreference === 'vegetarian') {
      breakfastItems = breakfastItems.map(item => item.replace(/chicken|turkey|beef|salmon|meatballs/g, 'tofu'));
      lunchItems = lunchItems.map(item => item.replace(/chicken|turkey|beef|salmon|meatballs/g, 'tofu'));
      dinnerItems = dinnerItems.map(item => item.replace(/chicken|turkey|beef|salmon|meatballs/g, 'tofu'));
    } else if (dietaryPreference === 'vegan') {
      breakfastItems = breakfastItems.map(item => item.replace(/eggs|yogurt|cheese|meat|fish/g, 'plant-based alternatives'));
      lunchItems = lunchItems.map(item => item.replace(/eggs|yogurt|cheese|meat|fish/g, 'plant-based alternatives'));
      dinnerItems = dinnerItems.map(item => item.replace(/eggs|yogurt|cheese|meat|fish/g, 'plant-based alternatives'));
    } else if (dietaryPreference === 'keto') {
      breakfastItems = [
        'Scrambled eggs with avocado and bacon',
        'Chia pudding with coconut milk and nuts',
        'Cheese omelet with sautéed mushrooms'
      ];
      lunchItems = [
        'Bunless burger with cheese and side salad',
        'Cauliflower rice stir-fry with chicken',
        'Tuna salad lettuce wraps'
      ];
      dinnerItems = [
        'Steak with roasted Brussels sprouts',
        'Baked chicken with zucchini noodles',
        'Salmon with asparagus and hollandaise sauce'
      ];
    } else if (dietaryPreference === 'gluten-free') {
      breakfastItems = breakfastItems.map(item => item.replace(/toast|bread|pancakes|granola|wraps/g, 'gluten-free alternatives'));
      lunchItems = lunchItems.map(item => item.replace(/toast|bread|pancakes|granola|wraps/g, 'gluten-free alternatives'));
      dinnerItems = dinnerItems.map(item => item.replace(/toast|bread|pancakes|granola|wraps/g, 'gluten-free alternatives'));
    }
    
    // Create breakfast section
    const breakfastDiv = document.createElement('div');
    breakfastDiv.className = 'meal-category';
    breakfastDiv.innerHTML = `
      <h3>Breakfast</h3>
      <ul class="meal-list">
        ${breakfastItems.map(item => `<li class="meal-item">${item}</li>`).join('')}
      </ul>
    `;
    mealPlanResult.appendChild(breakfastDiv);
    
    // Create lunch section
    const lunchDiv = document.createElement('div');
    lunchDiv.className = 'meal-category';
    lunchDiv.innerHTML = `
      <h3>Lunch</h3>
      <ul class="meal-list">
        ${lunchItems.map(item => `<li class="meal-item">${item}</li>`).join('')}
      </ul>
    `;
    mealPlanResult.appendChild(lunchDiv);
    
    // Create dinner section
    const dinnerDiv = document.createElement('div');
    dinnerDiv.className = 'meal-category';
    dinnerDiv.innerHTML = `
      <h3>Dinner</h3>
      <ul class="meal-list">
        ${dinnerItems.map(item => `<li class="meal-item">${item}</li>`).join('')}
      </ul>
    `;
    mealPlanResult.appendChild(dinnerDiv);
}
  
// Event listener for meal plan generator
document.getElementById('generate-meal-plan').addEventListener('click', generateMealPlan);
