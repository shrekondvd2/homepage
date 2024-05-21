import gsap from "https://cdn.skypack.dev/gsap@3.12.0";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap@3.12.0/ScrollTrigger";

if (!CSS.supports("animation-timeline: view()")) {
  gsap.registerPlugin(ScrollTrigger);
  // Set up all the scroll animations with ScrollTrigger instead.
  // Blanket styles
  gsap.set(".fixed", {
    position: "fixed",
    inset: 0
  });
  gsap.set(".static", {
    position: "absolute",
    inset: 0,
    zIndex: 6
  });
  // First section
  gsap.set("section:first-of-type .fixed", {
    transformOrigin: "50% 0%"
  });
  gsap.to("section:first-of-type .fixed", {
    scale: "0.35 0.5",
    yPercent: -10,
    scrollTrigger: {
      scrub: 0.5,
      trigger: "section:first-of-type",
      start: "top top",
      end: "bottom 50%"
    }
  });
  gsap.to("section:first-of-type .fixed", {
    opacity: 0,
    scrollTrigger: {
      scrub: 0.5,
      trigger: "section:first-of-type",
      start: "top top",
      end: "bottom 75%"
    }
  });
  // The second section with image scaling down, etc.
  gsap.set("section:nth-of-type(2) article:first-of-type .fixed", {
    clipPath: "ellipse(220% 200% at 50% 300%)",
    zIndex: 3
  });
  gsap.to("section:nth-of-type(2) article:first-of-type .fixed", {
    clipPath: "ellipse(220% 200% at 50% 175%)",
    scrollTrigger: {
      scrub: 0.5,
      trigger: "section:nth-of-type(2) article:first-of-type",
      start: "top bottom",
      end: "top top"
    }
  });
  gsap.from("section:nth-of-type(2) article:first-of-type img", {
    scale: 5,
    scrollTrigger: {
      scrub: 0.5,
      trigger: "section:nth-of-type(2) article:first-of-type",
      start: "top bottom",
      end: "top top"
    }
  });

  gsap.set(".loud-wrap", {
    clipPath: "inset(0 0 0 0)",
    mask: "linear-gradient(white 50%, transparent) 0 100% / 100% 200% no-repeat"
  });
  gsap.set(".text-wrap", {
    position: "sticky",
    bottom: "4rem",
    transformOrigin: "50% 0"
  });
  gsap.from("section:nth-of-type(2) article:first-of-type h2", {
    yPercent: 100,
    scrollTrigger: {
      scrub: 0.5,
      trigger: "section:nth-of-type(2) article:first-of-type",
      start: "top 50%",
      end: "top 0%"
    }
  });
  gsap.to("section:nth-of-type(2) article:first-of-type .loud-wrap", {
    maskPosition: "0 0",
    scrollTrigger: {
      scrub: 0.5,
      trigger: "section:nth-of-type(2) article:first-of-type",
      start: "top 50%",
      end: "top 0%"
    }
  });
  // Blur the text on exit
  gsap.to("section:nth-of-type(2) article:first-of-type .text-wrap", {
    filter: "blur(4rem)",
    opacity: 0,
    scrollTrigger: {
      scrub: 0.5,
      trigger: "section:nth-of-type(2) article:first-of-type",
      start: "bottom 60%",
      end: "bottom 25%"
    }
  });

  // Third section
  gsap.set("section:nth-of-type(2) article:nth-of-type(2) .fixed", {
    zIndex: 3
  });
  gsap.from("section:nth-of-type(2) article:nth-of-type(2) .fixed", {
    opacity: 0,
    scrollTrigger: {
      scrub: 0.5,
      trigger: "section:nth-of-type(2) article:nth-of-type(2)",
      start: "top 50%",
      end: "top -30%"
    }
  });
  gsap.from("section:nth-of-type(2) article:nth-of-type(2) h2", {
    yPercent: 100,
    opacity: 0,
    scrollTrigger: {
      scrub: 0.5,
      trigger: "section:nth-of-type(2) article:nth-of-type(2)",
      start: "top 50%",
      end: "top 25%"
    }
  });
  gsap.to("section:nth-of-type(2) article:nth-of-type(2) h2", {
    filter: "blur(4rem)",
    color: "transparent",
    scrollTrigger: {
      scrub: 0.5,
      trigger: "section:nth-of-type(2) article:nth-of-type(2)",
      start: "bottom bottom",
      end: "bottom 50%"
    }
  });
  // Fourth
  gsap.set(".filler", {
    display: "block",
    position: "absolute",
    bottom: "30vh",
    padding: "1rem"
  });
  gsap.set("section:nth-of-type(2) article:nth-of-type(3)", {
    height: "400vh"
  });
  gsap.set("section:nth-of-type(2) article:nth-of-type(3) .fixed", {
    zIndex: 3
  });
  gsap.set("section:nth-of-type(2) article:nth-of-type(3) h2", {
    marginTop: "80vh"
  });
  gsap.from("section:nth-of-type(2) article:nth-of-type(3) .fixed", {
    opacity: 0,
    scrollTrigger: {
      trigger: "section:nth-of-type(2) article:nth-of-type(3)",
      scrub: 0.5,
      start: "top 80%",
      end: "top top"
    }
  });
  gsap.to("section:nth-of-type(2) article:nth-of-type(3) img", {
    opacity: 0,
    scrollTrigger: {
      trigger: "section:nth-of-type(2) article:nth-of-type(3)",
      scrub: 0.5,
      start: "bottom bottom",
      end: "bottom 85%"
    }
  });
  // Animate the text blocks
  const LINES = document.querySelectorAll(".text-blocks p");
  LINES.forEach((LINE, index) => {
    gsap.from(LINE, {
      yPercent: 100,
      opacity: 0,
      scrollTrigger: {
        trigger: "section:nth-of-type(2) article:nth-of-type(3)",
        scrub: 0.5,
        start: `top -=${90 + index * 10}%`,
        end: `top -=${100 + index * 10}%`
      }
    });
  });
  gsap.to(".text-blocks", {
    opacity: 0,
    scrollTrigger: {
      trigger: "section:nth-of-type(2) article:nth-of-type(3)",
      scrub: 0.5,
      start: "bottom 130%",
      end: "bottom 110%"
    }
  });
  gsap.to(".filler h2", {
    opacity: 0,
    filter: "blur(4rem)",
    scrollTrigger: {
      trigger: "section:nth-of-type(2) article:nth-of-type(3)",
      scrub: 0.5,
      start: "bottom 55%",
      end: "bottom 30%"
    }
  });
  // The last piece is unclipping the end piece
  gsap.set("section:nth-of-type(2) article:last-of-type .fixed", {
    clipPath: "ellipse(220% 200% at 50% 300%)",
    zIndex: 5
  });
  gsap.to("section:nth-of-type(2) article:last-of-type .fixed", {
    clipPath: "ellipse(220% 200% at 50% 175%)",
    scrollTrigger: {
      trigger: "section:nth-of-type(2) article:last-of-type",
      scrub: 0.5,
      start: "top 80%",
      end: "top 20%"
    }
  });

  // Scroll indicator trickery
  const INDICATORS = document.querySelectorAll(".indicator");
  const ARTICLES = document.querySelectorAll("article");
  INDICATORS.forEach((indicator, index) => {
    // Here need to animate the indicator based on the position of the card
    gsap.to(indicator, {
      flex: 3,
      repeat: 1,
      yoyo: true,
      scrollTrigger: {
        scrub: true,
        trigger: ARTICLES[index],
        scroller: "body",
        start: "top bottom",
        end: "bottom top"
      }
    });
  });
}








// Dynamic text effect with typing and deleting
    const texts = ["busy professionals", "overloaded parents", "health-forward individuals", "longevity aspirers",];
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

        let typingSpeed = 150;
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

    // type(); // Initial call to start the typing effect
// });
    
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
