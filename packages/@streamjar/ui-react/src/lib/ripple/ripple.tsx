import { MDCRipple } from '@material/ripple';
import * as classnames from 'classnames';
import * as React from 'react';

export interface IRippleProps {
	unbounded?: boolean;
	enabled?: boolean
	listenTo?(): React.RefObject<HTMLDivElement>;
}

export class Ripple extends React.PureComponent<IRippleProps> {
	public static defaultProps: Partial<IRippleProps> = {
		unbounded: false,
		enabled: true,
	};

	public ref: React.RefObject<HTMLDivElement>;
	public ripple!: MDCRipple;

	constructor(props: IRippleProps) {
		super(props);

		this.ref = React.createRef();
	}

	public componentWillReceiveProps(newProps: IRippleProps): void {
		if (this.props.enabled !== newProps.enabled) {
			if (this.ripple) {
				this.ripple.destroy();
			}

			if (newProps.enabled) {
				this.setupRipple();
			}
		}
	}

	public componentDidMount(): void {
		if (this.ref.current && this.props.enabled) {
			this.setupRipple();
		}
	}

	public componentWillUnmount(): void {
		if (this.ripple) {
			this.ripple.destroy();
		}
	}

	public render(): JSX.Element {
		const classes = classnames({
			'jar-ripple': this.props.enabled,
			'jar-ripple-bound': !this.props.unbounded,
			'jar-ripple-unbound': this.props.unbounded,
			'mdc-ripple-surface': true,
		});

		return (
			<div className={classes} ref={this.ref}/>
		);
	}

	private setupRipple(): void {
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
						if (!this.props.enabled) {
							return;
						}

						this.ripple.activate();
					});

					ref.current.addEventListener('mouseup', () => {
						this.ripple.deactivate();
					});
				}
			});
		}
	}
}
