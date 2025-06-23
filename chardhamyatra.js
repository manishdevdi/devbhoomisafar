document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  const scrollBtn = document.getElementById("scrollToggleBtn");
  const arrowPath = document.getElementById("arrow-path");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("nav__active");
    });
  }

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
});
