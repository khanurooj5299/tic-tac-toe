import Player from "./components/Player";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player name="Max" symbol="X"></Player>
          <Player name="Manuel" symbol="0"></Player>
        </ol>
      </div>
    </main>
  );
}

export default App;
