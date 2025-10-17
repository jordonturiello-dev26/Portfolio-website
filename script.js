// Type writer hero
document.addEventListener("DOMContentLoaded", () => {
  const text = "Hello, I'm Jordon.";
  const speed = 120;
  let i = 0;
  const target = document.getElementById("typewriter-hero");

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

