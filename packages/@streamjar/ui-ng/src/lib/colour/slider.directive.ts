import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
	selector: 'div[joverlaySliderPicker]',
})
export class SliderDirective {
	@Output()
	public onChange = new EventEmitter<any>();

	@Input()
	public multiple = false;

	public moving = false;

	constructor(private el: ElementRef) {
	}

	public setCursor(event: any) {
		const height = this.el.nativeElement.offsetHeight;
		const width = this.el.nativeElement.offsetWidth;

		const x = Math.max(0, Math.min(this.getX(event), width));
		const y = Math.max(0, Math.min(this.getY(event), height));

		if (this.multiple) {
			this.onChange.emit({ s: x / width, v: (1 - y / height) });
		} else {
			this.onChange.emit({ v: y / height });
		}
	}

	@HostListener('mousedown')
	public onmousedown() {
		this.moving = true;
	}

	@HostListener('window:mouseup')
	public onmouseup() {
		this.moving = false;
	}

	@HostListener('window:mousemove', ['$event'])
	public onmousemove(event) {
		if (!this.moving) {
			return;
		}

		this.setCursor(event);
	}

	public getX(event: any): number {
		return event.pageX - this.el.nativeElement.getBoundingClientRect().left - window.pageXOffset;
	}

	public getY(event: any): number {
		return event.pageY - this.el.nativeElement.getBoundingClientRect().top - window.pageYOffset;
	}
}
