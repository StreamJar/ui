import * as React from 'react';
import { default as InlineSVG } from 'react-inlinesvg';

export enum FontLookup {
	INLINE,
	REMOTE,
}

export interface IIconProps {
	/**
	 * The icon prefixed with the font pack. For internal icons, use jar. For app-bundled FontAwesome, use fa_
	 * and for material, don't prefix.
	 */
	icon: string;

	/** Override the colour of the icon */
	colour?: string;
}

export function calculateFontPack(icon: string): { family: string; icon: string; mode: FontLookup; prefix?: string } {
	const family = 'material';

	// StreamJar Fonts
	if (icon.startsWith('jar_')) {
		return { family: 'jar-icons', mode: FontLookup.REMOTE, prefix: '/assets/icons', icon: icon.replace('jar_', '') };
	}

	// FontAwesome Fonts
	if (icon.startsWith('fa_')) {
		return { family: 'jar-icons', mode: FontLookup.REMOTE, prefix: '/assets/icons/fa', icon: icon.replace('fa_', '') };
	}

	return { family: 'material-icons', mode: FontLookup.INLINE, icon };
}

/**
 * Render an Icon from one of various sources
 */
export const Icon: React.FC<IIconProps> = React.memo(({ colour, icon }: IIconProps) => {
	const { family, icon: outputIcon, mode, prefix } = calculateFontPack(icon);

	if (mode === FontLookup.INLINE) {
		return (
			<div className="jar-icon" style={{ color: colour }}>
				<i className={family}>{outputIcon}</i>
			</div>
		);
	}

	return (
		<div className="jar-icon" style={{ color: colour }}>
			<div className={family}>
				<InlineSVG cacheRequests={true} uniquifyIDs={true} src={`${prefix}/${outputIcon}.svg`}></InlineSVG>
			</div>
		</div>
	);
});
