import { getMouseCoordinates } from "./mouse_events.js";

const show = (mouse, ball, encoder) => {
  Deno.stdout.write(encoder.encode(`\x1b[${mouse.y};${mouse.x}H${ball}`));
};
const createGameArea = (height,gameAreaLine) => {
  const gameArea = []
  for (let i = 0; i <= height - 2; i++) {
    gameArea.push(gameAreaLine);
  }
  return gameArea
}

const createScreen = (height, width) => {
  const solidLine = "-".repeat(width).split("");
  const gameAreaLine = (`|${" ".repeat(width - 2)}|`).split("");
  const gameArea = createGameArea(height,gameAreaLine)
  return [solidLine,...gameArea,solidLine];
};





const ball = async () => {
  const encoder = new TextEncoder();
  while (true) {
    const mouse = await getMouseCoordinates();
    if (mouse.isDone) {
      break;
    }
    show(mouse, "🟠", encoder);
  }
};

ball();
