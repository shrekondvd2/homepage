new Vue({
  el: '#app',
  data: {
    panes: [
      { color: '#F6F1E5', content: '<h1>Personalized health plan for</h1>' },
      { color: '#FFFFFF', content: '<h1>Discover your health score. Improve your daily routine.</h1>' },
      { color: '#F6F1E5', content: '<h1>We take care of the planning. You focus on execution.</h1>' },
      { color: '#FFFFFF', content: '<h1>Who is this for?</h1><p><strong>Busy Parents:</strong> Streamlined routines.</p><p><strong>Productivity Hacker:</strong> Personalized insights.</p><p><strong>Longevity Seekers:</strong> Holistic guide.</p>' },
      { color: '#F6F1E5', content: '<h1><strong>Be bold.</strong> <br>Be brave.<br> Be the person who pushes boundaries.</h1>' }
    ],
    currentPane: 0,
    isScrolling: false,
    scrollTimeout: null,
    touchStartY: 0,
    touchEndY: 0
  },
  methods: {
    redirectToLink() {
      window.location.href = 'YOUR_LINK_HERE';
    },
    scrollToPane(index) {
      this.isScrolling = true;
      const pane = document.getElementById('pane' + index);
      pane.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        this.isScrolling = false;
      }, 700); // Delay to prevent continuous scrolling
    },
    handleScroll(event) {
      if (this.isScrolling || this.scrollTimeout) return;

      this.isScrolling = true;

      if (event.deltaY > 0) {
        if (this.currentPane < this.panes.length - 1) {
          this.currentPane++;
        }
      } else {
        if (this.currentPane > 0) {
          this.currentPane--;
        }
      }

      this.scrollToPane(this.currentPane);

      this.scrollTimeout = setTimeout(() => {
        this.isScrolling = false;
        this.scrollTimeout = null;
      }, 1000); // 1 second delay to debounce the scroll event
    },
    handleTouchStart(event) {
      this.touchStartY = event.touches[0].clientY;
    },
    handleTouchMove(event) {
      this.touchEndY = event.touches[0].clientY;
    },
    handleTouchEnd() {
      if (this.touchStartY - this.touchEndY > 50) {
        // Swipe up
        if (this.currentPane < this.panes.length - 1) {
          this.currentPane++;
          this.scrollToPane(this.currentPane);
        }
      } else if (this.touchEndY - this.touchStartY > 50) {
        // Swipe down
        if (this.currentPane > 0) {
          this.currentPane--;
          this.scrollToPane(this.currentPane);
        }
      }
    }
  },
  mounted() {
    window.addEventListener('wheel', this.handleScroll);
    window.addEventListener('keydown', (event) => {
      if (this.isScrolling) return;

      if (event.key === 'ArrowDown') {
        if (this.currentPane < this.panes.length - 1) {
          this.currentPane++;
          this.scrollToPane(this.currentPane);
        }
      } else if (event.key === 'ArrowUp') {
        if (this.currentPane > 0) {
          this.currentPane--;
          this.scrollToPane(this.currentPane);
        }
      }
    });

    window.addEventListener('touchstart', this.handleTouchStart);
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleTouchEnd);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.currentPane = parseInt(entry.target.id.replace('pane', ''));
        }
      });
    }, {
      threshold: 0.5
    });

    document.querySelectorAll('.pane').forEach(pane => {
      observer.observe(pane);
    });
  },
  beforeDestroy() {
    window.removeEventListener('wheel', this.handleScroll);
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleTouchEnd);
  }
});
