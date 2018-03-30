// src/types/index.tsx

export interface CellData {
    index: number;
    value: number;
    shown: boolean;
    marks: Array<boolean>;
}

export interface Configuration {
    selectedIndex: number;
    selectedValue: number;
    penMode: boolean;
    difficulty: string;
    cellDimension: number;
    solverResult: string;
}

export interface StoreState {
    config: Configuration;
    cells: Array<CellData>;
}

export interface SolveResult2 {
    success: boolean;
    cells: Array<CellData>;
    rowCount: Array<Array<number>>;
    colCount: Array<Array<number>>;
    gridCount: Array<Array<number>>;
    result: string;
}
