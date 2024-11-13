import React from 'react';
import styles from './Grid.module.css';

function Grid({ elementID, onCellClick, ships = {}, showShips = false, attackedCells = [] }) {
  const rows = 10;
  const cols = 10;
  const rowLabels = Array.from({ length: rows }, (_, i) => String.fromCharCode(65 + i)); // Generates labels A-J dynamically

  const isShipPosition = (row, col) => {
    return Object.values(ships).some(ship =>
      ship.positions.some(position => position.row === row && position.col === col)
    );
  };

    const isAttacked = (row, col) => attackedCells.some(cell => cell.row === row && cell.col ===col);

  return (
    <div id={elementID} className={styles.grid}>
      <div className={`${styles.cell} ${styles.label}`} />
      {Array.from({ length: cols }, (_, col) => (
        <div key={`col-${col}`} className={`${styles.cell} ${styles.label}`}>{col + 1}</div>
      ))}
      {rowLabels.map((rowLabel, rowIdx) => (
        <React.Fragment key={rowLabel}>
          <div className={`${styles.cell} ${styles.label}`}>{rowLabel}</div>
          {Array.from({ length: cols }, (_, col) => {
            const isShip = showShips && isShipPosition(rowIdx, col + 1);
            const attacked = isAttacked(rowIdx, col + 1);
            const cellClass = attacked ? (isShip ? styles.hit : styles.miss) : '';
            return (
              <div
                key={`${rowIdx}-${col}`}
                className={`${styles.cell} ${cellClass}`}
                data-coordinate={`${rowLabel}-${col + 1}`}
                onClick={() => onCellClick(rowIdx, col)}
              >
                {isShip && showShips ? "🚢" : ""}
                {attacked && !isShip ? "M" : ""}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Grid;


