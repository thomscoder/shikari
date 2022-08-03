import { ShikariCanvas } from "@site/maze/utils/utils";
// import css
import classes from './grid-container.module.css';


function GridContainer({width, height, id}: ShikariCanvas): JSX.Element {
    return (
        <div className="canvas">
            <canvas id={id} width={width} height={height} className={classes.gridContainer}></canvas>
        </div>

    )
}

export default GridContainer;