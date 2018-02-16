import * as React from 'react';
import { StoreState } from '../types/index';
import { connect } from 'react-redux';
import CmdButton from '../components/CmdButton';
import { Label } from 'office-ui-fabric-react/lib/Label';

export interface Props {
    penMode: boolean;
    solveResult: string;
}

export function mapStateToProps({ config }: StoreState) {
    return {
        penMode: config.penMode,
        solveResult: config.solverResult
    };
} 

function Footer({ penMode, solveResult }: Props) {
    const footerStyle = {
        background: '#d6d6d6',
        display: 'flex',
        flexFlow: 'row'
    };
    
    return (
        <div>
            <div style={footerStyle}>
                <CmdButton cmdGroup="NumPress" cmdText="1" selected={penMode} />
                <CmdButton cmdGroup="NumPress" cmdText="2" selected={penMode} />
                <CmdButton cmdGroup="NumPress" cmdText="3" selected={penMode} />
                <CmdButton cmdGroup="NumPress" cmdText="4" selected={penMode} />
                <CmdButton cmdGroup="NumPress" cmdText="5" selected={penMode} />
                <CmdButton cmdGroup="NumPress" cmdText="6" selected={penMode} />
                <CmdButton cmdGroup="NumPress" cmdText="7" selected={penMode} />
                <CmdButton cmdGroup="NumPress" cmdText="8" selected={penMode} />
                <CmdButton cmdGroup="NumPress" cmdText="9" selected={penMode} />
            </div>
            <CmdButton cmdGroup="Solver" cmdText="Help Me" selected={false} />
            <Label>{solveResult}</Label>
        </div>
    );
}

export default connect(mapStateToProps)(Footer);