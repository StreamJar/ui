import * as React from 'react';

/**
 * Display an input's title
 */
export const InputLabel: React.FC = (props: React.PropsWithChildren<{}>) => {
	return (
		<div className="jar-input-label">
			{props.children}
		</div>
	);
};
