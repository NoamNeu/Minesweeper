'use strict';

var gBoard;
var gLevel = {
    SIZE: 4,
    MINES: 2
};
var gGame = {
    isOn: false,
    revealedCount: 0,
    markedCount: 0,
    secsPassed: 0
};
var mine = '💣';
var empty = '';

function onInit() {
    setDifficulty(1); 
}

function setDifficulty(level) {
    if (level === 1) {
        gLevel.SIZE = 4;
        gLevel.MINES = 2;
        setDifficulty(1);
    } else if (level === 2) {
        gLevel.SIZE = 8;
        gLevel.MINES = 14;
        setDifficulty(2);
    } else if (level === 3) {
        gLevel.SIZE = 12;
        gLevel.MINES = 32;
        setDifficulty(3);
    }
    buildBoard();
}

function setDifficulty(level) {
    if (level !== 1) {
        document.querySelector('h3 table').innerHTML = '';
    }
    if (level !== 2) {
        document.querySelector('h4 table').innerHTML = '';
    }
    if (level !== 3) {
        document.querySelector('h5 table').innerHTML = '';
    }
}

function buildBoard() {
    gBoard = createBoard(gLevel.SIZE);
    placeMines(gBoard);
    setMinesNegsCount(gBoard);
    renderBoard(gBoard);
    gGame.isOn = true;
}

function createBoard(size) {
    var board = [];
    for (var i = 0; i < size; i++) {
        board.push([]);
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isCovered: true,
                isMine: false,
                isMarked: false
            };
        }
    }
    return board;
}

function placeMines(board) {
    var minesPlaced = 0;
    while (minesPlaced < gLevel.MINES) {
        var row = getRndIntExcMax(0, gLevel.SIZE);
        var col = getRndIntExcMax(0, gLevel.SIZE);
        if (board[row][col].isMine === false) {
            board[row][col].isMine = true;
            minesPlaced++;
        }
    }
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].isMine === false) {
                board[i][j].minesAroundCount = countMinesAround(board, i, j);
            }
        }
    }
}

function countMinesAround(board, rowIdx, colIdx) {
    var count = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i >= 0 && i < board.length && j >= 0 && j < board[0].length && board[i][j].isMine) {
                count++;
            }
        }
    }
    return count;
}

function renderBoard(board) {
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var cellContent = '';
            if (cell.isCovered === false) {
                if (cell.isMine) {
                    cellContent = mine;
                } else if (cell.minesAroundCount > 0) {
                    cellContent = cell.minesAroundCount;
                }
            } else if (cell.isMarked) {
                cellContent = '🚩';
            }
            strHTML += '<td data-i="' + i + '" data-j="' + j + '" onclick="onCellClicked(this, ' + i + ', ' + j + ')" oncontextmenu="onCellMarked(this, ' + i + ', ' + j + '); return false;">' + cellContent + '</td>';
        }
        strHTML += '</tr>';
    }
    var targetTable;
    if (gLevel.SIZE === 4) {
        targetTable = document.querySelector('h3 table');
    } else if (gLevel.SIZE === 8) {
        targetTable = document.querySelector('h4 table');
    } else if (gLevel.SIZE === 12) {
        targetTable = document.querySelector('h5 table');
    }
    targetTable.innerHTML = strHTML;
    console.table(board);
}

function onCellClicked(elCell, i, j) {
    if (gGame.isOn === false) return;
    var cell = gBoard[i][j];
    if (cell.isCovered === false || cell.isMarked) return;

    cell.isCovered = false;
    gGame.revealedCount++;

    if (cell.isMine) {
        checkGameOver();
        return;
    }

    if (cell.minesAroundCount === 0) {
        expandReveal(gBoard, elCell, i, j);
    }
    renderBoard(gBoard);
    checkGameOver();
}

function onCellMarked(elCell, i, j) {
    if (gGame.isOn === false) return;
    var cell = gBoard[i][j];
    if (cell.isCovered === false) return;

    cell.isMarked = !cell.isMarked;
    if (cell.isMarked) {
        gGame.markedCount++;
    } else {
        gGame.markedCount--;
    }
    renderBoard(gBoard);
    checkGameOver();
}

function checkGameOver() {
    var totalCells = gLevel.SIZE * gLevel.SIZE;
    var revealedAndMarked = gGame.revealedCount + gGame.markedCount;
    if (revealedAndMarked === totalCells) {
        gGame.isOn = false;
        alert('Game Over!');
    }
}

function expandReveal(board, elCell, i, j) {
    for (var rowIdx = i - 1; rowIdx <= i + 1; rowIdx++) {
        for (var colIdx = j - 1; colIdx <= j + 1; colIdx++) {
            if (rowIdx >= 0 && rowIdx < board.length && colIdx >= 0 && colIdx < board[0].length) {
                var cell = board[rowIdx][colIdx];
                if (cell.isCovered && cell.isMarked === false) {
                    cell.isCovered = false;
                    gGame.revealedCount++;
                    if (cell.minesAroundCount === 0) {
                        expandReveal(board, elCell, rowIdx, colIdx);
                    }
                }
            }
        }
    }
    renderBoard(gBoard);
}
		
		
		
		
		
		
		


