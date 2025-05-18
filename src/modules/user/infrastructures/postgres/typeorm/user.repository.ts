import type { Mapper } from 'src/common/mapper.interface';
import type { User } from 'src/modules/user/cores/user.entity';
import type { UserPersistenceAPI } from 'src/modules/user/ports/outbound';
import { UserEntity } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TypeormUserRepository implements UserPersistenceAPI {
	constructor(
		@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
		private mapper: Mapper<User, UserEntity>,
	) {}

	async create(user: UserEntity): Promise<User> {
		Logger.debug('saving using typeorm');
		const { id, ...input } = user;
		const insertedUser = await this.userRepo.save(input);
		return this.mapper.toModel(insertedUser);
	}
}
