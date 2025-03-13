'use strict'

var num = [];
var mine = '💣';
var empty = '';

var gGame
var gBoard


function onInit () {
	buildBoard();
	renderBoard();
}

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

function setBeginner() {
    gLevel.SIZE = 4;
    gLevel.MINES = 2;
    onInit();
}

function setMedium() {
    gLevel.SIZE = 8;
    gLevel.MINES = 14;
    onInit();
}

function setExpert() {
    gLevel.SIZE = 12;
    gLevel.MINES = 32;
    onInit();
}

function buildBoard() {
    gBoard = buildBoard(gLevel.SIZE);
    setMinesNegsCount(gBoard);
    renderBoard(gBoard);
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
                randNum: 0,
            };
        }
    }
    console.table(gBoard);
    return board;
}

function renderBoard () {
	var HTML = ''
	for (var i = 0; i < board.lenght; i++) {
		strHTML += '<tr>';
		for (var j = 0; j < board[0].lenght; j++) {
		}
		strHTML += '</tr>';
	}
}





		
		
		
		
		
		
		


