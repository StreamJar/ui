import * as React from 'react';
import { Transition } from 'react-transition-group';

import { Anchor } from '../outlet/anchor';

export interface IMenuProps {
	width?: number;
	anchor: HTMLElement | null;
	anchorWidth?: boolean;
	supportContentClick?: boolean;
	onClose(event: MouseEvent | null): void;
}

export interface IMenuState {
	hide: boolean;
	anchor: HTMLElement | null;
}

const DEFAULT: React.CSSProperties = {
	marginTop: -30,
	opacity: 0,
	transition: '200ms ease-in-out',
};

const CLASSES: { [key: string]: React.CSSProperties} = {
	entered: { opacity: 1, marginTop: 0 },
	entering: { opacity: 1, marginTop: 0 },
	exiting: { opacity: 0, marginTop: -30 },
};

export class Menu extends React.PureComponent<IMenuProps, IMenuState> {
	public static defaultProps: Partial<IMenuProps> = {
		onClose: () => { /* */ },
		supportContentClick: false,
		width: 165,
	};

	public menuRef: React.RefObject<HTMLDivElement>;

	constructor(props: IMenuProps) {
		super(props);

		this.state = { hide: false, anchor: null };
		this.menuRef = React.createRef();
	}

	public componentDidUpdate(prev: IMenuProps): void {
		if (this.props.anchor && prev.anchor !== this.props.anchor) {
			this.setState({
				anchor: this.props.anchor,
				hide: false,
			});
		}

		if (this.props.anchor) {
			document.addEventListener('click', this.close, { capture: true });
		}

		console.log('got update', this.props.anchor);
		if (this.props.anchor === null && this.state.anchor !== null) {
			this.close(null);
		}
	}

	public componentWillUnmount(): void {
		document.removeEventListener('click', this.close, { capture: true });
	}

	public close = (event: MouseEvent | null): void => {
		if (event && this.menuRef.current && this.menuRef.current!.contains(event.target as any) && this.props.supportContentClick) {
			return;
		}

		if (event && (!this.menuRef.current || !this.menuRef.current.contains(event.target as any))) {
			event.stopPropagation();
			event.preventDefault();
		}

		this.setState({
			hide: true,
		});

		setTimeout(() => {
			this.setState({ anchor: null });
			this.props.onClose(event);
			this.componentWillUnmount();
		},         100);
	}

	public renderMenu = (state: string): JSX.Element => {
		const { children } = this.props;

		return (
			<div ref={this.menuRef} className="jar-menu layout-column" style={{...DEFAULT, ...CLASSES[state]}}>
				{children}
			</div>
		);
	}

	public render(): JSX.Element | null {
		const { width, anchorWidth } = this.props;
		const { anchor, hide } = this.state;
		console.log('has anchor', anchor);

		if (anchor) {
			return (
				<Anchor el={anchor} width={width} anchorWidth={anchorWidth}>
					<Transition in={!hide} appear={true} timeout={500} children={this.renderMenu} />
				</Anchor>
			);
		}

		return (null);
	}
}
