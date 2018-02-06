// src/components/Cell.tsx
//  output a sudoku cell with a border

import * as React from 'react';
import * as uiconst from '../constants/UIConstants';

export interface Props {
    marks: Array<boolean>;
    cellSize: number;
    selectedValue: number;
}

export function Marks({ marks, cellSize, selectedValue }: Props) {
    let cellAvailableSize: number = cellSize - 2;
    let cellThird: number = Math.floor(cellAvailableSize / 3);

    const pencilStyle = {
        width: cellAvailableSize,
        height: cellAvailableSize,
        verticalAlign: 'top',
        display: 'flex',
        flexFlow: 'row wrap',
        fontSize: (cellThird - 2) + 'px'
    };

    const pencilBox = { 
        width: cellThird,
        height: cellThird
    };

    const pencilBoxHighlighted = { ...pencilBox, background: uiconst.cellHighlightBg };

    return (
        <div style={pencilStyle}>
            {
                marks.map((isShown: boolean, markIndex: number) => {
                    let highlighted: boolean = (isShown && (markIndex + 1) === selectedValue);
                    return (
                        <div
                            style={highlighted ? pencilBoxHighlighted : pencilBox}
                            key={markIndex}
                        >
                            {isShown ? markIndex + 1 : ' '}
                        </div>
                    );
                })
            }
        </div>
    );
}
