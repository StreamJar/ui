import * as React from 'react';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import { IToast } from './Toasts';
import { JAR_VALID_THEMES } from '../../constants';
import { Button } from '../form/button';

const THEMES: { [key: string]: JAR_VALID_THEMES } = {
	error: 'danger',
	info: 'platform-smashcast',
	success: 'success',
};

const ICONS = {
	error: 'warning',
	info: 'info_outline',
	success: 'done_all',
};

const ANIMATION = 500;

const DEFAULTS: React.CSSProperties = {
	opacity: 0,
	transition: `all 250ms cubic-bezier(0.25, 0.8, 0.25, 1)`,
};

const TRANSITIONS: { [key: string]: React.CSSProperties } = {
	entered:  { opacity: 1, transform: 'translateY(0%) scale(1)' },
	entering:  { opacity: 1, transform: 'translateY(0%) scale(1)' },
	exiting:  { opacity: 0, transform: 'translateY(25%) scale(.5)' },
	exited:  { opacity: 0, transform: 'translateY(25%) scale(.5)' },
};

export interface IToastProps {
	toast: IToast;
	depth: number;
	closeToast(toast: IToast): void;
}

export const Toast: React.FC<IToastProps> = (props: IToastProps) => {
	const { toast, closeToast } = props;
	const [iconFocus, setIconFocus] = React.useState(false);
	const [visible, setVisible] = React.useState(false);

	const icon: string = iconFocus ? 'delete' : ICONS[toast.type];

	const close = () => { closeToast(toast); };
	const focus = () => { setIconFocus(true); };
	const blur = () => { setIconFocus(false); };

	React.useEffect(() => {
		setVisible(true);

		setTimeout(() => {
			setVisible(false);
		},         toast.duration);

		setTimeout(() => {
			close();
		},         toast.duration + ANIMATION);
	},              []);

	const getToast = (state: TransitionStatus) => {
		return (
			<div className="jar-toast" style={{...DEFAULTS, ...TRANSITIONS[state]}}>
				<div className="layout-row layout-align-center-center">
					<div onMouseEnter={focus} onMouseLeave={blur}>
						<Button onClick={close} round={true} raised={true} colour={THEMES[toast.type]} icon={icon} />
					</div>

					<div className="jar-toast__status"> {toast.message} </div>
				</div>
			</div>
		);
	};

	return (
		<Transition in={visible} timeout={ANIMATION} children={getToast} />
	);
};
