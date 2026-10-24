// Mobile navigation menu toggle
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "×" : "☰";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    });
  });
}

// Automatic footer copyright year
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Hero portrait running slideshow crossfade
const slides = document.querySelectorAll(".hero-slideshow .slide");
if (slides.length > 1) {
  let currentSlide = 0;
  setInterval(() => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }, 3500); // Transitions to the next portrait every 3.5 seconds
}

// Mobile tap-to-reveal toggle for gallery overlay captions
const galleryItems = document.querySelectorAll(".gallery-item");
galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    galleryItems.forEach((other) => {
      if (other !== item) other.classList.remove("active");
    });
    item.classList.toggle("active");
  });
});