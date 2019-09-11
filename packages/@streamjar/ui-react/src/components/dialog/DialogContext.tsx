import * as React from 'react';

export enum IDialogStatus {
	LOADING,
	LOADED,
}

export interface IDialogContext {
	dialogState: IDialogStatus;

	setDialogState(state: IDialogStatus): void;
	closeDialog(data: any): void;
}

export const DialogContext = React.createContext<IDialogContext>({
	dialogState: IDialogStatus.LOADED,
	setDialogState() { /* */ },
	closeDialog() { /* */ },
});
