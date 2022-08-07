import { ShikariGrid } from "@maze/utils/utils";
import Cell from "./cell";

export default class Grid implements ShikariGrid {
    public readonly cols: number;
    public readonly rows: number;
    private speed: number = 0;
    private delta: number = 16;
    private grid: Array<Cell> = [];
    private currentCell: Cell | undefined;
    private stack: Array<Cell> = [];
    private canvasRef: HTMLCanvasElement | null = null;
    private wasShuffled: boolean = false;
    private resolutionPath: Array<Cell> = [];
    private count: number = 0;

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

    private visit(cell: Cell) {
        // Stop when shuffled
        if (this.wasShuffled) return;

        const next = cell.getNeighbors(this.grid);

        if (cell === this.grid[this.grid.length - 1]) {
            Object.freeze(this.resolutionPath);
        }

        const wasPathFound: boolean = Object.isFrozen(this.resolutionPath);

       if (next) {
            this.stack.push(cell);
            if (!wasPathFound) this.resolutionPath.push(cell);
            cell = next;
            cell.colorReset();
            setTimeout(() => this.visit(cell), this.speed);
       } else {
            if (this.stack.length) {
                const last = this.stack.pop();
                if (!wasPathFound) this.resolutionPath.pop();
                if (last) {
                    setTimeout(() => {
                        this.visit(last)
                    }, this.speed);
                }
            }
       }
    }

    public draw(el: HTMLCanvasElement): boolean {
        // Restart if shuffled
        if (this.wasShuffled) {
            this.wasShuffled = false;
            this.stack = [];
            this.currentCell = this.grid[0];
        }

        this.canvasRef = el;
        this.generate();

        // Display the cells
        for (let i = 0; i < this.grid.length; i++) {
            const cell = this.grid[i];
            cell.show(el, false);
        }
        this.visit(this.currentCell!);
        return true;
    }

    public shuffle(): boolean {
        if (!this.canvasRef) return false;

        // Clear the canvas
        const context = this.canvasRef.getContext('2d');
        context!.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);

        // Shuffle the grid
        this.grid = [];
        this.generate();
        this.wasShuffled = true;
        return this.draw(this.canvasRef);
    }

    public pathFinder(): void {
        if (this.count > this.resolutionPath.length) return;
        
        if (this.count  === this.resolutionPath.length) {
            this.grid[this.grid.length - 1].pathColor();
        }
        this.pathHighlighter(this.resolutionPath[this.count]).next();
        this.count++;
        setTimeout(() => this.pathFinder(), this.speed);
    }

    private *pathHighlighter(c: Cell) {
        if (c) c.pathColor();
    }
}