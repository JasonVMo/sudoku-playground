import { CellData, SolveResult } from '../types/index';

export function BlankPencilArray(): Array<boolean> {
    return [false, false, false, false, false, false, false, false, false];
}

export function DuplicateCells(cells: Array<CellData>): Array<CellData> {
    return cells.map((value: CellData) => {
        return {
            ...value, 
            marks: value.marks.map((mark: boolean) => {
                return mark;
            })
        };
    });
}

export function BlankCountArray(): Array<number> {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0];
}

export function BlankCountSet(): Array<Array<number>> {
    let result: Array<Array<number>> = new Array<Array<number>>(9);
    for (let i = 0; i < 9; i++) {
        result[i] = BlankCountArray();
    }
    return result;
}

export function CreateSolveResult(initialCells: Array<CellData>): SolveResult {
    let result: SolveResult = {
        success: false, 
        result: 'Failed to solve',
        rowCount: BlankCountSet(),
        colCount: BlankCountSet(),
        gridCount: BlankCountSet(),
        cells: DuplicateCells(initialCells) 
    };

    // now count the marks
    for (let i = 0; i < 81; i++) {
        if (!initialCells[i].shown) {
            let row = Math.floor(i / 9);
            let col = i % 9;
            let grid = (Math.floor(row / 3) * 3) + Math.floor(col / 3);
            for (let m = 0; m < 81; m++) {
                if (initialCells[i].marks[m]) {
                    result.rowCount[row][m]++;
                    result.colCount[col][m]++;
                    result.gridCount[grid][m]++;
                }
            }
        }
    }

    // finally return the new solver result
    return result;
}

export function GetRow(index: number): number {
    return (Math.floor(index / 9));
}

export function GetColumn(index: number): number {
    return (index % 9);
}

export function GetGrid(index: number): number {
    return (Math.floor(GetRow(index) / 3) * 3) + Math.floor(GetColumn(index) / 3);
}

export function SameRow(base: number, probe: number): boolean {
    return (Math.floor(base / 9) === Math.floor(probe / 9));
}

export function SameColumn(base: number, probe: number): boolean {
    return ((base % 9) === (probe % 9));
}

export function SameGrid(base: number, probe: number): boolean {
    // if it is in the same three rows...
    if (Math.floor(base / 27) === Math.floor(probe / 27)) {
        // and the same three columns ...
        if (Math.floor((base % 9) / 3) === Math.floor((probe % 9) / 3)) {
            return true;
        }
    }
    return false;
}

export function SameRowColumnGrid(base: number, probe: number): boolean {
    return SameRow(base, probe) || SameColumn(base, probe) || SameGrid(base, probe);
}

export function CreateInitialCells(): Array<CellData> {
  let cells: Array<CellData> = new Array<CellData>(81);
  for (let i: number = 0; i < 81; i++) {
      cells[i] = { value: 0, shown: false, marks: BlankPencilArray() };
  }
  return cells;
}

export function CellsFromBoardString(newBoard: string): Array<CellData> {
    let cells: Array<CellData> = CreateInitialCells();
    cells.forEach((cellValue: CellData, index: number) => {
        let newVal: number = parseInt(newBoard[index * 2], 10);
        if (newVal >= 0 && newVal <= 9) {
            cellValue.value = newVal;
        }
        cellValue.shown = (newBoard[(index * 2) + 1] !== '-');
    });
    return cells;
}
