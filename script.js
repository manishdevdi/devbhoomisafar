document.addEventListener("DOMContentLoaded", function () {
  // === Mobile Menu Toggle ===
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("nav__active");
  });

// === Active Link Highlight on Scroll ===
  const navItems = document.querySelectorAll(".nav__links .nav-link");

  function setActiveLinkOnScroll() {
    let current = "";
    document.querySelectorAll("section[id]").forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  // Highlight instantly on click (helpful on mobile)
  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      navItems.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  window.addEventListener("scroll", setActiveLinkOnScroll);
  setActiveLinkOnScroll();

  // === Tours Carousel ===
  const carousel = document.getElementById("tourCarousel");
  const slides = document.querySelectorAll(".tour-slide");
  let currentIndex = 0;
  let autoSlideInterval;

  function showSlide(index) {
    const slideWidth = slides[0].offsetWidth + 20;
    carousel.scrollTo({
      left: index * slideWidth,
      behavior: "smooth",
    });
    currentIndex = index;
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }, 4000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  carousel.addEventListener("scroll", () => {
    const slideWidth = slides[0].offsetWidth + 20;
    const index = Math.round(carousel.scrollLeft / slideWidth);
    if (index !== currentIndex) {
      currentIndex = index;
    }
  });

  startAutoSlide();

  // === Hero Image Auto Slider ===
  const heroSlides = document.querySelectorAll(".slide");
  const heroDotsContainer = document.getElementById("heroDots");
  let currentHero = 0;

  heroSlides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => showHeroSlide(i));
    heroDotsContainer.appendChild(dot);
  });

  function showHeroSlide(i) {
    heroSlides[currentHero].classList.remove("active");
    heroDotsContainer.children[currentHero].classList.remove("active");
    currentHero = i;
    heroSlides[currentHero].classList.add("active");
    heroDotsContainer.children[currentHero].classList.add("active");

    // Re-trigger DevBhoomi Safar animation
    const heroTitle = document.querySelector(".hero-title");
    heroTitle.classList.remove("slide-in");
    void heroTitle.offsetWidth;
    heroTitle.classList.add("slide-in");

    // Re-trigger typing effect
    const tagline = document.querySelector(".typing-tagline");
    if (tagline) {
      tagline.classList.remove("stop-cursor");
      tagline.style.animation = "none";
      tagline.offsetHeight;
      tagline.style.animation = "";
      setTimeout(() => tagline.classList.add("stop-cursor"), 4000);
    }
  }

  setInterval(() => {
    const next = (currentHero + 1) % heroSlides.length;
    showHeroSlide(next);
  }, 4000);

  const heroSliderSection = document.querySelector(".hero-slider");
  heroSliderSection.addEventListener("click", () => {
    const next = (currentHero + 1) % heroSlides.length;
    showHeroSlide(next);
  });

  // === Testimonials Carousel ===
  let currentTesti = 0;
  const testiCards = document.querySelectorAll(".testi-card");
  const testiDotsContainer = document.getElementById("testiDots");
  const testiCarousel = document.querySelector(".testi-carousel");

  testiCarousel.addEventListener("click", () => {
    const next = (currentTesti + 1) % testiCards.length;
    showTesti(next);
  });

  testiCards.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "dot";
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => showTesti(i));
    testiDotsContainer.appendChild(dot);
  });

  function showTesti(idx) {
    testiCards[currentTesti].classList.remove("active");
    testiDotsContainer.children[currentTesti].classList.remove("active");
    currentTesti = idx;
    testiCards[currentTesti].classList.add("active");
    testiDotsContainer.children[currentTesti].classList.add("active");
  }

  function testiSlide(dir) {
    const next = (currentTesti + dir + testiCards.length) % testiCards.length;
    showTesti(next);
  }

  setInterval(() => testiSlide(1), 6000);

  // === Contact Form AJAX Submission ===
  const contactForm = document.getElementById("contactForm");
  const statusMsg = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = new FormData(contactForm);

      statusMsg.textContent = "Sending...";
      statusMsg.style.color = "#666";
      statusMsg.style.display = "block";

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          statusMsg.textContent = "Thank you! Your message has been sent.";
          statusMsg.style.color = "green";
          contactForm.reset();
        } else {
          statusMsg.textContent = "Oops! Something went wrong. Please try again.";
          statusMsg.style.color = "red";
        }
      } catch (error) {
        statusMsg.textContent = "Network error. Please check your connection.";
        statusMsg.style.color = "red";
      }
    });
  }

  // === Enable Drag Scroll ===
  function enableDragScroll(container) {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener("mousedown", (e) => {
      isDown = true;
      container.classList.add("dragging");
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener("mouseleave", () => {
      isDown = false;
      container.classList.remove("dragging");
    });

    container.addEventListener("mouseup", () => {
      isDown = false;
      container.classList.remove("dragging");
    });

    container.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    });

    container.addEventListener("touchstart", (e) => {
      startX = e.touches[0].pageX;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener("touchmove", (e) => {
      const x = e.touches[0].pageX;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    });
  }

  enableDragScroll(document.getElementById("tourCarousel"));
  enableDragScroll(document.querySelector(".testi-carousel"));
});

// === Scroll Button with SVG Arrow Control ===
const scrollBtn = document.getElementById("scrollToggleBtn");
const arrowPath = document.getElementById("arrow-path"); // SVG <path> inside your button

function updateScrollButton() {
  if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 10) {
    // Bottom → show ↑
    scrollBtn.classList.remove("down");
    scrollBtn.classList.add("up");
    arrowPath.setAttribute("d", "M12 8l6 6H6z"); // Up arrow
  } else {
    // Not bottom → show ↓
    scrollBtn.classList.remove("up");
    scrollBtn.classList.add("down");
    arrowPath.setAttribute("d", "M12 16l-6-6h12z"); // Down arrow
  }
  scrollBtn.classList.add("show");
}

window.addEventListener("scroll", updateScrollButton);
updateScrollButton();

scrollBtn.addEventListener("click", () => {
  if (scrollBtn.classList.contains("down")) {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});
