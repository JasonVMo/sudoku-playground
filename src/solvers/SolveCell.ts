import { SolveResult } from './SolveResult';
import { UpdateType } from '../helpers/CellUpdate';
import { GetCellSubarray, FilterType } from '../helpers/RowCol';
import { CellData } from '../types';

export function SolveCell(index: number, value: number, result: SolveResult): boolean {
    if (result.cells[index].value !== value) {
        result.operation += 'ERROR: Wrong value';
        return false;
    } else if (result.cells[index].shown) {
        result.operation += 'Already solved';
        return false;
    }

    // good to go so solve this cell
    result.operation += 'Solving cell';
    result.add(UpdateType.Solve, index, value);

    // now scan for marks to remove
    let markIndex: number = value - 1;
    let affectedCells: Array<CellData> = GetCellSubarray(result.cells, FilterType.RowColGrid, index, true);
    for (let cell of affectedCells) {
        if (cell.marks[markIndex]) {
            result.add(UpdateType.Unmark, cell.index, value);
        }
    }
    return true;
}