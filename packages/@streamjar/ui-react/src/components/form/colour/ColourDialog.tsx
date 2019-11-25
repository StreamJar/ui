
import * as React from 'react';
import * as chroma from 'chroma-js';

import { withDialog, DialogHeader, DialogContent, DialogFooter, DialogContext } from '../../dialog';
import { Button } from '../button';
import { Input } from '../input';
import { Slider } from './Slider';

const HSV_MULT = 360;

export const ColourDialog = withDialog((props: { value: string }) => {
	const dialog = React.useContext(DialogContext);
	const [hue, setHue] = React.useState(0);
	const [opacity, setOpacity] = React.useState(1);
	const [s, setS] = React.useState(1);
	const [v, setV] = React.useState(1);
	const [colours, setColours] = React.useState({
		rgb: 'rgb(255, 0, 0)',
		rgba: 'rgba(255, 0, 0, 1)',
		hue: 'rgb(255, 0, 0)',
	});

	const setColourCode = (value: string) => {
		try {
			const hsv = chroma(value).hsv();
			setOpacity(chroma(value).alpha());
			setHue((hsv[0] || 0) / HSV_MULT);
			setS(hsv[1]);
			setV(hsv[2]);
		} catch (err) {
			return;
		}
	};

	const sync = () => {
		const rgb: string = chroma(hue * HSV_MULT, s, v, 'hsv').css('rgb' as any);

		setColours({
			rgb: chroma(hue * HSV_MULT, s, v, 'hsv').css('rgb' as any),
			rgba: chroma(rgb).alpha(opacity).css('rgba' as any),
			hue: chroma(hue * HSV_MULT, 1, 1, 'hsv').css('rgb' as any),
		});
	};

	const setColour = (data: { x: number; y: number }) => {
		setS(data.x);
		setV(1 - data.y);
	};

	const setValue = () => {
		dialog.closeDialog(colours.rgba);
	};

	React.useEffect(() => {
		setColourCode(props.value);
	}, [props.value]);

	React.useEffect(() => {
		sync();
	}, [s, v, hue, opacity]);

	return (
		<>
			<DialogHeader> Colour Picker </DialogHeader>

			<DialogContent>
				<div className="j-colour-picker">
					<div className="colourBackground j-dark layout-row layout-align-center-center">
						<div className="colourBackground__fill" style={{ backgroundColor: colours.rgba }}></div>
						<Input type="text" value={colours.rgba} onChange={setColourCode} />
					</div>

					<div className="layout layout-row">
						<div className="spectrum flex" style={{ backgroundColor: colours.hue }}>
							<div className="spectrum-saturation">
								<div className="spectrum-lum">
									<Slider thumbClass="spectrum-cursor" y={((1 - v) * 100)} x={s * 100} onUpdate={setColour} />
								</div>
							</div>
						</div>

						<div className="hueSlider">
							<Slider thumbClass="slider-cursor" y={hue * 100} onUpdate={data => { setHue(data.y!); }} />
						</div>

						<div className="opacitySlider">
							<div className="opacitySliderColour" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), ${colours.rgb})` }}>
								<Slider thumbClass="slider-cursor" y={opacity * 100} onUpdate={data => { setOpacity(data.y!); }} />
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
			<DialogFooter>
				<Button raised={true} onClick={setValue}>Save </Button>
			</DialogFooter>
		</>
	);
});
