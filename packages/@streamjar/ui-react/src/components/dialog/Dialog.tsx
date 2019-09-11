import * as React from 'react';
import { DialogWrapper, IDialogProps, IDialogConfig } from './DialogWrapper';
import { IDialogStatus, DialogContext } from './DialogContext';

export const ANIMATION = 400;

// Props that get internally passed
export interface IDialogChildProps {
	dialogState: IDialogStatus;

	setDialogState(state: IDialogStatus): void;
	closeDialog(data: any): void;
}

// Props that can be passed to a dialog component inline
export interface IDialogLocalProps {
	onClose?(data: any): any;
}

/**
 * HOC for rendering a dialog
 *
 * @param Component The component to wrap
 */
export const withDialog: <P extends object>(Component: React.ComponentType<P>, p?: IDialogConfig) =>
	(props: P & IDialogProps & IDialogLocalProps) => JSX.Element =
		<P extends object>(Component: React.ComponentType<P>, p: IDialogConfig = {}) =>
			(props: P & IDialogProps & IDialogLocalProps) => {
				const {
					// Dialog Config
					loadingByDefault,
					height,
					width,
					maxWidth,
					minWidth,

					// Dialog State
					dialogOpen,
					dialogState,
					setDialogState,
					internalDialogClose,

					// Local prop
					onClose,

					// Components Props
					...componentProps // tslint:disable-line
				} = { ...props, ...p};

				const internalClose = (data: any) => {
					internalDialogClose(data);

					setTimeout(() => {
						if (onClose) {
							onClose(data);
						}
					},         ANIMATION);
				};

				return (
					<DialogWrapper
						loadingByDefault={loadingByDefault}
						height={height}
						width={width}
						maxWidth={maxWidth}
						minWidth={minWidth}
						dialogOpen={dialogOpen}
						dialogState={dialogState}
						setDialogState={setDialogState}
						internalDialogClose={internalClose}>

						<DialogContext.Provider value={{ dialogState, setDialogState, closeDialog: internalClose }}>
							<Component {...(componentProps as P)} />
						</DialogContext.Provider>
					</DialogWrapper>
				);
			};

export function useDialog(props: IDialogConfig): { dialogProps: IDialogProps; openDialog(): void } {
	const [state, setState] = React.useState<IDialogStatus>(IDialogStatus.LOADED);
	const [open, setOpen] = React.useState<boolean>(false);

	return {
		openDialog: () => { setOpen(true); },
		dialogProps: {
			...props,
			dialogState: state,
			setDialogState: setState,
			dialogOpen: open,
			internalDialogClose() { setOpen(false); },
		},
	};
}
