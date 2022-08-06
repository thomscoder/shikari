import { ShikariCell, ShikariGrid, ShikariWalls } from "@maze/utils/utils";

export default class Cell implements ShikariCell {
    public readonly posX: number;
    public readonly posY: number;
    // Delta represents the size of each cell
    private delta: number;
    // Each cell starts with all 4 walls: top, right, bottom, left
    private walls: Map<string, boolean>;
    private ctx: CanvasRenderingContext2D | null;
    public visited: boolean = false;
    private canvasRef: HTMLCanvasElement | null = null;
    private x: number;
    private y: number;

    constructor(public _x: number, public _y: number, public _delta: number) {
        this.posX = _x;
        this.posY = _y;
        this.delta = _delta;

        this.x = this.posX * this.delta;
        this.y = this.posY * this.delta;

        this.walls = new Map([
            ["top", true], 
            ["right", true], 
            ["bottom", true], 
            ["left", true]
        ]);
        this.ctx = null;
    }

    public show(c: HTMLCanvasElement) {
        if (!this.canvasRef) this.canvasRef = c;
        // calculate x coordinates for the cell
        // x coordinate times delta
        const x = this.x;
        // y coordinate times delta
        const y = this.y;
        // Draw a rectangle at the calculated x and y coordinates
        this.rect(x, y, c);
    }

    private rect(x: number, y: number, c: HTMLCanvasElement) {
        this.ctx = c.getContext("2d");
        
        this.ctx?.beginPath();
        
        this.ctx!.strokeStyle = "#fff";

        // Draws each wall separately
        this.renderWalls(x, y);
    }

    private renderWalls(x: number, y: number) {
        const { delta } = this;
        // top left corner
        this.ctx?.moveTo(x, y);
        if (this.walls.get("top")) {
            this.ctx?.lineTo(x + delta, y);
        }
        // top right corner
        this.ctx?.moveTo(x + delta, y);
        if (this.walls.get("right")) {
            this.ctx?.lineTo(x + delta, y + delta);
        }
        // bottom right corner
        this.ctx?.moveTo(x + delta, y + delta);
        if (this.walls.get("bottom")) {
            this.ctx?.lineTo(x, y + delta);
        }
        // bottom left corner
        this.ctx?.moveTo(x, y + delta);
        if (this.walls.get("left")) {
            this.ctx?.lineTo(x, y);
        }

        this.ctx?.stroke();
    }

    public wasVisited(): boolean {
        // Clear and redraw each cell with updated walls
        this.redraw();

        return this.visited = true;
    }

    private getNext(grid: Cell[], x: number, y: number, result: Array<Cell>): Cell {
        const cell = grid.find(c => c.posX === x && c.posY === y);
        if (cell && !cell.visited) result.push(cell);
        return cell!;
    }

    public getNeighbors(grid: Cell[], width: number, height: number): (Cell | undefined) {
        this.wasVisited();
        

        const neighbors: Cell[] = [];

        const top = this.getNext(grid, this.posX, this.posY - 1, neighbors);
        const right = this.getNext(grid, this.posX + 1, this.posY, neighbors);
        const bottom = this.getNext(grid, this.posX, this.posY + 1, neighbors);
        const left = this.getNext(grid, this.posX - 1, this.posY, neighbors);

        const nextCell = neighbors[Math.floor(Math.random() * neighbors.length)];
        
        if (!nextCell) return undefined;
        this.removeWalls(this, nextCell);

        return nextCell;
    }

    private removeWalls(current: Cell, next: Cell) {
        const x = current.posX - next.posX;
        const y = current.posY - next.posY;

        if (x === 1) {
            current.walls.set("left", false);
            next.walls.set("right", false);
        } else if (x === -1) {
            current.walls.set("right", false);
            next.walls.set("left", false);
        } else if (y === 1) {
            current.walls.set("top", false);
            next.walls.set("bottom", false);
        } else if (y === -1) {
            current.walls.set("bottom", false);
            next.walls.set("top", false);
        }
    }


    private clear(x: number, y: number): void {
        return this.ctx?.clearRect(x, y, this.delta, this.delta);
    }

    highlight(x: number, y: number) {
        this.ctx!.fillStyle = "#1e1e1e";
        this.ctx?.fillRect(x, y, this.delta, this.delta);
    }

    redraw() {
        const x = this.x;
        const y = this.y;

        this.clear(x, y);
        this.highlight(x, y);
        this.show(this.canvasRef!);
    }

    colorReset() {
        const x = this.x;
        const y = this.y;

        this.ctx!.fillStyle = "#ff0";
        this.ctx!.fillRect(x, y, this.delta, this.delta);
    }

}