document.addEventListener('DOMContentLoaded', function () {
  function parseStatValue(text) {
    if (text.includes('K')) {
      return parseFloat(text) * 1000;
    }
    return parseInt(text.replace(/[^0-9]/g, ''));
  }

  function formatNumber(value, hasPlus, originalHasK) {
    if (originalHasK && value >= 1000) {
      const kValue = value / 1000;
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
    const durations = [2000, 2200, 1800];

    stats.forEach((stat, index) => {
      const originalText = stat.textContent;
      const finalValue = parseStatValue(originalText);
      animateValue(stat, 0, finalValue, durations[index]);
    });
  }

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

  // Drawer & Navigation Controls
  document.addEventListener('click', (e) => {
    if (e.target.id === 'userBox') {
      const panel = document.getElementById('sidePanel');
      if (panel) {
        panel.classList.toggle('open');
        document.getElementById('sidePanel').classList.add('open');
      }
    }
  });
// Close the side panel when clicking outside
  document.addEventListener('click', function(event) {
  const sidePanel = document.getElementById('sidePanel');

  // If the side panel is open
  if (sidePanel && sidePanel.classList.contains('open')) {

      // Check if the click was outside the panel
      if (!sidePanel.contains(event.target)) {
          sidePanel.classList.remove('open');
      }
  }
});


  
});
