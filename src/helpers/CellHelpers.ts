import { CellData } from '../types/index';

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
