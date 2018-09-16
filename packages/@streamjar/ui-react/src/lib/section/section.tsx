import * as React from 'react';
import * as classnames from 'classnames';

export interface ISectionProps {
	header?: JSX.Element;
	action?: JSX.Element;
	tabs?: boolean;
	onlyTabs?: boolean;
}

export class Section extends React.PureComponent<ISectionProps> {
	public render(): JSX.Element {
		const { children, header, action, tabs, onlyTabs } = this.props;

		const className = classnames({
			'jar-section__header': true,
			'jar-section__tabs': tabs,
			'layout-align-end-center': true,
			'layout-column-reverse.xs': onlyTabs,
			'layout-column.xs': !onlyTabs,
			'layout-row': !onlyTabs,
			'layout-row-reverse': onlyTabs,
		});

		return (
			<div className="jar-section">
				<div className={className}>
					<h2 className="jar-section__title">
						{header && <div className="jar-section-header"> {header} </div>}
					</h2>
					<span className="flex"></span>
					{action && <div className="jar-section-action"> {action} </div>}
				</div>
				<div className="jar-section__content">
					{children}
				</div>
			</div>
		);
	}
}
