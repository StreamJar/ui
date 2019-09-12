import * as React from 'react';
import { Transition } from 'react-transition-group';

import { Anchor } from '../anchor/Anchor';
import { IAnchorSide } from '../../common/positioner';

export interface IMenuCustomisableProps {
	width?: number;
	height?: number;
	anchorWidth?: boolean;
	supportContentClick?: boolean;
	padding?: boolean;
	pull?: IAnchorSide;
}

export interface IMenuProps extends IMenuCustomisableProps {
	anchor: HTMLElement | null;
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

const CLASSES: { [key: string]: React.CSSProperties } = {
	entered: { opacity: 1, marginTop: 0 },
	entering: { opacity: 1, marginTop: 0 },
	exiting: { opacity: 0, marginTop: -30 },
};

/** Menu Hook */
export function useMenu(props: IMenuCustomisableProps = {}) {
	const [target, setTarget] = React.useState<HTMLElement | null>(null);

	const openBtn = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement | HTMLDivElement>) => {
		setTarget(e.currentTarget as HTMLElement);
	};

	const closeMenu = () => { setTarget(null); };

	return { onMenuOpen: openBtn, closeMenu, menuProps: { ...props, anchor: target, onClose: closeMenu } };
}

export const Menu: React.FC<React.PropsWithChildren<IMenuProps>> = (props: React.PropsWithChildren<IMenuProps>) => {
	const {
		width,
		anchorWidth,
		height,
		children,
		anchor: sourceAnchor,
		supportContentClick,
		onClose,
		padding,
		pull,
	} = props;

	const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
	const menu = React.useRef<HTMLDivElement | null>(null);
	const [visible, setVisible] = React.useState(false);

	const close = (event: MouseEvent | null) => {
		if (event && menu.current && menu.current.contains(event.target as any) && supportContentClick) {
			return;
		}

		if (event && (!menu.current || !menu.current.contains(event.target as any))) {
			event.stopPropagation();
			event.preventDefault();
		}

		setVisible(false);

		setTimeout(() => {
			setAnchor(null);

			if (onClose) {
				onClose(event);
			}
		},         100);
	};

	React.useEffect(() => {
		if (sourceAnchor) {
			document.addEventListener('click', close, { capture: true });
			setAnchor(sourceAnchor);
			setVisible(true);
		} else if (anchor && !sourceAnchor) {
			close(null);
		}

		return () => {
			document.removeEventListener('click', close, { capture: true });
		};
	},              [sourceAnchor]);

	const renderMenu = (state: string): JSX.Element => {
		return (
			<div ref={menu} className="jar-menu j-dark layout-column" style={{ ...DEFAULT, ...CLASSES[state], padding: !padding ? 0 : undefined }}>
				{children}
			</div>
		);
	};

	if (anchor) {
		return (
			<Anchor anchorTo={anchor} width={width} height={height} axis="vertical" pull={pull} matchAnchorWidth={anchorWidth}>
				<Transition in={visible} appear={true} timeout={500} children={renderMenu} />
			</Anchor>
		);
	}

	return (null);
};

Menu.defaultProps = {
	onClose: () => { /* */ },
	supportContentClick: false,
	pull: 'center',
	width: 165,
	padding: true,
};
