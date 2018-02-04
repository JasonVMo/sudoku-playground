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

export interface EnthusiasmStuff {
    languageName: string;
    enthusiasmLevel: number;
}

export interface StoreState {
    config: Configuration;
    enthusiasm: EnthusiasmStuff;
    cellState: CellState;
}