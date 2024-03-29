import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import { useState } from "react";

function App() {
  const [activePlayer, setActivePlayer] = useState('X');
  function handlePlayerChange() {
    setActivePlayer(activePlayer=>activePlayer=="X"?'0':"X");
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Max" symbol="X" isActive={activePlayer=="X"}/>
          <Player name="Manuel" symbol="0" isActive={activePlayer=="0"}/>
        </ol>
        <GameBoard handlePlayerChange={handlePlayerChange} activePlayer={activePlayer}/>
      </div>
    </main>
  );
}

export default App;
