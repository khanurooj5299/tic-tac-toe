import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");
  function handlePlayerChange(rowIndex, colIndex) {
    setActivePlayer((activePlayer) => (activePlayer == "X" ? "0" : "X"));
    setGameTurns((prevTurns) => {
      let symbol = "X";
      if (prevTurns.length) {
        symbol = prevTurns.length % 2 == 0 ? "X" : "0";
      }
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
      <Log></Log>
    </main>
  );
}

export default App;
