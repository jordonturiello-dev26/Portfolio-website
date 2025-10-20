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


// HERO PARTICLE SECTION
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");

  // Resize canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const numParticles = 220;
  const maxDistance = 180;
  const mouseRadius = 180;
  const connectionSpeed = 0.04;

  const mouse = { x: 0, y: 0, visible: false };

  // Mouse tracking
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.visible = true;
  });

  window.addEventListener("mouseleave", () => (mouse.visible = false));

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = 1.5;
    }

    move() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      if (!mouse.visible) {
        ctx.fillStyle = "rgba(130,130,130,0.3)";
      } else {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const withinMouse = distance < mouseRadius;
        ctx.fillStyle = withinMouse
          ? "rgba(90,90,90,0.9)"
          : "rgba(130,130,130,0.3)";
      }

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Create particles
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }

  // Connect nearby particles
  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const midX = (particles[i].x + particles[j].x) / 2;
          const midY = (particles[i].y + particles[j].y) / 2;
          let alpha = 0.2 - distance / (maxDistance * 1.3);

          if (mouse.visible) {
            const distToMouse = Math.sqrt((midX - mouse.x) ** 2 + (midY - mouse.y) ** 2);
            if (distToMouse < mouseRadius) {
              alpha = 0.9 - distance / maxDistance;
            }
          }

          ctx.strokeStyle = `rgba(120,120,120,${Math.max(alpha, 0)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(238, 239, 241, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let p of particles) {
      p.move();
      p.draw();
    }

    connectParticles();

    if (Math.random() < connectionSpeed) {
      for (let p of particles) {
        p.vx += (Math.random() - 0.5) * 0.05;
        p.vy += (Math.random() - 0.5) * 0.05;
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
});

// CUSTOM CURSOR SECTION

// Get cursor element
const cursor = document.getElementById("custom-cursor");

// Track mouse movement
document.addEventListener("mousemove", (e) => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
  cursor.style.opacity = "1";
});

// Hide cursor when mouse leaves window
document.addEventListener("mouseleave", () => {
  cursor.style.opacity = "0";
});

// Add hover scaling & glow for interactive elements
const interactiveElements = document.querySelectorAll(
  "a, button, svg, img, .project-card"
);

interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(2)";
    cursor.style.backgroundColor = "rgba(255, 111, 97, 0.15)";
    cursor.style.boxShadow = "0 0 12px rgba(255, 111, 97, 0.4)";
  });

  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
    cursor.style.backgroundColor = "transparent";
    cursor.style.boxShadow = "none";
  });
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