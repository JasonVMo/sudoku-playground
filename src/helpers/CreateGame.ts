import { CellData } from '../types/index';

export function CreateGame(cells: Array<CellData>, difficulty: string): void {
    let targetToRemove: number = 0;
    switch (difficulty) {
        case 'Easy':
            targetToRemove = 20;
            break;
        case 'Medium':
            targetToRemove = 35;
            break;
        case 'Hard':
            targetToRemove = 50;
            break;
        default:
            targetToRemove = 0;
    }
    
    while (targetToRemove-- > 0) {
        let removeIndex: number = 0;
        do {
            removeIndex = Math.floor(Math.random() * 81);
        } while (!cells[removeIndex].shown);
        cells[removeIndex].shown = false;
    }
}
