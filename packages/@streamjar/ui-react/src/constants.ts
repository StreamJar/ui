export type JAR_SUPPORTED_PLATFORMS =
	'platform-mixer' |
	'platform-twitch' |
	'platform-smashcast' |
	'platform-youtube' |
	'platform-discord' |
	'platform-picarto' |
	'platform-dlive';

export type JAR_VALID_THEMES = 	'primary' | 'success' | 'danger' | 'accent' | JAR_SUPPORTED_PLATFORMS;

export const PlatformBrands = new Map<string, string>([
	['mixer', 'Mixer'],
	['twitch', 'Twitch'],
	['smashcast', 'Smashcast'],
	['dlive', 'DLive'],
	['picarto', 'Picarto'],
]);
