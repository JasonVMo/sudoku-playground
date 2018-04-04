import { CellData } from '../types';
import { CellUpdate, UpdateType, UpdateCell, RevertCell } from '../helpers/CellUpdate';

const resultTextDelim: string = '|';
const resultTextClosing: string = '\n';

export class SolveResult {
    cells: Array<CellData>;
    updates: Array<CellUpdate>;
    operation: string;

    constructor(cells: Array<CellData>) {
        this.cells = cells;
        this.updates = [];
        this.operation = '';
    }

    hasChanges(): boolean { 
        return this.updates.length > 0;
    }

    add(updateType: UpdateType, index: number, value: number) {
        this.updates.push(new CellUpdate(updateType, index, value));
    }

    resultText(): string {
        let updateText: string|undefined = undefined;
        for (let update of this.updates) {
            if (updateText) {
                updateText = updateText + resultTextDelim + update.text();
            } else {
                updateText = update.text();
            }
        }
        return this.operation + '->' + updateText + resultTextClosing;
    }

    /*
        Return the cell array with the update list applied to it or with the list undone
    */
    reducedCellArray(undo: boolean = false): Array<CellData> {
        if (this.updates.length > 0) {
            let updateList: Array<Array<CellUpdate>> = this.IndexUpdatesFromUpdateList();
            return this.cells.map((cellValue: CellData, index: number) => {
                if (!updateList[index]) {
                    return { ...cellValue };
                }
                return !undo ? UpdateCell(cellValue, ...updateList[index]) 
                            : RevertCell(cellValue, ...updateList[index]);
            });    
        }
        return this.cells;
    }

    /*
        Turn an array of updates that are sequential into an array of arrays where the first array is an
        81 place array corresponding to cell index
    */
    private IndexUpdatesFromUpdateList(): Array<Array<CellUpdate>> {
        let result: Array<Array<CellUpdate>> = [];
        result.length = 81;
    
        for (let update of this.updates) {
            let index = update.index;
            if (index >= 0 && index < 81) {
                if (!result[index]) {
                    result[index] = [];
                }
                result[index].push(update);
            }
        }
    
        return result;
    }
}
