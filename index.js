// const { userClick } = require("./user");
import { computerClick } from "./computer.js";
import { userClick } from "./user.js";
let resultOfGame = true;
let boardSize = 3;
let matrix = new Array(boardSize);
const btn = document.querySelector(".btn");
const decision = document.querySelector(".decision");
// create board
const createBoard = () => {
  // filling matrix array
  for (let i = 0; i < boardSize; i++) {
    matrix[i] = new Array(boardSize).fill("🐼");
  }
  // showing on ui
  let table = document.querySelector(".game");
  table.innerHTML = "";
  for (let i = 0; i < matrix.length; i++) {
    let row = document.createElement("tr");
    row.className = `row${i}`;
    for (let j = 0; j < matrix[0].length; j++) {
      let col = document.createElement("td");
      let text = document.createTextNode(matrix[i][j]);
      col.onclick = userClick;
      col.appendChild(text);
      col.className = `col${i}${j}`;
      row.appendChild(col);
    }
    table.appendChild(row);
  }
};
// board filler
const boardFiller = () => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      let box = document.getElementsByClassName(`col${i}${j}`)[0];
      box.innerHTML = matrix[i][j];
    }
  }
};
// counting the no. of empty space in
const countEmptySpaceInBoard = () => {
  let ct = 0;
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (matrix[i][j] === "🐼") ct++;
    }
  }
  return ct;
};
// checking conditions
/*
  checkcondition returns same coordinate if the board is safe for player , returns -1 if the player lose
  */
const checkCondition = (row, ch) => {
  let col = row;
  let idx = row;
  // checking horizontal row
  let ctH = 0;
  let potentialCol;
  for (let i = 0; i < boardSize; i++) {
    if (matrix[idx][i] === ch) ctH++;
    else potentialCol = i;
  }
  if (ctH === boardSize - 1) {
    row = idx;
    col = potentialCol;
    // return [row, potentialCol];
  }
  if (ctH === boardSize) {
    return [-1, -1];
  }
  // checking vertical column
  let ctV = 0;
  let potentialRow;
  for (let i = 0; i < boardSize; i++) {
    if (matrix[i][idx] === ch) ctV++;
    else potentialRow = i;
  }
  if (ctV === boardSize - 1) {
    row = potentialRow;
    col = idx;
    // return [potentialRow, col];
  }
  if (ctV === boardSize) {
    return [-1, -1];
  }
  // checking cross1
  let ctCross1 = 0;
  for (let i = 0; i < boardSize; i++) {
    if (matrix[i][i] === ch) ctCross1++;
    else {
      potentialCol = potentialRow = i;
    }
  }
  if (ctCross1 === boardSize - 1) {
    row = potentialRow;
    col = potentialCol;
    // return [potentialCol, potentialCol];
  }
  if (ctCross1 === boardSize) {
    return [-1, -1];
  }
  // checking cross2
  let ctCross2 = 0;
  let len = boardSize;
  for (let i = 0; i < boardSize; i++) {
    if (matrix[i][boardSize - 1 - i] === ch) ctCross2++;
    else {
      potentialCol = len - 1 - i;
      potentialRow = i;
    }
  }
  if (ctCross2 === boardSize - 1) {
    row = potentialRow;
    col = potentialCol;
    // return [potentialRow, potentialCol];
  }
  if (ctCross2 === boardSize) {
    return [-1, -1];
  }
  // if no condition is found
  return [row, col];
};
// take decision
const gameDecision = () => {
  let decision = document.querySelector(".decision");

  for (let i = 0; i < boardSize; i++) {
    // for user
    let userChance = checkCondition(i, "X");
    if (userChance[0] === -1) {
      decision.innerHTML = "You Won";
      resultOfGame = true;
      return;
    }
    // for computer
    let computerChance = checkCondition(i, "O");
    if (computerChance[0] === -1) {
      decision.innerHTML = "You Lost";
      resultOfGame = true;
      return;
    }
  }
  if (countEmptySpaceInBoard() === 0) {
    console.log("i am empty");
    resultOfGame = true;
    decision.innerHTML = "Draw";
    return;
  }
};
// toss
const toss = () => {
  return Math.floor(Math.random() * 2);
  // return 0;
};
btn.addEventListener("click", () => {
  decision.innerHTML = "";
  createBoard();
  let chance = toss();
  resultOfGame = false;
  btn.innerHTML = "Restart";
  if (chance === 0) {
    computerClick();
  }
});
createBoard();
export {
  boardSize,
  matrix,
  createBoard,
  boardFiller,
  countEmptySpaceInBoard,
  gameDecision,
  checkCondition,
  resultOfGame,
};
