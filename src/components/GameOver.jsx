export default function GameOver({ winnerName, handleRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
     {winnerName && <p>{winnerName} won!</p>}
     {!winnerName && <p>It's a draw</p>}
      <p><button onClick={handleRestart}>Rematch!</button></p>
    </div>
  );
}
