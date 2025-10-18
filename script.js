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

// Particle background animation
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];
const numParticles = 120;
const maxDistance = 130;
const mouseRadius = 200;
const mouse = { x: null, y: null };

window.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

class Particle {
  constructor(x, y, dx, dy, size) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    this.color = Math.random() < 0.9 ? "#ff6f61" : "rgba(200, 200, 200, 0.25)";
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.dy *= -1;
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(150, 150, 150, ${0.25 - distance / (maxDistance * 4)})`;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }

    // Connect to mouse
    const dxMouse = particles[i].x - mouse.x;
    const dyMouse = particles[i].y - mouse.y;
    const mouseDist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
    if (mouse.x && mouseDist < mouseRadius) {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(150, 150, 150, ${0.3 - mouseDist / (mouseRadius * 3)})`;
      ctx.lineWidth = 1;
      ctx.moveTo(particles[i].x, particles[i].y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const dx = (Math.random() - 0.5) * 1.2;
    const dy = (Math.random() - 0.5) * 1.2;
    const size = Math.random() * 2 + 1;
    particles.push(new Particle(x, y, dx, dy, size));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => p.update());
  connectParticles();
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();


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

