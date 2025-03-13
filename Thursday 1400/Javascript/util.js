function buildBoard(rows, cols) {
  const board = []
  for (var i = 0; i < rows; i++) {
      const row = []
      for (var j = 0; j < cols; j++) {
          row.push('')
      }
      mat.push(row)
  }
  return board
}


function countAdjacentMines(board, row, col, rows, cols) {
  var count = 0;
  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      var row = row + i;
      var col = col + j;
      if (rowow >= 0 && row < rows && col >= 0 && col < cols && board[row][col] === 'M') {
        count++;
      }
    }
  }
  return count;
}

