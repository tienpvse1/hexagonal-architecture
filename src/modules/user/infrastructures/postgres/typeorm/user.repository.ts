import { Mapper } from 'src/common/mapper.interface';
import { User } from 'src/modules/user/cores/user.entity';
import { UserPersistenceAPI } from 'src/modules/user/ports/outbound';
import { UserEntity } from './entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
