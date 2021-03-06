import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';

import { Anchor } from '../anchor/Anchor';
import { IAnchorSide } from '../../common/positioner';

export interface ITooltipProps {
	/** Which axis to show the tooltip on */
	axis?: 'horizontal' | 'vertical';

	/** The message to display */
	message: string;

	/** Whether tooltips are enabled */
	enabled?: boolean;

	/** Where to pull the tooltip towards */
	pull?: IAnchorSide;
}

const DEFAULT: React.CSSProperties = {
	opacity: 0,
	transform: 'translateY(25%) scale(1)',
	transition: '300ms cubic-bezier(0.25, 0.8, 0.25, 1)',
};

const CLASSES: { [key: string]: React.CSSProperties } = {
	entered: { opacity: 1, transform: 'translateY(0%) scale(1)' },
	entering: { opacity: 1, transform: 'translateY(0%) scale(1)' },
	exiting: { opacity: 0, transform: 'translateY(50%) scale(1)' },
};

/**
 * Display a tooltip based on focus/hover
 */
export class Tooltip extends React.PureComponent<ITooltipProps, { anchor: HTMLElement | null; hide: boolean }> {
	public static defaultProps = {
		axis: 'vertical',
		pull: 'center',
	};

	public childRef?: HTMLElement;

	constructor(props: ITooltipProps) {
		super(props);

		this.state = { anchor: null, hide: false };
	}

	public componentDidMount(): void {
		this.getTarget();
	}

	public componentDidUpdate(prev: any): void {
		if (this.props.children !== prev.children) {
			this.getTarget();
		}
	}

	public getTarget(): void {
		if (this.childRef) {
			this.clearTarget(this.childRef);
		}

		const ref: HTMLElement = ReactDOM.findDOMNode(this) as any;

		ref.addEventListener('mouseover', this.mouseOver);
		ref.addEventListener('focus', this.mouseOver);
		ref.addEventListener('mouseleave', this.mouseLeave);
		ref.addEventListener('blur', this.mouseLeave);

		this.childRef = ref;
	}

	public clearTarget(el: HTMLElement): void {
		if (!el) {
			return;
		}

		el.removeEventListener('mouseover', this.mouseOver);
		el.removeEventListener('focus', this.mouseOver);
		el.removeEventListener('mouseleave', this.mouseLeave);
		el.removeEventListener('blur', this.mouseLeave);
	}

	public render(): JSX.Element {
		if (this.props.enabled === false) {
			return <>{this.props.children}</>;
		}

		const { axis, pull } = this.props;
		const { anchor, hide } = this.state;

		let anchorEl = <React.Fragment></React.Fragment>;

		if (anchor) {
			anchorEl = (
				<Anchor anchorTo={anchor} pull={pull} axis={axis} offset={7} handleOverflow={false}>
					<Transition in={!hide} appear={true} timeout={300} children={this.getTooltip} />
				</Anchor>
			);
		}

		return (
			<React.Fragment>
				{anchor && anchorEl}

				{this.props.children}
			</React.Fragment>
		);
	}

	private readonly getTooltip = (state: string): JSX.Element => {
		const { message } = this.props;

		return <div className="jar-tooltip" style={{ ...DEFAULT, ...CLASSES[state] }}> {message} </div>;
	}

	private readonly mouseOver = (): void => {
		if (this.childRef) {
			this.setState({
				anchor: this.childRef,
				hide: false,
			});
		}
	}

	private readonly mouseLeave = (): void => {
		this.setState({
			hide: true,
		});

		setTimeout(() => {
			this.setState({
				anchor: null,
			});
		},         100);
	}
}
