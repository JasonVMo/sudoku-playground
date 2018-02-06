import * as React from 'react';
import { StoreState } from '../types/index';
import { connect } from 'react-redux';
import CmdButton from '../components/CmdButton';

export interface Props {
    penMode: boolean;
}

export function mapStateToProps({ config }: StoreState) {
    return {
        penMode: config.penMode
    };
} 

function Footer({ penMode }: Props) {
    const footerStyle = {
        background: '#d6d6d6',
        display: 'flex',
        flexFlow: 'row'
    };
    
    return (
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
    );
}

export default connect(mapStateToProps)(Footer);