import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ITableType } from '../../table/table.component';
import { IDemoConfig } from '../../demo/demo.component';

const html = `
<jar-platforms></jar-platforms>
<jar-platforms [supported]="['mixer', 'twitch']"></jar-platforms>
`

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'jar-demo-platforms',
    styleUrls: ['../../common.scss'],
    templateUrl: './platforms.demo.html'
})
export class PlatformsDemoComponent {
    public config: IDemoConfig = {
        docs: [{
            name: 'supported',
            type: ITableType.INPUT,
            inType: 'string[]',
            defaultValue: "['mixer', 'twitch', 'smashcast', 'dlive', 'picarto']",
            description: 'A list of platforms that can be selected.'
        }],
        name: 'Platforms',
        component: 'jar-platforms',
        html,
    }
}
