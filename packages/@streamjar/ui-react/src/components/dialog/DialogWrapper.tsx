import * as React from 'react';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import { Spinner } from '../spinner';
import { Portal } from '../portal';
import { IDialogStatus } from './DialogContext';

export const ANIMATION = 400;

const DEFAULT: React.CSSProperties = {
	transform: 'translateY(25%) scale(0.9)',
	transition: `${ANIMATION}ms cubic-bezier(0.25, 0.8, 0.25, 1)`,
};

const CLASSES: { [key: string]: React.CSSProperties } = {
	entered: { transform: 'translateY(0) scale(1)' },
	entering: { transform: 'translateY(0) scale(0.9)' },
	exiting: { transform: 'translateY(0) scale(0.9)' },
};

const OVERLAY_BASE: React.CSSProperties = {
	opacity: 0,
	transition: `${ANIMATION}ms cubic-bezier(0.25, 0.8, 0.25, 1)`,
};

const OVERLAY_CLASSES: { [key: string]: React.CSSProperties } = {
	entering: { opacity: 0 },
	entered: { opacity: 1 },
	exited: { opacity: 0 },
	exiting: { opacity: 0 },
};

// Dialog style configs
export interface IDialogConfig {
	loadingByDefault?: boolean;
	width?: string;
	height?: string;
	minWidth?: string;
	maxWidth?: string;
}

// Props that get passed to our internal dialog
export interface IDialogProps extends IDialogConfig {
	dialogOpen: boolean;
	dialogState: IDialogStatus;

	internalDialogClose(data: any): void;
	setDialogState(state: IDialogStatus): void;
}

export const DialogWrapper: React.FC<React.PropsWithChildren<IDialogProps>> =
	(props: React.PropsWithChildren<IDialogProps>) => {
		const {
			dialogState,
			internalDialogClose,
			children,
			width,
			height,
			maxWidth,
			minWidth,
			dialogOpen,
			setDialogState,
			loadingByDefault,
		} = props;

		// Refresh the loading state.
		React.useEffect(() => {
			if (dialogOpen) {
				setDialogState(loadingByDefault ? IDialogStatus.LOADING : IDialogStatus.LOADED);
			}
		},              [dialogOpen]);

		const dialogStyle = {
			width,
			height,
			maxWidth,
			minWidth,
		};

		const closeBackdrop = (event: React.MouseEvent<HTMLDivElement>): void => {
			if (event.currentTarget === event.target) {
				internalDialogClose(null);
			}
		};

		const overlay = (
			<div className="jar-dialog__overlay layout-row layout-align-center-center">
				<Spinner size={40} />
			</div>
		);

		const dialog = (state: TransitionStatus) => (
			<Portal>
				<div className="jar-dialog-target" style={{ position: 'relative', zIndex: 10000 }}>
					<div className="jar-overlay layout-column layout-align-center-center"
						onClick={closeBackdrop}
						style={{ ...OVERLAY_BASE, ...OVERLAY_CLASSES[state] }}>
						<div className="jar-dialog layout-column" style={{ ...dialogStyle, ...DEFAULT, ...CLASSES[state] }}>
							{dialogState === IDialogStatus.LOADING && overlay}

							{children}
						</div>
					</div>
				</div>
			</Portal>
		);

		return (
			<Transition in={dialogOpen} appear={true} unmountOnExit={true} timeout={{ exit: 200, enter: 0 }} children={dialog} />
		);
	};
