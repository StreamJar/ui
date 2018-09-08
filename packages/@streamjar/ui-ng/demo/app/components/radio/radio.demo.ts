import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ITableType } from '../../table/table.component';
import { IDemoConfig } from '../../demo/demo.component';

const html = `
<div jarRadioGroup="a">
    <jar-radio value="1"> One </jar-radio>
    <jar-radio value="2"> Two </jar-radio>
</div>

<div jarRadioGroup="b" [ngModel]="'2'">
    <jar-radio value="1"> One </jar-radio>
    <jar-radio value="2"> Two </jar-radio>
</div>
`

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'jar-demo-radio',
    styleUrls: ['../../common.scss'],
    templateUrl: './radio.demo.html'
})
export class RadioDemoComponent {
    public config: IDemoConfig = {
        name: 'Radio',
        component: 'jar-radio',
        html,
    }
}
