import { CellData, SolveResult2 } from '../types/index';
import { GetRow, GetColumn, GetGrid, CellName } from '../helpers/RowCol';
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

function ClearMarkForCell(result: SolveResult2, index: number, value: number): boolean {
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

function SetCellSolved(result: SolveResult2, index: number, testVal: number | undefined = undefined): boolean {
    if (!result.cells[index].shown) {
        let val: number = result.cells[index].value;
        if (testVal !== undefined && testVal !== val) {
            result.result += ' ERROR! ' + testVal + ' does not equal ' + val;
            return false;
        }
        // valid solve
        result.cells[index].shown = true;
        result.result += ' Set ' + CellName(index) + ' to ' + val;
        let iter: BoardIterator = new BoardIterator(IteratorType.RowColGrid, index);
        for (let i: number = iter.begin(); iter.valid(); i = iter.next()) {
            result.result += '<' + CellName(i) + '>';
            ClearMarkForCell(result, i, val);
        }
        return true;
    }
    return false;
}

/*
export function CheckRowColGridForSingles(result: SolveResult, counts: Array<Array<number>>, iterType: IteratorType): boolean {
    for (let i: number = 0; i < 9; i++) {
        for (let val: number = 0; val < 9; val++) {
            if (counts[i][val] === 1) {
                let seed: number;
                if (iterType === IteratorType.Row) {
                    seed = 
                }
                let iter: BoardIterator(iterType, , false);
            }
        }
    }
    return false;
}
*/

export function CheckForSingles(result: SolveResult2): boolean {
    // look for a single candidate in a given cell
    for (let i: number = 0; i < 81; i++) {
        if (!result.cells[i].shown) {
            let count = CountMarks(result.cells[i].marks);
            if (count === 1) {
                for (let m = 0; m < 9; m++) {
                    if (result.cells[i].marks[m]) {
                        result.result = 'Only one possible candidate for cell';
                        return SetCellSolved(result, i, m + 1);
                    }
                }
            }
        }
    }
    // look for candidates per row/col/grid
    for (let i: number = 0; i < 9; i++) {
        for (let val: number = 0; val < 9; val++) {
            if (result.rowCount[i][val] === 1) {
                let iter: BoardIterator = new BoardIterator(IteratorType.Row, i * 9, false);
                for (let index: number = iter.begin(); iter.valid(); index = iter.next()) {
                    if (result.cells[index].marks[val]) {
                        result.result = 'Only one value in row';
                        return SetCellSolved(result, index, val + 1);
                    }
                }
            }
        }
    }

    return false;
}

export function SolveOnce(result: SolveResult2): void {
    result.success = CheckForSingles(result);
}