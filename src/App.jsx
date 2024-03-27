import Player from "./components/Player.jsx";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player name="Max" symbol="X"/>
          <Player name="Manuel" symbol="0"/>
        </ol>
      </div>
    </main>
  );
}

export default App;
