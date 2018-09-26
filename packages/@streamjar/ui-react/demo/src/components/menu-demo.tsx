import * as React from 'react';

import { Button, Menu } from '../../../src/lib';
import { Demo, IDemoConfig } from '../demo/demo';

export class MenuDemo extends React.Component<{}, { anchor: HTMLButtonElement | null }> {
	public config: IDemoConfig = {
		name: 'Menu',
		components: [{
			name: 'Menu',
			props: [{
				name: 'anchor',
				default: '',
				type: 'HTMLElement | null',
				description: 'The target we should anchor to',
			}, {
				name: 'anchorWidth',
				default: 'false',
				type: 'boolean',
				description: 'If the child menu should match the anchor width',
			}, {
				name: 'width',
				default: '',
				type: 'number',
				description: 'The width of the menu in pixels',
			}, {
				name: 'onClose',
				default: '() => { /* */ }',
				description: 'The callback to call when the menu is closed',
				type: '() => void',
			}],
		}],
		examples: `
export class Menu extends React.Component<{}, { anchor: HTMLButtonElement | null }> {
	constructor(props: {}) {
		super(props);

		this.onChange = this.onChange.bind(this);

		this.state = { anchor: null };
	}

	public onChange(e?: React.ChangeEvent<HTMLButtonElement>): void {
		if (e) {
			const target = e.currentTarget;

			this.setState((state) => ({
				anchor: state.anchor ? null : target,
			}));
		} else {
			this.setState({
				anchor: null,
			});
		}
	}

	public render() {
		const { anchor } = this.state;

		return (
			<React.Fragment>
				<Button raised={true} onClick={this.onChange}> Menu </Button>

				<Menu width={600} anchor={anchor} onClose={this.onChange}>
					<p style={{ color: '#FFF', padding: 10, textAlign: 'center' }}> I'm a menu!</p>
				</Menu>
			</React.Fragment>
		);
	}
}
		`,
	};

	constructor(props: {}) {
		super(props);

		this.onChange = this.onChange.bind(this);

		this.state = { anchor: null };
	}

	public onChange(e?: React.MouseEvent<HTMLButtonElement>): void {
		if (e) {
			const target = e.currentTarget;

			this.setState((state) => ({
				anchor: state.anchor ? null : target,
			}));
		} else {
			this.setState({
				anchor: null,
			});
		}
	}

	public render() {
		const { anchor } = this.state;

		return (
			<Demo config={this.config}>
				<Button raised={true} onClick={this.onChange}> Menu </Button>

				<Menu width={600} anchor={anchor} onClose={this.onChange}>
					<p style={{ color: '#FFF', padding: 10, textAlign: 'center' }}> I'm a menu!</p>
				</Menu>
			</Demo>
		);
	}
}
