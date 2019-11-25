import * as React from 'react';

export interface IColourSliderProps {
	thumbClass: string;

	x?: number;
	y?: number;

	onUpdate(data: { x?: number; y?: number }): void;
}

export const Slider = (props: IColourSliderProps) => {
	const [down, setDown] = React.useState(false);
	const { thumbClass } = props;
	const ref = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const up = () => { setDown(false); };
		const move = (event: any) => {
			if (down && ref.current) {
				const height = ref.current.offsetHeight;
				const width = ref.current.offsetWidth;

				const x = Math.max(0, Math.min(event.pageX - ref.current.getBoundingClientRect().left - window.pageXOffset, width));
				const y = Math.max(0, Math.min(event.pageY - ref.current.getBoundingClientRect().top - window.pageYOffset, height));

				props.onUpdate({
					x: x / width,
					y: y / height,
				});
			}
		};

		window.addEventListener('mouseup', up);
		window.addEventListener('mousemove', move);

		return () => {
			window.removeEventListener('mouseup', up);
			window.removeEventListener('mousemove', move);

		};
	}, [down, ref]);

	return (
		<div style={{ width: '100%', height: '100%' }} onMouseDown={() => { setDown(true); }} ref={ref}>
			<div className={thumbClass} style={{ top: props.y ? `${props.y}%` : undefined, left: props.x ? `${props.x}%` : undefined }} />
		</div>
	);
};
