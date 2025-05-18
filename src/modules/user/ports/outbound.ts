import { User } from '../cores/user.entity';

export abstract class UserPersistence {
  abstract create(user: User): Promise<User>;
}
