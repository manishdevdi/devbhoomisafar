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

  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => showSlide(index));
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
    const dots = document.querySelectorAll(".carousel-dots .dot");
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[currentIndex]) dots[currentIndex].classList.add("active");
  }

  function slideLeft() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  function slideRight() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  setInterval(() => slideRight(), 4000);

  // === Testimonials Carousel ===
  let currentTesti = 0;
  const testiCards = document.querySelectorAll('.testi-card');
  const testiDotsContainer = document.getElementById('testiDots');

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
});
