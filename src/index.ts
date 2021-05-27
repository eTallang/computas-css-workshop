import "../styles.scss";
import Circle from "./circle";
import Mouse from './types';

const container = document.getElementById("root") as HTMLCanvasElement;
const context = container.getContext("2d");
const backgroundColor = 'rgba(16, 18, 25, 1)';
container.style.backgroundColor = backgroundColor;

let canvasHeight = window.innerHeight;
let canvasWidth = window.innerWidth;
let lastTimeStamp = 0;
const fps = 60;

const mouse: Mouse = {
  x: undefined,
  y: undefined
}

// const colors = ["#D94862", "#344973", "#F2E750", "#D98218", "#F26849"];
const colors = ["#fffce0", '#D94862',"#F26849"];
let circles: Circle[] = [];
const speedX = 2;
const speedY = 1.5;
let maxRadius = 5;

function generateCircles(amount: number) {
  for (let i = 0; i < amount; i++) {
    const size = Math.random();
    const radius = size * maxRadius;
    const x = Math.random() * (canvasWidth - radius * 2) + radius;
    const y = Math.random() * (canvasHeight - radius * 2) + radius;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const dx = Math.random() * size * speedX * (3 - 6 * Math.round(Math.random()));
    const dy = Math.random() * size * speedY * (3 - 6 * Math.round(Math.random()));
    circles.push(
      new Circle(
        context,
        x,
        y,
        dx,
        dy,
        radius,
        color,
        canvasHeight,
        canvasWidth,
        0
      )
    );
  }
}

function render(timestamp?: number) {
  window.requestAnimationFrame(render);

  if (timestamp - lastTimeStamp > 1000 / fps) {
    lastTimeStamp = timestamp;
    context.clearRect(0, 0, canvasWidth, canvasHeight);
  
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
  mouse.x = undefined;
  mouse.y = undefined;
});

// App initiation
setCanvasSize();
generateCircles(400);
render();