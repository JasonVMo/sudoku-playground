import * as React from 'react';
import { StoreState } from '../types/index';
import { connect } from 'react-redux';
import CmdButton from '../components/CmdButton';

export interface Props {
    difficulty: string;
    penMode: boolean;
}

export function mapStateToProps({ config }: StoreState) {
  return {
    difficulty: config.difficulty,
    penMode: config.penMode
  };
} 

function Header({ difficulty, penMode }: Props) {
    const headerStyle = {
        display: 'flex',
        flexFlow: 'column',
        background: '#3a3a3a',
        height: '100px',
        textAlign: 'center',
    };

    const diffHolderStyle = {
        display: 'flex',
        flexFlow: 'row'
    };
    
    const headerText = {
        fontSize: '48px',
        color: 'white',
        textDecorationColor: 'white'
    };

    return (
      <div style={headerStyle}>
        <div style={headerText}>
            Crappy Sudoku!
        </div>
        <div style={diffHolderStyle}>
            <CmdButton cmdText="Easy" selected={difficulty === 'Easy'} />
            <CmdButton cmdText="Medium" selected={difficulty === 'Medium'} />
            <CmdButton cmdText="Hard" selected={difficulty === 'Hard'} />
        </div>
        {difficulty}
      </div>
    );
  }

export default connect(mapStateToProps)(Header);