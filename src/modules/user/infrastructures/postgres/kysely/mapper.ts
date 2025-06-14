import { User } from 'src/modules/user/cores/user.entity';
import { Mapper } from 'src/common/mapper.interface';
import { SelectedUser } from './entity';

export class KyselyUserMapper extends Mapper<User, SelectedUser> {
  toModel(entity: SelectedUser): User {
    const user = new User();
    user
      .setId(entity.id)
      .setName(entity.name)
      .setEmail(entity.email)
      .setStatus(entity.status);
    return user;
  }

  toEntity(model: User): SelectedUser {
    return {
      id: model.id,
      status: model.status,
      email: model.email,
      name: model.name,
    };
  }
}
