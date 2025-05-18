import type { Mapper } from 'src/common/mapper.interface';
import type { User } from 'src/modules/user/cores/user.entity';
import type { UserPersistenceAPI } from 'src/modules/user/ports/outbound';
import {
	Inject,
	Injectable,
	InternalServerErrorException,
	Logger,
} from '@nestjs/common';
import { type Database, KyselyInstance } from 'src/common/db-providers/kysely';
import type { SelectedUser } from './entity';
import type { Kysely } from 'kysely';

@Injectable()
export class KyselyUserRepository implements UserPersistenceAPI {
	constructor(
		@Inject(KyselyInstance) private kysely: Kysely<Database>,
		private mapper: Mapper<User, SelectedUser>,
	) {}

	async create(user: User): Promise<User> {
		Logger.debug('saving user using kysely');
		const createdUser = await this.kysely
			.insertInto('user')
			.values({
				name: user.name,
				email: user.email,
				status: user.status,
			})
			.returning(['user.id', 'user.name', 'user.email', 'user.status'])
			.executeTakeFirst();
		if (!createdUser) throw new InternalServerErrorException('');
		return this.mapper.toModel(createdUser);
	}
}
