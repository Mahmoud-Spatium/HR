import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[otp]',
  standalone: true,
})
export class otpDirecrive {
  constructor(
    private eleR: ElementRef,
    private render: Renderer2,
  ) {}
  @HostListener('input', ['$event']) enterOtp(e: Event) {
    if (e.target) {
      const ele = e.target as HTMLInputElement;
      if (ele.value.length === 1) {
        const nextEle = ele.nextElementSibling as HTMLInputElement;
        // check if there is more numbers to enter
        if (nextEle) {
          if (nextEle) {
            nextEle.focus();
            nextEle.select();
          }
        } else {
          // if the otp is completed prevent user from enter more numbers
          ele.type = 'string';
          ele.maxLength = 1;
          // set the cursor at the end
          ele.setSelectionRange(ele.value.length, ele.value.length);
        }
      }
    }
  }

  @HostListener('keyup', ['$event']) onRemove(e: KeyboardEvent) {
    const ele = e.target as HTMLInputElement,
      key = e.key.toLowerCase();
    if (key === 'backspace' || key === 'delete') {
      const prevEle = ele.previousElementSibling as HTMLInputElement;
      if (prevEle) {
        // prevent write more than 1 when go backword in otp
        prevEle.type = 'string';
        prevEle.maxLength = 1;
        // set the cursor at the end
        prevEle.setSelectionRange(prevEle.value.length, prevEle.value.length);
        prevEle.focus();
        prevEle.select();
      }
    }
  }
}
