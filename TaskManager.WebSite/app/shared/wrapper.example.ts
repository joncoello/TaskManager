import { Component, Input } from '@angular/core';

@Component({
    selector: 'wrapper-example',
    template: `
    <div class="wrapper-example">
        child {{isLoading}}
      <div *ngIf='isLoading'>
        loading...
      </div>
      <ng-content *ngIf='!isLoading'></ng-content>
    </div>
  `
})
export class WrapperExampleComponent {
    @Input() isLoading: boolean;
}