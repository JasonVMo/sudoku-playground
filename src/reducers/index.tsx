// src/reducers/index.tsx

import { CellAction } from '../actions';
import { StoreState, Configuration, CellData } from '../types/index';
import { CMD_BUTTON_CLICK, INITIALIZE_CELLS,
    CELL_CLICK } from '../constants/index';
import { CreateInitialCells, CellsFromBoardString } from '../helpers/CellHelpers';
import { GetBoardViaShifting } from '../helpers/FillBoard';
import { CreateGame } from '../helpers/CreateGame';
import { FillMarks } from '../helpers/Solvers';
import { SolveResult } from '../solvers/SolveResult';
import { SolveCell } from '../solvers/SolveCell';
import { SingleChoice, SingleRowColGrid } from '../solvers/SingleChoice';

function configReducer(cells: Array<CellData>, config: Configuration, action: CellAction): Configuration {
    switch (action.type) {
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

function cellsReducer(cells: Array<CellData>, config: Configuration, action: CellAction): Array<CellData> {
    switch (action.type) {
        case INITIALIZE_CELLS:
            return CreateInitialCells();
        default:
            return cells;
    }
}

function numPressReducer(state: StoreState, action: CellAction, cmdText: string): StoreState {
    if (state.config.selectedIndex < 81 && state.config.selectedIndex >= 0) {
        let result: SolveResult = new SolveResult(state.cells);
        let newValue: number = parseInt(cmdText, 10);
        if (SolveCell(state.config.selectedIndex, newValue, result)) {
            return {
                config: {...state.config, solverResult: result.resultText(), selectedValue: newValue },
                cells: result.reducedCellArray(),
            };
        }
    }
    return state;
}

function solverReducer(state: StoreState, action: CellAction): StoreState {
    let result: SolveResult = new SolveResult(state.cells);
    if (SingleChoice(result) || SingleRowColGrid(result)) {
        return {
            config: {...state.config, solverResult: result.resultText() },
            cells: result.reducedCellArray(),
        };
    }
    return state;
}

function newGameReducer(state: StoreState, action: CellAction): StoreState {
    let newBoard: string = GetBoardViaShifting();
    let newCells: Array<CellData> = CellsFromBoardString(newBoard);
    CreateGame(newCells, state.config.difficulty);
    FillMarks(newCells);

    return {
        config: {...state.config, selectedIndex: 100, selectedValue: 0 },
        cells: newCells
    };
}

function cellClickReducer(state: StoreState, index: number): StoreState {
    let selectedIdx: number = state.config.selectedIndex === index ? 100 : index;
    let selectedVal: number = state.config.selectedIndex === index ? 0 : state.config.selectedValue;
    if (selectedIdx < 81 && state.cells[selectedIdx].shown) {
        selectedVal = state.cells[selectedIdx].value;
    }
    return { 
        config: { ...state.config, selectedIndex: selectedIdx, selectedValue: selectedVal },
        cells: state.cells
    };
}

export function baseReducer(state: StoreState, action: CellAction): StoreState {
    switch (action.type) {
        case CMD_BUTTON_CLICK:
            switch (action.cmdGroup) {
                case 'Solver':
                    return solverReducer(state, action);
                case 'NumPress':
                    return numPressReducer(state, action, action.cmdText);
                case 'StartGame':
                    return newGameReducer(state, action);
                case 'Difficulty':
                    return {
                        config: { ...state.config, difficulty: action.cmdText },
                        cells: state.cells
                    };
                default:
                    // fallthrough
            }
            break;
        case CELL_CLICK:
            cellClickReducer(state, action.index);
            break;
    }
    return {
        config: configReducer(state.cells, state.config, action),
        cells: cellsReducer(state.cells, state.config, action)
    };
}