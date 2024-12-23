const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

let objects = [];
let cursorMode = 'Move';
let gravity = 9.8;
let timeModifier = 1;

// Ground Collision
const groundY = canvas.height - 50;

// Helper function to detect mouse over object
function isMouseOverObject(mouseX, mouseY, obj) {
  if (obj instanceof Circle) {
    return Math.hypot(mouseX - obj.x, mouseY - obj.y) <= obj.radius;
  } else if (obj instanceof Rectangle || obj instanceof Triangle) {
    return (
      mouseX >= obj.x &&
      mouseX <= obj.x + obj.width &&
      mouseY >= obj.y &&
      mouseY <= obj.y + obj.height
    );
  }
  return false;
}

// Base Class for Shapes
class Shape {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.anchored = false;
  }

  recolor(newColor) {
    this.color = newColor;
  }
}

class Circle extends Shape {
  constructor(x, y, radius, color) {
    super(x, y, color);
    this.radius = radius;
    this.vy = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }

  update() {
    if (!this.anchored && this.y + this.radius < groundY) {
      this.vy += gravity * 0.1 * timeModifier;
      this.y += this.vy;
    } else {
      this.vy = 0;
      this.y = groundY - this.radius;
    }
    this.draw();
  }
}

class Rectangle extends Shape {
  constructor(x, y, width, height, color) {
    super(x, y, color);
    this.width = width;
    this.height = height;
    this.vy = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }

  update() {
    if (!this.anchored && this.y + this.height < groundY) {
      this.vy += gravity * 0.1 * timeModifier;
      this.y += this.vy;
    } else {
      this.vy = 0;
      this.y = groundY - this.height;
    }
    this.draw();
  }
}

// Event Listeners
document.getElementById('addCircle').addEventListener('click', () => {
  objects.push(new Circle(100, 100, 50, 'blue'));
});

document.getElementById('addRectangle').addEventListener('click', () => {
  objects.push(new Rectangle(200, 100, 100, 50, 'green'));
});

document.getElementById('reset').addEventListener('click', () => {
  objects = [];
});

document.getElementById('gravity').addEventListener('input', (e) => {
  gravity = parseFloat(e.target.value);
});

document.getElementById('timeModifier').addEventListener('input', (e) => {
  timeModifier = parseFloat(e.target.value);
});

document.getElementById('cursorMode').addEventListener('change', (e) => {
  cursorMode = e.target.value;
});

// Animation Loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#444';
  ctx.fillRect(0, groundY, canvas.width, canvas.height - groundY);
  objects.forEach((obj) => obj.update());
  requestAnimationFrame(animate);
}
animate();
