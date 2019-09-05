import * as React from 'react';
export interface ISpinnerProps {
	/**
	 * aaa
	 */
	size?: number; // @default 50
}

/**
 * Display a forever loading spinner.
 */
export const Spinner: React.FC<ISpinnerProps> = React.memo(({ size }: ISpinnerProps) => {
	return (
		<div className="jar-spinner-outer" style={{ width: `${size}px`, height: `${size}px` }}>
			<div className="jar-spinner" style={{ width: `${size}px`, height: `${size}px` }}>
				<svg className="jar-spinner__container" viewBox="25 25 50 50">
					<circle className="jar-spinner__path" cx="50" cy="50" r="20" fill="none" strokeWidth="3" strokeMiterlimit="10" />
				</svg>
			</div>
		</div>
	);
});

Spinner.defaultProps = {
	size: 50,
};
