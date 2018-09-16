import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { getOutletRef } from '../outlet/outlet';
import { Toast } from './toast';

export type ToastType = 'success' | 'error' | 'info';

export interface IToast {
	type: ToastType;
	duration: number;
	message: string;
}

export class Toaster {
	public outlet?: any;
	public listeners: ((toast: IToast) => void)[] = [];

	public on(fn: (toast: IToast) => void): void {
		this.listeners = [...this.listeners, fn];
	}

	public show(toast: IToast): void {
		if (!this.outlet) {
			this.outlet = ReactDOM.render(
				<Toast toasts={this} />,
				getOutletRef(),
			);
		}

		this.listeners.forEach(listener => {
			listener(toast);
		});
	}

	public info(message: string, duration = 3000): void {
		this.show({type: 'info', message, duration});
	}

	public success(message: string, duration = 2000): void {
		this.show({type: 'success', message, duration});
	}

	public error(message: string, duration = 5000): void {
		this.show({type: 'error', message, duration});
	}
}

export const toasts = new Toaster();
