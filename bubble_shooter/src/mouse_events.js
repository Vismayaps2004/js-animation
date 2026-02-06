const enableMouse = () => {
  Deno.stdin.setRaw(true, { cbreak: true });
  Deno.stdout.write(new TextEncoder().encode("\x1b[?1000h\x1b[?1006h"));
};

const disableMouse = () => {
  Deno.stdout.write(new TextEncoder().encode("\x1b[?1000l\x1b[?1006l"));
  Deno.stdin.setRaw(false);
};

const parseMouseEvent = (mouseEvent) => {
  const [_, x, y] = mouseEvent.split(";");
  return { x: parseInt(x), y: parseInt(y), isDone: false };
};

export const getMouseCoordinates = async () => {
  enableMouse();
  const buffer = new Uint8Array(1024);
  while (true) {
    const bytes = await Deno.stdin.read(buffer);
    const mouseEvent = new TextDecoder().decode(buffer.slice(0, bytes));

    if (mouseEvent === "q") {
      disableMouse();
      return { x: -1, y: -1, isDone: true };
    }

    const mouseCoords = parseMouseEvent(mouseEvent);
    return mouseCoords;
  }
};
getMouseCoordinates();
