document.addEventListener("DOMContentLoaded", () => {
  // 1. Fade-in on scroll
  const faders = document.querySelectorAll(".fade-in");
  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));

  // 2. Mobile menu toggle (nav-toggle calls toggleMenu())
  window.toggleMenu = function() {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("active");
    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => nav.classList.remove("active"));
    });
  };

  // 3. Scroll-to-top button
  const scrollBtn = document.getElementById("scrollTopBtn");
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = (document.documentElement.scrollTop > 300) ? "block" : "none";
  });
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 4. Arrow-driven carousels for Skills & Certifications
  function initScrollArrows(containerId, leftBtnId, rightBtnId) {
    const container = document.getElementById(containerId);
    const leftBtn = document.getElementById(leftBtnId);
    const rightBtn = document.getElementById(rightBtnId);
    if (!container || !leftBtn || !rightBtn) return;
    leftBtn.addEventListener("click", () => {
      container.scrollBy({ left: -200, behavior: "smooth" });
    });
    rightBtn.addEventListener("click", () => {
      container.scrollBy({ left: 200, behavior: "smooth" });
    });
  }
  initScrollArrows("skillScroll", "skillLeft", "skillRight");
  initScrollArrows("certScroll", "certLeft", "certRight");

  // 5. Typing + deleting role animation
  (function roleTyping() {
    const roles = ["Data Analyst", "AI ML Enthusiast", "Python Developer"];
    const el = document.querySelector(".animated-role");
    if (!el) return;
    let roleIndex = 0, charIndex = 0, isDeleting = false;

    function typeStep() {
      const current = roles[roleIndex];
      if (!isDeleting) {
        el.textContent = current.slice(0, ++charIndex);
        if (charIndex === current.length) {
          isDeleting = true;
          setTimeout(typeStep, 1500);
          return;
        }
      } else {
        el.textContent = current.slice(0, --charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(typeStep, isDeleting ? 60 : 120);
    }

    typeStep();
  })();

  // 6. Contact form submission
  const form = document.getElementById("contact-form");
  const status = document.getElementById("status");
  if (form && status) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      fetch("https://formsubmit.co/ajax/dragonwarrior2104@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: form.name.value,
          email: form.email.value,
          message: form.message.value
        })
      })
      .then(response => {
        status.textContent = "✅ Your message has been sent!";
        status.style.color = "limegreen";
        form.reset();
      })
      .catch(() => {
        status.textContent = "❌ Something went wrong. Please try again.";
        status.style.color = "red";
      });
    });
  }
});
