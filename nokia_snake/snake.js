import { DatabaseSync } from "node:sqlite";
import { SnakeDb } from "./src/snake_db.js";
import { instructions } from "./src/insturctions.js";
import { getName } from "./data/player_data.js";
import { createScreen } from "./src/screen.js";
import { snakeGame } from "./src/snake_vs1.js";

const main = () => {
  instructions();
  const screen = createScreen(35, 60);
  const db = new DatabaseSync("snake.db");
  const player = new SnakeDb(db);
  setTimeout(async () => {
    const name = await getName();
    snakeGame(screen, player, name);
  }, 1000);
};

main();