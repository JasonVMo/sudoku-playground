export function GetRow(index: number): number {
    return (Math.floor(index / 9));
}

export function GetColumn(index: number): number {
    return (index % 9);
}

export function GetGrid(index: number): number {
    return (Math.floor(GetRow(index) / 3) * 3) + Math.floor(GetColumn(index) / 3);
}

export function SameRow(base: number, probe: number): boolean {
    return (Math.floor(base / 9) === Math.floor(probe / 9));
}

export function SameColumn(base: number, probe: number): boolean {
    return ((base % 9) === (probe % 9));
}

export function SameGrid(base: number, probe: number): boolean {
    // if it is in the same three rows...
    if (Math.floor(base / 27) === Math.floor(probe / 27)) {
        // and the same three columns ...
        if (Math.floor((base % 9) / 3) === Math.floor((probe % 9) / 3)) {
            return true;
        }
    }
    return false;
}

export function SameRowColumnGrid(base: number, probe: number): boolean {
    return SameRow(base, probe) || SameColumn(base, probe) || SameGrid(base, probe);
}

export function CellName(index: number): string {
    let rowVal: number = GetRow(index);
    let col: number = GetColumn(index) + 1;
    const letters: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    return letters[rowVal] + col;
}
