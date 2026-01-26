const writeInstructions = (instructions) => {
  const encoder = new TextEncoder();
  const writer = Deno.stdout.writable.getWriter();
  writer.write(encoder.encode(instructions));
  writer.releaseLock();
};

export const instructions = async () => {
  const name = "Classic Snake Game";
  console.log(`${name}\n${"-".repeat(name.length)}\n==> Instructions <==`);
  const instructions =
    "w ==> move up\na ==> turning left\ns ==> move down\nd ==> turning right\nPress any key to continue...";
  await writeInstructions(instructions);
  prompt("Start Game");
};