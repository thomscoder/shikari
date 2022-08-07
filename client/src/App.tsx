import { useState } from "react";
import GridContainer from "./components/grid-container/GridContainer";

function App(): JSX.Element {
  const [drawGrid, setDrawGrid] = useState<number>(0);

  const createGrid = (e: any) => {
    e.preventDefault();
    let el = document.getElementById("grid-size") as HTMLSelectElement;
    let value = el.value;
    let text = el.options[el.selectedIndex].text;
    const size = parseInt(text);
    setDrawGrid(size);
  }

  const clear = () => {
    setDrawGrid(0);
  }

  return (
    <div className="App">
      <form onSubmit={createGrid}>
        <select id="grid-size" onSelect={createGrid} defaultValue="400">
          <optgroup label="Select maze size">
            <option value="800">800</option>
            <option value="400">400</option>
            <option value="200">200</option>
          </optgroup>
        </select>
        <button type="submit">Create Maze</button>
      </form>
      {drawGrid !== 0 && 
        <>
          <GridContainer width={drawGrid} height={drawGrid} id="grid-container" />
          <button onClick={clear}>Clear</button>
        </>
  }
    </div>
  )
}

export default App
