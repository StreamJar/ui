import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ITableType } from '../../table/table.component';
import { IDemoConfig } from '../../demo/demo.component';

const html = `
<jar-select [title]="'Simple'" [(ngModel)]="out">
	<jar-select-item name="Cat" value="cat"></jar-select-item>
	<jar-select-item name="Dog" value="dog"></jar-select-item>
	<jar-select-item name="Moose" value="moose"></jar-select-item>
</jar-select>

<p> Out: {{ out | json }} </p>

<jar-select [title]="'Multiple'" multiple [(ngModel)]="out2">
	<jar-select-item name="Cat" value="cat"></jar-select-item>
	<jar-select-item name="Dog" value="dog"></jar-select-item>
	<jar-select-item name="Moose" value="moose"></jar-select-item>
</jar-select>
<p> Out: {{ out2 | json }} </p>
`

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'jar-demo-select',
    styleUrls: ['../../common.scss'],
    templateUrl: './select.demo.html'
})
export class SelectDemoComponent {
	public out: string;
	public out2: string[] = [];

    public config: IDemoConfig = {
        docs: {
			'jar-select': [{
				name: 'multiple',
				type: ITableType.INPUT,
				inType: 'boolean',
				defaultValue: 'false',
				description: 'If we should allow multiple options to be selected.'
			}],
			'jar-select-item': [{
				name: 'name',
				type: ITableType.INPUT,
				inType: 'string',
				defaultValue: '',
				description: 'Visible name for select item.'
			}, {
				name: 'value',
				type: ITableType.INPUT,
				inType: 'any',
				defaultValue: '',
				description: 'Value of selected item.'
			}],
		},
        name: 'Select',
        component: 'jar-select',
        html,
    }
}
