// document.addEventListener('DOMContentLoaded', function () {
//     const checkoutForm = document.getElementById('checkoutForm');
//     const successMessage = document.getElementById('successMessage');
//     const placeOrderBtn = document.getElementById('placeOrderBtn');
//     const backToHomeBtn = document.getElementById('backToHomeBtn');
//     const applyPromoBtn = document.getElementById('applyPromoBtn');

//     // Smooth input pulse effect
//     document.querySelectorAll('input, select').forEach(input => {
//         input.addEventListener('focus', () => input.classList.add('pulse'));
//         input.addEventListener('blur', () => input.classList.remove('pulse'));
//     });

//     // Validation helper functions
//     function validateEmail(email) {
//         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//     }

//     function validatePhone(phone) {
//         return /^\d{10}$/.test(phone.replace(/\D/g, ''));
//     }

//     function validateZipCode(zipCode) {
//         return /^\d{5}(-\d{4})?$/.test(zipCode);
//     }

//     function validateCardNumber(cardNumber) {
//         return /^\d{16}$/.test(cardNumber.replace(/\s/g, ''));
//     }

//     function validateExpiryDate(expiryDate) {
//         // Trim and test format
//         const trimmed = expiryDate.trim();
//         if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(trimmed)) return false;
        
//         // Parse components
//         const [month, shortYear] = trimmed.split('/');
//         const monthInt = parseInt(month, 10);
//         const yearInt = parseInt(shortYear, 10);
        
//         // Calculate full year (handles Y2K correctly)
//         const fullYear = 2000 + (yearInt % 100);
        
//         // Get current date and last day of expiry month
//         const now = new Date();
//         const expiry = new Date(fullYear, monthInt, 0); // Last day of expiry month
        
//         // Compare dates (month is still valid until last day)
//         return expiry >= new Date(now.getFullYear(), now.getMonth(), 1);
//     }

//     function validateCVV(cvv) {
//         return /^\d{3,4}$/.test(cvv);
//     }

//     function showError(elementId, message) {
//         const errorElement = document.getElementById(elementId + 'Error');
//         errorElement.textContent = message;
//         document.getElementById(elementId).classList.add('error-input');
//     }

//     function clearError(elementId) {
//         const errorElement = document.getElementById(elementId + 'Error');
//         errorElement.textContent = '';
//         document.getElementById(elementId).classList.remove('error-input');
//     }

//     placeOrderBtn.addEventListener('click', function (e) {
//         e.preventDefault();
        
//         let isValid = true;

//         const fieldsToValidate = [
//             { id: 'email', validator: validateEmail, message: 'Enter a valid email address' },
//             { id: 'phone', validator: validatePhone, message: 'Enter a valid 10-digit phone number' },
//             { id: 'zipCode', validator: validateZipCode, message: 'Enter a valid ZIP code' },
//             { id: 'cardNumber', validator: validateCardNumber, message: 'Enter a valid 16-digit card number' },
//             { id: 'expiryDate', validator: validateExpiryDate, message: 'Enter a valid expiry date (MM/YY)' },
//             { id: 'cvv', validator: validateCVV, message: 'Enter a valid CVV' },
//         ];

//         fieldsToValidate.forEach(field => {
//             const value = document.getElementById(field.id).value;
//             if (!field.validator(value)) {
//                 showError(field.id, field.message);
//                 isValid = false;
//             } else {
//                 clearError(field.id);
//             }
//         });

//         // Extra required fields manually
//         ['firstName', 'lastName', 'address', 'city', 'state', 'nameOnCard'].forEach(id => {
//             const value = document.getElementById(id).value.trim();
//             if (value === '' || (id === 'state' && value === '')) {
//                 showError(id, 'This field is required');
//                 isValid = false;
//             } else {
//                 clearError(id);
//             }
//         });

//         if (isValid) {
//             placeOrderBtn.innerHTML = 'Processing...';
//             placeOrderBtn.disabled = true;

//             setTimeout(() => {
//                 checkoutForm.parentElement.classList.add('hidden');
//                 successMessage.classList.remove('hidden');
//             }, 2000);
//         }
//     });

//     applyPromoBtn.addEventListener('click', function () {
//         const promoCode = document.getElementById('promoCode').value;
//         const totalPrice = document.querySelector('.total-row div:last-child');

//         if (promoCode === 'WELCOME10') {
//             alert('Promo applied! 10% discount.');
//             totalPrice.textContent = '$63.67';
//         } else {
//             alert('Invalid promo code.');
//         }
//     });

//     backToHomeBtn.addEventListener('click', function () {
//         window.location.href = '/';
//     });
// });





//haider

