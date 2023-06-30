/* eslint-disable @angular-eslint/no-host-metadata-property */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GridStateService } from './grid.state.service';

@Component({
  selector: 'nono-grid',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'text-accent',
  },
  template: `
    <div
      class="border border-primary rounded cell text-[80px]/[80px] font-bold text-center"
      [class.bg-primary]="cell.value === 'filled'"
      *ngFor="let cell of state.solutionCells()"
    >
      <!-- <span class="text-xs"
        >{{ cell.value }} [{{ cell.col }}, {{ cell.row }}]</span
      > -->
      <span *ngIf="cell.value === 'flagged'">X</span>
    </div>
  `,
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GridStateService],
})
export class GridComponent {
  protected state = inject(GridStateService);
}
