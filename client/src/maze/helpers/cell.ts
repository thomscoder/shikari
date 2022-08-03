import { ShikariCell } from "@maze/utils/utils";

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
}