document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navbarMenu = document.querySelector('.navbar-menu');
    const navAuth = document.querySelector('.nav-auth');
    
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navbarMenu.classList.toggle('active');
      navAuth.classList.toggle('active');
      
      // Toggle body scroll when menu is open
      document.body.style.overflow = this.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on links
    document.querySelectorAll('.navbar-menu a, .nav-auth a').forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navbarMenu.classList.remove('active');
        navAuth.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
});

