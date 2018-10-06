import { BehaviorSubject } from 'rxjs';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IDemoConfig } from '../../demo/demo.component';
import { ColourService } from '../../../../src/lib/colour/index';

const html = `
<button jarBtn (click)="open()" raised> Open Picker </button>

<code> {{ colour | async }} </code>
`;

const ts = `
export class ColourDemoComponent {
	public colour = new BehaviorSubject('red');

	constructor(private colourService: ColourService) {

	}

	public open() {
		this.colourService.pick(this.colour.getValue())
			.subscribe(c => {
				this.colour.next(c);
			});
	}
}

`;

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'jar-demo-colour',
    styleUrls: ['../../common.scss'],
    templateUrl: './colour.demo.html'
})
export class ColourDemoComponent {
	public colour = new BehaviorSubject('red');

    public config: IDemoConfig = {
        name: 'Colour Picker',
		component: 'ColourService',
		html,
		ts,
	}

	constructor(private colourService: ColourService) {

	}

	public open() {
		this.colourService.pick(this.colour.getValue())
			.subscribe(c => {
				this.colour.next(c);
			});
	}
}
