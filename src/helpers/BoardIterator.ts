export enum IteratorType {
    Row,
    Column,
    Grid,
    RowColGrid
}

const gridOffset: Array<number> = [0, 1, 2, 9, 10, 11, 18, 19, 20, 81];

export class BoardIterator {
    private start: number;
    private step: number;
    private seedIndex: number;
    private skipIndex: boolean;
    private iterType: IteratorType;
    private rowColGrid: boolean;

    constructor(iterType: IteratorType, seedIndex: number, skipSeed: boolean = true) {
        this.seedIndex = seedIndex;
        this.skipIndex = skipSeed;
        this.setTypeInternal(iterType, true);
    }

    setType(iterType: IteratorType) { this.setTypeInternal(iterType, true); }

    valid(): boolean {
        return this.step < 9;
    }

    begin(): number {
        this.step = 0;
        return this.get();
    }

    end(): number { return 81; }

    get(): number {
        if (this.step >= 9) {
            return 81;
        }
        switch (this.iterType) {
            case IteratorType.Column:
                return this.start + (this.step * 9);
            case IteratorType.Grid:
                return this.start + (gridOffset[this.step]);
            case IteratorType.Row:
            default:
                return this.start + this.step;
        }
    }

    next(): number {
        this.step++;
        if (this.step >= 9 && this.rowColGrid && this.iterType !== IteratorType.Grid) {
            if (this.iterType === IteratorType.Row) {
                this.setTypeInternal(IteratorType.Column, false);
            } else if (this.iterType === IteratorType.Column) {
                this.setTypeInternal(IteratorType.Grid, false);
            }
            return this.begin();
        }
        let result: number = this.get();
        if (this.skipIndex !== undefined && this.seedIndex === result) {
            this.step++;
            result = this.get();
        }
        return result;
    }

    private setTypeInternal(iterType: IteratorType, fromUser: boolean): void {
        if (fromUser) {
            this.rowColGrid = (iterType === IteratorType.RowColGrid);
            if (this.rowColGrid) {
                iterType = IteratorType.Row;
            }
        }
        this.iterType = iterType;
        this.step = 0;
        let row = Math.floor(this.seedIndex / 9);
        let col = this.seedIndex % 9;
        
        switch (iterType) {
            case IteratorType.Row:
                this.start = row * 9;
                break;
            case IteratorType.Column:
                this.start = col;
                break;
            case IteratorType.Grid:
                this.start = (Math.floor(col / 3) * 3) + ((Math.floor(row / 3) * 3) * 9);
                break;
            default:
                this.start = 0;
                break;
        }
    }
}