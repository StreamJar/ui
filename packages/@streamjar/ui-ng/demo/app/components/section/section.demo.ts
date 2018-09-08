import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ITableType } from '../../table/table.component';
import { IDemoConfig } from '../../demo/demo.component';

const html = `
<jar-section>
	<div class="jar-section-header">Header</div>
	<div class="jar-section-content">Content!</div>
	<div class="jar-section-action"><button jarBtn raised>Hi!</button></div>
</jar-section>

<jar-section tabs only-tabs>
	<div class="jar-section-header" style="padding: 0">
		<button jarBtn icon="add" [disabled]="loading$ | async" raised style="margin: 0;"> Create Goal </button>
	</div>

	<div class="jar-section-action">
		<jar-tabs>
			<jar-tab>Tips</jar-tab>
			<jar-tab>Subscribers</jar-tab>
			<jar-tab>Charity Donations</jar-tab>
		</jar-tabs>
	</div>

	<div class="jar-section-content">
		<h2> hello </h2>
	</div>
</jar-section>`

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'jar-demo-section',
    styleUrls: ['../../common.scss'],
    templateUrl: './section.demo.html'
})
export class SectionDemoComponent {
    public config: IDemoConfig = {
        docs: [{
            name: 'only-tabs',
            type: ITableType.INPUT,
            inType: 'boolean',
            defaultValue: "false",
            description: 'Reverses the order of actions and header so tabs can be left aligned'
        }],
        name: 'Section',
        component: 'jar-section',
        html,
    }
}
