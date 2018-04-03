import { CellData } from '../types/index';

export function BlankPencilArray(): Array<boolean> {
    return [false, false, false, false, false, false, false, false, false];
}

export function CreateInitialCells(): Array<CellData> {
  let cells: Array<CellData> = new Array<CellData>(81);
  for (let i: number = 0; i < 81; i++) {
      cells[i] = { index: i, value: 0, shown: false, marks: BlankPencilArray() };
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
