import { User } from 'src/modules/user/cores/user.entity';
import { UserEntity } from './entity';
import { Mapper } from 'src/common/mapper.interface';

export class TypeormUserMapper extends Mapper<User, UserEntity> {
	toModel(entity: UserEntity): User {
		const user = new User();
		user
			.setId(entity.id)
			.setName(entity.name)
			.setEmail(entity.email)
			.setStatus(entity.status);
		return user;
	}

	toEntity(model: User): UserEntity {
		const userEntity = new UserEntity();
		userEntity.setId(model.id);
		userEntity.setName(model.name);
		userEntity.setEmail(model.email);
		userEntity.setStatus(model.status);
		return userEntity;
	}
}
