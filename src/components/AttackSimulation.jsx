import React, { useEffect, useState } from 'react';
import UseShips from './UseShips'; 
import Grid from './Grid';
import styles from './AttackSimulation.module.css';

function AttackSimulation() {
  const { ships } = UseShips(); 
  const [attackedCells, setAttackedCells] = useState([]); 
  const rows = 10;
  const cols = 10;

  const isCellEmptyAndNotAttacked = (row, col) => {
    const isAttacked = attackedCells.some(cell => cell.row === row && cell.col === col);
    const isShipPresent = Object.values(ships).some(ship =>
      ship.positions.some(position => position.row === row && position.col === col)
    );
    return !isAttacked && !isShipPresent;
  };

  const initiateMissAttack = () => {
    const emptyCells = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 1; col <= cols; col++) {
        if (isCellEmptyAndNotAttacked(row, col)) {
          emptyCells.push({ row, col });
        }
      }
    }

    if (emptyCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const selectedCell = emptyCells[randomIndex];
    

      setAttackedCells(prev => [...prev, selectedCell]);
    }
  };

  useEffect(() => {
    const initialAttackTimeout = setTimeout(() => {
      initiateMissAttack();
      const attackInterval = setInterval(initiateMissAttack, 3000);
      
      return () => clearInterval(attackInterval);
    }, 5000);

    return () => clearTimeout(initialAttackTimeout);
  }, [attackedCells, ships]);

  return (
    <div className={styles.container}>
      <h3>Attack Simulation (Miss Scenario)</h3>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <Grid
          elementID="player1"
          onCellClick={() => {}}
          ships={ships} 
          showShips={true} 
          attackedCells={attackedCells} 
        />

        <Grid
          elementID="player2"
          onCellClick={() => {}}
          ships={{}} 
          showShips={false} 
          attackedCells={attackedCells} 
        />
      </div>
    </div>
  );
}

export default AttackSimulation;

