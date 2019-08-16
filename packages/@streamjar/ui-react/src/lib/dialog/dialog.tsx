import * as React from 'react';
import { Transition } from 'react-transition-group';
import { FocusTrap, ArcScope, Button as Buttons, ArcEvent, FocusExclude } from '@mixer/arcade-machine-react';

import { Portal } from '../outlet/portal';
import { Button } from '../button';
import { Spinner } from '../spinner';

// tslint:disable max-classes-per-file

export interface IDialogHeaderProps {
	onClose?(): void;
}

export class DialogHeader extends React.PureComponent<IDialogHeaderProps> {
	public static defaultProps = {
		onClose: () => { /* */ },
	};

	public render(): JSX.Element {
		const { children, onClose } = this.props;

		return (
			<div className="jar-dialog-header" style={{ flexShrink: 0 }}>
				<h5 className="jar-dialog-header__title layout-row layout-align-between-center">
					{children}
				</h5>

				<span className="flex"></span>

				<Button round={true} raised={true} icon="close" onClick={onClose}></Button>
			</div>
		);

	}
}

export class DialogContent extends React.PureComponent {
	public render(): JSX.Element {
		const { children } = this.props;

		return (
			<div style={{ flex: 1, padding: '15px 25px 10px', overflow: 'auto' }}>
				{children}
			</div>
		);
	}
}

export class DialogFooter extends React.PureComponent {
	public render(): JSX.Element {
		const { children } = this.props;

		return (
			<div className="layout-row layout-align-end-center" style={{ padding: '20px 25px' }}>
				{children}
			</div>
		);
	}
}

export interface IDialogProps {
	state?: object;
	show: boolean;
	onClose(data: object | null): void;
}

export interface IDialogConfig {
	width?: string;
	height?: string;
	minWidth?: string;
	maxWidth?: string;
	state: DialogStatus;
}

export enum DialogStatus {
	LOADING,
	LOADED,
}

export interface IDialogState {
	jarDialog: IDialogConfig;
	jarOpen: boolean;
}

const ANIMATION = 400;

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
	entered: { opacity: 1 },
	entering: { opacity: 1 },
	exiting: { opacity: 0 },
};

export abstract class BaseDialog<P = {}, S = {}> extends React.PureComponent<IDialogProps & P, IDialogState & S> {
	public initState?: DialogStatus;

	constructor(props: IDialogProps & P) {
		super(props);
	}

	public abstract initialState(): S;

	public dialogDidOpen() { /* */ }
	public dialogWillClose() { /* */ }

	public componentDidUpdate(prev: IDialogProps & P) {
		if (prev.show !== this.props.show) {
			this.setState({
				jarOpen: this.props.show,
			});

			if (this.props.show) {
				this.dialogDidOpen();
			}
		}
	}

	public loading(): void {
		this.setState(state => ({
			jarDialog: {
				...(state.jarDialog as any),
				state: DialogStatus.LOADED,
			},
		}));
	}

	public loaded() {
		this.setState(state => ({
			jarDialog: {
				...(state.jarDialog as any),
				state: DialogStatus.LOADED,
			},
		}));
	}

	public setupDialog(data: IDialogConfig): void {
		if (this.state !== undefined) {
			console.error('Calls to setupDialog() are forbidden post-init');
		}

		this.initState = data.state;

		this.state = { jarOpen: this.props.show || false, jarDialog: data, ...(this.initialState() as any) };
	}

	public close(data: object | null = null): void {
		if (!this.state.jarOpen) {
			return;
		}

		this.setState({
			jarOpen: false,
		});

		this.dialogWillClose();

		this.setState(state => ({
			jarDialog: {
				...(state.jarDialog as any),
				state: this.initState,
			},
			...(this.initialState() as any),
		}));

		setTimeout(() => {

			this.props.onClose(data);
		}, ANIMATION);
	}

	public closeBackdrop = (event: React.MouseEvent<HTMLDivElement>): void => {
		if (event.currentTarget === event.target) {
			this.close(null);
		}
	}

	public handleBack = (evt: ArcEvent): void => {
		if (evt.event === Buttons.Back) {
			this.close();
		}
	}

	public getDialog = (state: string): JSX.Element => {
		if (this.props.show === false) {
			return <React.Fragment />;
		}

		const { jarDialog } = this.state;

		let dialog = this.renderDialog();

		// we could use a provider here.. ooooor we could mutate some childs children. sorry.
		if (dialog.type === React.Fragment) {
			const childProps = React.Children.map(dialog.props.children, (child: any) => {
				const item = child as React.ReactElement<IDialogHeaderProps & { children: string }> | null;

				if (child.type !== DialogHeader || !item) {
					return child;
				}

				return React.cloneElement(item, { ...item.props, onClose: () => { this.close(null); } });
			});

			dialog = React.cloneElement(dialog, { children: childProps });
		}

		const overlay = (
			<div className="jar-dialog__overlay layout-row layout-align-center-center">
				<Spinner size={40} />
			</div>
		);

		return (
			<Portal>
				<FocusTrap>
					<ArcScope onButton={this.handleBack}>
						<FocusExclude active={jarDialog.state === DialogStatus.LOADING}>
							<div className="jar-dialog-target" style={{ position: 'relative', zIndex: 10000 }}>
								<div className="jar-overlay layout-column layout-align-center-center"
									onClick={this.closeBackdrop}
									style={{ ...OVERLAY_BASE, ...OVERLAY_CLASSES[state] }}>
									<div className="jar-dialog layout-column" style={{ ...(jarDialog as any), ...DEFAULT, ...CLASSES[state] }}>
										{jarDialog.state === DialogStatus.LOADING && overlay}

										{dialog}
									</div>
								</div>
							</div>
						</FocusExclude>
					</ArcScope>
				</FocusTrap>
			</Portal>
		);
	}

	public render(): JSX.Element {
		const { jarOpen } = this.state;

		return (
			<Transition in={jarOpen} appear={true} unmountOnExit={true} timeout={{ exit: 200, enter: 0 }} children={this.getDialog} />
		);
	}

	protected abstract renderDialog(): JSX.Element;
}
