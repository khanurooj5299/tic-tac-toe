import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
const PLAYERS = {
  'X': 'Player 1',
  '0': 'Player 2',
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  return gameTurns.length ? (gameTurns[0].symbol == "X" ? "0" : "X") : "X";
}

function deriveWinner(gameBoard, lastTurn, playerNames) {
  //only if some player has played
  if (lastTurn) {
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
    if (rowCombinationFound) return playerNames[lastTurn.symbol];
    //checking the column
    for (let row = 0; row <= 2; row++) {
      if (gameBoard[row][lastTurn.colIndex] !== lastTurn.symbol) {
        colCombinationFound = false;
        break;
      }
    }
    if (colCombinationFound) return playerNames[lastTurn.symbol];
    //checking the main diagonal
    if (lastTurn.rowIndex == lastTurn.colIndex) {
      for (let row = 0, col = 0; row <= 2; row++, col++) {
        if (gameBoard[row][col] !== lastTurn.symbol) {
          diagCombinationFound = false;
          break;
        }
      }
      if (diagCombinationFound) return playerNames[lastTurn.symbol];
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
      if (diagCombinationFound) return playerNames[lastTurn.symbol];
    }
    return false;
  } else return false;
}

function deriveGameBoard(gameTurns) {
  const gameBoard = structuredClone(INITIAL_GAME_BOARD);
  for (const turn of gameTurns) {
    gameBoard[turn.rowIndex][turn.colIndex] = turn.symbol;
  }
  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState(PLAYERS);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, gameTurns[0], playerNames);
  const hasDraw = gameTurns.length == 9 && !winner;

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

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayerNames((playerNames) => {
      return { ...playerNames, [symbol]: newName };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={playerNames["X"]}
            symbol="X"
            isActive={activePlayer == "X"}
            handlePlayerNameChange={handlePlayerNameChange}
          />
          <Player
            name={playerNames["0"]}
            symbol="0"
            isActive={activePlayer == "0"}
            handlePlayerNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} handleRestart={handleRestart} />
        )}
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
