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
        background: 'blue',
        height: '100px',
        textAlign: 'center',
    };
    
    return (
      <div style={headerStyle}>
        Crappy Sudoku!
        <CmdButton cmdText="Easy" selected={difficulty === 'Easy'} />
        <CmdButton cmdText="Medium" selected={difficulty === 'Medium'} />
        <CmdButton cmdText="Hard" selected={difficulty === 'Hard'} />
        {difficulty}
      </div>
    );
  }

export default connect(mapStateToProps)(Header);