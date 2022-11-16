import type { Point } from "./Point";
import { Rectangle } from "./Rectangle";

export class Board {
    matrix: boolean[][];
    readonly EDGE = 15;
    readonly WIDTH: number;
    readonly HEIGHT: number
    constructor(w: number, h: number) {
        this.WIDTH = w;
        this.HEIGHT = h;
        this.matrix = new Array(h)
        .fill(false)
        .map(() => 
          new Array(w).fill(false)
        );
    }
    render(context: CanvasRenderingContext2D) {
        context.clearRect(0, 0, this.EDGE * this.matrix.length, this.EDGE * this.matrix.length);
        context.strokeRect(0, 0, this.EDGE * this.matrix.length, this.EDGE * this.matrix.length);
        const height = this.matrix.length;
        const width = this.matrix[0]?.length;
        if (!height || !width) return;
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                if (this.matrix[i][j]) {
                    const x = this.EDGE * j;
                    const y = this.EDGE * i;
                    const w = this.EDGE;
                    const h = this.EDGE;
                    const rect = new Rectangle(x, y, w, h);
                    context.fill(rect.getPath2D());
                }
            }
        }
    }
    reset() {
        this.matrix = new Array(this.HEIGHT)
        .fill(false)
        .map(() => 
          new Array(this.WIDTH).fill(false)
        );
    }
    mapArr(arr: Array<Point>) {
        arr.forEach((point) => {
            this.matrix[point.y][point.x] = true;
        });
    }
    mapPoint(point: Point) {
        this.matrix[point.y][point.x] = true;
    }
}