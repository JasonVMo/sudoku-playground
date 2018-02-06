import * as React from 'react';
import { StoreState } from '../types/index';
import { connect } from 'react-redux';
import CmdButton from '../components/CmdButton';
import * as uiconst from '../constants/UIConstants';

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
        background: uiconst.headerBg,
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
            <CmdButton cmdGroup="Difficulty" cmdText="Easy" selected={difficulty === 'Easy'} />
            <CmdButton cmdGroup="Difficulty" cmdText="Medium" selected={difficulty === 'Medium'} />
            <CmdButton cmdGroup="Difficulty" cmdText="Hard" selected={difficulty === 'Hard'} />
        </div>
        <div style={diffHolderStyle}>
            <CmdButton cmdGroup="StartGame" cmdText="New Game" selected={false} />
            {difficulty}
        </div>
      </div>
    );
  }

export default connect(mapStateToProps)(Header);