import { Component } from '@angular/core';

@Component({
  selector: 'button[retroButton]',
  imports: [],
  template: '<ng-content></ng-content>',
  styles: `
    :host {
      display: block;
      border: none;
      background-color: #eee;
      color: #222;
      font-size: 2rem;
      font-family: inherit;
      padding: 2rem 3rem;
      cursor: pointer;

      &:hover {
        background-color: #ccc;
      }
    }
  `
})
export class RetroButtonComponent {}
