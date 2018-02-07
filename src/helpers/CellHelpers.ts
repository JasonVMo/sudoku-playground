import { CellData } from '../types/index';

export function BlankPencilArray(): Array<boolean> {
    return [false, false, false, false, false, false, false, false, false];
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
