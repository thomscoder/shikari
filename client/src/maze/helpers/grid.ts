import { ShikariGrid } from "../utils/utils";
import Cell from "./cell";

export default class Grid implements ShikariGrid {
    public readonly cols: number;
    public readonly rows: number;
    private delta: number = 40;
    private grid: Array<Cell> = [];

    constructor(width: number, height: number) {
        this.cols = Math.floor(width / this.delta);
        this.rows = Math.floor(height / this.delta);
    }

    private generate() {
        // For each column, generate a row
        for (let i = 0; i < this.cols; i++) {
            for (let j = 0; j < this.rows; j++) {
                // Generate a cell
                // Add the cell to the grid
                const cell = new Cell(i, j, this.delta);
                this.grid.push(cell);
            }
        }
    }

    public draw(el: HTMLCanvasElement) {
        this.generate();
        // Display the cells
        for (let i = 0; i < this.grid.length; i++) {
            const cell = this.grid[i];
            cell.show(el);
        }
    }
}