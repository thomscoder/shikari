import { ShikariCell } from "../utils/utils";

export default class Cell implements ShikariCell {
    public readonly posX: number;
    public readonly posY: number;
    // Delta represents the size of each cell
    private delta: number;

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
        ctx?.rect(x, y, delta, delta);
        ctx!.strokeStyle = "#fff";
        ctx?.stroke();
    }
}