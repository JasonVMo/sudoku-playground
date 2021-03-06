import { CellData } from '../types';
import { BoardIterator, RowIterator, ColumnIterator, GridIterator, RowColGridIterator } from './BoardIterator';

export function GetRow(index: number): number {
    return (Math.floor(index / 9));
}

export function GetColumn(index: number): number {
    return (index % 9);
}

export function GetGrid(index: number): number {
    return (Math.floor(GetRow(index) / 3) * 3) + Math.floor(GetColumn(index) / 3);
}

export function GetKeyForGrid(gridNum: number): number {
    return ((gridNum % 3) * 3) + (Math.floor(gridNum / 3) * 27);
}

export function SameRow(base: number, probe: number): boolean {
    return (Math.floor(base / 9) === Math.floor(probe / 9));
}

export function SameColumn(base: number, probe: number): boolean {
    return ((base % 9) === (probe % 9));
}

export function SameGrid(base: number, probe: number): boolean {
    // if it is in the same three rows...
    if (Math.floor(base / 27) === Math.floor(probe / 27)) {
        // and the same three columns ...
        if (Math.floor((base % 9) / 3) === Math.floor((probe % 9) / 3)) {
            return true;
        }
    }
    return false;
}

export function SameRowColumnGrid(base: number, probe: number): boolean {
    return SameRow(base, probe) || SameColumn(base, probe) || SameGrid(base, probe);
}

export function CellName(index: number): string {
    let rowVal: number = GetRow(index);
    let col: number = GetColumn(index) + 1;
    const letters: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    return letters[rowVal] + col;
}

export enum FilterType {
    Row,
    Col,
    Grid,
    RowColGrid
}

export function GetCellSubarray(
            cells: Array<CellData>, 
            filter: FilterType, 
            keyIndex: number, 
            excludeKey: boolean = true
        ): Array<CellData> {
    let checkRow: boolean = (filter === FilterType.Row || filter === FilterType.RowColGrid);
    let keyRow: number = GetRow(keyIndex);

    let checkCol: boolean = (filter === FilterType.Col || filter === FilterType.RowColGrid);
    let keyCol: number = GetColumn(keyIndex);

    let checkGrid: boolean = (filter === FilterType.Grid || filter === FilterType.RowColGrid);
    let keyGrid: number = GetGrid(keyIndex);

    return cells.filter((currentValue: CellData, index: number) => {
        if (!excludeKey || index !== keyIndex) {
            if ((checkRow && GetRow(index) === keyRow)
                    || (checkCol && GetColumn(index) === keyCol)
                    || (checkGrid && GetGrid(index) === keyGrid)) {
                return true;
            }
        }
        return false;
    });
}

function IterFromFilter(filter: FilterType, key: number, skipKey: boolean): BoardIterator {
    switch (filter) {
        case FilterType.Row:
            return new RowIterator(key, skipKey);
        case FilterType.Col:
            return new ColumnIterator(key, skipKey);
        case FilterType.Grid:
            return new GridIterator(key, skipKey);
        case FilterType.RowColGrid:
        default:
            return new RowColGridIterator(key, skipKey);
    }
}

export function FillCellArray(
            result: Array<CellData>, 
            cells: Array<CellData>, 
            filter: FilterType, 
            keyIndex: number, 
            excludeKey: boolean
        ) {
    // make sure the result array is big enough for the result set
    let iter: BoardIterator = IterFromFilter(filter, keyIndex, excludeKey);
    let expectedLength: number = iter.length();
    if (result.length !== expectedLength) {
        result.length = expectedLength;
    }
    let insertPoint: number = 0;

    do {
        result[insertPoint++] = cells[iter.get()];
    } while (iter.next());
}

export function FilterToText(filterType: FilterType): string {
    switch (filterType) {
        case FilterType.Row:
            return 'Row';
        case FilterType.Col:
            return 'Column';
        case FilterType.Grid:
            return 'Grid';
        case FilterType.RowColGrid:
            return 'RowColGrid';
        default:
            return '';
    }
}

export function KeyIndexOfType(offset: number, type: FilterType): number {
    switch (type) {
        case FilterType.Row:
            return offset * 9;
        case FilterType.Col:
            return offset;
        case FilterType.Grid:
            return (Math.floor(offset / 3) * 27) + ((offset % 3) * 3);
        default:
    }
    return offset;
}