// src/reducers/index.tsx

import { CellAction } from '../actions';
import { StoreState, Configuration, CellData } from '../types/index';
import { CMD_BUTTON_CLICK, INITIALIZE_CELLS,
    CELL_CLICK } from '../constants/index';
import { CreateInitialCells, CellsFromBoardString, SameRowColumnGrid } from '../helpers/CellHelpers';
import { GetBoardViaShifting } from '../helpers/FillBoard';
import { CreateGame } from '../helpers/CreateGame';
import { FillMarks } from '../helpers/Solvers';

function configReducer(cells: Array<CellData>, config: Configuration, action: CellAction): Configuration {
    switch (action.type) {
        case CMD_BUTTON_CLICK:
            if (action.cmdGroup === 'Difficulty') {
                return { ...config, difficulty: action.cmdText };
            } else if (action.cmdGroup === 'NumPress' 
                    && config.selectedIndex < 81 
                    && config.selectedIndex >= 0) {
                return { ...config, selectedValue: parseInt(action.cmdText, 10) };
            } else if (action.cmdGroup === 'StartGame') {
                return { ...config, selectedIndex: 100, selectedValue: 0 };
            } else {
                return config;
            }
        case CELL_CLICK:
            let selectedIdx: number = config.selectedIndex === action.index ? 100 : action.index;
            let selectedVal: number = config.selectedIndex === action.index ? 0 : config.selectedValue;
            if (selectedIdx < 81 && cells[selectedIdx].shown) {
                selectedVal = cells[selectedIdx].value;
            }
            return { ...config, 
                selectedIndex: selectedIdx, selectedValue: selectedVal };
        default:
            return config;
    }
}

export interface CellData {
    value: number;
    userValue: number;
    shown: boolean;
    selected: boolean;
}

function cellsReducer(cells: Array<CellData>, config: Configuration, action: CellAction): Array<CellData> {
    switch (action.type) {
        case INITIALIZE_CELLS:
            return CreateInitialCells();
        case CMD_BUTTON_CLICK:
            if (action.cmdGroup === 'StartGame') {
                let newBoard: string = GetBoardViaShifting();
                let newCells: Array<CellData> = CellsFromBoardString(newBoard);
                CreateGame(newCells, config.difficulty);
                FillMarks(newCells);
                return newCells;
            } else if (action.cmdGroup === 'NumPress' && config.selectedIndex < 81 && config.selectedIndex >= 0) {
                // if this cell is not shown, try to fill it in
                if (!cells[config.selectedIndex].shown) {
                    let newValue: number = parseInt(action.cmdText, 10);
                    if (newValue === cells[config.selectedIndex].value) {
                        return cells.map((cellValue: CellData, index: number) => {
                            if (index === config.selectedIndex) {
                                return { ...cellValue, shown: true };
                            } else if (SameRowColumnGrid(config.selectedIndex, index) 
                                    && cellValue.marks[newValue - 1]) {
                                return { ...cellValue, marks: cellValue.marks.map((val: boolean, idx: number) => {
                                    return (val && idx !== (newValue - 1));
                                })};
                            }
                            return cellValue;
                        });
                    }
                }
            }
            return cells;
        default:
            return cells;
    }
}

export function baseReducer(state: StoreState, action: CellAction): StoreState {
    return {
        config: configReducer(state.cells, state.config, action),
        cells: cellsReducer(state.cells, state.config, action)
    };
}