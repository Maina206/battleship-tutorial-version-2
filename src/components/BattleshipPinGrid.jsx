import React, { useEffect, useMemo } from "react";

const BattleshipPinGrid = ({ gridId }) => {
  const rowLabels = useMemo(
    () => ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    []
  );
  const rows = 10;
  const cols = 10;

  const createPinGrid = useMemo(() => {
    return (gridElementId) => {
      const gridContainer = document.getElementById(gridElementId);
      gridContainer.innerHTML = "";

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
          cell.textContent = `${rowLabels[row]}-${col}`;
          gridContainer.appendChild(cell);
        }
      }
    };
  }, [cols, rowLabels]);

  useEffect(() => {
    createPinGrid(gridId);
  }, [createPinGrid, gridId]);

  return <div id={gridId} className="grid"></div>;
};

export default BattleshipPinGrid;
