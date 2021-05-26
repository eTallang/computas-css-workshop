export default class Circle {
  private scale: number;

  constructor(
    private context: CanvasRenderingContext2D,
    private x: number,
    private y: number,
    private dx: number,
    private dy: number,
    private radius: number,
    private color: string,
    private canvasHeight: number,
    private canvasWidth: number
  ) {}

  draw(mouseX: number, mouseY: number) {
    if (this.x - this.radius < 0) {
      this.dx = -this.dx;
    } else if (this.x + this.radius > this.canvasWidth) {
      this.dx = -this.dx;
    }

    if (this.y - this.radius < 0) {
      this.dy = -this.dy;
    } else if (this.y + this.radius > this.canvasHeight) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    if (Math.abs(this.x - mouseX) < 100 && Math.abs(this.y - mouseY) < 100) {
      this.scale = 4;
    } else {
      this.scale = 1;
    }

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
