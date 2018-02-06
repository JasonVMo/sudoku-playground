// src/reducers/index.tsx

import { CellAction } from '../actions';
import { StoreState, Configuration, CellData } from '../types/index';
import { CMD_BUTTON_CLICK, INITIALIZE_CELLS,
    CELL_CLICK } from '../constants/index';
import { CreateInitialCells, CellsFromBoardString } from '../helpers/CellHelpers';
import { GetBoardViaShifting } from '../helpers/FillBoard';
import { CreateGame } from '../helpers/CreateGame';
import { FillMarks } from '../helpers/Solvers';

function configReducer(cells: Array<CellData>, config: Configuration, action: CellAction): Configuration {
    switch (action.type) {
        case CMD_BUTTON_CLICK:
            if (action.cmdGroup === 'Difficulty') {
                return { ...config, difficulty: action.cmdText };
            } else {
                return config;
            }
        case CELL_CLICK:
            let selectedIdx: number = config.selectedIndex === action.index ? 100 : action.index;
            let selectedVal: number = 0;
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