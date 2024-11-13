import React, { useEffect, useState } from "react";
import UsesShip from "./UsesShips"; // Correct import
import Grille from "./Grille";
import styles from "./SinkSimulation.module.css";

function SinkSimulation() {
  const { ships } = UsesShip(); // Load ships
  const [attackedCells, setAttackedCells] = useState([]);

  const isShipSunk = (ship) =>
    ship.positions.every((pos) =>
      attackedCells.some(
        (cell) => cell.row === pos.row && cell.col === pos.col && cell.hit
      )
    );

  const handleAttack = (row, col) => {
    if (attackedCells.some((cell) => cell.row === row && cell.col === col))
      return;

    const newAttack = { row, col, hit: false };

    Object.values(ships).forEach((ship) => {
      if (ship.positions.some((pos) => pos.row === row && pos.col === col)) {
        newAttack.hit = true;
        newAttack.ship = ship.name;
      }
    });

    setAttackedCells((prev) => [...prev, newAttack]);
  };

  useEffect(() => {
    Object.values(ships).forEach((ship) => {
      if (isShipSunk(ship)) {
        ship.isSunk = true;
      }
    });
  }, [attackedCells, ships]);

  return (
    <div className={styles.container}>
      <h3>Sink Scenario</h3>
      <p>
        Announce when each ship sinks. If every square of a ship gets hit, that
        ship is considered sunk. Players should inform each other whenever a
        ship is sunk, naming the type of ship that was hit.
      </p>

      <div className={styles.gridWrapper}>
        <div className="sub-step players">
          <div className={styles.gridSection}>
            <h4>Player</h4>
            <Grille
              elementID="player"
              ships={ships}
              showShips={true}
              attackedCells={attackedCells}
              onCellClick={handleAttack}
            />
          </div>
          <div className={styles.gridSection}>
            <h4>Opponent</h4>
            <Grille
              elementID="opponent"
              ships={{}}
              showShips={false}
              attackedCells={attackedCells}
              onCellClick={handleAttack}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinkSimulation;
