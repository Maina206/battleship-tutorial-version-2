import React, { useState, useEffect, useRef } from "react";
import "../assets/styles/endgame.css";

const EndGame = () => {
  const gameGridRef = useRef(null);
  const pinGridRef = useRef(null);
  const [gameState, setGameState] = useState({
    placementPhase: true,
    currentShipIndex: 0,
    attacks: [],
    gameOver: false,
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
  const shipPositions = useRef([]);

  // Initialize grids
  useEffect(() => {
    const initializeGrid = (gridRef, showCoordinates = false) => {
      const grid = gridRef.current;
      grid.innerHTML = "";

      // Empty corner cell
      const emptyCell = document.createElement("div");
      emptyCell.className = "cell label";
      grid.appendChild(emptyCell);

      // Column labels (1-10)
      for (let col = 1; col <= 10; col++) {
        const colLabel = document.createElement("div");
        colLabel.className = "cell label";
        colLabel.textContent = col;
        grid.appendChild(colLabel);
      }

      // Create rows with labels
      for (let row = 0; row < 10; row++) {
        const rowLabel = document.createElement("div");
        rowLabel.className = "cell label";
        rowLabel.textContent = rowLabels[row];
        grid.appendChild(rowLabel);

        for (let col = 1; col <= 10; col++) {
          const cell = document.createElement("div");
          cell.className = "cell";
          const coordinate = `${rowLabels[row]}-${col}`;
          cell.setAttribute("data-coordinate", coordinate);
          if (showCoordinates) {
            cell.textContent = coordinate;
          }
          grid.appendChild(cell);
        }
      }
    };

    initializeGrid(gameGridRef, false);
    initializeGrid(pinGridRef, true); // Show coordinates on pin grid
  }, []);

  const convertCoordinate = (coordinate) => {
    const row = rowLabels.indexOf(coordinate[0]);
    const col = parseInt(coordinate.split("-")[1]) - 1;
    return [row, col];
  };

  const placeShip = (ship) => {
    const [startRow, startCol] = convertCoordinate(ship.start);
    const positions = [];

    for (let i = 0; i < ship.length; i++) {
      const row = ship.orientation === "horizontal" ? startRow : startRow + i;
      const col = ship.orientation === "horizontal" ? startCol + i : startCol;

      if (row >= 0 && row < 10 && col >= 0 && col < 10) {
        const cellIndex = (row + 1) * 11 + (col + 1);
        const cell = gameGridRef.current.children[cellIndex];

        if (cell) {
          cell.style.backgroundColor = "blue";
          cell.textContent = ship.name[0];
          positions.push({ row, col });
        }
      }
    }

    return positions;
  };

  const performAttack = (row, col) => {
    const allPositions = shipPositions.current.flat();
    const isHit = allPositions.some(
      (pos) => pos.row === row && pos.col === col
    );

    // Update game board
    const gameBoardIndex = (row + 1) * 11 + (col + 1);
    const gameCell = gameGridRef.current.children[gameBoardIndex];
    if (gameCell) {
      gameCell.style.backgroundColor = isHit ? "red" : "gray";
    }

    // Update pin board
    const pinBoardIndex = (row + 1) * 11 + (col + 1);
    const pinCell = pinGridRef.current.children[pinBoardIndex];
    if (pinCell) {
      pinCell.style.backgroundColor = isHit ? "red" : "gray";
      pinCell.style.color = "white";
    }

    return isHit;
  };

  // Sequential ship placement
  useEffect(() => {
    if (gameState.placementPhase && gameState.currentShipIndex < ships.length) {
      const timer = setTimeout(() => {
        const positions = placeShip(ships[gameState.currentShipIndex]);
        shipPositions.current.push(positions);

        setGameState((prev) => ({
          ...prev,
          currentShipIndex: prev.currentShipIndex + 1,
          placementPhase: prev.currentShipIndex < ships.length - 1,
        }));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [gameState.placementPhase, gameState.currentShipIndex]);

  // Attack simulation
  useEffect(() => {
    if (!gameState.placementPhase && !gameState.gameOver) {
      const attackInterval = setInterval(() => {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);

        const isHit = performAttack(row, col);
        setGameState((prev) => ({
          ...prev,
          attacks: [...prev.attacks, { row, col, isHit }],
        }));

        // Check if all ships are hit
        const allPositions = shipPositions.current.flat();
        const allHit = allPositions.every((pos) =>
          gameState.attacks.some(
            (attack) =>
              attack.row === pos.row && attack.col === pos.col && attack.isHit
          )
        );

        if (allHit) {
          setGameState((prev) => ({ ...prev, gameOver: true }));

          // Reset game after delay
          setTimeout(() => {
            // Clear both grids
            gameGridRef.current
              .querySelectorAll(".cell:not(.label)")
              .forEach((cell) => {
                cell.style.backgroundColor = "";
                cell.textContent = "";
              });

            pinGridRef.current
              .querySelectorAll(".cell:not(.label)")
              .forEach((cell) => {
                cell.style.backgroundColor = "";
                if (cell.hasAttribute("data-coordinate")) {
                  cell.textContent = cell.getAttribute("data-coordinate");
                  cell.style.color = "black";
                }
              });

            // Reset game state
            shipPositions.current = [];
            setGameState({
              placementPhase: true,
              currentShipIndex: 0,
              attacks: [],
              gameOver: false,
            });
          }, 2000);
        }
      }, 500);

      return () => clearInterval(attackInterval);
    }
  }, [gameState.placementPhase, gameState.attacks, gameState.gameOver]);

  return (
    <div className="container" id="step5">
      <h3>End Game - Continuous Simulation</h3>
      <div className="game-boards">
        <div>
          <h5>Player 1 Battleship Board</h5>
          <div ref={gameGridRef} className="grid"></div>
        </div>
        <div>
          <h5>Player 2 Pins Board</h5>
          <div ref={pinGridRef} className="grid"></div>
        </div>
      </div>
      <div className="game-info">
        <p>
          Ships Placed: {gameState.currentShipIndex} / {ships.length}
        </p>
        <p>Attacks Made: {gameState.attacks.length}</p>
        <p>Hits: {gameState.attacks.filter((a) => a.isHit).length}</p>
      </div>
      <h4>
        Let's take an example - player 2 wins the game and player looses the
        game
      </h4>
      <p>
        In this scenario, Player 2 attempts to attack Player 1 by placing pins
        on their pinboard and calling out the coordinates to hit Player 1’s
        ships. Player 1 then checks their own shipboard to see if the coordinate
        matches the location of any of their ships.
      </p>
      <p>
        If it does, it's marked as a hit, and the ship starts taking damage. If
        not, it’s marked as a miss. Player 1 also has a chance to attack by
        calling out coordinates from their pinboard, targeting Player 2’s ships.
      </p>
      <p>
        The game continues with each player taking turns until one player
        successfully sinks all of the other player’s ships, declaring them the
        winner.
      </p>
      <p>
        In this scenario, we're only simulating player 2 attacking player 1, but
        when playing the game, both players will have a chance to attack their
        opponent and also take hits to their ships.
      </p>
    </div>
  );
};

export default EndGame;
