export class Rectangle {
    x: number;
    y: number;
    w: number;
    h: number;
    constructor(x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    getPath2D(): Path2D {
        const rectangle = new Path2D();
        rectangle.rect(this.x, this.y, this.w, this.h);
        return rectangle;
    }
}