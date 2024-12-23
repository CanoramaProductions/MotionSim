const canvas = document.getElementById("playground");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 70;

let shapes = [];
let cursorMode = "add";
let gravity = 10;
let timeMultiplier = 1;

document.getElementById("cursor-mode").addEventListener("change", (e) => {
  cursorMode = e.target.value;
});

document.getElementById("gravity").addEventListener("input", (e) => {
  gravity = parseFloat(e.target.value);
});

document.getElementById("time").addEventListener("input", (e) => {
  timeMultiplier = parseFloat(e.target.value);
});

document.querySelectorAll(".shape-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (cursorMode === "add") {
      addShape(btn.dataset.shape);
    }
  });
});

canvas.addEventListener("mousedown", (e) => {
  if (cursorMode === "move") {
    // Dragging logic
  } else if (cursorMode === "modify") {
    // Resizing/Modify logic
  } else if (cursorMode === "anchor") {
    // Anchor logic
  } else if (cursorMode === "delete") {
    // Deleting logic
  } else if (cursorMode === "joint") {
    // Joint creation logic
  }
});

function addShape(type) {
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  shapes.push({ type, x, y, size: 50, color: "black", isAnchored: false });
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shapes.forEach((shape) => {
    if (!shape.isAnchored) {
      shape.y += gravity * timeMultiplier;
    }
    drawShape(shape);
  });
  requestAnimationFrame(update);
}

function drawShape(shape) {
  ctx.beginPath();
  ctx.strokeStyle = shape.color;
  if (shape.type === "cube") {
    ctx.rect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size);
  } else if (shape.type === "circle") {
    ctx.arc(shape.x, shape.y, shape.size / 2, 0, Math.PI * 2);
  }
  ctx.stroke();
}

update();
