import "../styles.scss";

const container = document.getElementById("root") as HTMLCanvasElement;
const context = container.getContext("2d");
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

setCanvasSize();
render();

window.addEventListener("resize", () => {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  setCanvasSize();
  render();
});

function render() {
  createCircle(canvasWidth / 2, canvasHeight / 2, 50, "rgba(0,0,125,0.5)")
  createCircle(canvasWidth / 4, canvasHeight / 4, 50, "rgba(0,0,125,0.5)")
  context.clearRect(canvasWidth / 4, canvasHeight/ 4, 50, 50);
};

function createCircle(x: number, y: number, radius: number, color: string) {
    context.beginPath();

    //the arguments inside the arc function is: horizontal center position, vertical center position, radius, start angle, end angle, if it's going to be drawn counterclockwise
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    //end of drawing the circle
    context.closePath();
  
    //color in the circle
    context.fillStyle = color;
    context.fill();
}

function setCanvasSize() {
  container.width = canvasWidth;
  container.height = canvasHeight;
}

// const createCircle = (...children: HTMLElement[]) => {
//   const div = document.createElement("div");
//   div.classList.add("circle");

//   if (children) {
//     children.forEach((child) => div.appendChild(child));
//   }

//   return div;
// };

// const createRotator = (...children: HTMLElement[]) => {
//   const div = document.createElement("div");
//   div.classList.add("rotator");

//   if (children) {
//     children.forEach((child) => div.appendChild(child));
//   }

//   return div;
// };

// const recursivePopulator = (child: HTMLElement, count: number): HTMLElement => {
//   const element = count % 2 === 0 ? createRotator() : createCircle();
//   const c = recursivePopulator(child.appendChild(element), ++count);

//   if (count === 100) {
//     container.appendChild(c);
//     return;
//   }

//   return c;
// }

// recursivePopulator(createCircle(), 0);

// container.appendChild(
//   createRotator(createCircle(createRotator(createCircle(createCircle()))))
// );
