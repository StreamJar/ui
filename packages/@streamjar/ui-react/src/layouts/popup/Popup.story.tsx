import * as React from 'react';
import { Popup } from './Popup';

export default {
	title: 'StreamJar UI|Layouts/Popup',
	parameters: {
		component: Popup,
	},
};

export const SimplePopup = () => {
	return (
		<div style={{ width: '100%', height: 450, position: 'relative' }}>
			<Popup>
				<h2> hi </h2>
			</Popup>
		</div>
	);
};

export const TagPopup = () => {
	return (
		<div style={{ width: '100%', height: 450, position: 'relative' }}>
			<Popup tag="do magical things">
				<h2> hi </h2>
			</Popup>
		</div>
	);
};

export const TitleTagPopup = () => {
	return (
		<div style={{ width: '100%', height: 450, position: 'relative' }}>
			<Popup title="StreamJar Desktop" tag="Allow someone access to your channel">
				<div>
					<p> An error occured while attempting to authorize this application.
						This is likely an issue with the site you came from and not us.
						Please contact them to resolve this error.
					</p>
					<br />
					<p> Error Code: <strong> just-a-demo </strong></p>
				</div>
			</Popup>
		</div>
	);
}; ; ;
