import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ITableType } from '../../table/table.component';
import { IDemoConfig } from '../../demo/demo.component';

const html = `
<jar-filter style="float: right">
	<jar-filter-section [name]="'Platform'">
		<jar-platforms></jar-platforms>
	</jar-filter-section>

	<jar-filter-section [name]="'Sort'">
		<div jarRadioGroup>
			<jar-radio [value]="'asc'" icon="delete"> Ascending </jar-radio>
			<jar-radio [value]="'desc'"> Descending </jar-radio>
		</div>
	</jar-filter-section>
</jar-filter>
`

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'jar-demo-filter',
    styleUrls: ['../../common.scss'],
    templateUrl: './filter.demo.html'
})
export class FilterDemoComponent {
    public config: IDemoConfig = {
        docs: [{
            name: 'name',
            type: ITableType.INPUT,
            inType: 'string',
            defaultValue: '',
            description: 'Name of the section.'
        }],
        name: 'Filter',
        component: 'jar-filter-section',
        html,
    }
}
