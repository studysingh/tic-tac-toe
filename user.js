import {
  matrix,
  boardFiller,
  gameDecision,
  countEmptySpaceInBoard,
  resultOfGame,
} from "./index.js";
import { computerClick, computerThinking } from "./computer.js";

// handling userClick
const userClick = (e) => {
  if (computerThinking) return;
  if (resultOfGame) return;
  let decision = document.querySelector(".decision");
  let boxClass = e.srcElement.className;
  let row = Number(boxClass[3]);
  let col = Number(boxClass[4]);
  if (matrix[row][col] !== "🐼") return;
  // if board is filled
  if (countEmptySpaceInBoard() === 0) {
    decision.innerHTML = "i am in user.js for decision";
    return;
  }
  matrix[row][col] = "X";
  boardFiller();
  gameDecision();
  computerClick();
};
export { userClick };
