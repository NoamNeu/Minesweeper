'use strict'

const num = [];
const mine = '💣'
const empty = 'Clock'

function onIn {
    buildBoard()
    setMinesNegsCount()
}


  function buildBoard() { 
	const board = createBoard(4, 4)
	for (var i = 0; i < board.length; i++) {
        var setMinesNegsCount = 2
		for (var j = 0; j < board[i].length; j++) {
				board[i][j].type = WALL
			}
		}
	}