import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ITableType } from '../../table/table.component';
import { IDemoConfig } from '../../demo/demo.component';

const html = `
<div class="jar-padding-1">
    <button jarBtn> Normal </button>
    <button jarBtn colour="accent" > Accent </button>
    <button jarBtn colour="success"> Success </button>
    <button jarBtn colour="danger"> DANGER </button>
    <button jarBtn [disabled]="true"> Disabled </button>
</div>

<div class="jar-padding-1">
    <a href="https://streamjar.tv" jarBtn> Normal </a>
    <a href="https://streamjar.tv" jarBtn colour="accent" > Accent </a>
    <a href="https://streamjar.tv" jarBtn colour="success"> Success </a>
    <a href="https://streamjar.tv" jarBtn colour="danger"> DANGER </a>
    <a href="https://streamjar.tv" jarBtn [disabled]="true"> Disabled </a>
</div>

<div class="jar-padding-1">
    <button jarBtn raised> Normal </button>
    <button jarBtn raised colour="accent"> Accent </button>
    <button jarBtn raised colour="success"> Success </button>
    <button jarBtn raised colour="danger"> DANGER </button>
    <button jarBtn raised [disabled]="true"> Disabled </button>
</div>

<div class="jar-padding-1">
    <button jarBtn raised icon="star"> Hello </button>
    <button jarBtn raised icon-right icon="star"> Hello </button>
    <button jarBtn raised round icon="star" colour="accent"></button>
    <button jarBtn raised round icon="star" colour="success"></button>
    <button jarBtn raised round icon="warning" colour="danger"></button>
    <button jarBtn raised round [disabled]="true" icon="warning" colour="danger"></button>
</div>

<div class="jar-padding-1">
    <button jarBtn raised colour="platform-mixer" > Mixer </button>
    <button jarBtn raised colour="platform-twitch"> Twitch </button>
    <button jarBtn raised colour="platform-smashcast"> Smashcast </button>
    <button jarBtn raised colour="platform-youtube"> YouTube </button>
    <button jarBtn raised colour="platform-discord"> Discord </button>
    <button jarBtn raised colour="platform-paypal"> PayPal </button>
    <button jarBtn raised colour="platform-stripe"> Stripe </button>
    <button jarBtn raised colour="platform-gamewisp"> Gamewisp </button>
    <button jarBtn raised colour="platform-twitter"> Twitter </button>
    <button jarBtn raised colour="platform-patreon"> Patreon </button>
    <button jarBtn raised colour="platform-extralife"> Extralife </button>
    <button jarBtn raised colour="platform-tiltify"> Tiltify </button>
    <button jarBtn raised colour="platform-spotify"> Spotify </button>
</div>
`

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'jar-demo-button',
    styleUrls: ['../../common.scss'],
    templateUrl: './button.demo.html'
})
export class ButtonDemoComponent {
    public config: IDemoConfig = {
        docs: [{
            name: 'colour',
            type: ITableType.INPUT,
            inType: 'string',
            defaultValue: 'primary',
            description: 'Colour variant of the button.'
        },
        {
            name: 'raised',
            type: ITableType.INPUT,
            inType: 'boolean',
            defaultValue: 'false',
            description: 'If the button should be rasied up.'
        },
        {
            name: 'disabled',
            type: ITableType.INPUT,
            inType: 'boolean',
            defaultValue: 'false',
            description: 'If the button is disabled.'
        }, {
            name: 'round',
            type: ITableType.INPUT,
            inType: 'boolean',
            defaultValue: 'false',
            description: 'Whether the button should be rounded.'
        }, {
            name: 'icon',
            type: ITableType.INPUT,
            inType: 'string',
            defaultValue: '',
            description: 'Icon that the button should display. See Icons for how they are handled.'
        }, {
            name: 'icon-right',
            type: ITableType.INPUT,
            inType: 'boolean',
            defaultValue: 'false',
            description: 'If the icon should be aligned right when with text.'
        },],
        name: 'Button',
        component: 'button[jarBtn],a[jarBtn]',
        html,
	}

	public alert() {
		window.alert('hi');
	}
}
