/* eslint-disable @angular-eslint/no-host-metadata-property */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';
import { GridStateService } from './grid.state.service';

@Component({
  selector: 'nono-grid',
  standalone: true,
  imports: [CommonModule],
  host: {
    class: 'text-accent',
  },
  template: `
    <div></div>
    <div
      class="border border-primary rounded cell inline-flex justify-center items-center"
      *ngFor="let colHint of state.columnHints()"
    >
      {{ colHint }}
    </div>
    <ng-container *ngFor="let row of state.solution(); index as index">
      <div
        class="border border-primary rounded cell inline-flex justify-center items-center"
      >
        {{ state.rowHints()[index] }}
      </div>

      <div
        class="border border-primary rounded cell text-[80px]/[80px] font-bold text-center"
        [class.bg-primary]="cell.value === 'filled'"
        *ngFor="let cell of row"
      >
        <!--      <span class="text-xs"-->
        <!--        >{{ cell.value }} [{{ cell.col }}, {{ cell.row }}]</span-->
        <!--      >-->
        <span *ngIf="cell.value === 'flagged'">X</span>
      </div>
    </ng-container>
    <button class="btn btn-primary" (click)="refresh()">Refresh</button>
  `,
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GridStateService],
})
export class GridComponent {
  protected state = inject(GridStateService);

  @HostBinding('style.--grid-size') gridSize = this.state.gridSize() + 1;

  protected refresh() {
    this.state.refresh();
  }
}
