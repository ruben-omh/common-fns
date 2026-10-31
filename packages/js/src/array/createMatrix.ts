function assertDimension(name: string, value: number): void {
	if (!Number.isInteger(value) || value < 0) {
		throw new RangeError(
			`createMatrix(): ${name} must be a non-negative integer; received ${String(value)}.`,
		);
	}
}

/**
 * Builds a `rows` x `cols` matrix (an array of row arrays), filling every cell with
 * `builder(row, col)`. Rows and columns are zero-indexed.
 *
 * @template T Cell type.
 * @param rows Number of rows. Must be a non-negative integer.
 * @param cols Number of columns. Must be a non-negative integer.
 * @param builder Called once per cell with its row and column index; its return value fills the cell.
 * @returns A new `rows` x `cols` matrix.
 * @throws {RangeError} If `rows` or `cols` is not a non-negative integer.
 *
 * @example
 * createMatrix(2, 3, (row, col) => `${row},${col}`);
 * // [["0,0", "0,1", "0,2"], ["1,0", "1,1", "1,2"]]
 */
export function createMatrix<T = unknown>(
	rows: number,
	cols: number,
	builder: (row: number, col: number) => T,
): T[][] {
	assertDimension("rows", rows);
	assertDimension("cols", cols);

	const matrix: T[][] = new Array<T[]>(rows);
	for (let row = 0; row < rows; row++) {
		const line: T[] = new Array<T>(cols);
		for (let col = 0; col < cols; col++) {
			line[col] = builder(row, col);
		}
		matrix[row] = line;
	}
	return matrix;
}
