import { getMouseCoordinates } from "./mouse_events.js";
const encoder = new TextEncoder();

const show = (pointer, ball) => {
  Deno.stdout.write(
    encoder.encode(
      `\x1b[${Math.round(pointer.y)};${Math.round(pointer.x)}H${ball}`,
    ),
  );
};
const createGameArea = (height, gameAreaLine) => {
  const gameArea = [];
  for (let i = 0; i <= height - 2; i++) {
    gameArea.push([...gameAreaLine]);
  }
  return gameArea;
};

const showScreen = (screen) => {
  console.clear();
  screen.forEach((row, i) => {
    Deno.stdout.write(encoder.encode(`\x1b[${i + 1};${1}H${row.join("")}`));
  });
};

const createScreen = (height, width) => {
  const solidLine = "-".repeat(width).split("");
  const gameAreaLine = (`|${" ".repeat(width - 2)}|`).split("");
  const gameArea = createGameArea(height, gameAreaLine);
  return [solidLine, ...gameArea, solidLine];
};

const putBallOnScreen = (x, y, ball, screen) => {
  screen[y][x] = ball;
};

const getNormalizeVector = (ball, mouse) => {
  const dx = mouse.x - ball.x;
  const dy = mouse.y - ball.y;

  const length = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  return {
    dx: (dx / length),
    dy: (dy / length),
  };
};

const animate = async (ball, nVector, screen) => {
  await new Promise((resolve) => {
    const id = setInterval(() => {
      showScreen(screen);
      ball.x += nVector.dx;
      ball.y += nVector.dy;
      show(ball, "◎");
      console.log(ball);

      if (ball.y < 2) {
        resolve(0);
        clearInterval(id);
      }
    }, 300);
  });
};

const main = async () => {
  const screen = createScreen(25, 25);
  putBallOnScreen(12, 24, "◎", screen);
  putBallOnScreen(12, 1, "◎", screen);

  showScreen(screen, encoder);

  while (true) {
    const ball1 = { x: 12, y: 24 };
    const mouse = await getMouseCoordinates();
    if (mouse) {
      const nVector = getNormalizeVector(ball1, mouse);
      if (mouse.isDone) {
        break;
      }
      await animate(ball1, nVector, screen);
    }
  }
};

main();
