const colors = {
  0: (text) => "\x1B[31;1;1m" + text + "\x1B[0m",
  1: (text) => "\x1B[32;1;1m" + text + "\x1B[0m",
  2: (text) => "\x1B[33;1;1m" + text + "\x1B[0m",
  3: (text) => "\x1B[34;1;1m" + text + "\x1B[0m",
  4: (text) => "\x1B[36;1;1m" + text + "\x1B[0m",
};

const createScreen = (width, height) =>
  Array.from(
    { length: height },
    () => Array.from({ length: width }, () => " "),
  );
const sqr = (x) => x * x;

const isAproximate = (radius, distance, delta) => {
  const isGreater = distance < radius + delta;
  const isLesser = distance > radius - delta;
  return isGreater && isLesser;
};

const distanceBetween = (point1, point2) =>
  Math.sqrt(sqr(point1[0] - point2[0]) + sqr(point1[1] - point2[1]));

const displayCircle = (screen) =>
  console.log(screen.map((x) => x.join("")).join("\n"));

const isMultipleCircle = (radius, distance) => {
  let isMultiple = false;
  for (let i = 0; i < radius; i += 1) {
    if (i >= radius / 2) return isMultiple;
    if (isMultiple) {
      return isMultiple;
    }
    isMultiple = isAproximate(radius - i, distance, 0.4);
  }
  return isMultiple;
};

const betweenRandomRange = ([i, j]) => {
  const x = i + Math.round(Math.random() * 1);
  const y = j + Math.round(Math.random() * 1);
  return [x, y];
};

const drawCircle = (screen, XOfCenter, YOfCenter, radius) => {
  for (let i = 0; i < screen.length; i++) {
    for (let j = 0; j < screen[i].length; j++) {
      const distance = distanceBetween([i, j], [XOfCenter, YOfCenter]);
      if (isMultipleCircle(radius, distance)) {
        const color = radius % 5;
        const [x, y] = betweenRandomRange([i, j]);
        const char = colors[color](". ");
        x < 60 && y < 60 && x >= 0 && y >= 0 ? screen[x][y] = char : "";
      }
    }
  }
  return screen;
};

const clearScreen = (screen) => {
  for (const i in screen) {
    for (const j in screen[i]) {
      screen[i][j] = "  ";
    }
  }
  return screen;
};

const circle = (screen) => {
  let radius = 1;
  setInterval(() => {
    console.clear();
    drawCircle(screen, 30, 25, radius % 10);
    // drawCircle(screen, 30, 30, radius);
    drawCircle(screen, 40, 10, radius % 9);
    drawCircle(screen, 40, 40, radius % 8);
    displayCircle(screen);
    clearScreen(screen);

    ++radius;
  }, 100);
};

const main = () => {
  const screen = createScreen(60, 60);
  circle(screen);
};

main();
