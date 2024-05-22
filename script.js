new Vue({
  el: '#app',
  data: {
    panes: [
      // { color: '#F6F1E5', content: '<h1>Personalized health plan for</h1>' },
      { color: '#F6F1E5', content: '<h1 id="header-text" class="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">Personalized health plan for<br><span id="dynamic-text"></span></h1>'},
      // { color: '#FFFFFF', content: '<h1 id="health-score-pane" class="lefties">Discover your health score. <br>Improve your daily routine.</h1><img src="https://raw.githubusercontent.com/shrekondvd2/homepage/main/Health%20Score%20-%20iPhone%2014%20%26%2015%20Pro.png" class="health-score-image" alt="Health Score">' },
      { color: '#FFFFFF', content: '<h1 id="health-score-pane" class="lefties">No guessing required. <br>We calculate your health score.</h1><img src="https://raw.githubusercontent.com/shrekondvd2/homepage/main/health%20score%20side%20by%20side.png" class="health-score-image" alt="Health Score" onclick="window.location.href=\'https://testflight.apple.com/join/i7Ie7qGd\'">' },
      { color: '#FFFFFF', content: '<h1 id="planning_pane" class="lefties">No more planning. <br>We systemize fitness and meals.</h1><img src="https://raw.githubusercontent.com/shrekondvd2/homepage/main/we_take_care_of_planning.png" class="planning_img" alt="Planning">' },
      { color: '#FFFFFF', content: '<h1 id="planning_pane" class="lefties">No need for calendars. <br>Rely on AI powered reminders.</h1><img src="https://raw.githubusercontent.com/shrekondvd2/homepage/main/nexa%20push%20notification.png" class="planning_img" alt="Planning">' },
      { color: '#FFFFFF', content: '<h1 id="planning_pane" class="lefties">Get control. <br>We give back +56hrs/mo.</h1><img src="https://raw.githubusercontent.com/shrekondvd2/homepage/main/relaxing_updated.png" class="planning_img" alt="Planning">' },
      { color: '#F6F1E5', content: '<h1>Who is this for?</h1><p><strong>Busy Parents</strong> <br>Streamlined routines.</p><p><strong>Productivity Hacker</strong> <br>Personalized insights.</p><p><strong>Longevity Seekers</strong> <br>Holistic guide.</p>' },
      { color: '#FFFFFF', content: '<h1 id="be-bold-text"><strong>Be bold.</strong> <br>Be precise.<br>Be proactive.</h1>' }
    ],
    currentPane: 0,
    isScrolling: false,
    scrollTimeout: null,
    touchStartY: 0,
    touchEndY: 0
  },
  methods: {
    redirectToLink() {
      window.location.href = 'https://testflight.apple.com/join/i7Ie7qGd';
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

// Dynamic text effect with typing and deleting
    const texts = ["busy professionals", "overloaded parents", "health-forward individuals", "longevity aspirers"];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    let isDeleting = false;
    let deleteSpeedAdjustment = 0;

    function type() {
      if (count === texts.length) {
        count = 0;
      }
      currentText = texts[count];

      if (isDeleting) {
        // Delete letters
        letter = currentText.slice(0, --index);
      } else {
        // Type letters
        letter = currentText.slice(0, ++index);
      }

      const dynamicTextElement = document.getElementById('dynamic-text');
      dynamicTextElement.innerHTML = `<span class="${getTextHighlightClass(texts[count])}">${letter}</span>`;

      if (!isDeleting && index === currentText.length) {
        // Start deleting after a delay when the word is complete
        setTimeout(() => { isDeleting = true; deleteSpeedAdjustment = 0; }, 1000);
      } else if (isDeleting && index === 0) {
        // Move to the next word after deletion is complete
        isDeleting = false;
        count++;
        index = 0;
      }

      let typingSpeed = 110;
      let deletingSpeed = 110 - Math.min(60, deleteSpeedAdjustment);
      if (isDeleting) { deleteSpeedAdjustment += 10; } // Gradually increase deletion speed
      setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
    }

    function getTextHighlightClass(text) {
      switch (text) {
        case 'busy professionals': return 'highlight-yellow';
        case 'health-forward individuals': return 'highlight-green';
        case 'longevity aspirers': return 'highlight-red';
        case 'overloaded parents': return 'highlight-blue';
        default: return '';
      }
    }

    document.addEventListener('DOMContentLoaded', function () {
      type();
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      }, {
        threshold: 0.1 // Adjust if necessary to control when the transition starts
      });

      const elements = document.querySelectorAll('.block-transition');
      elements.forEach(el => observer.observe(el));
    });
