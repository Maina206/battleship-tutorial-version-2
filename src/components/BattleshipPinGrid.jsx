import React from "react";

const BattleshipPinGrid = ({ gridId }) => {
  const rowLabels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const rows = 10;
  const cols = 10;

  // Create array for column headers (1-10)
  const colLabels = Array.from({ length: cols }, (_, i) => i + 1);

  // Create all cells in a single array
  const gridCells = [
    // Empty cell in top-left corner
    <div key="empty" className="cell label" />,

    // Column headers
    ...colLabels.map((col) => (
      <div key={`col-${col}`} className="cell label">
        {col}
      </div>
    )),

    // Grid rows with row labels and cells
    ...rowLabels.flatMap((rowLabel) => [
      // Row label
      <div key={`row-${rowLabel}`} className="cell label">
        {rowLabel}
      </div>,
      // Grid cells for this row
      ...colLabels.map((col) => (
        <div
          key={`${rowLabel}-${col}`}
          className="cell "
          data-coordinate={`${rowLabel}-${col}`}
        >
          {`${rowLabel}-${col}`}
        </div>
      )),
    ]),
  ];

  return (
    <div id={gridId} className="grid">
      {gridCells}
    </div>
  );
};

export default BattleshipPinGrid;
