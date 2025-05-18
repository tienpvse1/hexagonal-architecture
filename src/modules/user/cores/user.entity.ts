import { isStatusValid, type UserStatus } from './user-status';

export class User {
	id: string;
	name: string;
	email: string;
	status: UserStatus;

	constructor() {
		this.id = '';
		this.name = '';
		this.email = '';
	}

	setName(name: string) {
		this.name = name;
		return this;
	}

	setId(id: string) {
		this.id = id;
		return this;
	}

	setEmail(email: string) {
		this.email = email;
		return this;
	}

	setStatus(statusInput: string) {
		if (!isStatusValid(statusInput)) throw new Error('user status is invalid');
		this.status = statusInput;
		return this;
	}
}
