import { GetRow, GetColumn, GetGrid, GetKeyForGrid, SameRow, SameColumn, SameGrid, CellName } from './RowCol';

test('GetRow: test suite', () => {
    expect(GetRow(0)).toBe(0);
    expect(GetRow(5)).toBe(0);
    expect(GetRow(8)).toBe(0);
    expect(GetRow(40)).toBe(4);
    expect(GetRow(73)).toBe(8);
    expect(GetRow(80)).toBe(8);
});

test('GetColumn: test suite', () => {
    expect(GetColumn(0)).toBe(0);
    expect(GetColumn(5)).toBe(5);
    expect(GetColumn(80)).toBe(8);
    expect(GetColumn(57)).toBe(3);
});

test('GetGrid: test suite', () => {
    expect(GetGrid(0)).toBe(0);
    expect(GetGrid(12)).toBe(1);
    expect(GetGrid(26)).toBe(2);
    expect(GetGrid(40)).toBe(4);
    expect(GetGrid(80)).toBe(8);
});

test('GetKeyForGrid: test suite', () => {
    expect(GetKeyForGrid(0)).toBe(0);
    expect(GetKeyForGrid(1)).toBe(3);
    expect(GetKeyForGrid(2)).toBe(6);
    expect(GetKeyForGrid(3)).toBe(27);
    expect(GetKeyForGrid(5)).toBe(33);
    expect(GetKeyForGrid(8)).toBe(60);
});

test('SameRow: test suite', () => {
    expect(SameRow(0, 3)).toBe(true);
    expect(SameRow(0, 80)).toBe(false);
    expect(SameRow(28, 31)).toBe(true);
    expect(SameRow(53, 54)).toBe(false);
});

test('SameColumn: test suite', () => {
    expect(SameColumn(4, 22)).toBe(true);
    expect(SameColumn(28, 80)).toBe(false);
    expect(SameColumn(15, 33)).toBe(true);
});

test('SameGrid: test suite', () => {
    expect(SameGrid(0, 20)).toBe(true);
    expect(SameGrid(28, 54)).toBe(false);
    expect(SameGrid(79, 60)).toBe(true);
});

test('CellName: test suite', () => {
    expect(CellName(0)).toBe('A1');
    expect(CellName(80)).toBe('I9');
    expect(CellName(6)).toBe('A7');
    expect(CellName(54)).toBe('G1');
});
