import { ShikariGrid } from "../utils/utils";
import Cell from "./cell";

export default class Grid implements ShikariGrid {
    public readonly cols: number;
    public readonly rows: number;
    private delta: number = 40;
    private grid: Array<Cell> = [];
    private currentCell: Cell | undefined;

    constructor(width: number, height: number) {
        this.cols = Math.floor(width / this.delta);
        this.rows = Math.floor(height / this.delta);
        this.currentCell = undefined;
    }

    private generate(): void {
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

    public draw(el: HTMLCanvasElement): void {
        this.generate();
        this.currentCell = this.grid[0];

        // Display the cells
        for (let i = 0; i < this.grid.length; i++) {
            this.currentCell!.visited = true;
            const cell = this.grid[i];
            cell.show(el);
        }
    }
}