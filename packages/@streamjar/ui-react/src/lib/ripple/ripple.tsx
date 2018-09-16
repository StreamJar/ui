import { MDCRipple } from '@material/ripple';
import * as classnames from 'classnames';
import * as React from 'react';

import './ripple.scss';

export interface IRippleProps {
	unbounded?: boolean;
	listenTo?(): React.RefObject<HTMLDivElement>;
}

export class Ripple extends React.PureComponent<IRippleProps> {
	public static defaultProps: Partial<IRippleProps> = {
		unbounded: false,
};

	public ref: React.RefObject<HTMLDivElement>;
	public ripple!: MDCRipple;

	constructor(props: IRippleProps) {
		super(props);

		this.ref = React.createRef();
	}

	public componentDidMount(): void {
		if (this.ref.current) {
			this.ripple = new MDCRipple(this.ref.current);

			if (this.props.unbounded) {
				this.ripple.unbounded = true;
			}

			// todo(LukeT): replace implementation
			setTimeout(() => {
				if (this.props.listenTo) {
					const ref = this.props.listenTo();

					if (!ref || !ref.current) {
						return;
					}

					ref.current.addEventListener('mousedown', () => {
						this.ripple.activate();
					});

					ref.current.addEventListener('mouseup', () => {
						this.ripple.deactivate();
					});
				}
			});
		}
	}

	public componentWillUnmount(): void {
		if (this.ripple) {
			this.ripple.destroy();
		}
	}

	public render(): JSX.Element {
		const classes = classnames({
			'jar-ripple': true,
			'jar-ripple-bound': !this.props.unbounded,
			'jar-ripple-unbound': this.props.unbounded,
			'mdc-ripple-surface': true,
		});

		return (
			<div className={classes} ref={this.ref}/>
		);
	}
}
