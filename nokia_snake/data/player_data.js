import { input } from "@inquirer";

export const playerDetails = (player, name, score) => {
  player.initialise();
  player.addPlayerDetails(name, score);
  player.listHighestScores();
};

export const getName = async () => {
  const name = await input({
    message: "enter your name",
    required: true,
    default: "vismaya",
  });
  return name;
};