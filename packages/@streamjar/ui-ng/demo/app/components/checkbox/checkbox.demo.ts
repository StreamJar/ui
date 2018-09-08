import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ITableType } from '../../table/table.component';
import { IDemoConfig } from '../../demo/demo.component';

const html = `
<jar-checkbox label="a"> Checkbox </jar-checkbox>
<jar-checkbox colour="success" label="a"> Success </jar-checkbox>
<jar-checkbox colour="danger" label="a"> Dangerous </jar-checkbox>
<jar-checkbox no-ripple label="a"> No Ripple </jar-checkbox>
<jar-checkbox [ngModel]="true" disabled label="a"> Disabled </jar-checkbox>
`

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'jar-demo-checkbox',
    styleUrls: ['../../common.scss'],
    templateUrl: './checkbox.demo.html'
})
export class CheckboxDemoComponent {
    public config: IDemoConfig = {
        docs: [{
            name: 'disabled',
            type: ITableType.INPUT,
            inType: 'boolean',
            defaultValue: 'false',
            description: 'If the checkbox is disabled.'
        },
        {
            name: 'no-ripple',
            type: ITableType.INPUT,
            inType: 'boolean',
            defaultValue: 'false',
            description: 'If we should hide the click ripple.'
        },
        {
            name: 'inverse',
            type: ITableType.INPUT,
            inType: 'boolean',
            defaultValue: 'false',
            description: 'If we should inverse the output (so checked is false).'
        },
        {
            name: 'label',
            type: ITableType.INPUT,
            inType: 'string',
            defaultValue: '',
            description: 'Checkbox label.'
        },
        {
            name: 'colour',
            type: ITableType.INPUT,
            inType: 'string',
            defaultValue: 'primary',
            description: 'Colour variant of the checkbox.'
        }, {
            name: 'checked',
            type: ITableType.INPUT,
            inType: 'boolean',
            defaultValue: 'false',
            description: 'If the checkbox is checked.'
        }],
        name: 'Checkbox',
        component: 'jar-checkbox',
        html,
    }
}
