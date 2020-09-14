import React, { useState, useRef, useCallback, useEffect } from 'react';
import Nav from './components/Nav'
import produce from "immer"
import './App.css';

const numRows = 40;
const numCols = 40;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0]
]

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};

function App() {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });

  const [simulationSpeed, setSimulationSpeed] = useState(600);
  const [running, setRunning] = useState(false);

  const speedRef = useRef(simulationSpeed);
  speedRef.current = simulationSpeed;

  const runningRef = useRef(running);
  runningRef.current = running

  const runSimulation = useCallback(() => {

    if (!runningRef.current) {
      return;
    }
    //simulate
    setGrid((g) => {
      // iterate through the current grid g
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            // Compute the number of neighbors
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              // Check and make sure we don't go out of bounds
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK]
              }
            })
            // Once neighbors are known apply the game of life condition
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
    if (speedRef.current === 0) return null
    else setTimeout(runSimulation, speedRef.current)
  }, []);

  return (
    <>
    <Nav setRunning={setRunning} running={running} runningRef={runningRef} runSimulation={runSimulation} setGrid={setGrid} 
    generateEmptyGrid={generateEmptyGrid} numCols={numCols} numRows={numRows} setSimulationSpeed={setSimulationSpeed} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numCols}, 20px)`
      }} className="App">
        {grid.map(((rows, i) => 
          rows.map((col, k) => {
            return (
              <div
              key={`${i}-${k}`} 
              onClick={() => {
                const newGrid = produce(grid, gridCopy => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                })
                setGrid(newGrid)
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? "#6f8695" : undefined,
                border: '1px solid #26ba70'
              }} />
            )
        })))}
      </div>
    </>
  );
}

export default App;
