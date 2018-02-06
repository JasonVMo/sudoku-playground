// src/types/index.tsx

export interface CellData {
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
}

export interface StoreState {
    config: Configuration;
    cells: Array<CellData>;
}