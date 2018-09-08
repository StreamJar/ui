import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ITableType } from '../../table/table.component';
import { IDemoConfig } from '../../demo/demo.component';

const html = `
<jar-spinner></jar-spinner>
<jar-spinner [size]="10"></jar-spinner>
`

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'jar-demo-spinner',
    styleUrls: ['../../common.scss'],
    templateUrl: './spinner.demo.html'
})
export class SpinnerDemoComponent {
    public config: IDemoConfig = {
        docs: [{
            name: 'size',
            type: ITableType.INPUT,
            inType: 'number',
            defaultValue: '50',
            description: 'Width and height of the element.'
        }],
        name: 'Spinner',
        component: 'jar-spinner',
        html,
    }
}
