import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-section',
	templateUrl: './section.component.html',
})
export class SectionComponent {
	public hasTabs: boolean;
	public onlyShowTabs = false;

	@Input('only-tabs')
	public set onlyTabs(tabs) {
		this.onlyShowTabs = tabs !== false;
	}

	@Input()
	public set tabs(tabs) {
		this.hasTabs = tabs !== false;
	}
}
