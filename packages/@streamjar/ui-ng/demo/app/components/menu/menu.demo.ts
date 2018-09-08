import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ITableType } from '../../table/table.component';
import { IDemoConfig } from '../../demo/demo.component';

const html = `
<button jarBtn [jarMenuTrigger]="ref"> Menu </button>
<jar-menu #ref>
	<p style="color: #FFF; padding: 10px; text-align: center"> I'm a menu!</p>
</jar-menu>

<button jarBtn [jarMenuTrigger]="ref2"> Large Menu </button>
<jar-menu #ref2 multiplier="2">
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
				name: 'multiplier',
				type: ITableType.INPUT,
				inType: 'number',
				defaultValue: '1',
				description: 'Amount to scale the size of the dropdown by.'
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
