import {
	Injectable,
} from '@angular/core';

import { JarDialogOutlet2Service } from '../outlet2/outlet.service';
import { ToastComponent } from './toast.component';

export type ToastType = 'success' | 'error' | 'info';

@Injectable()
export class ToastService {
	private queue = [];
	private anchor: ToastComponent;

	constructor(private outletService: JarDialogOutlet2Service) {}

	private createAnchor(): ToastComponent {
		const compRef = this.outletService.createFromRef(ToastComponent, []);

		return compRef.instance;
	}

	private runQueue() {
		if (!this.anchor) {
			this.anchor = this.createAnchor();
		}

		const item = this.queue[0];

		this.anchor.showToast(item.type, item.message, item.duration)
			.then(resp => {
				this.queue.shift();

				if (this.queue.length) {
					this.runQueue();
				}
			});
	}

	public show(type: ToastType, message: string, duration: number) {
		if (!this.queue.length) {
			this.queue.push({ message, duration, type });
			this.runQueue();

			return;
		}

		this.queue.push({ message, duration, type });
	}

	public info(message: string, duration = 3000) {
		this.show('info', message, duration);
	}

	public success(message: string, duration = 2000) {
		this.show('success', message, duration);
	}

	public error(message: string, duration = 5000) {
		this.show('error', message, duration);
	}
}
