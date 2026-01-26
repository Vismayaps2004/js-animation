const filled = (width) => "-".repeat(width);

const filledLine = (width) => Array.from(`+${filled(width - 2)}+`);

const hollow = (width) => " ".repeat(width);

const hollowLine = (width) => Array.from(`|${hollow(width - 2)}|`);

export const clearScreen = (screen) => {
  for (let i = 1; i < screen.length - 1; i++) {
    for (let j = 1; j < screen[i].length - 1; j++) {
      screen[i][j] = " ";
    }
  }
};

export const drawSnake = (screen, snake) => {
  snake.forEach((element) => {
    const { x, y } = { ...element };
    screen[y][x] = "❍";
  });
};

export const drawFood = (screen, food) => {
  const { x, y } = food;
  screen[y][x] = "★";
};

export const displayScreen = (screen) =>
  console.log(screen.map((line) => line.join("")).join("\n"));

export const createScreen = (height, width) => {
  const screen = [];
  screen.push(filledLine(width));
  for (let i = 1; i < height - 1; i++) {
    screen.push(hollowLine(width));
  }
  return screen.push(filledLine(width)) && screen;
};
