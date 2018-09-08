import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ITableType } from '../../table/table.component';
import { IDemoConfig } from '../../demo/demo.component';
import { icons } from '../../icons.generated';


const html = `
<jar-icon style="color: #FFF;" icon="star"></jar-icon>
<jar-icon icon="jar_filter"></jar-icon>
`

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'jar-demo-icons',
    styleUrls: ['../../common.scss'],
    templateUrl: './icons.demo.html'
})
export class IconsDemoComponent {
	public icons: string[] = icons;
    public config: IDemoConfig = {
        docs: [{
            name: 'icon',
            type: ITableType.INPUT,
            inType: 'string',
            defaultValue: '',
            description: 'The icon to show.'
        }],
        name: 'Icons',
        component: 'jar-icon',
        html,
    }
}
