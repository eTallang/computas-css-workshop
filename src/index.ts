import "../styles.scss";
import Circle from "./circle";

const container = document.getElementById("root") as HTMLCanvasElement;
const context = container.getContext("2d");

let canvasHeight = window.innerHeight;
let canvasWidth = window.innerWidth;

let mouseX: number;
let mouseY: number;

let circles: Circle[] = [];
let maxRadius = 10;

function generateCircles(amount: number) {
  for (let i = 0; i < amount; i++) {
    const size = Math.random();
    const radius = size * maxRadius;
    const x = Math.random() * (canvasWidth - radius * 2) + radius;
    const y = Math.random() * (canvasHeight - radius * 2) + radius;
    const color = `rgba(255, 99, 71, ${size})`
    const dy = size;
    const dx = size;

    circles.push(new Circle(context, x, y, dx, dy, radius, color, canvasHeight, canvasWidth));
  }
}

function render() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  circles.forEach(circle => circle.draw(mouseX, mouseY));

  window.requestAnimationFrame(render);
}

function setCanvasSize() {
  container.width = canvasWidth;
  container.height = canvasHeight;
}

setCanvasSize();
generateCircles(1000);
render();

window.addEventListener("resize", () => {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  setCanvasSize();
});

window.addEventListener("mousemove", (e: MouseEvent) => {
  mouseX = e.x;
  mouseY = e.y;
});



// function drawLine(event: MouseEvent) {
//   context.beginPath();

//   context.arc(event.x, event.y, 60 + Math.random() * 20, 1, 5, true);
//   context.closePath();
//   context.fillStyle = "tomato";
//   context.fill();
// }

// document.addEventListener("mousedown", drawLine);