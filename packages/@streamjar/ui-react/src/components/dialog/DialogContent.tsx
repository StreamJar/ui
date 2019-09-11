import * as React from 'react';

export const DialogContent: React.FC<React.PropsWithChildren<{}>> = (props: React.PropsWithChildren<{}>) => {
	const { children } = props;

	return (
		<div style={{ flex: 1, padding: '15px 25px 10px', overflow: 'auto' }}>
			{children}
		</div>
	);
};
