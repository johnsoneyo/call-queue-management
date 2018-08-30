import { Directive, Input, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[superAdmin]'
})
export class RoleDirective {

  constructor(public el: ElementRef, public renderer: Renderer) { }

  @Input() superAdmin: boolean;

  ngOnInit() {
    // Use renderer to render the emelemt with styles
    console.log(this.superAdmin)
    if (!this.superAdmin) {
      console.log('hide',this.renderer,this.el.nativeElement);   
      this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none');
    }
  }
}
