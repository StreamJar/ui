import {
	Component,
	HostBinding,
	Input,
	ChangeDetectionStrategy,
} from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-spinner',
	styles: [`:host { display: block; margin: 0 auto; }`],
	templateUrl: './spinner.component.html',

})
export class JarSpinnerComponent {
	@HostBinding('style.width')
	@HostBinding('style.height')
	public dimensions = '50px';

	@Input()
	set size(size: number) {
		this.dimensions = `${size}px`;
	}
}