document.addEventListener("DOMContentLoaded", function () {
    const checkoutForm = document.getElementById("checkoutForm");
    const successMessage = document.getElementById("successMessage");
    const placeOrderBtn = document.getElementById("placeOrderBtn");
    const backToHomeBtn = document.getElementById("backToHomeBtn");
    const applyPromoBtn = document.getElementById("applyPromoBtn");
  
    // Smooth input focus effect
    document.querySelectorAll("input, select").forEach((input) => {
      input.addEventListener("focus", () => input.classList.add("pulse"));
      input.addEventListener("blur", () => input.classList.remove("pulse"));
    });
  
    // Form validation helpers
    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    function validatePhone(phone) {
      return /^\d{10}$/.test(phone.replace(/\D/g, ""));
    }
  
    function validateZipCode(zipCode) {
      return /^\d{5}(-\d{4})?$/.test(zipCode);
    }
  
    function validateCardNumber(cardNumber) {
      return /^\d{16}$/.test(cardNumber.replace(/\s/g, ""));
    }
  
    function validateExpiryDate(expiryDate) {
      const re = /^(0[1-9]|1[0-2])\/\d{2}$/;
      if (!re.test(expiryDate)) return false;
  
      const [month, year] = expiryDate.split("/");
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      return expiry > new Date();
    }
  
    function validateCVV(cvv) {
      return /^\d{3,4}$/.test(cvv);
    }
  
    function showError(elementId, message) {
      const errorElement = document.getElementById(elementId + "Error");
      errorElement.textContent = message;
      document.getElementById(elementId).classList.add("error-input");
    }
  
    function clearError(elementId) {
      const errorElement = document.getElementById(elementId + "Error");
      errorElement.textContent = "";
      document.getElementById(elementId).classList.remove("error-input");
    }
  
    placeOrderBtn.addEventListener("click", function (e) {
      e.preventDefault();
  
      let isValid = true;
  
      // Validate email
      const email = document.getElementById("email").value;
      if (!validateEmail(email)) {
        showError("email", "Enter a valid email address");
        isValid = false;
      } else {
        clearError("email");
      }
  
      // Validate phone
      const phone = document.getElementById("phone").value;
      if (!validatePhone(phone)) {
        showError("phone", "Enter a valid 10-digit phone number");
        isValid = false;
      } else {
        clearError("phone");
      }
  
      // Validate ZIP code
      const zipCode = document.getElementById("zipCode").value;
      if (!validateZipCode(zipCode)) {
        showError("zipCode", "Enter a valid ZIP code");
        isValid = false;
      } else {
        clearError("zipCode");
      }
  
      // Validate card number
      const cardNumber = document.getElementById("cardNumber").value;
      if (!validateCardNumber(cardNumber)) {
        showError("cardNumber", "Enter a valid 16-digit card number");
        isValid = false;
      } else {
        clearError("cardNumber");
      }
  
      // Validate expiry date
      const expiryDate = document.getElementById("expiryDate").value;
      if (!validateExpiryDate(expiryDate)) {
        showError("expiryDate", "Enter a valid expiry date (MM/YY)");
        isValid = false;
      } else {
        clearError("expiryDate");
      }
  
      // Validate CVV
      const cvv = document.getElementById("cvv").value;
      if (!validateCVV(cvv)) {
        showError("cvv", "Enter a valid CVV");
        isValid = false;
      } else {
        clearError("cvv");
      }
  
      if (isValid) {
        // Show a loading animation
        placeOrderBtn.innerHTML = "Processing...";
        placeOrderBtn.disabled = true;
  
        setTimeout(() => {
          checkoutForm.parentElement.classList.add("hidden");
          successMessage.classList.remove("hidden");
        }, 2000);
      }
    });
  
    // Promo code functionality
    applyPromoBtn.addEventListener("click", function () {
      const promoCode = document.getElementById("promoCode").value;
      const subtotalValue =
      parseFloat(
        document.getElementById("subtotalValue").textContent.replace("AED ", "")
      ) || 0;
    
      const delivery = 5;
      const vat = (subtotalValue + delivery) * 0.05;
      let total = subtotalValue + delivery + vat;
  
      if (promoCode === "WELCOME10") {
        total = total * 0.9; // 10% off
        alert('Promo applied! 10% discount.');
      } else if(promoCode === "danabestprofgive100/100pleasethanks"){
        alert("FOR FREEEEEEEE CUZ DR. DANA SAID SO!");
        total=0.0;
      }
      else {
        alert("Invalid promo code.");
      }
  
      document.querySelector(".total-row div:last-child").textContent =
        "AED " + total.toFixed(2);
    });
  
    backToHomeBtn.addEventListener("click", function () {
      window.location.href = "index.html";
    });
  });
  

