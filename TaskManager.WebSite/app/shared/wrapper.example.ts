import { Component } from '@angular/core';

@Component({
    selector: 'wrapper-example',
    template: `
    <div class="wrapper-example">
      <ng-content></ng-content>
    </div>
  `
})
export class WrapperExampleComponent { }