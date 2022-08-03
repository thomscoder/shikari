import GridContainer from "./components/grid-container/GridContainer";

function App(): JSX.Element {

  return (
    <div className="App">
      <GridContainer 
        width={400}
        height={400}
        id="canvas"
      />
    </div>
  )
}

export default App
