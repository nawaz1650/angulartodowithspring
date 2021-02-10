import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appBasicHighlight]',
})
export class BasicHighlightDirective {
  constructor() {}
  @HostBinding('style.backgroundColor') bgcolor;
  @HostListener('mouseover') mouseenter() {
    this.bgcolor = 'lightGray';
  }

  @HostListener('mouseleave') mouseleave() {
    this.bgcolor = 'white';
  }
}
