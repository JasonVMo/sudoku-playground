// src/reducers/index.tsx

import { CellAction } from '../actions';
import { StoreState, Configuration, EnthusiasmStuff, CellState } from '../types/index';
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM, CMD_BUTTON_CLICK,
    CELL_CLICK, CELL_SETVALUE } from '../constants/index';

function configReducer(config: Configuration, action: CellAction): Configuration {
    switch (action.type) {
        case CMD_BUTTON_CLICK:
            return { ...config, difficulty: action.cmdText };
        default:
            return config;
    }
}

function enthusiasmReducer(enthusiasm: EnthusiasmStuff, action: CellAction): EnthusiasmStuff {
    switch (action.type) {
        case INCREMENT_ENTHUSIASM:
            return { ...enthusiasm, enthusiasmLevel: enthusiasm.enthusiasmLevel + 1 };
        case DECREMENT_ENTHUSIASM:
            return { ...enthusiasm, enthusiasmLevel: Math.max(1, enthusiasm.enthusiasmLevel - 1) };
        default:
            return enthusiasm;
    }   
}

function cellReducer(cellState: CellState, action: CellAction): CellState {
    switch (action.type) {
        case CELL_CLICK:
            return { ...cellState, selected: cellState.selected ? false : true};
        case CELL_SETVALUE:
            return { ...cellState, value: action.value, shown: action.shown };
        default:
            return cellState;
    }
}

export function baseReducer(state: StoreState, action: CellAction): StoreState {
    return {
        config: configReducer(state.config, action),
        enthusiasm: enthusiasmReducer(state.enthusiasm, action),
        cellState: cellReducer(state.cellState, action)
    };
}