document.addEventListener('DOMContentLoaded', function() {
  const panes = [
    { color: '#F6F1E5', content: '<h1>Personalized health plan for</h1>' },
    { color: '#FFFFFF', content: '<h1>Discover your health score. Improve your daily routine.</h1>' },
    { color: '#F6F1E5', content: '<h1>We take care of the planning. You focus on execution.</h1>' },
    { color: '#FFFFFF', content: '<h1>Who is this for?</h1><p><strong>Busy Parents:</strong> Streamlined routines.</p><p><strong>Productivity Hacker:</strong> Personalized insights.</p><p><strong>Longevity Seekers:</strong> Holistic guide.</p>' },
    { color: '#F6F1E5', content: '<h1><strong>Be bold.</strong> <br>Be brave.<br> Be the person who pushes boundaries.</h1>' }
  ];

  let currentPane = 0;
  let isScrolling = false;
  let scrollTimeout = null;

  function redirectToLink() {
    window.location.href = 'YOUR_LINK_HERE';
  }

  function scrollToPane(index) {
    isScrolling = true;
    const pane = document.getElementById('pane' + index);
    pane.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      isScrolling = false;
    }, 700);
  }

  function handleScroll(event) {
    if (isScrolling || scrollTimeout) return;

    isScrolling = true;

    if (event.deltaY > 0) {
      if (currentPane < panes.length - 1) {
        currentPane++;
      }
    } else {
      if (currentPane > 0) {
        currentPane--;
      }
    }

    scrollToPane(currentPane);

    scrollTimeout = setTimeout(() => {
      isScrolling = false;
      scrollTimeout = null;
    }, 1000);
  }

  function handleKeyDown(event) {
    if (isScrolling) return;

    if (event.key === 'ArrowDown') {
      if (currentPane < panes.length - 1) {
        currentPane++;
        scrollToPane(currentPane);
      }
    } else if (event.key === 'ArrowUp') {
      if (currentPane > 0) {
        currentPane--;
        scrollToPane(currentPane);
      }
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        currentPane = parseInt(entry.target.id.replace('pane', ''));
      }
    });
  }, {
    threshold: 0.5
  });

  document.querySelectorAll('.pane').forEach(pane => {
    observer.observe(pane);
  });

  document.getElementById('tryButton').addEventListener('click', redirectToLink);

  window.addEventListener('wheel', handleScroll);
  window.addEventListener('keydown', handleKeyDown);
});
