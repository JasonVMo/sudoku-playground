import { GetRow, GetColumn, GetGrid, GetKeyForGrid } from "./RowCol";

export interface IBoardIterator {
    length(): number;
    get(): number;
    next(): boolean;
}

export class RowIterator implements IBoardIterator {
    private current: number;
    private skipValue: number|undefined;

    constructor(key: number, skipKey: boolean) {
        this.current = (GetRow(key) * 9);
        this.skipValue = skipKey ? key : undefined;
        // make sure the skip value isn't the first entry
        if (skipKey && this.current === key) {
            this.current++;
        }
    }

    length(): number { return this.skipValue ? 8 : 9; }
    get(): number { return this.current; }
    next(): boolean {
        let valid: boolean = true;
        do {
            this.current++;
            valid = (this.current % 9) !== 0;
        } while (valid && this.skipValue && this.skipValue === this.current);
        return valid;
    }
}

export class ColumnIterator implements IBoardIterator {
    private current: number;
    private skipValue: number|undefined;

    constructor(key: number, skipKey: boolean) {
        this.current = GetColumn(key);
        this.skipValue = skipKey ? key : undefined;
        // ensure we aren't skipping the first entry
        if (skipKey && this.current === key) {
            this.current += 9;
        }
    }

    length(): number { return this.skipValue !== undefined ? 8 : 9; }
    get(): number { return this.current; }
    next(): boolean {
        let valid: boolean = true;
        do {
            this.current += 9;
            valid = this.current < 81;
        } while (valid && this.skipValue !== undefined && this.skipValue === this.current);
        return valid;
    }
}

export class GridIterator implements IBoardIterator {
    private start: number;
    private step: number;
    private skipValue: number|undefined;

    constructor(key: number, skipKey: boolean) {
        this.start = GetKeyForGrid(GetGrid(key));
        this.step = 0;
        this.skipValue = skipKey ? key : undefined;
        if (skipKey && this.get() === key) {
            this.step++;
        }
    }

    length(): number { return this.skipValue !== undefined ? 8 : 9; }
    get(): number {
        const gridOffset: Array<number> = [0, 1, 2, 9, 10, 11, 18, 19, 20];
        return this.start + gridOffset[this.step];
    }
    next(): boolean {
        do {
            this.step++;
        } while (this.step < 9 && this.skipValue !== undefined && this.skipValue === this.get());
        return (this.step < 9);
    }
}

export class RowColGridIterator implements IBoardIterator {
    private current: number;
    private row: number;
    private col: number;
    private grid: number;
    private skipValue: number|undefined;

    constructor(key: number, skipKey: boolean) { 
        this.skipValue = skipKey ? key : undefined;
        this.current = 0;
        this.row = GetRow(key);
        this.col = GetColumn(key);
        this.grid = GetGrid(key);
        this.ensureCurrentValid();
    }

    length(): number { return this.skipValue !== undefined ? 21 : 20; }
    get(): number {
        return this.current;
    }
    next(): boolean {
        do {
            this.current++;
            this.ensureCurrentValid();
        } while (this.current < 81 && this.skipValue !== undefined && this.skipValue === this.current);
        return this.current < 81;
    }

    private ensureCurrentValid(): void {
        while (this.current < 81
                && GetRow(this.current) !== this.row
                && GetColumn(this.current) !== this.col
                && GetGrid(this.current) !== this.grid) {
            this.current++;
        }
    }
}
