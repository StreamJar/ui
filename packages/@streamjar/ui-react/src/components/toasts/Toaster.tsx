import * as React from 'react';

import { IToast, Toasts } from './Toasts';
import { Toast } from './Toast';

export interface IToasterProps {
	initToast: IToast;
}

export const Toaster: React.FC<IToasterProps> = (props: IToasterProps) => {
	const [toasts, setToasts] = React.useState<any[]>([props.initToast]);

	React.useEffect(() => {
		const fn = (toast: IToast) => {
			setToasts(a => [...a, toast]);
		};

		Toasts.on(fn);

		return () => {
			Toasts.off(fn);
		};
	},              []);

	const onClose = (toast: IToast) => {
		setToasts((a) => a.filter(i => i !== toast));
	};

	const primaryToast = toasts[0];

	return (
		<div className="jar-toasts">
			{primaryToast && <Toast key={+primaryToast.requestedAt} depth={0} toast={primaryToast} closeToast={onClose} />}
		</div>
	);
};
