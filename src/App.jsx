import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";

function deriveActivePlayer(gameTurns) {
  return gameTurns.length
    ? (gameTurns[0].symbol=="X"?"0":"X")
    : "X";
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
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
          gameTurns={gameTurns}
        />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App;
