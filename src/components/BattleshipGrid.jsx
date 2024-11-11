import React, { useEffect, useRef } from "react";

const BattleshipGrid = ({ gridId, ships }) => {
  const gridRef = useRef(null);
  const rows = 10;
  const cols = 10;
  const rowLabels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const createBattleshipGrid = (gridContainer) => {
    gridContainer.innerHTML = ""; // Clear existing content

    const emptyCell = document.createElement("div");
    emptyCell.className = "cell label";
    gridContainer.appendChild(emptyCell);

    for (let col = 1; col <= cols; col++) {
      const colLabel = document.createElement("div");
      colLabel.className = "cell label";
      colLabel.textContent = col;
      gridContainer.appendChild(colLabel);
    }

    for (let row = 0; row < rows; row++) {
      const rowLabel = document.createElement("div");
      rowLabel.className = "cell label";
      rowLabel.textContent = rowLabels[row];
      gridContainer.appendChild(rowLabel);

      for (let col = 1; col <= cols; col++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.setAttribute("data-coordinate", `${rowLabels[row]}-${col}`);
        cell.addEventListener("click", () => {
          if (onShipPlacement) {
            onShipPlacement(`${rowLabels[row]}-${col}`);
          }
        });
        gridContainer.appendChild(cell);
      }
    }
  };

  const placeShip = (gridContainer, ship, startCoordinate, orientation) => {
    const [startRow, startCol] = convertCoordinate(startCoordinate);

    for (let i = 0; i < ship.length; i++) {
      let row, col;

      if (orientation === "horizontal") {
        row = startRow;
        col = startCol + i;
      } else {
        row = startRow + i;
        col = startCol;
      }

      if (row >= 0 && row < 10 && col >= 0 && col < 10) {
        const cellIndex = (row + 1) * 11 + col + 1;
        const cell = gridContainer.children[cellIndex];
        cell.style.backgroundColor = "blue";

        if (cell) {
          cell.classList.add("ship");
          const span = document.createElement("span");
          span.textContent = `${ship.name.charAt(0)}*`;
          cell.appendChild(span);
        }
      }
    }
  };

  const convertCoordinate = (coordinate) => {
    const rowIndex = rowLabels.indexOf(coordinate[0]);
    const colIndex = parseInt(coordinate[2]) - 1;
    return [rowIndex, colIndex];
  };

  useEffect(() => {
    const gridContainer = gridRef.current;

    createBattleshipGrid(gridContainer);

    // Here we hardcode the ship on the board
    const shipsToPlace = [
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

    shipsToPlace.forEach((ship) => {
      placeShip(gridContainer, ship, ship.start, ship.orientation);
    });
  }, [ships]);

  return <div id={gridId} className="grid" ref={gridRef}></div>;
};

export default BattleshipGrid;
