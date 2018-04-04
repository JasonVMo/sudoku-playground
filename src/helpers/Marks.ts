import { CellData } from '../types';
import { BlankPencilArray } from './CellHelpers';
import { GetRow, GetColumn, GetGrid } from './RowCol';
import { CellUpdate, UpdateType } from './CellUpdate';

export interface CellValueMask {
    rowMask: Array<Array<boolean>>;
    colMask: Array<Array<boolean>>;
    gridMask: Array<Array<boolean>>;
}

function BlankMaskArray(): Array<Array<boolean>> {
    let result: Array<Array<boolean>> = [];
    result.length = 9;
    for (let i: number = 0; i < 9; i++) {
        result[i] = BlankPencilArray();
    }
    return result;
}

function CreateBlankValueMask(): CellValueMask {
    return {
        rowMask: BlankMaskArray(),
        colMask: BlankMaskArray(),
        gridMask: BlankMaskArray()
    };
}

export function GetCellValueMask(cells: Array<CellData>): CellValueMask {
    let mask: CellValueMask = CreateBlankValueMask();
    for (let i: number = 0; i < 81; i++) {
        if (cells[i].shown) {
            let valueIndex: number = cells[i].value - 1;
            mask.rowMask[GetRow(i)][valueIndex] = true;
            mask.colMask[GetColumn(i)][valueIndex] = true;
            mask.gridMask[GetGrid(i)][valueIndex] = true;
        }
    }
    return mask;
}

export function AddMarksForBoard(cells: Array<CellData>, update: Array<CellUpdate>) {
    let mask: CellValueMask = GetCellValueMask(cells);
    for (let i: number = 0; i < 81; i++) {
        if (!cells[i].shown) {
            let rowMask: Array<boolean> = mask.rowMask[GetRow(i)];
            let colMask: Array<boolean> = mask.colMask[GetColumn(i)];
            let gridMask: Array<boolean> = mask.gridMask[GetGrid(i)];
            for (let mark: number = 0; mark < 9; mark++) {
                if (!rowMask[mark] && !colMask[mark] && !gridMask[mark]) {
                    update.push(new CellUpdate(UpdateType.Mark, i, mark + 1));
                }
            }
        }
    }
}