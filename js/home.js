document.addEventListener('DOMContentLoaded', function() {
    function parseStatValue(text) {
      // Handle numbers with K (thousands)
      if (text.includes('K')) {
        return parseFloat(text) * 1000;
      }
      // Handle normal numbers
      return parseInt(text.replace(/[^0-9]/g, ''));
    }
  
    function formatNumber(value, hasPlus, originalHasK) {
      // Switch to K format when reaching 1000 if original used K
      if (originalHasK && value >= 1000) {
        const kValue = value / 1000;
        // Show 1 decimal place only for values between 1K-10K for smooth animation
        const formattedK = kValue >= 10 ? Math.floor(kValue) : kValue.toFixed(1);
        return formattedK + 'K' + (hasPlus ? '+' : '');
      }
      return value.toLocaleString() + (hasPlus ? '+' : '');
    }
  
    function animateValue(element, start, end, duration) {
      let startTimestamp = null;
      const hasPlus = element.textContent.includes('+');
      const originalHasK = element.textContent.includes('K');
      
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        element.textContent = formatNumber(value, hasPlus, originalHasK);
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  
    function animateStats() {
      const stats = document.querySelectorAll('.stat h2');
      const durations = [2000, 2200, 1800]; // Different durations for each counter
      
      stats.forEach((stat, index) => {
        const originalText = stat.textContent;
        const finalValue = parseStatValue(originalText);
        animateValue(stat, 0, finalValue, durations[index]);
      });
    }
  
    // Intersection Observer to trigger animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
  
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
      observer.observe(statsSection);
    }
});