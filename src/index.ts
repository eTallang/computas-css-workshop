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
  x: 0,
  y: 0,
};

// const colors = ["#D94862", "#344973", "#F2E750", "#D98218", "#F26849"];
const colors = ["#fffce0", "#D94862", "#F26849"];
let circles: Circle[] = [];
const fps = 60;
let lastTimeStamp = 0;
let maxRadius = 2;

function generateCircles(amount: number) {
  for (let i = 0; i < amount; i++) {
    const radius = Math.random() * maxRadius;
    const x = canvasWidth / 2;
    const y = canvasHeight / 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    circles.push(new Circle(context, x, y, radius, color));
  }
}

function render(timestamp?: number) {
  window.requestAnimationFrame(render);

  if (timestamp - lastTimeStamp > 1000 / fps) {
    lastTimeStamp = timestamp;
    context.fillStyle = 'rgba(16, 18, 35, 0.006)';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    // context.clearRect(0, 0, canvasWidth, canvasHeight);
  
    circles.forEach((circle) => circle.update(mouse));
  }
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
  mouse.x = 0;
  mouse.y = 0;
});

// App initiation
setCanvasSize();
generateCircles(400);
render();
