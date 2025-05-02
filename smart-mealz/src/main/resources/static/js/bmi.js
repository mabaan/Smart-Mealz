// BMI Calculator Functions
function updateHeightValue() {
    const height = document.getElementById('height').value;
    document.getElementById('height-value').textContent = `${height} cm`;
    calculateBMI();
  }
  
  function updateWeightValue() {
    const weight = document.getElementById('weight').value;
    document.getElementById('weight-value').textContent = `${weight} kg`;
    calculateBMI();
  }
  
  function calculateBMI() {
    const height = document.getElementById('height').value / 100; // convert to meters
    const weight = document.getElementById('weight').value;
    const bmi = (weight / (height * height)).toFixed(1);
    
    currentBMI = parseFloat(bmi);
    document.getElementById('bmi-value').textContent = bmi;
    
    let category = '';
    let status = '';
    let recommendations = [];
    
    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal Weight';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }
    
    currentCategory = category;
    document.getElementById('bmi-category').textContent = category;
    
    // Update meter color based on BMI
    const meter = document.querySelector('.bmi-meter');
    meter.style.borderColor = getBMIColor(bmi);
  }
  
  function getBMIColor(bmi) {
    bmi = parseFloat(bmi);
    if (bmi < 18.5) return '#3b82f6'; // blue for underweight
    if (bmi < 25) return '#10b981';   // green for normal
    if (bmi < 30) return '#f59e0b';   // yellow for overweight
    return '#ef4444';                 // red for obese
  }
  
  function submitBMI() {
    // Update report values
    document.getElementById('report-bmi').textContent = currentBMI;
    document.getElementById('report-category').textContent = currentCategory;
    
    // Set status and recommendations based on BMI
    const statusElement = document.getElementById('report-status');
    const recommendationsList = document.getElementById('bmi-recommendations');
    
    if (currentBMI < 18.5) {
      statusElement.textContent = 'You are below the healthy weight range.';
      recommendationsList.innerHTML = `
        <li>Consider increasing calorie intake with nutrient-dense foods</li>
        <li>Focus on strength training to build muscle mass</li>
        <li>Consult with a healthcare provider if unintentional weight loss</li>
      `;
    } else if (currentBMI >= 18.5 && currentBMI < 25) {
      statusElement.textContent = 'You are within the healthy weight range.';
      recommendationsList.innerHTML = `
        <li>Maintain a balanced diet with variety of foods</li>
        <li>Continue regular physical activity</li>
        <li>Monitor weight periodically to maintain healthy range</li>
      `;
    } else if (currentBMI >= 25 && currentBMI < 30) {
      statusElement.textContent = 'You are above the healthy weight range.';
      recommendationsList.innerHTML = `
        <li>Consider moderate calorie reduction for gradual weight loss</li>
        <li>Increase physical activity to 150+ minutes per week</li>
        <li>Focus on whole foods and reduce processed foods</li>
      `;
    } else {
      statusElement.textContent = 'You are significantly above the healthy weight range.';
      recommendationsList.innerHTML = `
        <li>Consult with a healthcare provider for weight management plan</li>
        <li>Gradual weight loss through diet and exercise changes</li>
        <li>Consider working with a dietitian for personalized guidance</li>
      `;
    }
    
    // Show modal
    openModal('bmi-report-modal');
      // Fill form fields
      document.getElementById('bmi-score').value = currentBMI;
      document.getElementById('bmi-category-hidden').value = currentCategory;
      
    

            // Grab BMI value
            const bmi = document.getElementById('bmi-value').innerText;

            // Grab height and weight
            const height = document.getElementById('height').value;
            const weight = document.getElementById('weight').value;
    
            // Now send to the backend
            fetch('/submit-bmi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    bmi: bmi,
                    height: height,
                    weight: weight
                })
            }).then(response => {
                if (response.ok) {
                    // alert('BMI submitted successfully!');
                } else {
                    alert('Failed to submit BMI.');
                }
            });
}
  
// Event listeners for BMI calculator
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('height').addEventListener('input', updateHeightValue);
  document.getElementById('weight').addEventListener('input', updateWeightValue);
  document.getElementById('submit-bmi').addEventListener('click', submitBMI);
});


