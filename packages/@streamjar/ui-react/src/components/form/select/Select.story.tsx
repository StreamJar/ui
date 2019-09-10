import * as React from 'react';
import { Select, SelectItem } from './Select';

export default {
	title: 'StreamJar UI|Components/Form/Select',
	parameters: {
		component: Select,
	},
};

const VALUES = [
	'apple',
	'bananna',
	'pineapple',
	'jar',
	'cat',
];

export const SimpleMenu = React.createElement(() => {
	return (
		<Select value="b" onChange={console.log} title="a">
			<SelectItem name="b" value="b"></SelectItem>
			<SelectItem name="c" value="c"></SelectItem>
			<SelectItem name="d" value="d"></SelectItem>
		</Select>
	);
});

export const MultiSelectMenu = React.createElement(() => {
	return (
		<Select multiple={true} onChange={console.log}>
			<SelectItem name="b" value="b"></SelectItem>
			<SelectItem name="c" value="c"></SelectItem>
			<SelectItem name="d" value="d"></SelectItem>
		</Select>
	);
});

export const SearchingMenu = React.createElement(() => {
	const [values, setValues] = React.useState<any>([...VALUES]);
	const [searching, setSearching] = React.useState<[boolean, any]>([false, null]);

	const search = (text: string) => {
		clearTimeout(searching[1]);

		setSearching([true, setTimeout(() => {
			setSearching([false, null]);
			setValues(VALUES.filter(i => i.includes(text)));
		},                             200)]);
	};

	return (
		<Select multiple={true} search={true} searching={searching[0]} onSearch={search} onChange={console.log}>
			{values.map((i: string) => <SelectItem key={i} name={i} value={i}></SelectItem>)}
		</Select>
	);
});

export const SearchingWithAddMenu = React.createElement(() => {
	const [values, setValues] = React.useState<any>([...VALUES]);
	const [searching, setSearching] = React.useState<[boolean, any]>([false, null]);

	const search = (text: string) => {
		clearTimeout(searching[1]);

		setSearching([true, setTimeout(() => {
			setSearching([false, null]);
			setValues(VALUES.filter(i => i.includes(text)));
		},                             200)]);
	};

	const add = (value: string): void => {
		VALUES.push(value);

		search(value);
	};

	return (
		<Select multiple={true} onAddItem={add} searchAsOption={true}
			search={true} searching={searching[0]} onSearch={search} onChange={console.log}>
			{values.map((i: string) => <SelectItem key={i} name={i} value={i}></SelectItem>)}
		</Select>
	);
});
