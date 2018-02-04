// src/reducers/index.tsx

import { CellAction } from '../actions';
import { StoreState, Configuration, CellState } from '../types/index';
import { CMD_BUTTON_CLICK,
    CELL_CLICK, CELL_SETVALUE } from '../constants/index';

function configReducer(config: Configuration, action: CellAction): Configuration {
    switch (action.type) {
        case CMD_BUTTON_CLICK:
            return { ...config, difficulty: action.cmdText };
        default:
            return config;
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
        cellState: cellReducer(state.cellState, action)
    };
}