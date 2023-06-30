import { GridComponent } from '@angular-nonograms/grid';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule, GridComponent],
  selector: 'angular-nonograms-root',
  template: `<nono-grid />`,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
