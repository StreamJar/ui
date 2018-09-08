import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

export enum JarFilterType {
	FilterMultiple,
	FilterMultipleOr,
	FilterSingle,
};

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'jar-filter-section',
	templateUrl: './filter-section.component.html',
})
export class JarFilterSectionComponent {

	@Input()
	public name: string;
}
