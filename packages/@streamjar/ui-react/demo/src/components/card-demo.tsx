import * as React from 'react';

import { Button, Card, CardActions, CardContent } from '../../../src/lib';
import { Demo, IDemoConfig } from '../demo/demo';

export class CardDemo extends React.Component {
	public config: IDemoConfig = {
		name: 'Card',
		components: [{
			name: 'Card',
			props: [],
		}, {
			name: 'CardContent',
			props: [{
				name: 'icon',
				default: '',
				description: 'If we should display an icon/avatar',
				type: 'string | { email?: string; avatar?: string }',
			}],
		}, {
			name: 'CardActions',
			props: [],
		}],
		examples: `
<Card>
	<CardContent icon={{ email: 'ethan@streamjar.tv' }}>
		<p> You've been invited to edit <strong> Ethan</strong> overlay? </p>
	</CardContent>
	<CardActions>
		<Button raised={true} colour="danger"> Deny </Button>
		<Button raised={true}> Accept </Button>
	</CardActions>
</Card>
		`,
	};

	public render() {
		return (
			<Demo config={this.config}>
				<div style={{ padding: '15px', background: 'black'}}>
					<Card>
						<CardContent icon={{ email: 'ethan@streamjar.tv' }}>
							<p> You've been invited to edit <strong> Ethan</strong> overlay? </p>
						</CardContent>
						<CardActions>
							<Button raised={true} colour="danger"> Deny </Button>
							<Button raised={true}> Accept </Button>
						</CardActions>
					</Card>
				</div>
			</Demo>
		);
	}
}
