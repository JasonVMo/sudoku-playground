import { RowIterator, IBoardIterator, ColumnIterator, GridIterator } from "./BoardIterator";

function compileResults(iter: IBoardIterator): Array<number> {
    let results: Array<number> = [];
    do {
        results.push(iter.get());
    } while (iter.next());
    return results;
}

function testIterLength(iter: IBoardIterator, skipping: boolean): void {
    expect(iter.length()).toBe(skipping ? 8 : 9);
    let realLength: number = 0;
    do {
        realLength++;
    } while (iter.next());
    expect(realLength).toBe(iter.length());
}

test('row: check length - skipping', () => {
    let iter: RowIterator = new RowIterator(3, true);
    testIterLength(iter, true);
});

test('row: check first row - skipping', () => {
    let iter: RowIterator = new RowIterator(5, true);
    expect(compileResults(iter)).toMatchObject([0,1,2,3,4,6,7,8]);
});

test('row: check first item - skipping', () => {
    let iter: RowIterator = new RowIterator(0, true);
    expect(compileResults(iter)).toMatchObject([1,2,3,4,5,6,7,8]);
});

test('row: check last - skipping', () => {
    let iter: RowIterator = new RowIterator(80, true);
    expect(compileResults(iter)).toMatchObject([72,73,74,75,76,77,78,79]);
});

test('row: check length - non skipping', () => {
    let iter: RowIterator = new RowIterator(3, false);
    testIterLength(iter, false);
});

test('row: check middle - non-skipping', () => {
    let iter: RowIterator = new RowIterator(34, false);
    expect(compileResults(iter)).toMatchObject([27,28,29,30,31,32,33,34,35]);
});

test('column: check length - skipping', () => {
    let iter: ColumnIterator = new ColumnIterator(5, true);
    testIterLength(iter, true);
});

test('column: check length - non skipping', () => {
    let iter: ColumnIterator = new ColumnIterator(5, false);
    testIterLength(iter, false);
});

test('column: check middle col - skipping', () => {
    let iter: ColumnIterator = new ColumnIterator(5, true);
    expect(compileResults(iter)).toMatchObject([14,23,32,41,50,59,68,77]);
});

test('column: check first - skipping', () => {
    let iter: ColumnIterator = new ColumnIterator(0, true);
    expect(compileResults(iter)).toMatchObject([9,18,27,36,45,54,63,72]);
});

test('column: check last - no skipping', () => {
    let iter: ColumnIterator = new ColumnIterator(80, false);
    expect(compileResults(iter)).toMatchObject([8,17,26,35,44,53,62,71,80]);
});

test('grid: check lengths', () => {
    let iterSkip: GridIterator = new GridIterator(0, true);
    testIterLength(iterSkip, true);

    let iterNonSkip: GridIterator = new GridIterator(0, false);
    testIterLength(iterNonSkip, false);
});

test('grid: first item - skipping', () => {
    let iter: GridIterator = new GridIterator(0, true);
    expect(compileResults(iter)).toMatchObject([1,2,9,10,11,18,19,20]);
});

test('grid: last item - skipping', () => {
    let iter: GridIterator = new GridIterator(80, true);
    expect(compileResults(iter)).toMatchObject([60,61,62,69,70,71,78,79]);
});

test('grid: middle - non skipping', () => {
    let iter: GridIterator = new GridIterator(40, false);
    expect(compileResults(iter)).toMatchObject([30,31,32,39,40,41,48,49,50]);
})