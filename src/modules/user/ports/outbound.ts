import { User } from '../cores/user.entity';

export abstract class UserPersistenceAPI {
  abstract create(user: User): Promise<User>;
}
