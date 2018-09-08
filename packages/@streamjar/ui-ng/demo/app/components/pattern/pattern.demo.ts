import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { IDemoConfig } from '../../demo/demo.component';
import { ITableType } from '../../table/table.component';

const html = `
<jar-pattern style="width: 500px; height: 500px"></jar-pattern>
`

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-demo-pattern',
	styleUrls: ['../../common.scss'],
	templateUrl: './pattern.demo.html',
})
export class PatternDemoComponent {
	public config: IDemoConfig = {
		component: 'jar-pattern',
		html,
		name: 'Pattern',
		docs: [{
			name: 'repeat',
			type: ITableType.INPUT,
			inType: 'boolean',
			defaultValue: 'false',
			description: 'If the animation should pulse in/out.'
		}, {
			name: 'hidden',
			type: ITableType.OUTPUT,
			inType: 'void',
			defaultValue: '',
			description: 'Called when the animation is stopped.'
		}, {
			name: 'hide',
			type: ITableType.METHOD,
			inType: 'void',
			defaultValue: '',
			description: 'Reverse and hide the animation.'
		}],
	}
}
