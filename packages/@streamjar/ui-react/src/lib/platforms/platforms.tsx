import * as React from 'react';

import { Checkbox } from '../checkbox';

export interface IPlatformsProps {
	supported?: string[];
	value?: string[];
	onChange(platforms: string[]): void;
}

export interface IPlatformsState {
	value: string[];
	all: boolean;
}

export class Platforms extends React.PureComponent<IPlatformsProps, IPlatformsState> {
	public static defaultProps: Partial<IPlatformsProps> = {
		onChange: () => { /* */ },
		supported: ['mixer', 'twitch', 'smashcast'],
	};

	constructor(props: IPlatformsProps) {
		super(props);

		this.disableAll = this.disableAll.bind(this);
		this.disableAllFalse = this.disableAllFalse.bind(this);

		this.state = this.handleProps();
	}

	public componentWillUpdate(prev: IPlatformsProps): void  {
		if (prev.value !== this.props.value) {
			this.setState(this.handleProps());
		}
	}

	public onChecked(type: string, value: boolean): void {
		this.setState(state => {
			let val = { value: [...state.value, type] };

			if (state.value.includes(type)) {
				val = { value: state.value.filter(i => i !== type) };
			}

			this.props.onChange(val.value);

			return val;
		});
	}

	public disableAll(value: boolean = false): void {
		if (!value) {
			this.setState({ all: false });
		} else {
			this.props.onChange(this.props.supported!);

			this.setState({
				all: true,
				value: this.props.supported!,
			});
		}
	}

	public disableAllFalse(): void {
		this.disableAll(false);
	}

	public render(): JSX.Element {
		const { supported } = this.props;
		const { all } = this.state;

		return (
			<React.Fragment>
				<Checkbox value={all} onChange={this.disableAll} colour="accent"> All </Checkbox>
				<hr style={{ border: '1px solid rgb(105, 76, 127)'}} />
				<div style={{ opacity: all ? 0.2 : 1 }}>
					{supported!.includes('mixer') && this.getPlatform('mixer', 'Mixer')}
					{supported!.includes('twitch') && this.getPlatform('twitch', 'Twitch')}
					{supported!.includes('smashcast') && this.getPlatform('smashcast', 'Smashcast')}
				</div>
			</React.Fragment>
		);
	}

	private getPlatform(id: string, name: string): JSX.Element {
		const { value } = this.state;
		const last = value.length === 1;

		return (
			<div onClick={this.disableAllFalse}>
				<Checkbox
					value={value.includes(id)}
					colour={`platform-${id}`}
					onChange={this.onChecked.bind(this, id)} // tslint:disable-line
					disabled={value.includes(id) && last}>
					{name}
				</Checkbox>
			</div>
		);
	}

	private handleProps(): IPlatformsState {
		if (this.props.value) {
			const val = this.props.value.filter(i => this.props.supported!.indexOf(i) !== -1);

			return { value: val, all: val.length === this.props.supported!.length };
		} else {
			return { value: this.props.supported!, all: true };
		}
	}
}
