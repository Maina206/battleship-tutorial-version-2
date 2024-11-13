import { useState } from 'react';

// Initial ship positions
const initialShips = {
  'Aircraft Carrier': { length: 5, positions: [] },
  'Battleship': { length: 4, positions: [] },
  'Cruiser': { length: 3, positions: [] },
  'Submarine': { length: 3, positions: [] },
  'Destroyer': { length: 2, positions: [] },
};

function UseShips() {
  const [ships, setShips] = useState(initialShips);

  // Convert coordinate string (e.g., 'D-3') to [row, col]
  const convertCoordinate = (coordinate) => {
    const rowLabels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const rowIndex = rowLabels.indexOf(coordinate[0]);
    const colIndex = parseInt(coordinate.split('-')[1], 10) - 1; // Adjust for 0-indexing
    return [rowIndex, colIndex];
  };

  // Function to place ships
  const placeShip = (shipName, startCoordinate, orientation) => {
    const [startRow, startCol] = convertCoordinate(startCoordinate);
    const positions = [];

    for (let i = 0; i < ships[shipName].length; i++) {
      const row = orientation === 'horizontal' ? startRow : startRow + i;
      const col = orientation === 'horizontal' ? startCol + i : startCol;
      positions.push({ row, col });
    }

    setShips(prev => ({
      ...prev,
      [shipName]: { ...prev[shipName], positions },
    }));
  };

  return { ships, placeShip };
}

export default UseShips;
