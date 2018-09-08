import { Injectable } from '@angular/core';

@Injectable()
export class ErrorMessageService {
	private errorHandlers: Map<string, (opts: any) => string> = new Map();

	constructor() {
		this.register('minlength', (opts: { requiredLength: number, actualLength: number }) => {
			return `Must be atleast ${opts.requiredLength} characters long`;
		});

		this.register('maxlength', (opts: { requiredLength: number, actualLength: number }) => {
			return `This must at most be  ${opts.requiredLength} characters long`;
		});

		this.register('required', (opts: {}) => {
			return `This field is required`;
		});

		this.register('requiredTrue', (opts: {}) => {
			return `Must be selected`;
		});

		this.register('min', (opts: { min: number; actual: number}) => {
			return `Must be ${opts.min} or higher`;
		});

		this.register('max', (opts: { max: number; actual: number }) => {
			return `Must be ${opts.max} or lower`;
		});

		this.register('email', (opts: { max: number; actual: number }) => {
			return `Not a valid email address`;
		});
	}

	public get(name: string, opts: any, custom: { [key: string]: string } = {}): string {
		if (custom[name]) {
			return custom[name];
		}

		if (this.errorHandlers.has(name)) {
			return this.errorHandlers.get(name)(opts);
		}

		return `Error: ${name} ${JSON.stringify(opts)}`;
	}

	public register(name: string, fn: (opts: any) => string): void {
		this.errorHandlers.set(name, fn);
	}
}
