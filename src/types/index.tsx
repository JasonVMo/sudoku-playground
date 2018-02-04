// src/types/index.tsx

export interface CellState {
    value: number;
    userValue: number;
    shown: boolean;
    selected: boolean;
}

export interface Configuration {
    selectedIndex: number;
    penMode: boolean;
    difficulty: string;
    cellDimension: number;
}

export interface StoreState {
    config: Configuration;
    cellState: CellState;
}