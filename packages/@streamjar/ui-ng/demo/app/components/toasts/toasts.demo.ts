import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ITableType } from '../../table/table.component';
import { IDemoConfig } from '../../demo/demo.component';
import { ToastService } from 'index';

const html = `
<button jarBtn raised (click)="info()"> Info </button>
<button jarBtn raised colour="success" (click)="success()"> Success </button>
<button jarBtn raised colour="danger" (click)="danger()"> Error</button>
`;
const ts = `
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ToastService } from '@streamjar/ui';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'jar-demo-toasts',
    templateUrl: './toasts.demo.html'
})
export class Toasts {
	constructor(private toasts: ToastService) {}

	public info() {
		// Show for 5000 ms.
		this.toasts.info('This is an informative toast', 5000);
	}

	public success() {
		this.toasts.success('This is an successful toast');
	}

	public danger() {
		this.toasts.error('This is a sad toast');
	}
}
`

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'jar-demo-toasts',
    styleUrls: ['../../common.scss'],
    templateUrl: './toasts.demo.html'
})
export class ToastsDemoComponent {
    public config: IDemoConfig = {
        name: 'Toasts',
        component: 'ToastService',
		html,
		ts,
	}

	constructor(private toasts: ToastService) {}

	public info() {
		// Show for 5000 ms.
		this.toasts.info('This is an informative toast', 5000);
	}

	public success() {
		this.toasts.success('This is an successful toast');
	}

	public danger() {
		this.toasts.error('This is a sad toast');
	}
}
