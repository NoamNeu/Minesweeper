
function createBoard(ROWS, COLS) {
  const board = []
  for (var i = 0; i < ROWS; i++) {
      const row = []
      for (var j = 0; j < COLS; j++) {
          row.push('')
      }
      mat.push(row)
  }
  return board
}



