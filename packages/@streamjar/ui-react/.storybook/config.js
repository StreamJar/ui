import { configure, addParameters, addDecorator } from '@storybook/react';
import { themes, create } from '@storybook/theming';
import './styles.scss';
import { withInfo } from '@storybook/addon-info';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.story\.tsx$/);

function loadStories() {
	req.keys().forEach(filename => req(filename));
}

const theme = create({
	base: 'dark',

	// UI
	appBg: '#643688',

	brandTitle: 'StreamJar UI',
	brandUrl: 'https://streamjar.tv',

})

addParameters({
	options: {
		showPanel: false,
		theme,
	},
})

addDecorator(withInfo({
	inline: true, styles: {
		infoBody: {
			border: 'none',
			backgroundColor: 'transparent',
			paddingBottom: 0,
		},
		propTableHead: {
			marginTop: 30,
			marginBottom: 10,
			fontSize: 15
		},
		header: {
			h1: {
				opacity: 0.5,
				fontSize: 12,
			},
			h2: {
			}
		},
		source: {
			h1: {
				fontSize: 16,
			}
		},
		tagStyle: {
			color: 'red'
		}
	}
}));

configure(loadStories, module);
