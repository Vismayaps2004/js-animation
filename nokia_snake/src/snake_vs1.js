import { clearScreen, displayScreen, drawFood, drawSnake } from "./screen.js";
import { playerDetails } from "../data/player_data.js";

const snake = [
  { x: 3, y: 1 },
  { x: 2, y: 1 },
  { x: 1, y: 1 },
];

const food = { x: 10, y: 10 };

const updateFood = () => {
  food.x = 1 + Math.floor(Math.random() * 57);
  food.y = 1 + Math.floor(Math.random() * 32);
};

const foodEatenBySnake = ({ x, y }, food) => x === food.x && y === food.y;

const move = (x, y) => {
  snake.unshift({ x, y });
  if (foodEatenBySnake(snake[0], food)) return;
  snake.pop();
  return snake;
};

const moveRight = (screen) => {
  const [head] = snake;
  const x = head.x !== screen[0].length - 2 ? head.x + 1 : 2;
  const y = head.y;
  return move(x, y);
};

const moveDown = (screen) => {
  const y = snake[0].y !== screen.length - 2 ? snake[0].y + 1 : 2;
  const x = snake[0].x;
  return move(x, y);
};

const moveLeft = (screen) => {
  const x = snake[0].x !== 1 ? snake[0].x - 1 : screen[0].length - 2;
  const y = snake[0].y;
  return move(x, y);
};

const moveUp = (screen) => {
  const y = snake[0].y !== 1 ? snake[0].y - 1 : screen.length - 2;
  const x = snake[0].x;
  return move(x, y);
};

const DIRECTIONS = {
  D: moveRight,
  S: moveDown,
  A: moveLeft,
  W: moveUp,
};

const isGameOver = (id, player, name, score) => {
  const { x, y } = snake[0];
  for (let i = 1; i < snake.length; i++) {
    if (x === snake[i].x && y === snake[i].y) {
      clearInterval(id);
      console.log("Game Over");
      playerDetails(player, name, score);
      Deno.exit();
    }
  }
};

const getDirection = async (tty) => {
  const t = await Deno.open(tty, { read: true });
  t.setRaw(true, { cbreak: true });
  const buffer = new Uint8Array(1);
  await t.read(buffer);
  const movement1 = new TextDecoder().decode(buffer);
  MOVEMENT = movement1.toUpperCase();
};

let MOVEMENT = "D";
export const snakeGame = (tty, screen, player, name) => {
  let score = 0;
  const id = setInterval(() => {
    console.clear();
    drawSnake(screen, snake);
    drawFood(screen, food);
    displayScreen(screen);
    console.log(`Your score is : ${score}`);
    DIRECTIONS[MOVEMENT](screen);
    isGameOver(id, player, name, score);
    if (foodEatenBySnake(snake[0], food)) {
      updateFood();
      score += 5;
    }
    clearScreen(screen);
    getDirection(tty);
  }, 300);
};
