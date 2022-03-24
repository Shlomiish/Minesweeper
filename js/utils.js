function renderMinesNegCount(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      var currCell = board[i][j];
      currCell.minesAroundCount = countMineAround(board, i, j);
    }
  }
}

function renderBoard(board) {
  var strHtml = '';
  for (var i = 0; i < board.length; i++) {
    strHtml += `<tr>`;
    for (var j = 0; j < board.length; j++) {
      strHtml += `<td class="cell cell-${i}-${j}" oncontextmenu="cellRightClicked(${i}, ${j})" onclick="cellClicked(${i}, ${j})"><span>`;
      if (board[i][j].isMine) {
        strHtml += `${BOMB}`;
      } else {
        strHtml += board[i][j].minesAroundCount;
      }

      strHtml += `</span></td>`;
    }
    strHtml += `</tr>`;
  }
  var elTable = document.querySelector('.board');
  elTable.innerHTML = strHtml;
}

function showCell(i, j) {
  var elCell = document.querySelector(`.cell-${i}-${j} span`);
  elCell.style.opacity = 1;
  gBoard[i][j].isShown = true;
}

function updateCell(rowIdx, colIdx, str) {
  var elFlag = document.querySelector(`.cell-${rowIdx}-${colIdx} span`);
  elFlag.innerText = str;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
