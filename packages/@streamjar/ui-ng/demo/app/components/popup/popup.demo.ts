import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ITableType } from '../../table/table.component';
import { IDemoConfig } from '../../demo/demo.component';

const html = `
<jar-popup [title]="'Title!'" tag="this is a tagline">
	<p> welcome to my box! It's a nice box. </p>
</jar-popup>
`

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-demo-popup',
	styleUrls: ['../../common.scss'],
	templateUrl: './popup.demo.html'
})
export class PopupDemoComponent {
	public config: IDemoConfig = {
		docs: [{
			name: 'title',
			type: ITableType.INPUT,
			inType: 'string',
			defaultValue: "",
			description: 'Displays a title. Not defining this will show the StreamJar logo.'
		}, {
			name: 'tag',
			type: ITableType.INPUT,
			inType: 'string',
			defaultValue: "",
			description: 'Displays an optional tag line below the title or logo.'
		}],
		name: 'Popup',
		component: 'jar-popup',
		html,
	}
}
