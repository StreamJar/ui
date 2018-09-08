import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ITableType } from '../../table/table.component';
import { IDemoConfig } from '../../demo/demo.component';

const html = `
<jar-card [icon]="{ email: 'ethan@streamjar.tv' }">
	<div class="jar-card-content">
		<p> You've been invited to edit <strong> Ethan</strong> overlay? </p>
	</div>
	<div class="jar-card-actions">
		<button jarBtn raised colour="danger"> Deny </button>
		<button jarBtn raised> Accept </button>
	</div>
</jar-card>
`

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'jar-demo-card',
    styleUrls: ['../../common.scss'],
    templateUrl: './card.demo.html'
})
export class CardDemoComponent {
    public config: IDemoConfig = {
        docs: [{
            name: 'icon',
            type: ITableType.INPUT,
            inType: 'string | { email?: string; avatar?: string }',
            defaultValue: '',
            description: 'URL to the avatar, or an object containing the `avatar` property. Alternatively an object with email which is used for gravatar.'
        }],
        name: 'Card',
        component: 'jar-card',
        html,
    }
}
