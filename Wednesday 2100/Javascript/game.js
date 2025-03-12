'use strict'

const num = [];
const mine = '💣'
const empty = ''

var gBoard = buildBoard()
console.table(gBoard)

function buildBoard() {
	var board = []
	for (var i = 0; i < 4; i++) {
		board[i] = []
	  for (var j = 0; j < 4; j++) {
		board[i][j] = ''
	  }

	} 
	return board    
}


		
		
		
		
		
		
		


