import { CellData } from '../types/index';

export function ClearRowMarks(cells: Array<CellData>, index: number): void {
    let probe: number = index - (index % 9);
    let end: number = probe + 9;
    let val: number = cells[index].value;

    for (; probe < end; probe++) {
        if (probe !== index) {
            cells[probe].marks[val - 1] = false;
        }
    }
}

export function ClearColMarks(cells: Array<CellData>, index: number): void {
    let val: number = cells[index].value;

    for (let probe = (index % 9); probe < 81; probe += 9) {
        if (probe !== index) {
            cells[probe].marks[val - 1] = false;
        }
    }
}

const cellStep: Array<number> = [0, 1, 2, 9, 10, 11, 18, 19, 20];

export function ClearGridMarks(cells: Array<CellData>, index: number): void {
    let row: number = Math.floor(index / 9);
    row = Math.floor(row / 3) * 3;
    let col: number = Math.floor((index % 9) / 3) * 3;
    let probe: number = (row * 9) + col;
    let val: number = cells[index].value;

    for (let i = 0; i < 9; i++) {
        if ((probe + cellStep[i]) !== index) {
            cells[probe + cellStep[i]].marks[val - 1] = false;
        }
    }
}

export function ClearMarksForPoint(cells: Array<CellData>, index: number): void {
    if (cells[index].shown) {
        ClearRowMarks(cells, index);
        ClearColMarks(cells, index);
        ClearGridMarks(cells, index);
    }
}

export function FillMarks(cells: Array<CellData>): void {
    // set all non-shown marks on
    for (let i: number = 0; i < 81; i++) {
        if (!cells[i].shown) {
            cells[i].marks = [true, true, true, true, true, true, true, true, true];
        }
    }
    // now clear the marks for each point
    for (let i: number = 0; i < 81; i++) {
        ClearMarksForPoint(cells, i);
    }
}