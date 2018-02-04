// src/components/Cell.tsx
//  output a sudoku cell with a border

import * as React from 'react';
import * as actions from '../actions/';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';

export interface Props {
    index: number;
    cellSize?: number;
    value?: number;
    userValue?: number;
    shown?: boolean;
    selected?: boolean;
    cellClicked?: () => void;
}

function Cell({ 
        index, 
        cellSize = 35, 
        value = 0, 
        userValue = 0, 
        shown = false, 
        selected = false, 
        cellClicked }: Props) {
    let centerVal = null;

    const outerStyle = {
        border: '1px solid black',
        background: selected ? '#D0D0D0' : 'white',
        width: cellSize + 'px',
        height: cellSize + 'px',
        textAlign: 'center',
        verticalAlign: 'middle',
        fontSize: (cellSize - 11) + 'px',
        fontFamily: '\'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif'
    };

    const providedStyle = {
        verticalAlign: 'center',
        lineHeight: (cellSize - 1) + 'px',
        textDecorationColor: shown ? 'black' : 'blue'
    };

    if ((value > 0 && shown) || userValue > 0) {
        centerVal = <div style={providedStyle}>{value}</div>;
    }
    return (
        <div className="cell-boundary" style={outerStyle} onClick={cellClicked}>
            {centerVal}
        </div>
    );
}

export function mapStateToProps({cellState, config}: StoreState, ownProps: Props) {
  return {
    index: ownProps.index,
    value: cellState.value,
    shown: cellState.shown,
    userValue: cellState.userValue,
    selected: config.selectedIndex === ownProps.index,
    cellSize: config.cellDimension
  };
} 

export function mapDispatchToProps(dispatch: Dispatch<actions.CellAction>, ownProps: Props) {
  return {
    cellClicked: () => dispatch(actions.cellClick(ownProps.index))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
