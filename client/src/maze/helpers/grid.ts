import { ShikariGrid } from "@maze/utils/utils";
import Cell from "./cell";

export default class Grid implements ShikariGrid {
    public readonly cols: number;
    public readonly rows: number;
    private speed: number = 200;
    private delta: number = 40;
    private grid: Array<Cell> = [];
    private currentCell: Cell | undefined;
    private stack: Array<Cell> = [];

    constructor(width: number = 400, height: number = 400) {
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
        this.currentCell = this.grid[0];
        
    }

    public draw(el: HTMLCanvasElement): void {
        this.generate();

        // Display the cells
        for (let i = 0; i < this.grid.length; i++) {
            const cell = this.grid[i];
            cell.show(el);
        }
        this.visit(this.currentCell!);
    }

    public visit(cell: Cell) {
        const next = cell.getNeighbors(this.grid, this.cols, this.rows);

       if (next) {
            this.stack.push(cell);
            cell = next;
            setTimeout(() => this.visit(cell), this.speed);
       } else {
            if (this.stack.length) {
                const last = this.stack.pop();
                if (last) {
                    setTimeout(() => this.visit(last), this.speed);
                }
            }
       }
    }
}