import { MDCRipple } from '@material/ripple';
import * as classnames from 'classnames';
import * as React from 'react';

export interface IRippleProps {
	/** Whether the ripple should be bound to the container */
	unbounded?: boolean;

	/** Whether the ripple should respond to interactions */
	enabled?: boolean;

	/** An alternate element to respond to click actions */
	listenTo?(): React.RefObject<HTMLDivElement>;
}

/**
 * Display a touch ripple in a given area
 */
export const Ripple: React.FC<IRippleProps> = ({ enabled, unbounded, listenTo }: IRippleProps) => {
	const ref = React.useRef(null);
	const [ripple, setRipple] = React.useState<MDCRipple | null>(null);

	React.useEffect(() => {
		if (enabled && ref.current) {
			const tmp: MDCRipple = new MDCRipple(ref.current!);

			if (unbounded) {
				tmp.unbounded = unbounded;
			}

			setRipple(tmp);

			setTimeout(() => {
				// If listenTo is defined, add event listeners
				if (listenTo) {
					const ref = listenTo();

					if (!ref || !ref.current) {
						return;
					}

					ref.current.addEventListener('mousedown', () => {
						if (!enabled) {
							return;
						}

						ripple!.activate();
					});

					ref.current.addEventListener('mouseup', () => {
						ripple!.deactivate();
					});
				}
			});
		}

		// If somethings changed, tear down the ripple
		return () => {
			if (ripple) {
				ripple.destroy();

				setRipple(null);
			}
		};
	},              [ref, enabled, unbounded, listenTo]);

	const classes = classnames({
		'jar-ripple': enabled,
		'jar-ripple-bound': !unbounded,
		'jar-ripple-unbound': unbounded,
		'mdc-ripple-surface': true,
	});

	return <div className={classes} ref={ref}/>;
};

Ripple.defaultProps = {
	enabled: true,
	unbounded: false,
};
