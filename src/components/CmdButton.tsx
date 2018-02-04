// src/components/CmdButton.tsx
//  output a sudoku cell with a border

import * as React from 'react';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../actions/';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface Props {
    cmdText: string;
    selected?: boolean;
    cmdButtonClick?: () => void;
}

function CmdButton({ cmdText, selected = false, cmdButtonClick}: Props) {
//    const buttonStyle = {
//       marginLeft: '10px',
//        marginRight: '10px',
//        fontSize: '30px',
//        background: selected ? 'blue' : 'white'
//    };

    return (
        <DefaultButton onClick={cmdButtonClick} text={cmdText} checked={selected} />
//        <button style={buttonStyle} onClick={cmdButtonClick}>{cmdText}</button>
    );
}

export function mapStateToProps({ }: StoreState, ownProps: Props) {
    return {
        cmdText: ownProps.cmdText,
        selected: ownProps.selected
    };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.CellAction>, ownProps: Props) {
    return {
        cmdButtonClick: () => dispatch(actions.cmdButtonClick(ownProps.cmdText))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CmdButton);
