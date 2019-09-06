import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ITableType } from '../../table/table.component';
import { IDemoConfig } from '../../demo/demo.component';

const html = `
<button jarBtn jarTooltip="Testing" jarTooltipPos="top"> Tooltip Top! </button>
<button jarBtn jarTooltip="Testing" jarTooltipPos="left"> Tooltip Left! </button>
<button jarBtn jarTooltip="Testing" jarTooltipPos="right"> Tooltip Right! </button>
<button jarBtn jarTooltip="Testing" jarTooltipPos="bottom"> Tooltip Bottom! </button>
<button jarBtn jarTooltip="Testing" jarTooltipPos="bottom" [jarTooltipEnabled]="false"> No Tooltip! </button>
`

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'jar-demo-tooltip',
    styleUrls: ['../../common.scss'],
    templateUrl: './tooltip.demo.html'
})
export class TooltipDemoComponent {
    public config: IDemoConfig = {
        docs: [{
            name: 'jarTooltip',
            type: ITableType.INPUT,
            inType: 'string',
            defaultValue: '',
            description: 'Tooltip Text.'
        }, {
            name: 'jarTooltipPos',
            type: ITableType.INPUT,
            inType: `'top' | 'bottom' | 'left' | 'right'`,
            defaultValue: 'top',
            description: 'Position of the tooltip.'
        }, {
            name: 'jarTooltipEnabled',
            type: ITableType.INPUT,
            inType: `boolean`,
            defaultValue: 'true',
            description: 'Whether to render the tooltip.'
        }],
        name: 'Tooltips',
        component: '[jarTooltip]',
        html,
    }
}
