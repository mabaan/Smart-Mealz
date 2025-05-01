document.addEventListener('DOMContentLoaded', function () {
  const loginModal = document.getElementById('loginModal');
  const signupModal = document.getElementById('signupModal');
  const sidePanel = document.getElementById('sidePanel');

  const openLoginBtn = document.getElementById('openLogin');
  const openSignupBtn = document.getElementById('openSignup');
  const navButtons = document.querySelector('.nav-buttons');

  // --- Cookie Check ---
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? decodeURIComponent(parts[1].split(';')[0]) : null;
  }

  const userEmail = getCookie('userEmail');

  if (userEmail && navButtons) {
    // Remove login and signup buttons
    openLoginBtn?.remove();
    openSignupBtn?.remove();

    // Add account button
    const accountBtn = document.createElement('button');
    accountBtn.id = 'accountBtn';
    accountBtn.className = 'loginandsign';
    accountBtn.textContent = 'Account';
    navButtons.appendChild(accountBtn);
  }

  // --- Modal Openers ---
  document.getElementById('openLogin')?.addEventListener('click', () => {
    loginModal.style.display = 'block';
  });

  document.getElementById('openSignup')?.addEventListener('click', () => {
    signupModal.style.display = 'block';
  });

  // --- Click outside modal to close ---
  window.addEventListener('click', (e) => {
    if (e.target === loginModal) loginModal.style.display = 'none';
    if (e.target === signupModal) signupModal.style.display = 'none';
  });

  // --- Side panel logic ---
  document.addEventListener('click', (e) => {
    if (e.target.id === 'accountBtn') {
      sidePanel.classList.toggle('open');
    }

    if (e.target.id === 'signOutBtn') {
      window.location.href = '/logout';
      sidePanel.classList.remove('open');
    }

    if (e.target.id === 'deleteAccountBtn') {
      if (confirm("Are you sure you want to delete your account?")) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '/delete-account';
        document.body.appendChild(form);
        form.submit();
      }
    }
    
  });

  // --- Error message handling ---
  const params = new URLSearchParams(window.location.search);
  if (params.has('signupError')) {
    alert("This email is already registered.");
    params.delete('signupError');
  }
  if (params.has('loginError')) {
    alert("Incorrect email or password.");
    params.delete('loginError');
  }
  if (window.history.replaceState) {
    const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.replaceState({}, document.title, newUrl);
  }
});
