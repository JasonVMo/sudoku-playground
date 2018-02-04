import * as React from 'react';
import { connect } from 'react-redux';
import NineGrid from '../containers/NineGrid';

function GameBoard() {
    const outerDivStyle = {
        display: 'flex',
        flexFlow: 'column',
        border: '1px solid black',
    };
    
    const innerDivStyle = {
        display: 'flex',
        flexFlow: 'row',
    };

    return (
      <div style={outerDivStyle}>
        <div style={innerDivStyle}>
            <NineGrid startIndex={0} />
            <NineGrid startIndex={3} />
            <NineGrid startIndex={6} />
        </div>
        <div style={innerDivStyle}>
            <NineGrid startIndex={27} />
            <NineGrid startIndex={30} />
            <NineGrid startIndex={33} />
        </div>
        <div style={innerDivStyle}>
            <NineGrid startIndex={54} />
            <NineGrid startIndex={57} />
            <NineGrid startIndex={60} />        
        </div>
      </div>
    );
  }

export default connect()(GameBoard);