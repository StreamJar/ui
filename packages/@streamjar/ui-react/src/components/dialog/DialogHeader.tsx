import * as React from 'react';

import { Button } from '../form/button';
import { DialogContext } from './DialogContext';

export const DialogHeader: React.FC<React.PropsWithChildren<{}>> = (props: React.PropsWithChildren<{}>) => {
	const { children } = props;

	const dialog = React.useContext(DialogContext);

	const closeDialog = () => {
		dialog.closeDialog(null);
	};

	return (
		<div className="jar-dialog-header" style={{ flexShrink: 0 }}>
			<h5 className="jar-dialog-header__title layout-row layout-align-between-center">
				{children}
			</h5>

			<span className="flex"></span>

			<Button round={true} raised={true} icon="close" onClick={closeDialog}></Button>
		</div>
	);
};
