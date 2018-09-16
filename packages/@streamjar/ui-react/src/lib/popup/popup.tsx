import * as React from 'react';

export interface IPopupProps {
	title?: string;
	tag?: string;
}

export class Popup extends React.PureComponent<IPopupProps> {
	public static defaultProps: Partial<IPopupProps> = {
		title: '',
	};

	public render(): JSX.Element {
		const { children, tag, title } = this.props;

		return (
			<div className="jar-popup layout-row layout-align-center-center">
				<div className="jar-popup__container layout-column layout-align-start-start">
					{title === '' && <h2 className="jar-logo"><img src="/assets/jar-white.svg" alt="StreamJar" /></h2>}
					{title !== '' && <h2> {title} </h2>}
					<p className="jar-popup-tagline"> {tag} </p>
					{children}
				</div>
			</div>
		);
	}
}
