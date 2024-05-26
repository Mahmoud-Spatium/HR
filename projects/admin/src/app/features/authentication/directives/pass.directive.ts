import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[passRules]',
  standalone: true,
})
export class PassDirective {
  constructor(
    private elRef: ElementRef,
    private render: Renderer2,
  ) {}
  @HostListener('copy', ['$event']) onCopy(e: Event) {
    e.preventDefault();
  }
  @HostListener('paste', ['$event']) onPaste(e: Event) {
    e.preventDefault();
  }
  @HostListener('cut', ['$event']) onCut(e: Event) {
    e.preventDefault();
  }
  @HostListener('drag', ['$event']) onDrag(e: Event) {
    e.preventDefault();
  }
  @HostListener('drop', ['$event']) onDrop(e: Event) {
    e.preventDefault();
  }
}
