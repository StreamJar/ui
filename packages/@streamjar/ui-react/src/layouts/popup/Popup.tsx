import * as React from 'react';

export interface IPopupProps {
	/** Title of the element */
	title?: string;

	/** Tagline of the element */
	tag?: string;
}

export const Popup: React.FC<IPopupProps> = (props: React.PropsWithChildren<IPopupProps>) => {
	const { children, tag, title } = props;

	return (
		<div className="jar-popup layout-row layout-align-center-center">
			<div className="jar-popup__container j-dark layout-column layout-align-start-start">
				{title === '' && <h2 className="jar-logo"><img src="/assets/jar-white.svg" alt="StreamJar" /></h2>}
				{title !== '' && <h2> {title} </h2>}

				<p className="jar-popup-tagline"> {tag} </p>

				{children}
			</div>
		</div>
	);
};

Popup.defaultProps = {
	title: '',
};
