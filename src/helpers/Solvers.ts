import { CellData, SolveResult } from '../types/index';
import { GetRow, GetColumn, GetGrid } from '../helpers/CellHelpers';
import { BoardIterator, IteratorType } from '../helpers/BoardIterator';

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

function CountMarks(marks: Array<boolean>): number {
    let count = 0;
    for (let i = 0; i < 9; i++) {
        if (marks[i]) {
            count++;
        }
    }
    return count;
}

function ClearMarkForCell(result: SolveResult, index: number, value: number): boolean {
    let valIndex = value - 1;
    if (!result.cells[index].shown && result.cells[index].marks[valIndex]) {
        if (result.cells[index].value === value) {
            result.result += ' ERROR: Trying to remove mark for ' + value + ' from ' + CellName(index);
            return false;
        }
        result.cells[index].marks[valIndex] = false;
        result.rowCount[GetRow(index)][valIndex]--;
        result.colCount[GetColumn(index)][valIndex]--;
        result.gridCount[GetGrid(index)][valIndex]--;
        result.result += ' Unmark:' + CellName(index) + ':' + value;
        return true;
    }
    return false;
}

function CellName(index: number): string {
    let rowVal: number = GetRow(index) + 1;
    let col: number = GetColumn(index);
    const letters: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    return letters[col] + rowVal;
}

function SetCellSolved(result: SolveResult, index: number, testVal: number | undefined = undefined): void {
    if (!result.cells[index].shown) {
        let val: number = result.cells[index].value;
        if (testVal !== undefined && testVal !== val) {
            result.result += ' ERROR! ' + testVal + ' does not equal ' + val;
            return;
        }
        // valid solve
        result.cells[index].shown = true;
        result.result += ' Set ' + CellName(index) + ' to ' + val;
        let iter: BoardIterator = new BoardIterator(IteratorType.RowColGrid, index);
        for (let i: number = iter.begin(); iter.valid(); i = iter.next()) {
            result.result += '<' + CellName(i) + '>';
            ClearMarkForCell(result, i, val);
        }
    }
    
}

export function CheckForSingles(result: SolveResult): boolean {
    // look for a single candidate in a given cell
    for (let i: number = 0; i < 81; i++) {
        if (!result.cells[i].shown) {
            let count = CountMarks(result.cells[i].marks);
            if (count === 1) {
                for (let m = 0; m < 9; m++) {
                    if (result.cells[i].marks[m]) {
                        result.result = 'Only one possible candidate for cell';
                        SetCellSolved(result, i, m + 1);
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

export function SolveOnce(result: SolveResult): void {
    result.success = CheckForSingles(result);
}