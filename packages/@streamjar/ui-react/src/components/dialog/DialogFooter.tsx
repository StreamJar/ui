import * as React from 'react';

export const DialogFooter: React.FC<React.PropsWithChildren<{}>> = (props: React.PropsWithChildren<{}>) => {
	const { children } = props;

	return (
		<div className="layout-row layout-align-end-center" style={{ padding: '20px 25px' }}>
			{children}
		</div>
	);
};
