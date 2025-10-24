let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    recomputeDensity();   
    initParticles();    
  }, 200);
});

// HERO PARTICLE SECTION — lines only near cursor
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const numParticles = window.innerWidth < 768 ? 150 : 300;
  const mouse = { x: null, y: null, radius: 200 };

  // Track mouse movement
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 1.5 + 0.5;
    }

    move() {
      this.x += this.vx;
      this.y += this.vy;

      // wrap around edges for infinite float
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 111, 97, 0.6)";
      ctx.fill();
    }
  }

  function init() {
    particles.length = 0;
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }
  }

  // Only connect particles within mouse radius
  function connectNearMouse() {
    if (!mouse.x || !mouse.y) return;

    for (let a = 0; a < particles.length; a++) {
      const dxA = particles[a].x - mouse.x;
      const dyA = particles[a].y - mouse.y;
      const distA = Math.sqrt(dxA * dxA + dyA * dyA);

      if (distA < mouse.radius) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // only connect if both particles are near mouse
          const dxB = particles[b].x - mouse.x;
          const dyB = particles[b].y - mouse.y;
          const distB = Math.sqrt(dxB * dxB + dyB * dyB);

          if (distB < mouse.radius && distance < 150) {
            const opacity = 1 - distance / 150;
            ctx.strokeStyle = `rgba(255, 111, 97, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let p of particles) {
      p.move();
      p.draw();
    }

    connectNearMouse();
    requestAnimationFrame(animate);
  }

  init();
  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });
});


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


  
// Fade in 
document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in-section");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.2 });

  faders.forEach(fader => observer.observe(fader));
});
