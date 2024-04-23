export default function GameBoard({ handlePlayerChange, gameBoard }) {
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((symbol, symbolIndex) => (
              <li key={symbolIndex}>
                <button
                  onClick={() => handlePlayerChange(rowIndex, symbolIndex)}
                  disabled={symbol}
                >
                  {symbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
