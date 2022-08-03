import Cell from "@maze/helpers/cell";

export type ShikariCanvas = {
    width: number;
    height: number;
    id: string;
}

export interface ShikariGrid {
    readonly cols: number;
    readonly rows: number;
    draw: (el: HTMLCanvasElement) => void;
}

export interface ShikariCell {
    readonly posX: number;
    readonly posY: number;
    visited: boolean;
    show: (c: HTMLCanvasElement) => void;
}