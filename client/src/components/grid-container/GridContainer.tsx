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

    const pathFinder = () => {
        grid.pathFinder();
        setGrid(grid);
    }

    useEffect(() => {
        const canvas = document.getElementById(id) as HTMLCanvasElement;
        grid.draw(canvas);
    });
    return (
        <div className={classes.gridParentContainer}>
            <canvas id={id} width={width} height={height} className={classes.gridContainer}></canvas>
            <div className={classes.gridControllers}>
                <button onClick={shuffle}>Shuffle</button>
                <button onClick={pathFinder}>Find Path</button>
            </div>
        </div>
    )
}

export default GridContainer;