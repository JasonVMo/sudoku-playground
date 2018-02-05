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
            <CmdButton cmdText="1" selected={penMode} />
            <CmdButton cmdText="2" selected={penMode} />
            <CmdButton cmdText="3" selected={penMode} />
            <CmdButton cmdText="4" selected={penMode} />
            <CmdButton cmdText="5" selected={penMode} />
            <CmdButton cmdText="6" selected={penMode} />
            <CmdButton cmdText="7" selected={penMode} />
            <CmdButton cmdText="8" selected={penMode} />
            <CmdButton cmdText="9" selected={penMode} />
        </div>
    );
}

export default connect(mapStateToProps)(Footer);