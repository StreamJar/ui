import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-root',
	styleUrls: ['./app.component.scss', './common.scss'],
	templateUrl: './app.component.html',
})
export class AppComponent {
}
