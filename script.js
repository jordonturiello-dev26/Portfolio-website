// Type writer
document.addEventListener("DOMContentLoaded", () => {
    const text = "Hey World, I'm Jordon!";
    const speed = 120;
    let i = 0;
    const target = document.getElementById("typewriter");
  
    target.textContent = "";
  
    function typeWriter() {
      if (i < text.length) {
        target.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
  
    typeWriter();
  });

// Fade in 
document.addEventListener("DOMContentLoaded", () => {
    const faders = document.querySelectorAll(".fade-in-section");
  
    faders.forEach((fader, index) => {
      setTimeout(() => {
        fader.classList.add("is-visible");
      }, index * 300);
    });
  });

  // Carousel
  document.addEventListener("DOMContentLoaded", () => {
    let index = 0;
    const items = document.querySelectorAll(".carousel-item");
  
    function showItem(i) {
      items.forEach(item => item.classList.remove("active"));
      items[i].classList.add("active");
    }
  
    document.querySelector(".next").addEventListener("click", () => {
      index = (index + 1) % items.length;
      showItem(index);
    });
  
    document.querySelector(".prev").addEventListener("click", () => {
      index = (index - 1 + items.length) % items.length;
      showItem(index);
    });
  
    showItem(index);
  });
  
  // Indicators
  const slides = document.querySelectorAll(".carousel-img");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
        dots[i].classList.toggle("active", i === index);
    });
    currentIndex = index;
  }

  document.querySelector(".next").addEventListener("click", () => {
    showSlide((currentIndex + 1) % slides.length);
  });

  document.querySelector(".prev").addEventListener("click", () => {
    showSlide((currentIndex - 1 + slides.length) % slides.length);
});

dots.forEach((dot, i) => {
    dot.addEventListener("click", () => showSlide(i));
});

showSlide(0);