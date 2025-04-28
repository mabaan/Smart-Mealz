document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkoutForm');
    const successMessage = document.getElementById('successMessage');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    const backToHomeBtn = document.getElementById('backToHomeBtn');
    const applyPromoBtn = document.getElementById('applyPromoBtn');

    // Smooth input focus effect
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('focus', () => input.classList.add('pulse'));
        input.addEventListener('blur', () => input.classList.remove('pulse'));
    });

    // Form validation helpers
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
        return /^\d{10}$/.test(phone.replace(/\D/g, ''));
    }

    function validateZipCode(zipCode) {
        return /^\d{5}(-\d{4})?$/.test(zipCode);
    }

    function validateCardNumber(cardNumber) {
        return /^\d{16}$/.test(cardNumber.replace(/\s/g, ''));
    }

    function validateExpiryDate(expiryDate) {
        const re = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!re.test(expiryDate)) return false;
        
        const [month, year] = expiryDate.split('/');
        const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
        return expiry > new Date();
    }

    function validateCVV(cvv) {
        return /^\d{3,4}$/.test(cvv);
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId + 'Error');
        errorElement.textContent = message;
        document.getElementById(elementId).classList.add('error-input');
    }

    function clearError(elementId) {
        const errorElement = document.getElementById(elementId + 'Error');
        errorElement.textContent = '';
        document.getElementById(elementId).classList.remove('error-input');
    }

    placeOrderBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        let isValid = true;

        // Validate email
        const email = document.getElementById('email').value;
        if (!validateEmail(email)) {
            showError('email', 'Enter a valid email address');
            isValid = false;
        } else {
            clearError('email');
        }

        // Validate phone
        const phone = document.getElementById('phone').value;
        if (!validatePhone(phone)) {
            showError('phone', 'Enter a valid 10-digit phone number');
            isValid = false;
        } else {
            clearError('phone');
        }

        // Validate ZIP code
        const zipCode = document.getElementById('zipCode').value;
        if (!validateZipCode(zipCode)) {
            showError('zipCode', 'Enter a valid ZIP code');
            isValid = false;
        } else {
            clearError('zipCode');
        }

        // Validate card number
        const cardNumber = document.getElementById('cardNumber').value;
        if (!validateCardNumber(cardNumber)) {
            showError('cardNumber', 'Enter a valid 16-digit card number');
            isValid = false;
        } else {
            clearError('cardNumber');
        }

        // Validate expiry date
        const expiryDate = document.getElementById('expiryDate').value;
        if (!validateExpiryDate(expiryDate)) {
            showError('expiryDate', 'Enter a valid expiry date (MM/YY)');
            isValid = false;
        } else {
            clearError('expiryDate');
        }

        // Validate CVV
        const cvv = document.getElementById('cvv').value;
        if (!validateCVV(cvv)) {
            showError('cvv', 'Enter a valid CVV');
            isValid = false;
        } else {
            clearError('cvv');
        }

        if (isValid) {
            // Show a loading animation
            placeOrderBtn.innerHTML = 'Processing...';
            placeOrderBtn.disabled = true;

            setTimeout(() => {
                checkoutForm.parentElement.classList.add('hidden');
                successMessage.classList.remove('hidden');
            }, 2000);
        }
    });

    // Promo code functionality
    applyPromoBtn.addEventListener('click', function() {
        const promoCode = document.getElementById('promoCode').value;
        const totalPrice = document.querySelector('.total-row div:last-child');

        if (promoCode === 'WELCOME10') {
            alert('Promo applied! 10% discount.');
            totalPrice.textContent = '$63.67';
        } else {
            alert('Invalid promo code.');
        }
    });

    backToHomeBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});
