import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Router from 'react-router-component';

import { AvatarDemo } from './components/avatar-demo';
import { ButtonDemo } from './components/button-demo';
import { CheckboxDemo } from './components/checkbox-demo';
import { IconDemo } from './components/icon-demo';
import { RadioDemo } from './components/radio-demo';
import { ToastsDemo } from './components/toasts-demo';
import { TooltipDemo } from './components/tooltip-demo';

import './styles.scss';
import { Button } from '../../src/lib';

const PAGES = [
	{ component: AvatarDemo, disabled: false, name: 'Avatars', route: '/' },
	{ component: ButtonDemo, disabled: false, name: 'Button', route: '/button' },
	{ component: null, disabled: true, name: 'Card', route: '/card' },
	{ component: CheckboxDemo, disabled: false, name: 'Checkbox', route: '/checkbox' },
	{ component: null, disabled: true, name: 'Dialog', route: '/dialog' },
	{ component: null, disabled: true, name: 'Filter', route: '/filter' },
	{ component: null, disabled: true, name: 'Form', route: '/forms' },
	{ component: IconDemo, disabled: false, name: 'Icons', route: '/icons' },
	{ component: null, disabled: true, name: 'Platforms', route: '/platforms' },
	{ component: null, disabled: true, name: 'Popup', route: '/popup' },
	{ component: null, disabled: true, name: 'Menu', route: '/menu' },
	{ component: RadioDemo, disabled: false, name: 'Radio', route: '/radio' },
	{ component: null, disabled: true, name: 'Section', route: '/section' },
	{ component: null, disabled: true, name: 'Select', route: '/select' },
	{ component: null, disabled: true, name: 'Slider', route: '/slider' },
	{ component: null, disabled: true, name: 'Spinner', route: '/spinner' },
	{ component: null, disabled: true, name: 'Tabs', route: '/tabs' },
	{ component: ToastsDemo, disabled: false, name: 'Toasts', route: '/toasts' },
	{ component: TooltipDemo, disabled: false, name: 'Tooltip', route: '/tooltip' },
];

ReactDOM.render(
	<div className="demo-container layout-row ">
		<aside className="jar-theme-bg--gradient">
			<div className="layout-row layout-align-start-center">
				<img className="us" src="/assets/jar.svg" alt="jar" /> <div><h5> @streamjar/ui-react </h5> </div>
			</div>

			<Router.Link href="/avatar"></Router.Link>

			{PAGES.map(page => <Router.Link key={page.route} href={page.route}><Button disabled={page.disabled}>{page.name}</Button></Router.Link>)}
		</aside>

		<div className="content layout-row layout-align-center-start">
			<div className="demo">
				<Router.Locations>
					{PAGES.map(page => !page.disabled && <Router.Location key={page.route} path={page.route} handler={page.component} />)}
				</Router.Locations>
			</div>
		</div>

	</div>,
	document.getElementById('app'),
);
