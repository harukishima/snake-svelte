import type { Point } from "./Point";
import { getRndInteger } from "./random";

export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

export enum AdvanceState {
    OK,
    COLLISION,
    EAT,
}

export class Snake {
    body: Array<Point>
    direction: Direction;
    readonly BOARDWIDTH: number;
    readonly BOARDHEIGHT: number;
    constructor(boardWidth: number, boardHeight: number) {
        this.direction = getRndInteger(0, 4);
        this.BOARDWIDTH = boardWidth;
        this.BOARDHEIGHT = boardHeight;
        const startingPosition = {
            x: getRndInteger(0, this.BOARDHEIGHT),
            y: getRndInteger(0, this.BOARDWIDTH),
        }
        this.body = [startingPosition];
    }
    advance(food: Point): AdvanceState {
        const head = this.body[this.body.length - 1];
        let newHead: Point;
        switch (this.direction) {
            case Direction.UP:
                newHead = {x: head.x, y: head.y - 1};
                break;
            case Direction.DOWN:
                newHead = {x: head.x, y: head.y + 1};
                break;
            case Direction.LEFT:
                newHead = {x: head.x - 1, y: head.y};
                break;
            case Direction.RIGHT:
                newHead = {x: head.x + 1, y: head.y};
                break;
        }
        if (this.body.some((bodyPart) => bodyPart.x === newHead.x && bodyPart.y === newHead.y)) {
            return AdvanceState.COLLISION;
        }
        if (newHead.x < 0 || newHead.x >= this.BOARDWIDTH || newHead.y < 0 || newHead.y >= this.BOARDHEIGHT) {
            return AdvanceState.COLLISION;
        }
        this.body.push(newHead);
        if (newHead.x === food.x && newHead.y === food.y) {
            return AdvanceState.EAT;
        }
        this.body.shift();
        return AdvanceState.OK;
    }
    generateFood(): Point {
        const food = {
            x: getRndInteger(0, this.BOARDWIDTH),
            y: getRndInteger(0, this.BOARDHEIGHT),
        }
        if (this.body.some((bodyPart) => bodyPart.x === food.x && bodyPart.y === food.y)) {
            return this.generateFood();
        }
        return food;
    }
    changeDirection(direction: Direction) {
        if (this.direction === Direction.UP && direction === Direction.DOWN) return;
        if (this.direction === Direction.DOWN && direction === Direction.UP) return;
        if (this.direction === Direction.LEFT && direction === Direction.RIGHT) return;
        if (this.direction === Direction.RIGHT && direction === Direction.LEFT) return;
        this.direction = direction;
    }
}