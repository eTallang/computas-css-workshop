import Mouse from "./types";

export default class Circle {
  private scale = 1;
  private initialPos: Mouse;
  private initialVelocity: Mouse;
  private radians = Math.random() * Math.PI * 2;
  private velocity = 0.05;

  constructor(
    private context: CanvasRenderingContext2D,
    private x: number,
    private y: number,
    private dx: number,
    private dy: number,
    private radius: number,
    private color: string,
  ) {
    this.initialPos = {
      x: x,
      y: y
    }

    this.initialVelocity = {
      x: dx,
      y: dy
    }
  }

  draw(mouse: Mouse) {
    this.radians += this.velocity;
    if (this.scale < 0.0001) {
      this.x = this.initialPos.x;
      this.y = this.initialPos.y;
      this.dx = this.initialVelocity.x;
      this.dy = this.initialVelocity.y;
    }
  
    this.x += this.dx * Math.cos(this.radians);
    this.y += this.dy * Math.sin(this.radians);

    this.dy = this.dy / 1.05;
    this.dx = this.dx / 1.05;
    this.scale = Math.min(Math.abs(this.dx), 1);

    this.createCircle();
  }

  private createCircle() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius * this.scale, 0, Math.PI * 2);
    this.context.closePath();
    this.context.fillStyle = this.color;
    this.context.fill();
  }
}
