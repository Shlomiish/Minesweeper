'use strict';

const BOMB = '💣';
const EMPTY = ' ';
const FLAG = '🚩';

var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
};

var gLevel = {
  size: 4,
  mines: 2,
};

var gBoard;

initGame();
function initGame() {
  gBoard = buildBoard();
  addBombsRand(gBoard);
  renderMinesNegCount(gBoard);
  renderBoard(gBoard);

  gGame.isOn = true;
}

function buildBoard() {
  var board = [];
  for (var i = 0; i < gLevel.size; i++) {
    board[i] = [];
    for (var j = 0; j < gLevel.size; j++) {
      board[i][j] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
      };
    }
  }
  console.table(board);
  return board;
}
function addBombsRand() {
  for (var i = 0; i < gLevel.mines; i++) {
    var randI = getRandomIntInclusive(0, gBoard.length - 1);
    var randJ = getRandomIntInclusive(0, gBoard.length - 1);
    addBomb(randI, randJ);
  }
}

function addBomb(i, j) {
  gBoard[i][j].isMine = true;
}

function countMineAround(board, rowIdx, colIdx) {
  var mineCount = 0;
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i > board.length - 1) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j > board[0].length - 1) continue;
      if (i === rowIdx && j === colIdx) continue;
      var cell = board[i][j];
      if (cell.isMine) mineCount++;
    }
  }
  return mineCount;
}

function cellClicked(rowIdx, colIdx) {
  if (!gGame.isOn) return;
  if (gBoard[rowIdx][colIdx].isShown) return;
  console.log(gBoard[rowIdx][colIdx]);
  // manage click
  showCell(rowIdx, colIdx);
  if (gBoard[rowIdx][colIdx].isMine) gameOver();
  if (
    gBoard[rowIdx][colIdx].minesAroundCount == 0 &&
    !gBoard[rowIdx][colIdx].isMine
  ) {
    lookAround(rowIdx, colIdx);
  }
}

function lookAround(rowIdx, colIdx) {
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i > gBoard.length - 1) continue;
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j > gBoard[0].length - 1) continue;
      var cell = gBoard[i][j];
      if (cell.isMine) continue;
      showCell(i, j);
    }
  }
}

function gameOver() {
  gGame.isOn = false;
  alert('GAME OVER');
  var smiley = document.querySelector('.mood');
  smiley.innerText = '💀';
}

function restart() {
  initGame();
  var smiley = document.querySelector('.mood');
  smiley.innerText = '😄';
}

function levels(size, mines) {
  gLevel.size = size;
  gLevel.mines = mines;
  restart();
}

function cellRightClicked(rowIdx, colIdx) {
  if (gBoard[rowIdx][colIdx].isMarked) {
    gBoard[rowIdx][colIdx].isMarked = false;
  }
  showCell(rowIdx, colIdx);
  updateCell(rowIdx, colIdx, FLAG);
  console.log(gBoard[rowIdx][colIdx]);
}

function cellMarked(elCell) {}

function expandShown(board, elCell, i, j) {}
