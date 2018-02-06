// FillBoard.ts
//  helpers for filling in the game board

export function CellIndex(row: number, column: number): number {
    return (row * 9) + column;
}

export function GetBoardViaShifting(): string {
    var result: string = '';
    var nums: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // quick shuffle of elements
    for (let i = 8; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    // next use the circular shift method to make it fast
    var shift: Array<number> = [0, 3, 3, 1, 3, 3, 1, 3, 3];
    var offset: number = 0;
    for (let i = 0; i < 9; i++) {
        offset += shift[i];
        for (let j = 0; j < 9; j++) {
            result += nums[(j + offset) % 9] + '.';
        }
    }

    // now return it as a string
    return result;
}

export function RotateBoard(oldBoard: string, rotations: number): string {
    rotations = Math.floor(rotations) % 4;
    if (rotations === 1 || rotations === 2 || rotations === 3) {
        let newBoard: string = '';
        let srcCol: number;
        let srcRow: number;

        for (let newRow = 0; newRow < 9; newRow++) {
            for (let newCol = 0; newCol < 9; newCol++) {
                switch (rotations) {
                    case 1:
                        srcCol = newRow;
                        srcRow = 8 - newCol;
                        break;
                    case 2:
                        srcCol = 8 - newCol;
                        srcRow = 8 - newRow;
                        break;
                    case 3:
                        srcCol = 8 - newRow;
                        srcRow = newCol;
                        break;
                    default:
                        return oldBoard;
                }
                let srcIndex = CellIndex(srcRow, srcCol) * 2;
                newBoard += oldBoard[srcIndex] + oldBoard[srcIndex + 1];
            }
        }
        return newBoard;
    }
    return oldBoard;
}