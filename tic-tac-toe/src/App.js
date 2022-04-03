import './App.css';
import { useState } from 'react';
import { GridItem } from './GridItem.js';
import { clearBoard, getWinner, isTie } from './utils';

const initial = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

export function App() {
  const [board, setBoard] = useState(initial);
  const [player, setPlayer] = useState('x');
  const [winner, setWinner] = useState('');

  const handleOnClick = (x, y) => {
    if (winner) {
      return;
    }

    if (board[y][x] !== '') {
      return;
    }

    const newBoard = [...board];
    newBoard[y][x] = player;
    setBoard(newBoard);

    if (player === 'x') {
      setPlayer('o');
    } else {
      setPlayer('x');
    }

    setWinner(getWinner(board, player));
  };

  const handleRestart = () => {
    const newBoard = [...board];
    clearBoard(newBoard);
    setBoard(newBoard);
    setWinner('');
  };

  return (
    <div>
      {winner && (
        <div>
          <h2>The winner is: {winner}</h2>
          <button onClick={handleRestart} type="button">
            Restart
          </button>
        </div>
      )}
      {isTie(board, winner) && (
        <div>
          <h2>You both played perfectly! No winner</h2>
          <button onClick={handleRestart} type="button">
            Restart
          </button>
        </div>
      )}
      <div className="grid">
        {board.map((row, y) => {
          return row.map((value, x) => {
            return (
              <GridItem
                key={y + '-' + x}
                value={value}
                x={x}
                y={y}
                onClick={handleOnClick}
              />
            );
          });
        })}
      </div>
    </div>
  );
}
