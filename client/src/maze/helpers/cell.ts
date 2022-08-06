import { ShikariCell, ShikariGrid } from "@maze/utils/utils";

export default class Cell implements ShikariCell {
    public readonly posX: number;
    public readonly posY: number;
    // Delta represents the size of each cell
    private delta: number;
    // Each cell starts with all 4 walls: top, right, bottom, left
    private walls: Map<string, boolean> = new Map([
        ["top", true], 
        ["right", true], 
        ["bottom", true], 
        ["left", true]
    ]);
    public visited: boolean = false;

    constructor(public x: number, public y: number, public _delta: number) {
        this.posX = x;
        this.posY = y;
        this.delta = _delta;
    }

    public show(c: HTMLCanvasElement) {
        // calculate x coordinates for the cell
        // x coordinate times delta
        const x = this.posX * this.delta;
        // y coordinate times delta
        const y = this.posY * this.delta;
        // Draw a rectangle at the calculated x and y coordinates
        this.rect(x, y, this.delta, c);
    }

    private rect(x: number, y: number, delta: number, c: HTMLCanvasElement) {
        const ctx = c.getContext("2d");
        
        ctx?.beginPath();
        
        ctx!.strokeStyle = "#fff";

        const self = this;
        renderWalls();
        // ctx?.rect(x, y, delta, delta);
        ctx?.stroke();

        if (this.visited) {
            ctx!.fillStyle = "#ff0000";
            ctx!.fillRect(x, y, delta, delta);
        }

        //Draw each walls separately
        function renderWalls() {
            // top left corner
            ctx?.moveTo(x, y);
            if (self.walls.get("top")) ctx?.lineTo(x + delta, y);
            // top right corner
            ctx?.moveTo(x + delta, y);
            if (self.walls.get("right")) ctx?.lineTo(x + delta, y + delta);
            // bottom right corner
            ctx?.moveTo(x + delta, y + delta);
            if (self.walls.get("bottom")) ctx?.lineTo(x, y + delta);
            // bottom left corner
            ctx?.moveTo(x, y + delta);
            if (self.walls.get("left")) ctx?.lineTo(x, y);
        }
    }

    public wasVisited() {
        this.visited = true;
    }

    private getNextCell(grid: Cell[], x: number, y: number, cells: Cell[]): (Cell | undefined) {
        const cell = grid.find(c => c.posX === x && c.posY === y);
        if (!cell) return undefined;
        cells.push(cell);
        return cell;
    }

    public getNextCells(grid: Cell[], width: number, height: number): (Cell | undefined) {
        this.wasVisited();
        const cells: Cell[] = [];
        const top = this.getNextCell(grid, this.posX, this.posY - 1, cells);
        const right = this.getNextCell(grid, this.posX + 1, this.posY, cells);
        const bottom = this.getNextCell(grid, this.posX, this.posY + 1, cells);
        const left = this.getNextCell(grid, this.posX - 1, this.posY, cells);
        
        const nextCell = cells[Math.floor(Math.random() * cells.length)];
        console.log(nextCell);

        if (!nextCell) return undefined;
        return nextCell;
    }

}