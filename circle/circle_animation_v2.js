const createScreen = (width, height) =>
  Array.from(
    { length: height },
    () => Array.from({ length: width }, () => " "),
  );

const sqr = (x) => x * x;

const distanceBetween = (point1, point2) =>
  Math.sqrt(sqr(point1[0] - point2[0]) + sqr(point1[1] - point2[1]));

const displayCircle = (screen) =>
  console.log(screen.map((x) => x.join("")).join("\n"));

const isAproximate = (radius, distance, delta) => {
  const isGreater = distance < radius + delta;
  const isLesser = distance > radius - delta;
  return isGreater && isLesser;
};

const isMultipleCircle = (radius, distance) => {
  let isMultiple = false;
  for (let i = 0; i < radius; i += 3) {
    if (isMultiple) {
      return isMultiple;
    }
    isMultiple = isAproximate(radius - i, distance, 0.4);
  }
  return isMultiple;
};

const drawCircle = (screen, XOfCenter, YOfCenter, radius) => {
  for (const i in screen) {
    for (const j in screen[i]) {
      const distance = distanceBetween([i, j], [
        XOfCenter,
        YOfCenter,
      ]);
      const char = isMultipleCircle(radius, distance) ? ". " : "  ";
      screen[i][j] = char;
    }
  }
  return screen;
};

const clearScreen = (screen) => {
  for (const i in screen) {
    for (const j in screen[i]) {
      screen[i][j] = " ";
    }
  }
  return screen;
};

const circle = (screen, XOfCenter, YOfCenter) => {
  let radius = 1;
  setInterval(() => {
    radius = radius % 15;
    console.clear();

    drawCircle(screen, XOfCenter, YOfCenter, radius);
    displayCircle(screen);
    clearScreen(screen);

    ++radius;
  }, 100);
};

const main = () => {
  const screen = createScreen(30, 30);
  circle(screen, 15, 15);
};

main();
