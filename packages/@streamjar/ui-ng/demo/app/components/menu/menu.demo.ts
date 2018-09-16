import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ITableType } from '../../table/table.component';
import { IDemoConfig } from '../../demo/demo.component';

const html = `
<button raised jarBtn [jarMenuTrigger]="ref"> Menu </button>
<jar-menu #ref>
	<p style="color: #FFF; padding: 10px; text-align: center"> I'm a menu!</p>
</jar-menu>
`;

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'jar-demo-menu',
    styleUrls: ['../../common.scss'],
    templateUrl: './menu.demo.html'
})
export class MenuDemoComponent {
    public config: IDemoConfig = {
		docs: {
			'jar-menu': [{
				name: 'width',
				type: ITableType.INPUT,
				inType: 'number',
				defaultValue: '',
				description: 'Maxmimum width of the container.'
			}],
			'[jarMenuTrigger]': [{
				name: 'jarMenuTrigger',
				type: ITableType.INPUT,
				inType: 'JarMenuComponent',
				defaultValue: '',
				description: 'Reference to jar-menu.'
			}, {
				name: 'parentWidth',
				type: ITableType.INPUT,
				inType: 'boolean',
				defaultValue: 'false',
				description: 'Force menu to fill parent width.'
			}],
		},
        name: 'Menu',
		component: 'jar-menu',
		html,
    };
}
