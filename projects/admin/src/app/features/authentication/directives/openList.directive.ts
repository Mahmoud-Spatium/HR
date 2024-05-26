import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[openList]',
  standalone: true,
})
export class openList {
  constructor(
    private elRef: ElementRef,
    private render: Renderer2,
  ) {}
  @HostListener('document:click', ['$event']) onClick(e: Event) {
    if ((e.target as HTMLElement).classList.contains('opened')) {
      this.render.setStyle(
        this.elRef.nativeElement as HTMLElement,
        'display',
        'block',
      );
      // clear input of the search field 
      this.render.setProperty(
        document.querySelector(
          '.countries-list input.opened',
        ) as HTMLInputElement,
        'value',
        '',
      );
    } else {
      this.render.setStyle(
        this.elRef.nativeElement as HTMLElement,
        'display',
        'none',
      );
    }
  }
}
