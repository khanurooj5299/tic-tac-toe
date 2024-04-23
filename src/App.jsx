import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  return gameTurns.length ? (gameTurns[0].symbol == "X" ? "0" : "X") : "X";
}

function isWinner(gameBoard, lastTurn) {
  let rowCombinationFound = true;
  let colCombinationFound = true;
  let diagCombinationFound = true;
  //checking the row
  for (let col = 0; col <= 2; col++) {
    if (gameBoard[lastTurn.rowIndex][col] !== lastTurn.symbol) {
      rowCombinationFound = false;
      break;
    }
  }
  if (rowCombinationFound) return true;
  //checking the column
  for (let row = 0; row <= 2; row++) {
    if (gameBoard[row][lastTurn.rowIndex] !== lastTurn.symbol) {
      colCombinationFound = false;
      break;
    }
  }
  if (colCombinationFound) return true;
  //checking the main diagonal
  if (lastTurn.rowIndex == lastTurn.colIndex) {
    for (let row = 0, col = 0; row <= 2; row++, col++) {
      if (gameBoard[row][col] !== lastTurn.symbol) {
        diagCombinationFound = false;
        break;
      }
    }
    if (diagCombinationFound) return true;
  }
  //reset
  diagCombinationFound = true;
  //checking for cross diagonal
  if (lastTurn.rowIndex + lastTurn.colIndex == 2) {
    for (let row = 0, col = 2; row <= 2; row++, col--) {
      if (gameBoard[row][col] !== lastTurn.symbol) {
        diagCombinationFound = false;
        break;
      }
    }
    if(diagCombinationFound) return true;
  }
  return false;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = initialGameBoard;
  for (const turn of gameTurns) {
    gameBoard[turn.rowIndex][turn.colIndex] = turn.symbol;
  }

  if (gameTurns.length) {
    let winner = isWinner(gameBoard, gameTurns[0]);
  }

  function handlePlayerChange(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let symbol = deriveActivePlayer(prevTurns);
      const newTurns = [
        {
          rowIndex,
          colIndex,
          symbol,
        },
        ...prevTurns,
      ];
      return newTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Max" symbol="X" isActive={activePlayer == "X"} />
          <Player name="Manuel" symbol="0" isActive={activePlayer == "0"} />
        </ol>
        <GameBoard
          handlePlayerChange={handlePlayerChange}
          gameBoard={gameBoard}
        />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App;
