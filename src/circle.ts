import Mouse from "./types";

export default class Circle {
  private scale = 1;
  private friction = 0.9;

  constructor(
    private context: CanvasRenderingContext2D,
    private x: number,
    private y: number,
    private dx: number,
    private dy: number,
    private radius: number,
    private color: string,
    private canvasHeight: number,
    private canvasWidth: number,
    private gravity = 0
  ) {}

  update(mouse: Mouse) {
    if (this.x - this.radius < 0) {
      this.dx = -this.dx;
    } else if (this.x + this.radius > this.canvasWidth) {
      this.dx = -this.dx;
    }

    if (this.y - this.radius < 0) {
      this.dy = -this.dy;
    } else if (this.y + this.radius + this.dy > this.canvasHeight) {
      this.dy = -this.dy;
      if (this.gravity > 0) {
        this.dy = this.dy * this.friction;
      }
    } else {
      this.dy += this.gravity;
    }

    this.x += this.dx;
    this.y += this.dy;

    if (Math.abs(this.x - mouse.x) < 100 && Math.abs(this.y - mouse.y) < 100) {
      if (this.scale < 60) {
        this.scale++;
      }
    } else if (this.scale > 0) {
      this.scale--;
    }

    this.createCircle();
  }

  private createCircle() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius + this.scale, 0, Math.PI * 2);
    this.context.closePath();
    this.context.fillStyle = this.color;
    this.context.fill();
  }
}
