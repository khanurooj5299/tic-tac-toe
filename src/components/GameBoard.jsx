import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({handlePlayerChange, activePlayer}) {
    const [gameBoard, setGameBoard]=useState(initialGameBoard);

    function handleSelectSquare(row, col) {
      setGameBoard(gameBoard => {
          const newGameBoard = [...gameBoard.map(row => [...row])];
          newGameBoard[row][col]=activePlayer;
          return newGameBoard;
      });
      handlePlayerChange();
    }
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((symbol, symbolIndex) => (
              <li key={symbolIndex}>
                <button onClick={()=>handleSelectSquare(rowIndex, symbolIndex)}>{symbol}</button>
              </li>  
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
