import { Injectable, computed, signal } from '@angular/core';
import { Cell } from '../models/cell.model';

const GRID_SIZE = 10 as const;

@Injectable()
export class GridStateService {
  readonly gridSize = signal(GRID_SIZE);
  readonly solution = signal(createSolutionGrid(this.gridSize()));

  readonly rowHints = computed(() =>
    this.solution().map((row) => calculateHints(row)),
  );

  readonly #columns = computed(() =>
    this.solution().reduce(
      (cur, row) => {
        row.forEach((cell) => {
          cur[cell.col][cell.row] = cell;
        });

        return cur;
      },
      Array.from({ length: this.solution()[0].length }, () => []) as Cell[][],
    ),
  );

  readonly columnHints = computed(() =>
    this.#columns().map((column) => calculateHints(column)),
  );

  refresh() {
    this.solution.set(createSolutionGrid(this.gridSize()));
  }
}

const createSolutionGrid = (gridSize: number): Cell[][] =>
  Array.from({ length: gridSize }, (_, row) =>
    createSolutionGridRow(row, gridSize),
  );

const createSolutionGridRow = (row: number, gridSize: number): Cell[] =>
  Array.from({ length: gridSize }, (_, col) => ({
    row,
    col,
    value: Math.floor(Math.random() * 2) === 0 ? 'filled' : 'flagged',
  }));

const calculateHints = (cells: Cell[]): number[] =>
  cells
    .reduce(
      (hints, curCell) => {
        if (curCell.value === 'filled') {
          hints[hints.length - 1]++;

          return hints;
        }

        if (hints[hints.length - 1] !== 0) {
          hints.push(0);
        }

        return hints;
      },
      [0] as number[],
    )
    .filter((value, index) => index === 0 || value > 0);
