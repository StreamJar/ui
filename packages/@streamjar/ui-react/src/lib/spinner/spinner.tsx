import * as React from 'react';

export interface ISpinnerProps {
	size?: number;
}

export class Spinner extends React.PureComponent<ISpinnerProps> {
	public static defaultProps: Partial<ISpinnerProps> = {
		size: 50,
	};

	constructor(props: ISpinnerProps) {
		super(props);
	}

	public render(): JSX.Element {
		const { size } = this.props;

		return (
			<div className="jar-spinner-outer" style={{ width: `${size}px`, height: `${size}px`}}>
				<div className="jar-spinner" style={{ width: `${size}px`, height: `${size}px`}}>
					<svg className="jar-spinner__container" viewBox="25 25 50 50">
						<circle className="jar-spinner__path" cx="50" cy="50" r="20" fill="none" strokeWidth="3" strokeMiterlimit="10" />
					</svg>
				</div>
			</div>
		);
	}
}
