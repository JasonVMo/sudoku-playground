// src/reducers/index.tsx

import { CellAction } from '../actions';
import { StoreState, Configuration, CellData } from '../types/index';
import { CMD_BUTTON_CLICK, INITIALIZE_CELLS,
    CELL_CLICK } from '../constants/index';
import { CreateInitialCells, CellsFromBoardString } from '../helpers/CellHelpers';
import { GetBoardViaShifting } from '../helpers/FillBoard';
import { CreateGame } from '../helpers/CreateGame';
import { SolveResult } from '../solvers/SolveResult';
import { SolveCell } from '../solvers/SolveCell';
import { SingleChoice, SingleRowColGrid } from '../solvers/SingleChoice';
import { AddMarksForBoard } from '../helpers/Marks';
import { GetCellSubarray, FilterType, FillCellArray } from '../helpers/RowCol';

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

function fillMarksReducer(state: StoreState): StoreState {
    let result: SolveResult = new SolveResult(state.cells);
    AddMarksForBoard(result.cells, result.updates);

    return {
        config: state.config,
        cells: result.reducedCellArray(),
    };
}

function newGameReducer(state: StoreState, action: CellAction): StoreState {
    let newBoard: string = GetBoardViaShifting();
    let newCells: Array<CellData> = CellsFromBoardString(newBoard);
    CreateGame(newCells, state.config.difficulty);

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

function runGetCellSubArray(cells: Array<CellData>) {
    let i: number = 0;
    for (i = 0; i < 81; i++) {
        let sum: number = 0;
        let cellSet: Array<CellData> = GetCellSubarray(cells, FilterType.Row, i, true);
        for (let cell of cellSet) {
            sum += cell.value;
        }
        if (sum === 0) {
            return;
        }
    }

    for (i = 0; i < 81; i++) {
        let sum: number = 0;
        let cellSet: Array<CellData> = GetCellSubarray(cells, FilterType.Col, i, true);
        for (let cell of cellSet) {
            sum += cell.value;
        }
        if (sum === 0) {
            return;
        }
    }

    for (i = 0; i < 81; i++) {
        let sum: number = 0;
        let cellSet: Array<CellData> = GetCellSubarray(cells, FilterType.Grid, i, true);
        for (let cell of cellSet) {
            sum += cell.value;
        }
        if (sum === 0) {
            return;
        }
    }

    for (i = 0; i < 81; i++) {
        let sum: number = 0;
        let cellSet: Array<CellData> = GetCellSubarray(cells, FilterType.RowColGrid, i, true);
        for (let cell of cellSet) {
            sum += cell.value;
        }
        if (sum === 0) {
            return;
        }
    }
}

function runFillCellSubArray(cells: Array<CellData>) {
    let i: number = 0;
    let cellSet: Array<CellData> = [];
    for (i = 0; i < 81; i++) {
        let sum: number = 0;
        FillCellArray(cellSet, cells, FilterType.Row, i, true);
        for (let cell of cellSet) {
            sum += cell.value;
        }
        if (sum === 0) {
            return;
        }
    }

    for (i = 0; i < 81; i++) {
        let sum: number = 0;
        FillCellArray(cellSet, cells, FilterType.Col, i, true);
        for (let cell of cellSet) {
            sum += cell.value;
        }
        if (sum === 0) {
            return;
        }
    }

    for (i = 0; i < 81; i++) {
        let sum: number = 0;
        FillCellArray(cellSet, cells, FilterType.Grid, i, true);
        for (let cell of cellSet) {
            sum += cell.value;
        }
        if (sum === 0) {
            return;
        }
    }

    for (i = 0; i < 81; i++) {
        let sum: number = 0;
        FillCellArray(cellSet, cells, FilterType.RowColGrid, i, true);
        for (let cell of cellSet) {
            sum += cell.value;
        }
        if (sum === 0) {
            return;
        }
    }
}

function perfTestReducer(state: StoreState): StoreState {
    let startTime: number = window.performance.now();
    let result: string = '';
    for (let i: number = 0; i < 50; i++) {
        runGetCellSubArray(state.cells);
    }
    let endTime: number = window.performance.now();
    result += 'GetCellSubArray took ' + (endTime - startTime);

    startTime = window.performance.now();
    for (let i: number = 0; i < 50; i++) {
        runFillCellSubArray(state.cells);
    }
    endTime = window.performance.now();
    result += '\nFillCellSubArray took ' + (endTime - startTime);
    return {
        config: { ...state.config, solverResult: result },
        cells: state.cells
    };
}

export function baseReducer(state: StoreState, action: CellAction): StoreState {
    switch (action.type) {
        case CMD_BUTTON_CLICK:
            switch (action.cmdGroup) {
                case 'Solver':
                    return solverReducer(state, action);
                case 'FillMarks':
                    return fillMarksReducer(state);
                case 'NumPress':
                    return numPressReducer(state, action, action.cmdText);
                case 'StartGame':
                    return newGameReducer(state, action);
                case 'PerfTest':
                    return perfTestReducer(state);
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
        default:
            // fallthrough
    }
    return {
        config: configReducer(state.cells, state.config, action),
        cells: cellsReducer(state.cells, state.config, action)
    };
}