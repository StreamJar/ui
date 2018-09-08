import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ITableType } from '../../table/table.component';
import { IDemoConfig } from '../../demo/demo.component';

const html = `
<jar-slider [(ngModel)]="out" [min]="0" [max]="50" [step]="5"></jar-slider>
<p> Current: {{ out || 0 }} </p>
<jar-slider disabled [min]="0" [max]="50" [step]="5"></jar-slider>
`

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'jar-demo-slider',
    styleUrls: ['../../common.scss'],
    templateUrl: './slider.demo.html'
})
export class SliderDemoComponent {
	public out = 0;

	public config: IDemoConfig = {
        docs: [{
            name: 'min',
            type: ITableType.INPUT,
            inType: 'number',
            defaultValue: '0',
            description: 'Minimum value of the slider.'
        }, {
            name: 'max',
            type: ITableType.INPUT,
            inType: 'number',
            defaultValue: '100',
            description: 'Maximum value of the slider.'
        },  {
            name: 'step',
            type: ITableType.INPUT,
            inType: 'number',
            defaultValue: '1',
            description: 'Forced increments of the slider.'
        }, {
            name: 'disabled',
            type: ITableType.INPUT,
            inType: 'boolean',
            defaultValue: 'false',
            description: 'If the slider is disabled.'
		}],
        name: 'Slider',
        component: 'jar-slider',
        html,
    }
}
