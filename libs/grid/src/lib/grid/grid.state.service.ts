import { Injectable, computed, signal } from '@angular/core';
import { Cell } from '../models/cell.model';

@Injectable()
export class GridStateService {
  solution = signal(createSolutionGrid());
  solutionCells = computed(() => this.solution().flat());
}

const createSolutionGrid = (): Cell[][] =>
  Array.from({ length: 3 }, (_, col) => createSolutionGridRow(col));

const createSolutionGridRow = (col: number): Cell[] =>
  Array.from({ length: 3 }, (_, row) => ({
    row,
    col,
    value: Math.floor(Math.random() * 2) === 0 ? 'filled' : 'flagged',
  }));
