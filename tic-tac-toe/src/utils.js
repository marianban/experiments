export const getWinner = (board, player) => {
  // check rows (varian 1)
  for (let y = 0; y < board.length; y++) {
    const row = board[y];

    let winner = true;
    for (let x = 0; x < row.length; x++) {
      if (row[x] !== player) {
        winner = false;
      }
    }
    if (winner) {
      return player;
    }
  }

  //check cols (variant 2, easy to read but not flexible)
  for (let col = 0; col < 3; col++) {
    if (
      board[0][col] === player &&
      board[1][col] === player &&
      board[2][col] === player
    ) {
      return player;
    }
  }

  // check diagonals
  if (
    board[0][0] === player &&
    board[1][1] === player &&
    board[2][2] === player
  ) {
    return player;
  }

  if (
    board[0][2] === player &&
    board[1][1] === player &&
    board[2][0] === player
  ) {
    return player;
  }

  return '';
};

export const isTie = (board, winner) => {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (!board[y][x]) {
        return false;
      }
    }
  }

  return !winner;
};

export const clearBoard = (board) => {
  for (let y = 0; y < board.length; y++) {
    const row = board[y];
    for (let x = 0; x < row.length; x++) {
      board[y][x] = '';
    }
  }
};
