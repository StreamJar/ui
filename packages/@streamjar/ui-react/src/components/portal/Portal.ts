import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { getOutletRef, getRootOutlet } from '../../common/outlet';

/** Portal a react element to another world! 👻 */
export const Portal: React.FC<React.PropsWithChildren<{}>> = (props: React.PropsWithChildren<{}>) => {
	const { children } = props;

	const [ref] = React.useState(getOutletRef());

	React.useEffect(() => {
		return () => {
			getRootOutlet().removeChild(ref);
		};
	},              []);

	return ReactDOM.createPortal(
		children,
		ref,
	);
};
