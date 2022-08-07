import Cell from "@maze/helpers/cell";

export type ShikariWalls = Map<string, boolean>;

export type ShikariCanvas = {
    width: number;
    height: number;
    id: string;
}

export interface ShikariGrid {
    readonly cols: number;
    readonly rows: number;
    draw: (el: HTMLCanvasElement) => boolean;
    shuffle: () => boolean;
    pathFinder: () => void;
}

export interface ShikariCell {
    readonly posX: number;
    readonly posY: number;
    visited: boolean;
    show: (c: HTMLCanvasElement) => void;
    getNeighbors: (grid: Cell[], width: number, height: number, cell: Cell) => void;
    wasVisited: () => boolean;
    redraw: () => void;
    highlight: (x: number, y: number, color: string) => void;
    pathColor: () => void;
    colorReset: () => void;
}