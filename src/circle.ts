import Mouse from "./types";

export default class Circle {
  private radians = Math.random() * Math.PI * 2;
  private distanceFromCenter = Math.random() * 3;
  private velocity = 0.01;

  constructor(
    private context: CanvasRenderingContext2D,
    private x: number,
    private y: number,
    private radius: number,
    private color: string
  ) {}

  update(mouse: Mouse) {
    this.radians += this.velocity;

    this.x = this.x + Math.cos(this.radians) * this.distanceFromCenter;
    this.y = this.y + Math.sin(this.radians) * this.distanceFromCenter;

    this.createCircle();
  }

  private createCircle() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.closePath();
    this.context.fillStyle = this.color;
    this.context.fill();
  }
}
