// script.js

const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = 600;

// Physics variables
let gravity = 9.8;
let objects = [];
let isMobile = /Mobi|Android/i.test(navigator.userAgent); // Detect mobile devices

// Update gravity from input
document.getElementById('gravity').addEventListener('input', (e) => {
  gravity = parseFloat(e.target.value);
});

// Add circle
document.getElementById('addCircle').addEventListener('click', () => {
  objects.push(new Circle(Math.random() * canvas.width, 50, 20, 'blue'));
});

// Add rectangle
document.getElementById('addRectangle').addEventListener('click', () => {
  objects.push(new Rectangle(Math.random() * canvas.width, 50, 50, 30, 'red'));
});

// Reset canvas
document.getElementById('reset').addEventListener('click', () => {
  objects = [];
});

// Hide controls on mobile (if needed for a clean UI)
if (isMobile) {
  document.getElementById('controls').style.display = 'none';
}

// Circle class
class Circle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.vy = 0; // Vertical velocity
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.vy += gravity * 0.1; // Gravity effect
    this.y += this.vy;

    // Collision with the floor
    if (this.y + this.radius > canvas.height) {
      this.y = canvas.height - this.radius;
      this.vy *= -0.7; // Bounce back
    }

    this.draw();
  }
}

// Rectangle class
class Rectangle {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.vy = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.vy += gravity * 0.1;
    this.y += this.vy;

    // Collision with the floor
    if (this.y + this.height > canvas.height) {
      this.y = canvas.height - this.height;
      this.vy *= -0.7; // Bounce back
    }

    this.draw();
  }
}

// Touch controls (Mobile)
canvas.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  const x = touch.clientX - canvas.offsetLeft;
  const y = touch.clientY - canvas.offsetTop;

  // Add a random object where the user touches
  if (Math.random() > 0.5) {
    objects.push(new Circle(x, y, 20, 'blue'));
  } else {
    objects.push(new Rectangle(x, y, 50, 30, 'red'));
  }
});

// Mouse controls (Desktop)
canvas.addEventListener('click', (e) => {
  const x = e.clientX - canvas.offsetLeft;
  const y = e.clientY - canvas.offsetTop;

  // Add a random object where the user clicks
  if (Math.random() > 0.5) {
    objects.push(new Circle(x, y, 20, 'green'));
  } else {
    objects.push(new Rectangle(x, y, 50, 30, 'orange'));
  }
});

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  objects.forEach((obj) => obj.update());
  requestAnimationFrame(animate);
}

animate();
