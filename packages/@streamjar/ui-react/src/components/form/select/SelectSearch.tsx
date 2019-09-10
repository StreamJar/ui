import * as React from 'react';

import { Input } from '../input';
import { Button } from '../button';

export interface ISelectSearchProps {
	searchAsOption: boolean;
	onSearch(text: string): void;
	onAddItem(value: string): void;
}

export const SelectSearch: React.FC<ISelectSearchProps> = (props: ISelectSearchProps) => {
	const { onSearch, searchAsOption, onAddItem } = props;

	const [input, setInput] = React.useState('');
	const timer = React.useRef<number | null>(null);

	const search = (text: string) => {
		setInput(text);
		clearTimeout(timer.current!);

		timer.current = setTimeout(() => {
			onSearch(text);
		},                         200) as any;
	};

	const onAddClick = (): void => {
		if (input.trim() === '') {
			return;
		}

		onAddItem(input);
	};

	return (
		<div className="layout-row">
			<div className="flex"><Input name="search" value={input} placeholder="Search" onChange={onSearch} /></div>}
			{searchAsOption && <Button icon="add" round={true} onClick={onAddClick} />}
		</div>
	);
};
