import { SolveResult } from "./SolveResult";
import { GetCellSubarray, FilterType, FilterToText, KeyIndexOfType } from "../helpers/RowCol";
import { CellData } from "../types";
import { SolveCell } from "./SolveCell";

export function SingleChoice(result: SolveResult): boolean {
    // first look for there being only one viable choice in a cell
    for (let cell of result.cells) {
        if (!cell.shown) {
            let foundVal: number|undefined = undefined;
            for (let m = 0; m < 9; m++) {
                if (cell.marks[m]) {
                    if (foundVal) {
                        foundVal = undefined;
                        break;
                    }
                    else {
                        foundVal = m + 1;
                    }
                }
            }
            if (foundVal) {
                result.operation += 'Single choice.';
                return SolveCell(cell.index, cell.value, result);
            }
        }
    }
    return false;
}

function AnalyzeSetForSingle(cells: Array<CellData>, result: SolveResult, direction: FilterType): boolean {
    // the set of cells is either a row, column, or grid
    let counts: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let cell of cells) {
        for (let m = 0; m < 9; m++) {
            if (cell.marks[m]) {
                counts[m] ++;
            }
        }
    }

    // see if there were any with a count of only 1
    for (let i: number = 0; i < counts.length; i++) {
        if (counts[i] === 1) {
            // now rescan the set to find that number and solve it
            for (let cell of cells) {
                if (cell.marks[i]) {
                    result.operation += 'Single in ' + FilterToText(direction) + ',';
                    return SolveCell(cell.index, i + 1, result);
                }
            }
        }
    }

    return false;
}

export function SingleRowColGrid(result: SolveResult): boolean {
    let filters: Array<FilterType> = [ FilterType.Row, FilterType.Col, FilterType.Grid ];

    for (let filter of filters) {
        for (let i = 0; i < 9; i++) {
            let cellSet: Array<CellData> = GetCellSubarray(result.cells, filter, KeyIndexOfType(i, filter), false);
            if (AnalyzeSetForSingle(cellSet, result, filter)) {
                return true;
            }
        }
    }

    return false;
}
