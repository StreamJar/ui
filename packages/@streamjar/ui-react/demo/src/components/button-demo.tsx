import * as React from 'react';

import { Button } from '../../../src/lib';
import { Demo, IDemoConfig } from '../demo/demo';

export class ButtonDemo extends React.Component {
	public config: IDemoConfig = {
		name: 'Button',
		components: [{
			name: 'Button',
			props: [
			{
				name: 'colour',
				default: 'primary',
				type: 'string',
				description: 'Colour variant of the button.',
			},
			{
				name: 'raised',
				default: 'false',
				type: 'boolean',
				description: 'If the button should appear raised',
			},
			{
				name: 'disabled',
				default: 'false',
				type: 'boolean',
				description: 'If the button should be clickable',
			},
			{
				name: 'round',
				default: 'false',
				type: 'boolean',
				description: 'If the button is round',
			},
			{
				name: 'icon',
				default: '',
				type: 'string',
				description: 'An icon to display on the button',
			},
			{
				name: 'iconRight',
				default: 'false',
				type: 'boolean',
				description: 'If we should display the icon on the right',
			},
			{
				name: 'type',
				default: 'submit',
				type: 'submit | button',
				description: 'The type of the button',
			},
			{
				name: 'onClick',
				default: '() => { /* */ }',
				type: '(event?: React.SyntheticEvent<HTMLButtonElement>) => void',
				description: 'The click event for the button',
			},
		],
		}],
		examples: `
<div>
	<Button> Normal </Button>
	<Button colour="accent" > Accent </Button>
	<Button colour="success"> Success </Button>
	<Button colour="danger"> DANGER </Button>
	<Button disabled={true}> Disabled </Button>
</div>

<div>
	<Button raised={true}> Normal </Button>
	<Button raised={true} colour="accent"> Accent </Button>
	<Button raised={true} colour="success"> Success </Button>
	<Button raised={true} colour="danger"> DANGER </Button>
	<Button raised={true} disabled={true}> Disabled </Button>
</div>

<div>
	<Button raised={true} icon="star"> Hello </Button>
	<Button raised={true} icon="star"></Button>
	<Button raised={true} iconRight={true} icon="star"> Hello </Button>
	<Button raised={true} round={true} icon="star" colour="accent"></Button>
	<Button raised={true} round={true} icon="star" colour="success"></Button>
	<Button raised={true} round={true} icon="warning" colour="danger"></Button>
	<Button raised={true} round={true} disabled={true} icon="warning" colour="danger"></Button>
</div>

<div>
	<Button raised={true} colour="platform-mixer" > Mixer </Button>
	<Button raised={true} colour="platform-twitch"> Twitch </Button>
	<Button raised={true} colour="platform-smashcast"> Smashcast </Button>
	<Button raised={true} colour="platform-youtube"> YouTube </Button>
	<Button raised={true} colour="platform-discord"> Discord </Button>
	<Button raised={true} colour="platform-paypal"> PayPal </Button>
	<Button raised={true} colour="platform-stripe"> Stripe </Button>
	<Button raised={true} colour="platform-gamewisp"> Gamewisp </Button>
	<Button raised={true} colour="platform-twitter"> Twitter </Button>
	<Button raised={true} colour="platform-patreon"> Patreon </Button>
	<Button raised={true} colour="platform-extralife"> Extralife </Button>
	<Button raised={true} colour="platform-tiltify"> Tiltify </Button>
	<Button raised={true} colour="platform-spotify"> Spotify </Button>
</div>
		`,
	};

	public render() {
		return (
			<Demo config={this.config}>
				<div>
					<Button> Normal </Button>
					<Button colour="accent" > Accent </Button>
					<Button colour="success"> Success </Button>
					<Button colour="danger"> DANGER </Button>
					<Button disabled={true}> Disabled </Button>
				</div>

				<div>
					<Button raised={true}> Normal </Button>
					<Button raised={true} colour="accent"> Accent </Button>
					<Button raised={true} colour="success"> Success </Button>
					<Button raised={true} colour="danger"> DANGER </Button>
					<Button raised={true} disabled={true}> Disabled </Button>
				</div>

				<div>
					<Button raised={true} icon="star"> Hello </Button>
					<Button raised={true} icon="star"></Button>
					<Button raised={true} iconRight={true} icon="star"> Hello </Button>
					<Button raised={true} round={true} icon="star" colour="accent"></Button>
					<Button raised={true} round={true} icon="star" colour="success"></Button>
					<Button raised={true} round={true} icon="warning" colour="danger"></Button>
					<Button raised={true} round={true} disabled={true} icon="warning" colour="danger"></Button>
				</div>

				<div>
					<Button raised={true} colour="platform-mixer" > Mixer </Button>
					<Button raised={true} colour="platform-twitch"> Twitch </Button>
					<Button raised={true} colour="platform-smashcast"> Smashcast </Button>
					<Button raised={true} colour="platform-youtube"> YouTube </Button>
					<Button raised={true} colour="platform-discord"> Discord </Button>
					<Button raised={true} colour="platform-paypal"> PayPal </Button>
					<Button raised={true} colour="platform-stripe"> Stripe </Button>
					<Button raised={true} colour="platform-gamewisp"> Gamewisp </Button>
					<Button raised={true} colour="platform-twitter"> Twitter </Button>
					<Button raised={true} colour="platform-patreon"> Patreon </Button>
					<Button raised={true} colour="platform-extralife"> Extralife </Button>
					<Button raised={true} colour="platform-tiltify"> Tiltify </Button>
					<Button raised={true} colour="platform-spotify"> Spotify </Button>
				</div>
			</Demo>
		);
	}
}
