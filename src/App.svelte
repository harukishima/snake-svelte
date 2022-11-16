<script lang="ts">
  import { onDestroy } from "svelte";
  import { Board } from "./Board";
  import type { Point } from "./Point";
  import { AdvanceState, Direction, Snake } from "./Snake";


  let canvas: HTMLCanvasElement | null = null;
  let interval: number;
  let snake: Snake;
  let food: Point;
  let score = 0;
  let boardSize = 30;
  
  onDestroy(() => {
    clearInterval(interval);
  });
  
  const handleNavigation = (event: KeyboardEvent) => {
    if (snake === undefined) return;
    switch (event.key) {
      case "ArrowUp":
        snake.changeDirection(Direction.UP);
        break;
      case "ArrowDown":
        snake.changeDirection(Direction.DOWN);
        break;
      case "ArrowLeft":
        snake.changeDirection(Direction.LEFT);
        break;
      case "ArrowRight":
        snake.changeDirection(Direction.RIGHT);
        break;
    }
  }
  const handleStart = () => {
    if (canvas !== null) {
      score = 0;
      const ctx = canvas.getContext('2d');
      const board = new Board(boardSize, boardSize);
      snake = new Snake(board.WIDTH, board.HEIGHT);
      food = snake.generateFood();
      interval = window.setInterval(() => {
        switch (snake.advance(food)) {
          case AdvanceState.OK:
            break;
          case AdvanceState.COLLISION:
            clearInterval(interval);
            break;
          case AdvanceState.EAT:
            score++;
            food = snake.generateFood();
            break;
        }
        board.mapArr(snake.body);
        board.mapPoint(food);
        board.render(ctx);
        board.reset();
      }, 200);
      
    }
  }

</script>

<div on:keydown={handleNavigation}>
  <canvas bind:this={canvas} width="1024" height="768"></canvas>
  <p>{score}</p>
  <!-- <input type="number" bind:value={boardSize}/> -->
  <button on:click={handleStart}>Start</button>
  <button on:click={() => clearInterval(interval)}>Stop</button>
</div>