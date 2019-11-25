import * as React from 'react';
import * as classNames from 'classnames';
import styled from 'styled-components';
import * as chroma from 'chroma-js';

import { useDialog } from '../../dialog';
import { ColourDialog } from './ColourDialog';
import { InputLabel } from '../input/InputLabel';

const ColourBall = styled.div<{ colour: string }>`
	border-radius: 4px;
	width: 22px;
	height: 22px;
	margin: 0 12px 0px 8px;
	background-color: ${p => p.colour};
`;

export interface IColourProps {
	/** Title of the input */
	title?: string;

	/** The input value */
	value?: string;

	/** Input change event */
	onChange?(value: string): void;
}

/** Form input */
export const Colour: React.FC<IColourProps> = (props: IColourProps) => {
	const {
		value,
		title,
		onChange,
	} = props;

	const [hex, setHex] = React.useState<string>('');
	const [opacity, setOpacity] = React.useState(0);
	const [inputValue, setInputValue] = React.useState(value);

	const classes = classNames('jar-select layout-row layout-align-start-center');

	const { dialogProps, openDialog } = useDialog({
		width: '450px',
		height: '485px',
		loadingByDefault: false,
	});

	const setData = (data: string) => {
		if (data) {
			setInputValue(data);

			if (props.onChange) {
				props.onChange(data);
			}
		}
	};

	React.useEffect(() => {
		setHex(chroma(inputValue!).hex());
		setOpacity(chroma(inputValue!).alpha() * 100);
	}, [inputValue]);

	return (
		<React.Fragment>
			<ColourDialog {...dialogProps} value={inputValue!} onClose={setData} />
			{title && <InputLabel>{title}</InputLabel>}

			<div className={classes} style={{ cursor: 'pointer' }} onClick={openDialog}>
				<ColourBall colour={inputValue!} />

				<span style={{ opacity: 0.4, textTransform: 'uppercase' }}>{hex}</span> <span style={{ opacity: 0.7, marginLeft: 5 }}>{opacity}%</span>
			</div>
		</React.Fragment>
	);
};

Colour.defaultProps = {
	value: '',
	onChange: () => { /* */ },
};
