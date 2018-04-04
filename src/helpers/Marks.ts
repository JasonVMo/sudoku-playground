import { CellData } from "../types";
import { BlankPencilArray } from "./CellHelpers";

export interface CellValueCounts {
    rowMask: Array<Array<number>>;
    colMask: Array<Array<number>>;
    gridMask: Array<Array<number>>;
}

export function MaskValues(cellSet: Array<CellData>): Array<boolean> {
    let results: Array<boolean> = BlankPencilArray();
    for (let i: number = 0, length: number = cellSet.length; i < length; i++) {
        if (cellSet[i].shown) {
            results[cellSet[i].value - 1] = true;
        }
    }
    return results;
}
