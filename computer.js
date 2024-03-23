import {
  boardSize,
  matrix,
  createBoard,
  boardFiller,
  countEmptySpaceInBoard,
  checkCondition,
  gameDecision,
  resultOfGame,
} from "./index.js";
let computerThinking = false;
// handling computer event
const computerClick = () => {
  if (resultOfGame) return;
  if (countEmptySpaceInBoard() === 0) {
    return;
  }
  let row, col;
  let changes = false;
  for (let i = 0; i < boardSize; i++) {
    // computer should also play optimally
    let arrOut = checkCondition(i, "O");
    row = arrOut[0];
    col = arrOut[1];
    if (row !== i && col !== i && row !== -1 && matrix[row][col] === "🐼") {
      matrix[row][col] = "O";
      boardFiller();
      gameDecision();
      return;
    }

    arrOut = checkCondition(i, "X");
    row = arrOut[0];
    col = arrOut[1];
    // the passed coordinate
    if (row === i && col === i) {
      // in case of only one element
      if (countEmptySpaceInBoard() === 1) {
        break;
      }
      // if computer loses
    } else if (row === -1) {
      changes = true;
      break;
      // we got the potential coordinate
    } else {
      // in case of only one element
      if (countEmptySpaceInBoard() === 1) {
        break;
      }
      if (matrix[row][col] === "🐼") {
        let time = Math.random() * 1000;
        computerThinking = true;
        setTimeout(() => {
          computerThinking = false;
          matrix[row][col] = "O";
          boardFiller();
          gameDecision();
        }, time);
        changes = true;
        break;
      }
    }
  }
  // if everything is safe , filling random coordinate
  if (changes === false) {
    if (countEmptySpaceInBoard() <= 1) {
      row = row;
      col = col;
    } else {
      row = Math.floor(Math.random() * boardSize);
      col = Math.floor(Math.random() * boardSize);
    }

    while (matrix[row][col] !== "🐼") {
      row = Math.floor(Math.random() * boardSize);
      col = Math.floor(Math.random() * boardSize);
    }
    let time = Math.random() * 2000;
    computerThinking = true; // it will stop user to click until decision
    setTimeout(() => {
      computerThinking = false;
      matrix[row][col] = "O";
      boardFiller();
      gameDecision();
    }, time);
  }
};
export { computerClick, computerThinking };
