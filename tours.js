window.showPage = function (pageNumber) {
  const allPages = document.querySelectorAll(".tours-grid-page");
  const allButtons = document.querySelectorAll(".pagination-btn");
  const prevBtn = document.querySelector(".pagination-btn.prev");
  const nextBtn = document.querySelector(".pagination-btn.next");
  const totalPages = allPages.length;
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

  // Show only the current page
  allPages.forEach((page, index) => {
    page.style.display = (index === pageNumber - 1) ? "block" : "none";
  });

  // Update active state for numbered buttons
  allButtons.forEach((btn) => {
    if (!btn.classList.contains("prev") && !btn.classList.contains("next")) {
      const btnPage = parseInt(btn.textContent);
      btn.classList.toggle("active", btnPage === pageNumber);
    }
  });

  // Handle Prev/Next button disable state
  prevBtn.classList.toggle("disabled", pageNumber === 1);
  nextBtn.classList.toggle("disabled", pageNumber === totalPages);

  // Save current page
  document.querySelector(".pagination-buttons").dataset.currentPage = pageNumber;

  // Scroll to top of page smoothly
  window.scrollTo({ top: 0, behavior: "smooth" });
};

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".pagination-buttons");
  const numberButtons = container.querySelectorAll(".pagination-btn:not(.prev):not(.next)");
  const prevBtn = container.querySelector(".pagination-btn.prev");
  const nextBtn = container.querySelector(".pagination-btn.next");

  const totalPages = document.querySelectorAll(".tours-grid-page").length;

  // Numbered page buttons
  numberButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const pageNumber = parseInt(btn.textContent);
      showPage(pageNumber);
    });
  });

  // Previous button
  prevBtn.addEventListener("click", () => {
    const current = parseInt(container.dataset.currentPage) || 1;
    if (current > 1) {
      showPage(current - 1);
    }
  });

  // Next button (loops back to 1 from last)
  nextBtn.addEventListener("click", () => {
    const current = parseInt(container.dataset.currentPage) || 1;
    if (current < totalPages) {
      showPage(current + 1);
    } else {
      showPage(1); // Loop back to first page
    }
  });

  // Show first page on load
  showPage(1);
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
