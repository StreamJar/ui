import { configure, addParameters, addDecorator } from '@storybook/react';
import { create } from '@storybook/theming';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import { withA11y } from '@storybook/addon-a11y';
import * as React from 'react';
import './styles.scss';

const theme = create({
	base: 'dark',

	appBg: '#643688',
	appContentBg: '#272727',
	appBorderColor: '#ffffff2e',

	textInverseColor: 'red',
	brandTitle: 'StreamJar UI',
	brandUrl: 'https://streamjar.tv',
})

// Setup themeing
addParameters({
	options: {
		showPanel: false,
		isToolshown: true,
		theme,
	},
	docs: {
		container: DocsContainer,
		page: DocsPage,
	},
});

// Setup a11y pluginx
addDecorator(withA11y);

// Setup Jar container
addDecorator(story => (
	<>
		<div className="jar">
			<div className="j-dark">
				{story()}
			</div>
		</div>
	</>
));

configure(require.context('../src', true, /\.story\.(tsx|mdx)$/), module);
