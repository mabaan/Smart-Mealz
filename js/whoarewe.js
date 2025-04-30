document.addEventListener('DOMContentLoaded', () => {
    // Elements to animate
    const animatedElements = [
        ...document.querySelectorAll('.stat-card'),
        ...document.querySelectorAll('.team-member'),
        ...document.querySelectorAll('.feature-card')
    ];

    // Intersection Observer
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Initialize animations
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.transitionDelay = `${Math.min(index * 0.1, 0.5)}s`;
        animateOnScroll.observe(element);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Parallax effect (if hero exists)
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            hero.style.backgroundPositionY = `${window.pageYOffset * 0.5}px`;
        });
    }

    // Hover effects (preserve original transitions)
    document.querySelectorAll('.team-member, .feature-card, .stat-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});