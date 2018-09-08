import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ITableType } from '../../table/table.component';
import { IDemoConfig } from '../../demo/demo.component';

const html = `
<jar-avatar [size]="50" [data]="{ avatar: 'https://surl.im/images/icon.ico'}"></jar-avatar>
<jar-avatar [size]="50" [data]="https://surl.im/images/icon.ico"></jar-avatar>
<jar-avatar [size]="50" [data]="{ email: 'luke@streamjar.tv'}"></jar-avatar>
`

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'jar-demo-avatar',
    styleUrls: ['../../common.scss'],
    templateUrl: './avatar.demo.html'
})
export class AvatarDemoComponent {
    public config: IDemoConfig = {
        docs: [{
            name: 'size',
            type: ITableType.INPUT,
            inType: 'number',
            defaultValue: '50',
            description: 'Width and height of the element.'
        },
        {
            name: 'data',
            type: ITableType.INPUT,
            inType: 'string | { email?: string; avatar?: string }',
            defaultValue: '',
            description: 'URL to the avatar, or an object containing the `avatar` property. Alternatively an object with email which is used for gravatar.'
        }],
        name: 'Avatar',
        component: 'jar-avatar',
        html,
    }
}
