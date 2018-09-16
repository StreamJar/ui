import * as React from 'react';

import { Icon } from '../../../src/lib';
import { Demo, IDemoConfig } from '../demo/demo';
import { icons } from '../icons.generated';

export class IconDemo extends React.Component {
	public config: IDemoConfig = {
		name: 'Icons',
		components: [{
			name: 'Icon',
			props: [{
				name: 'icon',
				default: '',
				type: 'string',
				description: 'The icon to show. Prefixing with jar_ will use the streamjar family',
			}],
		}],
		examples: `
<Icon colour='red' icon='star' />
<Icon icon='jar_filter' />
		`,
	};

	public render() {
		return (
			<Demo config={this.config}>
				<p> We support two families of fonts. You can use any <a href="https://design.google.com/icons/"> material icon </a>
					or you can use one of the below icons (prefixed with jar_). You can add new icons in <code>@streamjar/ui-shared</code>.
				</p>

				<p> Custom Icons</p>

				<div className="layout-row layout-wrap">
					{icons.map(i => this.getIcon(i))}
				</div>
			</Demo>
		);
	}

	private getIcon(i: string): JSX.Element {
		return (
			<div key={i} className="icon layout-column flex-20 layout-align-center-center">
				<div style={{ padding: '10px' }}><Icon icon={`jar_${i}`} /> </div>

				<div>
					<code style={{ color: '#FFF' }}>jar_{i}</code>
				</div>
			</div>
		);
	}
}
