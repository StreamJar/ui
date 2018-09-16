import * as React from 'react';

import { toasts, Button } from '../../../src/lib';
import { Demo, IDemoConfig } from '../demo/demo';

export class ToastsDemo extends React.Component {
	public config: IDemoConfig = {
		name: 'Toasts',
		components: [

		],
		examples: `
export class Demo extends React.Component {
	public info = () => {
		toasts.info('This is an informative toast', 500);
	}

	public success = () => {
		toasts.success('This is an successful toast');
	}

	public danger = () => {
		toasts.error('This is an dangerous toast');
	}

	public render() {
		return (
			<Demo config={this.config}>
				<Button raised={true} onClick={this.info}> Info </Button>
				<Button colour="success" raised={true} onClick={this.success}> Success </Button>
				<Button colour="danger" raised={true} onClick={this.danger}> Error </Button>
			</Demo>
		);
	}
}
		`,
	};

	public info = () => {
		toasts.info('This is an informative toast', 2000);
	}

	public success = () => {
		toasts.success('This is an successful toast');
	}

	public danger = () => {
		toasts.error('This is an dangerous toast');
	}

	public render() {
		return (
			<Demo config={this.config}>
				<Button raised={true} onClick={this.info}> Info </Button>
				<Button colour="success" raised={true} onClick={this.success}> Success </Button>
				<Button colour="danger" raised={true} onClick={this.danger}> Error </Button>
			</Demo>
		);
	}
}
