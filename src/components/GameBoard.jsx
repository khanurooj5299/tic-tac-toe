const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ handlePlayerChange, gameTurns }) {
  const gameBoard = initialGameBoard;
  for (const turn of gameTurns) {
    gameBoard[turn.rowIndex][turn.colIndex] = turn.symbol;
  }
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((symbol, symbolIndex) => (
              <li key={symbolIndex}>
                <button
                  onClick={() => handlePlayerChange(rowIndex, symbolIndex)}
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
