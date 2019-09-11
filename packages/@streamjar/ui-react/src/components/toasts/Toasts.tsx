import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { getOutletRef } from '../../common/outlet';
import { Toaster } from './Toaster';

export enum ToastType {
	SUCCESS = 'success',
	ERROR = 'error',
	INFO = 'info',
}

export interface IToast {
	requestedAt: Date;
	type: ToastType;
	duration: number;
	message: string;
}

export class ToastsFactory {
	public outlet = false;
	private listeners: ((toast: IToast) => void)[] = [];

	/**
	 * Listen for a tamp
	 *
	 * @param fn listen fn
	 */
	public on(fn: (toast: IToast) => void): void {
		this.listeners = [...this.listeners, fn];
	}

	public off(fn: (toast: IToast) => void): void {
		this.listeners = this.listeners.filter(i => i !== fn);
	}

	/**
	 * Show a toast
	 *
	 * @param toast Toast
	 */
	public show(toast: IToast): void {
		if (!this.outlet) {
			this.outlet = true;

			ReactDOM.render(
				<Toaster initToast={toast} />,
				getOutletRef(),
				() => {
					this.listeners.forEach(listener => {
						listener(toast);
					});
				},
			);

			return;
		}

		this.listeners.forEach(listener => {
			listener(toast);
		});
	}

	/**
	 * Display an informational toast
	 *
	 * @param message Message to display
	 * @param duration How long to display for
	 */

	public info(message: string, duration = 3000): void {
		this.show({ type: ToastType.INFO, message, duration, requestedAt: new Date() });
	}

	/**
	 * Display an success toast
	 *
	 * @param message Message to display
	 * @param duration How long to display for
	 */
	public success(message: string, duration = 2000): void {
		this.show({ type: ToastType.SUCCESS, message, duration, requestedAt: new Date() });
	}

	/**
	 * Display an error toast
	 *
	 * @param message Message to display
	 * @param duration How long to display for
	 */
	public error(message: string, duration = 5000): void {
		this.show({ type: ToastType.ERROR, message, duration, requestedAt: new Date() });
	}
}

export const Toasts = new ToastsFactory();
