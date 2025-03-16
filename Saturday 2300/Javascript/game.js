'use strict'

const gLevel = {
    SIZE: 4,
    MINES: 2
};

var gBoard = [];
var gGame = {
    isOn: false,
    lives: 3,
    revealedCount: 0,
    markedCount: 0,
};

function onInit() {
    gGame.isOn = true;
    gGame.lives = 3;
    gGame.revealedCount = 0;
    gGame.markedCount = 0;

    buildBoard();
    renderBoard();
}

function buildBoard() {
    gBoard = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        gBoard[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            gBoard[i][j] = {
                minesAroundCount: 0,
                isCovered: true,
                isMine: false,
                isMarked: false
            };
        }
    }
    placeMines();
    setMinesNegsCount();
}

function placeMines() {
    var minesPlaced = 0;
    while (minesPlaced < gLevel.MINES) {
        var i = getRandomInt(0, gLevel.SIZE);
        var j = getRandomInt(0, gLevel.SIZE);

        if (!gBoard[i][j].isMine) {
            gBoard[i][j].isMine = true;
            minesPlaced++;
        }
    }
}

function setMinesNegsCount() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            gBoard[i][j].minesAroundCount = countMinesAround(i, j);
        }
    }
}

function countMinesAround(row, col) {
    var count = 0;
    for (var i = row - 1; i <= row + 1; i++) {
        for (var j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < gLevel.SIZE && j >= 0 && j < gLevel.SIZE && !(i === row && j === col)) {
                if (gBoard[i][j].isMine) count++;
            }
        }
    }
    return count;
}

function renderBoard() {
    var strHTML = '<table>';
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gLevel.SIZE; j++) {
            strHTML += `<td id="cell-${i}-${j}" class="covered" style="width: 40px; height: 40px;" onclick="onCellClicked(this, ${i}, ${j})" oncontextmenu="onCellMarked(event, ${i}, ${j})"></td>`;
        }
        strHTML += '</tr>';
    }
    strHTML += '</table>';
    document.querySelector('.board-table').innerHTML = strHTML;
}

function onCellClicked(elCell, i, j) {
    if (!gGame.isOn) return;

    var cell = gBoard[i][j];

    if (!cell.isCovered || cell.isMarked) return;

    cell.isCovered = false;

    if (cell.isMine) {
        elCell.style.backgroundColor = "red";
        elCell.innerText = "💣";
        revealMines();
        endGame();
        return;
    }

    elCell.style.backgroundColor = "aqua";
    elCell.classList.remove("covered");
    elCell.classList.add("revealed");
    elCell.style.width = "40px";
    elCell.style.height = "40px";
    elCell.innerText = cell.minesAroundCount || '';

    if (cell.minesAroundCount === 0) expandReveal(i, j);

    updateBoard();
    checkGameOver();
}

function revealMines() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = gBoard[i][j];
            var elCell = document.getElementById(`cell-${i}-${j}`);
            if (cell.isMine) {
                elCell.style.backgroundColor = "red";
                elCell.innerText = "💣";
            }
        }
    }
}

function endGame() {
    gGame.lives--;
    document.querySelector('.Lives').innerText = gGame.lives;
    
    if (gGame.lives === 0) {
        alert("Game Over!");
        gGame.isOn = false;
    } else {
        onInit();
    }
}

function onCellMarked(event, i, j) {
    event.preventDefault();
    var cell = gBoard[i][j];
    if (cell.isCovered) {
        cell.isMarked = !cell.isMarked;
    }
    updateBoard();
    checkGameOver();
}

function checkGameOver() {
    var allMinesFlagged = true;
    
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = gBoard[i][j];
            if (cell.isMine && !cell.isMarked) {
                allMinesFlagged = false;
            }
        }
    }

    if (allMinesFlagged) {
        alert("You Win! 🎉");
        gGame.isOn = false;
    }
}

function setDifficulty(level) {
    if (level === 1) {
        gLevel.SIZE = 4;
        gLevel.MINES = 2;
    } else if (level === 2) {
        gLevel.SIZE = 8;
        gLevel.MINES = 14;
    } else {
        gLevel.SIZE = 12;
        gLevel.MINES = 32;
    }
    onInit();
}

function onRestart() {
    onInit();
}

	
		
		
		
		


