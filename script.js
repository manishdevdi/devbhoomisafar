document.addEventListener("DOMContentLoaded", function () {
  // === Mobile Menu Toggle ===
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("nav__active");
  });

  // === Tours Carousel ===
  const carousel = document.getElementById("tourCarousel");
  const slides = document.querySelectorAll(".tour-slide");
  const dotsContainer = document.getElementById("carouselDots");
  let currentIndex = 0;
  let autoSlideInterval;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      showSlide(index);
      resetAutoSlide();
    });

    dotsContainer.appendChild(dot);
  });

  function showSlide(index) {
    const slideWidth = slides[0].offsetWidth + 20;
    carousel.scrollTo({
      left: index * slideWidth,
      behavior: "smooth"
    });
    currentIndex = index;
    updateDots();
  }

  function updateDots() {
    const dots = document.querySelectorAll("#carouselDots .dot");
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[currentIndex]) dots[currentIndex].classList.add("active");
  }

  carousel.addEventListener("scroll", () => {
    const slideWidth = slides[0].offsetWidth + 20;
    const index = Math.round(carousel.scrollLeft / slideWidth);
    if (index !== currentIndex) {
      currentIndex = index;
      updateDots();
    }
  });

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

  startAutoSlide();

  // === Hero Image Auto Slider ===
  const heroSlides = document.querySelectorAll('.slide');
  const heroDotsContainer = document.getElementById('heroDots');
  let currentHero = 0;

  heroSlides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showHeroSlide(i));
    heroDotsContainer.appendChild(dot);
  });

  function showHeroSlide(i) {
    heroSlides[currentHero].classList.remove('active');
    heroDotsContainer.children[currentHero].classList.remove('active');
    currentHero = i;
    heroSlides[currentHero].classList.add('active');
    heroDotsContainer.children[currentHero].classList.add('active');
  }

  setInterval(() => {
    let next = (currentHero + 1) % heroSlides.length;
    showHeroSlide(next);
  }, 4000);

  function prevHeroSlide() {
    let prev = (currentHero - 1 + heroSlides.length) % heroSlides.length;
    showHeroSlide(prev);
  }

  function nextHeroSlide() {
    let next = (currentHero + 1) % heroSlides.length;
    showHeroSlide(next);
  }

  window.prevHeroSlide = prevHeroSlide;
  window.nextHeroSlide = nextHeroSlide;

  const heroSliderSection = document.querySelector('.hero-slider');
  heroSliderSection.addEventListener('click', () => {
    const next = (currentHero + 1) % heroSlides.length;
    showHeroSlide(next);
  });

  // === Testimonials Carousel ===
  let currentTesti = 0;
  const testiCards = document.querySelectorAll('.testi-card');
  const testiDotsContainer = document.getElementById('testiDots');
  const testiCarousel = document.querySelector(".testi-carousel");
  testiCarousel.addEventListener("click", () => {
  const next = (currentTesti + 1) % testiCards.length;
  showTesti(next);
});

  testiCards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showTesti(i));
    testiDotsContainer.appendChild(dot);
  });

  function showTesti(idx) {
    testiCards[currentTesti].classList.remove('active');
    testiDotsContainer.children[currentTesti].classList.remove('active');
    currentTesti = idx;
    testiCards[currentTesti].classList.add('active');
    testiDotsContainer.children[currentTesti].classList.add('active');
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
          headers: {
            Accept: "application/json"
          }
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

  // === Enable mouse dragging for carousels ===
  function enableDragScroll(container) {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.classList.add('dragging');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.classList.remove('dragging');
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
      container.classList.remove('dragging');
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    });

    let startTouchX = 0;
    let startTouchScroll = 0;

    container.addEventListener('touchstart', (e) => {
      startTouchX = e.touches[0].pageX;
      startTouchScroll = container.scrollLeft;
    });

    container.addEventListener('touchmove', (e) => {
      const touchX = e.touches[0].pageX;
      const walk = (touchX - startTouchX) * 1.5;
      container.scrollLeft = startTouchScroll - walk;
    });
  }

  enableDragScroll(document.getElementById("tourCarousel"));
  enableDragScroll(document.querySelector(".testi-carousel"));
});
