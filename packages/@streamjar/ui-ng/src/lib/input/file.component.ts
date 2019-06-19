import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-file',
	styles: [`input { display: none; opacity: 0; visibility: hidden; }`],
	templateUrl: './file.component.html',
})
export class JarFileInputComponent {
	@Output()
	public change = new EventEmitter();

	@Input()
	public accept = '';

	@ViewChild('input', { static: true })
	private input: ElementRef;

	private onTouch = (val?: string) => undefined;

	@HostListener('click')
	public click(): void {
		this.input.nativeElement.click();
	}
}
