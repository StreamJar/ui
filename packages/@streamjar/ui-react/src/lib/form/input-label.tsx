import * as React from 'react';

export class InputLabel extends React.PureComponent {
	public render(): JSX.Element {
		return (
			<div className="jar-input-label">
				{this.props.children}
			</div>
		);
	}
}
