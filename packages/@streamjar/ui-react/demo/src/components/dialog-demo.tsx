import * as React from 'react';

import { Demo, IDemoConfig } from '../demo/demo';
import { BaseDialog, DialogStatus, DialogHeader, DialogContent, DialogFooter, Button } from '../../../src/lib';

export interface IDialogS {
	timeout: any;
}

export class Dialog extends BaseDialog<{}, IDialogS> {

	constructor(props: any) {
		super(props);

		this.setupDialog({
			width: '600px',
			state: DialogStatus.LOADING,
		});
	}

	public initialState() {
		return { timeout: null };
	}

	public dialogDidOpen(): void {
		this.setState({
			timeout: setTimeout(() => { this.loaded(); }, 2000),
		});
	}

	public dialogWillClose() {
		clearTimeout(this.state.timeout);
	}

	public renderDialog(): JSX.Element {
		return (
			<React.Fragment>
				<DialogHeader> Hi </DialogHeader>
				<DialogContent> <h2> hey </h2> </DialogContent>
				<DialogFooter> <Button raised={true}>Submit</Button> </DialogFooter>
			</React.Fragment>
		);
	}
}

export class DialogDemo extends React.Component<{}, { open: boolean }> {
	public config: IDemoConfig  = {
		name: 'Dialog',
		components: [],
		examples: `
export interface IDialogS {
	timeout: any;
}

export class Dialog extends BaseDialog<{}, IDialogS> {

	constructor(props) {
		super(props);

		this.setupDialog({
			width: '600px',
			state: DialogStatus.LOADING,
		});
	}

	public initialState() {
		return { timeout: null };
	}

	public dialogDidOpen(): void {
		this.setState({
			timeout: setTimeout(() => { this.loaded(); }, 2000),
		});
	}

	public dialogWillClose() {
		clearTimeout(this.state.timeout);
	}

	public renderDialog(): JSX.Element {
		return (
			<React.Fragment>
				<DialogHeader> Hi </DialogHeader>
				<DialogContent> <h2> hey </h2> </DialogContent>
				<DialogFooter> <Button raised={true}>Submit</Button> </DialogFooter>
			</React.Fragment>
		);
	}
}

<Dialog show={open} onClose={this.close} />
		`,
	};

	constructor(props: {}) {
		super(props);

		this.open = this.open.bind(this);
		this.close = this.close.bind(this);

		this.state = { open: false };
	}

	public open() {
		this.setState({
			open: true,
		});
	}

	public close() {
		this.setState({
			open: false,
		});
	}

	public render() {
		const { open } = this.state;

		return (
			<Demo config={this.config}>
				<h5> About </h5>
				<p>Dialogs are created by extending BaseDialog. All dialogs will have a show={'{boolean}'} and onClose. onClose will
					return with whatever this.close is passed, otherwise null. </p>
				<p> Dialogs are special, in that they have their own lifecycle (mostly needed for reuse</p>
				<p> Instead of <code>componentDidMount</code>, use <code>dialogDidOpen</code>
					and instead of <code>componentWillUnmount</code> use <code>dialogWillClose</code>. </p>
				<p> Initial state must be set through <code>initialState()</code> </p>
				<Button raised={true} onClick={this.open}>Open Dialog</Button>

				<Dialog show={open} onClose={this.close} />

			</Demo>
		);
	}
}
