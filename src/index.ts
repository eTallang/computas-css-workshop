import "../styles.scss";
import Circle from "./circle";
import Mouse from "./types";

const container = document.getElementById("root") as HTMLCanvasElement;
const context = container.getContext("2d");
const backgroundColor = "rgba(16, 18, 35, 1)";
container.style.backgroundColor = backgroundColor;

let canvasHeight = window.innerHeight;
let canvasWidth = window.innerWidth;

const mouse: Mouse = {
  x: undefined,
  y: undefined,
};

// const colors = ["#D94862", "#344973", "#F2E750", "#D98218", "#F26849"];
const colors = ["#fffce0", "#D94862", "#F26849"];
let circles: Circle[] = [];
const speedX = 40;
const speedY = 30;
let maxRadius = 20;

function generateCircles(amount: number) {
  for (let i = 0; i < amount; i++) {
    const radius = Math.random() * maxRadius;
    const x = canvasWidth / 2;
    const y = canvasHeight / 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const dx = Math.random() * speedX - (speedX / 2);
    const dy = Math.random() * speedY - (speedY / 2);
    circles.push(new Circle(context, x, y, dx, dy, radius, color));
  }
}

function render() {
  // To add motion blur
  // context.fillStyle = 'rgba(16, 18, 25, 0.5)';
  // context.fillRect(0, 0, canvasWidth, canvasHeight);

  // To clear for each render
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  circles.forEach((circle) => circle.draw(mouse));

  window.requestAnimationFrame(render);
}

function setCanvasSize() {
  container.width = canvasWidth;
  container.height = canvasHeight;
}

window.addEventListener("resize", () => {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  setCanvasSize();
});

window.addEventListener("mousemove", (e: MouseEvent) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener("mouseout", (e: MouseEvent) => {
  mouse.x = undefined;
  mouse.y = undefined;
});

// App initiation
setCanvasSize();
generateCircles(100);
render();
