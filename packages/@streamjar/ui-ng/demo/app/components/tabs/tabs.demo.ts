import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ITableType } from '../../table/table.component';
import { IDemoConfig } from '../../demo/demo.component';

const html = `
<jar-tabs (selected)="selected = $event">
	<jar-tab [value]="true"> Yes </jar-tab>
	<jar-tab [value]="false"> No </jar-tab>
</jar-tabs>

<p> Yes is selected: {{ selected }} </p>
`;

const ts = `
@Component({
    selector: 'tabs',
})
export class TabsDemoComponent {
	public selected: boolean = true;
}
`

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'jar-demo-tabs',
    styleUrls: ['../../common.scss'],
    templateUrl: './tabs.demo.html'
})
export class TabsDemoComponent {
	public selected: boolean = false;

    public config: IDemoConfig = {
		docs: {
			'jar-tabs': [{
				name: 'current',
				type: ITableType.INPUT,
				inType: 'T',
				defaultValue: '',
				description: 'Selects a tab by comparing it to the jar-tab value'
			}, {
				name: 'selected',
				type: ITableType.OUTPUT,
				inType: 'EventEmitter<T>',
				defaultValue: '',
				description: 'Emits the select tab value (defined by the value passed in)'
			}],
			'jar-tab': [{
				name: 'value',
				type: ITableType.INPUT,
				inType: 'any',
				defaultValue: '',
				description: 'Value to identify the tab by.'
			}],
		},
        name: 'Menu',
		component: 'jar-menu',
		html,
		ts,
    };
}
