import { CellData } from '../types/index';
import { CellName } from '../helpers/RowCol';

export enum UpdateType {
    Solve,
    Mark,
    Unmark
}

export class CellUpdate {
    type: UpdateType;
    index: number;
    value: number;

    constructor(updateType: UpdateType, index: number, value: number) {
        this.type = updateType;
        this.index = index;
        this.value = value;
    }

    text(): string {
        let actionText: string = '';
        switch (this.type) {
            case UpdateType.Solve:
                actionText = 'S:';
                break;
            case UpdateType.Mark:
                actionText = 'M:';
                break;
            case UpdateType.Unmark:
                actionText = 'U:';
                break;
            default:
                break;
        }
        return actionText + CellName(this.index) + ':' + this.value;
    }
}

export function ApplyUpdateToCell(cell: CellData, update: CellUpdate, revert: boolean = false) {
    switch (update.type) {
        case UpdateType.Solve:
            cell.shown = !revert;
            break;
        case UpdateType.Mark:
            cell.marks[update.value - 1] = !revert;
            break;
        case UpdateType.Unmark:
            cell.marks[update.value - 1] = revert;
            break;
        default:
    }
}

export function UpdateOrRevertCell(cell: CellData, revert: boolean, ...updates: Array<CellUpdate>): CellData {
    // copy the values to modify them without modifying cell
    let newCell: CellData = {
        index: cell.index,
        value: cell.value,
        shown: cell.shown,
        marks: cell.marks.slice(0)
    };

    // apply the updates
    for (let update of updates) {
        ApplyUpdateToCell(newCell, update, revert);
    }

    return newCell;
}

/*
    This will apply one or more cell updates to a cell and return a new CellData with all the modifications
    applied.  Written this way to be used in reducers.
*/
export function UpdateCell(cell: CellData, ...updates: Array<CellUpdate>): CellData {
    return UpdateOrRevertCell(cell, false, ...updates);
}

/*
    Same as the UpdateCell call but will effectively undo the action
*/
export function RevertCell(cell: CellData, ...reversions: Array<CellUpdate>): CellData {
    return UpdateOrRevertCell(cell, true, ...reversions);
}
