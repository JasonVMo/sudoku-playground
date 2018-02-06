// src/components/Cell.tsx
//  output a sudoku cell with a border

import * as React from 'react';
import * as actions from '../actions/';
import { Marks } from '../components/Marks';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import * as uiconst from '../constants/UIConstants';
import { BlankPencilArray } from '../helpers/CellHelpers';

export interface Props {
    index: number;
    cellSize?: number;
    value?: number;
    shown?: boolean;
    marks?: Array<boolean>;
    selected?: boolean;
    selectedValue?: number;
    cellClicked?: () => void;
}

function CellBackground(selected: boolean, value: number, selectedVal: number, shown: boolean): string {
    if (selected) {
        return uiconst.cellSelectBg;
    }
    if (value === selectedVal && shown) {
        return uiconst.cellHighlightBg;
    }
    return uiconst.cellBg;
}

function Cell({ 
        index, 
        cellSize = 35, 
        value = 0, 
        shown = false, 
        selected = false, 
        marks = BlankPencilArray(),
        selectedValue = 0,
        cellClicked }: Props) {
    let centerVal = null;
    let showAsHighlighted = (value === selectedValue && shown);

    const outerStyle = {
        border: '1px solid black',
        background: CellBackground(selected, value, selectedValue, shown),
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
        textDecorationColor: 'black',
        color: showAsHighlighted ? 'green' : 'black'
    };

    if (value > 0 && shown) {
        centerVal = <div style={providedStyle}>{value}</div>;
    } 

    return (
        <div className="cell-boundary" style={outerStyle} onClick={cellClicked}>
            {(value > 0 && shown) 
                ? centerVal 
                : <Marks marks={marks} selectedValue={selectedValue} cellSize={cellSize} />}
        </div>
    );
}

export function mapStateToProps({cells, config}: StoreState, ownProps: Props) {
  return {
    index: ownProps.index,
    value: cells[ownProps.index].value,
    shown: cells[ownProps.index].shown,
    selected: config.selectedIndex === ownProps.index,
    marks: cells[ownProps.index].marks,
    selectedValue: config.selectedValue,
    cellSize: config.cellDimension
  };
} 

export function mapDispatchToProps(dispatch: Dispatch<actions.CellAction>, ownProps: Props) {
  return {
    cellClicked: () => dispatch(actions.cellClick(ownProps.index))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
