import * as React from 'react';

import { Button, Tooltip } from '../../../src/lib';
import { Demo, IDemoConfig } from '../demo/demo';

export class TooltipDemo extends React.Component {
	public config: IDemoConfig = {
		name: 'Tooltips',
		components: [{
			name: 'message',
			props: [{
				name: 'message',
				default: '',
				type: 'string',
				description: 'The tooltip message',
			}, {
				name: 'position',
				default: 'bottom',
				type: `'top' | 'left' | 'bottom' | 'right'`,
				description: 'Where to place to tooltip on the target',
			}, {
				name: 'pull',
				default: 'center',
				type: `'start' | 'center' | 'end'`,
				description: 'Where to place to tooltip on the position anchor ',
			}],
		}],
		examples: `
<Tooltip position="top" pull="start" message="Lots of tips" />
<Tooltip position="top" pull="center" message="Lots of tips" />
<Tooltip position="top" pull="end" message="Lots of tips" />
<Tooltip position="left" pull="start" message="Lots of tips" />
<Tooltip position="left" pull="center" message="Lots of tips" />
<Tooltip position="left" pull="end" message="Lots of tips" />
<Tooltip position="right" pull="start" message="Lots of tips" />
<Tooltip position="right" pull="center" message="Lots of tips" />
<Tooltip position="right" pull="end" message="Lots of tips" />
<Tooltip position="bottom" pull="start" message="Lots of tips" />
<Tooltip position="bottom" pull="center" message="Lots of tips" />
<Tooltip position="bottom" pull="end" message="Lots of tips" />
		`,
	};

	public render() {
		return (
			<Demo config={this.config}>
				<div className="layout-row">
					<div className="flex-20"></div>
					<div className="flex-20"><Tooltip position="top" pull="start" message="Lots of tips"><Button>top - start</Button></Tooltip></div>
					<div className="flex-20"><Tooltip position="top" pull="center" message="Lots of tips"><Button>top - center</Button></Tooltip></div>
					<div className="flex-20"><Tooltip position="top" pull="end" message="Lots of tips"><Button>top - end</Button></Tooltip></div>
					<div className="flex-20"></div>
				</div>
				<div className="layout-row">
					<div className="flex-20"><Tooltip position="left" pull="start" message="Lots of tips"><Button>left - start</Button></Tooltip></div>
					<div className="flex-20"></div>
					<div className="flex-20"></div>
					<div className="flex-20"></div>
					<div className="flex-20"><Tooltip position="right" pull="start" message="Lots of tips"><Button>right - start</Button></Tooltip></div>
				</div>
				<div className="layout-row">
					<div className="flex-20"><Tooltip position="left" pull="center" message="Lots of tips"><Button>left - center</Button></Tooltip></div>
					<div className="flex-20"></div>
					<div className="flex-20"></div>
					<div className="flex-20"></div>
					<div className="flex-20"><Tooltip position="right" pull="center" message="Lots of tips"><Button>right - center</Button></Tooltip></div>
				</div>
				<div className="layout-row">
					<div className="flex-20"><Tooltip position="left" pull="end" message="Lots of tips"><Button>left - end</Button></Tooltip></div>
					<div className="flex-20"></div>
					<div className="flex-20"></div>
					<div className="flex-20"></div>
					<div className="flex-20"><Tooltip position="right" pull="end" message="Lots of tips"><Button>right - end</Button></Tooltip></div>
				</div>
				<div className="layout-row">
					<div className="flex-20"></div>
					<div className="flex-20"><Tooltip position="bottom" pull="start" message="Lots of tips"><Button>bottom - start</Button></Tooltip></div>
					<div className="flex-20"><Tooltip position="bottom" pull="center" message="Lots of ti"><Button>bottom - center</Button></Tooltip></div>
					<div className="flex-20"><Tooltip position="bottom" pull="end" message="Lots of tips"><Button>bottom - end</Button></Tooltip></div>
					<div className="flex-20"></div>
				</div>
			</Demo>
		);
	}
}
