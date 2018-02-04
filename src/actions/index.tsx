import * as constants from '../constants';

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
    cmdText: string;
}

export type CellAction = CellClick | CellSetValue | CmdButtonClick
        | ClickNumButton;

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

export function cmdButtonClick(cmdText: string): CmdButtonClick {
    return {
        type: constants.CMD_BUTTON_CLICK,
        cmdText
    };
}