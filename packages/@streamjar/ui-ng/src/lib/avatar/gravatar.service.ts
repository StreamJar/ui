import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class GravatarService {
	public parse(email: string): string {
		return `https://www.gravatar.com/avatar/${Md5.hashStr(email)}`;
	}
}
