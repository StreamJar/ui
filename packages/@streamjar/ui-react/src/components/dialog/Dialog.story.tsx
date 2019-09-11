import * as React from 'react';
import { withDialog, DialogContext, useDialog, IDialogStatus, DialogHeader, DialogContent, DialogFooter } from './';
import { Button } from '../form/button';

export default {
	title: 'StreamJar UI|Components/Dialog',
};

const TestDialog = withDialog((props: { test: boolean }) => {
	const dialog = React.useContext(DialogContext);

	React.useEffect(() => {
		setTimeout(() => {
			dialog.setDialogState(IDialogStatus.LOADED);
		},         2000);
	},              []);

	return (
		<>
			<DialogHeader> Hi {props.test} </DialogHeader>
			<DialogContent>
				<h2>hi!</h2>
			</DialogContent>
			<DialogFooter>
				foot
			</DialogFooter>
		</>
	);
});

export const BasicDialog = () => {
	const { dialogProps, openDialog } = useDialog({
		width: '50vw',
		height: '500px',
		loadingByDefault: true,
	});

	return (
		<>
			<Button raised={true} onClick={openDialog}> open dialog </Button>
			<TestDialog {...dialogProps} test={false} />
		</>
	);
};
