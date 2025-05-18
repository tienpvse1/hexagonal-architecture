import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserStatus {
	Active = 'active',
	Inactive = 'inactive',
}

@Entity({ name: 'user' })
/**
 * provider: Typeorm
 */
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('text')
	name: string;

	@Column('text')
	email: string;

	@Column({
		type: 'enum',
		enum: UserStatus,
		default: UserStatus.Inactive,
	})
	status: UserStatus;

	setId(id: string) {
		this.id = id;
		return this;
	}

	setName(name: string) {
		this.name = name;
		return this;
	}

	setEmail(email: string) {
		this.email = email;
		return this;
	}

	setStatus(status: string) {
		if (!UserEntity.validateStatus(status))
			throw new Error('user status is invalid');
		this.status = status;
		return this;
	}

	private static validateStatus(status: string): status is UserStatus {
		return status === UserStatus.Inactive || status === UserStatus.Active;
	}
}
