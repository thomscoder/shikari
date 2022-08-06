import Grid from "../../maze/helpers/grid";
import { ShikariCanvas } from "@site/maze/utils/utils";
import { useEffect } from "react";

// import css
import classes from './grid-container.module.css';


function GridContainer({width, height, id}: ShikariCanvas): JSX.Element {
    useEffect(() => {
        const canvas = document.getElementById(id) as HTMLCanvasElement;
        const grid = new Grid(width, height);
        grid.draw(canvas);
    });
    return (
        <canvas id={id} width={width} height={height} className={classes.gridContainer}></canvas>
    )
}

export default GridContainer;