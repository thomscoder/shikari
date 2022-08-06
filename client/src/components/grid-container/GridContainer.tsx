import Grid from "../../maze/helpers/grid";
import { ShikariCanvas } from "@site/maze/utils/utils";
import { useEffect, useState } from "react";

// import css
import classes from './grid-container.module.css';


function GridContainer({width, height, id}: ShikariCanvas): JSX.Element {
    const [grid, setGrid] = useState<Grid>(new Grid(width, height));

    const shuffle = () => {
        grid.shuffle();
        setGrid(grid);
    }

    useEffect(() => {
        const canvas = document.getElementById(id) as HTMLCanvasElement;
        grid.draw(canvas);
    });
    return (
        <>
            <canvas id={id} width={width} height={height} className={classes.gridContainer}></canvas>
            <button onClick={shuffle}>Shuffle</button>
        </>
    )
}

export default GridContainer;