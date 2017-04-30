import { Component, Input } from '@angular/core';

@Component({
    selector: 'wrapper-example',
    template: `
    <div class="wrapper-example">
      <div *ngIf='isLoading' class="table-loader">
        <img src="/img/gears.gif" />
      </div>
      <ng-content *ngIf='!isLoading'></ng-content>
    </div>
  `
})
export class WrapperExampleComponent {
    @Input() public isLoading: boolean;
}