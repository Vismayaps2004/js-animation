const snake = [
  { x: 3, y: 1 },
  { x: 2, y: 1 },
  { x: 1, y: 1 },
];

const filled = (width) => "-".repeat(width);

const filledLine = (width) => Array.from(`+${filled(width - 2)}+`);

const hollow = (width) => " ".repeat(width);

const hollowLine = (width) => Array.from(`|${hollow(width - 2)}|`);

const createScreen = (height, width) => {
  const screen = [];
  screen.push(filledLine(width));
  for (let i = 1; i < height - 1; i++) {
    screen.push(hollowLine(width));
  }
  return screen.push(filledLine(width)) && screen;
};

const drawSnake = (screen) => {
  snake.forEach((element) => {
    const { x, y } = { ...element };
    screen[y][x] = "❍";
  });
  const { x, y } = snake[0];
  screen[y][x] = "◉";
};

const clearScreen = (screen) => {
  for (let i = 1; i < screen.length - 1; i++) {
    for (let j = 1; j < screen[i].length - 1; j++) {
      screen[i][j] = " ";
    }
  }
};

const displaySnake = (screen) =>
  console.log(screen.map((line) => line.join("")).join("\n"));

const followHead = () => {
  for (let i = snake.length - 1; i > 0; i--) {
    const { x, y } = { ...snake[i - 1] };
    snake[i].x = x;
    snake[i].y = y;
  }
};

const movingRight = (screen) => {
  // snake[0].x = 
  snake[0].x = snake[0].x !== screen[0].length - 2 ? snake[0].x + 1 : 1;
};

const movingDown = (screen) => {
  snake[0].y = snake[0].y !== screen.length - 2 ? snake[0].y + 1 : 1;
};

const movingLeft = (screen) => {
  snake[0].x = snake[0].x !== 1 ? snake[0].x - 1 : screen[0].length - 2;
};

const movingUp = (screen) => {
  snake[0].y = snake[0].y !== 1 ? snake[0].y - 1 : screen.length - 2;
};

const DIRECTIONS = {
  D: movingRight,
  S: movingDown,
  A: movingLeft,
  W: movingUp,
};

const gameOfSnake = (screen) => {
  setInterval(() => {
    console.clear();
    drawSnake(screen);
    displaySnake(screen);
    followHead();
    const movement = Deno.readTextFileSync("./directions.js");
    console.log({ movement: movement.at(-1) });

    DIRECTIONS[movement.at(-1)](screen);
    clearScreen(screen);
  }, 500);
};

const main = () => {
  const screen = createScreen(35, 60);
  // console.log(screen.map((i) => i.join("")).join("\n"));
  setTimeout(() => {
    gameOfSnake(screen);
  }, 5000);
};

main();
