import React, { useState, useEffect } from "react";

const EndGame = () => {
  const [gameState, setGameState] = useState({
    shipsPlaced: 0,
    attacks: [],
    isPlacingShips: true,
    gameOver: false,
    gameBoard: Array(10)
      .fill(null)
      .map(() => Array(10).fill(null)),
    pinBoard: Array(10)
      .fill(null)
      .map(() => Array(10).fill(null)),
  });

  const ships = [
    {
      name: "Aircraft Carrier",
      length: 5,
      start: "C-3",
      orientation: "horizontal",
    },
    { name: "Battleship", length: 4, start: "E-5", orientation: "vertical" },
    { name: "Cruiser", length: 3, start: "F-9", orientation: "vertical" },
    { name: "Submarine", length: 3, start: "I-2", orientation: "horizontal" },
    { name: "Destroyer", length: 2, start: "A-2", orientation: "horizontal" },
  ];

  const rowLabels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  // Convert coordinate like "A-1" to [row, col]
  const convertCoordinate = (coordinate) => {
    const row = rowLabels.indexOf(coordinate[0]);
    const col = parseInt(coordinate.split("-")[1]) - 1;
    return [row, col];
  };

  // Place a ship on the board
  const placeShip = (ship) => {
    const [startRow, startCol] = convertCoordinate(ship.start);
    const newBoard = [...gameState.gameBoard];
    const shipCells = [];

    for (let i = 0; i < ship.length; i++) {
      const row = ship.orientation === "horizontal" ? startRow : startRow + i;
      const col = ship.orientation === "horizontal" ? startCol + i : startCol;

      if (row >= 0 && row < 10 && col >= 0 && col < 10) {
        newBoard[row][col] = "ship";
        shipCells.push([row, col]);
      }
    }

    setGameState((prev) => ({
      ...prev,
      gameBoard: newBoard,
      shipsPlaced: prev.shipsPlaced + 1,
      isPlacingShips: prev.shipsPlaced < ships.length - 1,
    }));
  };

  // Place ships automatically with delay
  useEffect(() => {
    if (gameState.isPlacingShips && gameState.shipsPlaced < ships.length) {
      const timer = setTimeout(() => {
        placeShip(ships[gameState.shipsPlaced]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState.isPlacingShips, gameState.shipsPlaced]);

  // Perform attack
  const performAttack = () => {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);

    // Check if cell was already attacked
    if (gameState.pinBoard[row][col] !== null) {
      return null;
    }

    const isHit = gameState.gameBoard[row][col] === "ship";
    const newGameBoard = [...gameState.gameBoard];
    const newPinBoard = [...gameState.pinBoard];

    newGameBoard[row][col] = isHit ? "hit" : "miss";
    newPinBoard[row][col] = isHit ? "hit" : "miss";

    return { row, col, isHit, newGameBoard, newPinBoard };
  };

  // Simulate attacks
  useEffect(() => {
    if (!gameState.isPlacingShips && !gameState.gameOver) {
      const attackInterval = setInterval(() => {
        const result = performAttack();
        if (result) {
          const { newGameBoard, newPinBoard, isHit } = result;

          setGameState((prev) => {
            const newAttacks = [...prev.attacks, isHit];
            const totalHits = newAttacks.filter((hit) => hit).length;
            const totalShipCells = ships.reduce(
              (sum, ship) => sum + ship.length,
              0
            );

            // Check if game is over
            if (totalHits === totalShipCells) {
              setTimeout(() => {
                setGameState({
                  shipsPlaced: 0,
                  attacks: [],
                  isPlacingShips: true,
                  gameOver: false,
                  gameBoard: Array(10)
                    .fill(null)
                    .map(() => Array(10).fill(null)),
                  pinBoard: Array(10)
                    .fill(null)
                    .map(() => Array(10).fill(null)),
                });
              }, 2000);

              return {
                ...prev,
                gameBoard: newGameBoard,
                pinBoard: newPinBoard,
                attacks: newAttacks,
                gameOver: true,
              };
            }

            return {
              ...prev,
              gameBoard: newGameBoard,
              pinBoard: newPinBoard,
              attacks: newAttacks,
            };
          });
        }
      }, 500);

      return () => clearInterval(attackInterval);
    }
  }, [gameState.isPlacingShips, gameState.gameOver]);

  const Grid = ({ isPinGrid }) => {
    const board = isPinGrid ? gameState.pinBoard : gameState.gameBoard;

    const getCellContent = (row, col) => {
      const cellState = board[row][col];
      if (cellState === "ship" && !isPinGrid) return "🚢";
      if (cellState === "hit") return "💥";
      if (cellState === "miss") return "•";
      return isPinGrid ? `${rowLabels[row]}-${col + 1}` : "";
    };

    const getCellStyle = (row, col) => {
      const cellState = board[row][col];
      const baseStyle = "cell text-center border border-gray-300 p-2";
      if (cellState === "hit") return `${baseStyle} bg-red-500 text-white`;
      if (cellState === "miss") return `${baseStyle} bg-gray-500 text-white`;
      return baseStyle;
    };

    return (
      <div className="grid">
        <div className="cell" />
        {[...Array(10)].map((_, i) => (
          <div key={`col-${i}`} className="cell">
            {i + 1}
          </div>
        ))}
        {rowLabels.map((rowLabel, rowIndex) => (
          <React.Fragment key={`row-${rowLabel}`}>
            <div className="cell">{rowLabel}</div>
            {[...Array(10)].map((_, colIndex) => (
              <div
                key={`${rowLabel}-${colIndex}`}
                className={getCellStyle(rowIndex, colIndex)}
              >
                {getCellContent(rowIndex, colIndex)}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="container" id="step5">
      <h3>End Game - Continuous Simulation</h3>
      <div className="players sub-step">
        <div>
          <h5>Player 1 Battleship Board</h5>
          <Grid isPinGrid={false} />
        </div>
        <div>
          <h5>Player 2 Pins Board</h5>
          <Grid isPinGrid={true} />
        </div>
      </div>
      <div className="game-info mt-4">
        <p>
          Ships Placed: {gameState.shipsPlaced} / {ships.length}
        </p>
        <p>Attacks Made: {gameState.attacks.length}</p>
        <p>Hits: {gameState.attacks.filter((isHit) => isHit).length}</p>
        <h4>
          Let's take an example - player 2 wins the game and player looses the
          game
        </h4>
        <p>
          In this scenario, Player 2 attempts to attack Player 1 by placing pins
          on their pinboard and calling out the coordinates to hit Player 1’s
          ships. Player 1 then checks their own shipboard to see if the
          coordinate matches the location of any of their ships.
        </p>
        <p>
          If it does, it's marked as a hit, and the ship starts taking damage.
          If not, it’s marked as a miss. Player 1 also has a chance to attack by
          calling out coordinates from their pinboard, targeting Player 2’s
          ships.
        </p>
        <p>
          The game continues with each player taking turns until one player
          successfully sinks all of the other player’s ships, declaring them the
          winner.
        </p>
        <p>
          In this scenario, we're only simulating player 2 attacking player 1,
          but when playing the game, both players will have a chance to attack
          their opponent and also take hits to their ships.
        </p>
      </div>
    </div>
  );
};

export default EndGame;
