import { useEffect, useState } from "react";
import GridContainer from "./components/grid-container/GridContainer";

function App(): JSX.Element {
  const [drawGrid, setDrawGrid] = useState<number>(0);
  const [gridSize, setGridSize] = useState<number>(0);
  const [pathSize, setPathSize] = useState<number>(0);

  const createGrid = (e: any) => {
    e.preventDefault();
    setDrawGrid(gridSize);
    setPathSize(parseInt(e.target[1].value));
  }

  const setGSize = (e: any) => {
    setGridSize(e.target.value);
  }

  const setPSize = (e: any) => {
  }

  const clear = () => {
    setDrawGrid(0);
  }

  return (
    <div className="App">
      <form onSubmit={createGrid}>
        <label htmlFor="grid-size">Maze Size</label>
        <input type="number" name="grid-size" onChange={setGSize} min="200"/>
        <label htmlFor="path-size">Path Width</label>
        <input type="number" name="path-size" onChange={setPSize}/>
        <button type="submit">Create Maze</button>
      </form>
      {drawGrid !== 0 && 
        <>
          <GridContainer width={drawGrid} height={drawGrid} delta={pathSize} id="grid-container" />
          <button onClick={clear}>Clear</button>
        </>
  }
    </div>
  )
}

export default App
