import * as React from 'react';
import { StoreState } from '../types/index';
import { connect } from 'react-redux';
import Cell from '../components/Cell';

export interface Props {
    startIndex: number;
}

export function mapStateToProps({ }: StoreState, ownProps: Props) {
  return {
    startIndex: ownProps.startIndex
  };
} 

function NineGrid({ startIndex }: Props) {
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
            <Cell index={startIndex} />
            <Cell index={startIndex + 1} />
            <Cell index={startIndex + 2} />
        </div>
        <div style={innerDivStyle}>
            <Cell index={startIndex + 9} />
            <Cell index={startIndex + 10} />
            <Cell index={startIndex + 11} />
        </div>
        <div style={innerDivStyle}>
            <Cell index={startIndex + 18} />
            <Cell index={startIndex + 19} />
            <Cell index={startIndex + 20} />
        </div>
      </div>
    );
  }

export default connect(mapStateToProps)(NineGrid);