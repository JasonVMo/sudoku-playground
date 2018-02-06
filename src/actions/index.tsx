import * as constants from '../constants';

export interface InitializeCells {
    type: constants.INITIALIZE_CELLS;
}

export interface NewGame {
    type: constants.NEW_GAME;
}

export interface CellClick {
    type: constants.CELL_CLICK;
    index: number;
}

export interface CellSetValue {
    type: constants.CELL_SETVALUE;
    value: number;
    shown: boolean;
}

export interface ClickNumButton {
    type: constants.CLICK_NUM_BUTTON;
    buttonVal: number;
}

export interface CmdButtonClick {
    type: constants.CMD_BUTTON_CLICK;
    cmdGroup: string;
    cmdText: string;
}

export type CellAction = CellClick | CellSetValue | CmdButtonClick
        | ClickNumButton | InitializeCells | NewGame;

export function initializeCells(): InitializeCells {
    return {
        type: constants.INITIALIZE_CELLS
    };
}

export function newGame(): NewGame {
    return {
        type: constants.NEW_GAME
    };
}

export function cellClick(index: number): CellClick {
    return {
        type: constants.CELL_CLICK,
        index
    };
}

export function cellSetValue(value: number, shown: boolean): CellSetValue {
    return {
        type: constants.CELL_SETVALUE,
        value,
        shown
    };
}

export function clickNumButton(buttonVal: number): ClickNumButton {
    return {
        type: constants.CLICK_NUM_BUTTON,
        buttonVal
    };
}

export function cmdButtonClick(cmdGroup: string, cmdText: string): CmdButtonClick {
    return {
        type: constants.CMD_BUTTON_CLICK,
        cmdGroup,
        cmdText
    };
}