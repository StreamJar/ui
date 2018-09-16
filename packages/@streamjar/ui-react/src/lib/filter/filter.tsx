import * as React from 'react';

import { Button } from '../button';
import { Anchor } from '../outlet/anchor';

export interface IFilterState {
	anchor: HTMLElement | null;
}

export class Filter extends React.PureComponent<{}, IFilterState> {
	public ref: React.RefObject<HTMLDivElement>;

	constructor(props: {}) {
		super(props);

		this.toggleFilter = this.toggleFilter.bind(this);
		this.close = this.close.bind(this);

		this.ref = React.createRef();
		this.state = { anchor: null };
	}

	public toggleFilter(anchor: React.SyntheticEvent<HTMLButtonElement>): void {
		const target = anchor.currentTarget;

		if (this.state.anchor) {
			this.close();

			return;
		}

		document.addEventListener('click', this.close, { capture: true });

		this.setState({
			anchor: target,
		});
	}

	public close(event?: MouseEvent): void {
		if (event) {
			if (this.ref.current!.contains(event.target as any)) {
				return;
			}

			event.stopPropagation();
			event.preventDefault();
		}

		document.removeEventListener('click', this.close, { capture: true });
		this.setState({ anchor: null });
	}

	public componentWillUnmount(): void {
		document.removeEventListener('click', this.close, { capture: true });
	}

	public render(): JSX.Element {
		const { children } = this.props;
		const { anchor } = this.state;

		const width: number = React.Children.count(children) * 202;

		const anchorEl = (
			<Anchor width={width} el={anchor!} pull="end">
				<div className="jar-filter" ref={this.ref}>
					<div className="jar-filter__settings layout-row">
						{children}
					</div>
				</div>
			</Anchor>
		);

		return (
			<React.Fragment>
				<Button icon="jar_filter" onClick={this.toggleFilter}>Filter </Button>

				{anchor && anchorEl}
			</React.Fragment>
		);
	}
}

export interface IFilterSectionProps {
	name: string;
}

export class FilterSection extends React.PureComponent<IFilterSectionProps> {
	public render() {
		const { children, name } = this.props;

		return (
			<div className="jar-filter-section-container">
				<div className="jar-filter-section">
					<h3 className="jar-filter-section__header"> <small>{name}</small> </h3>
					{children}
				</div>
			</div>
		);
	}
}
