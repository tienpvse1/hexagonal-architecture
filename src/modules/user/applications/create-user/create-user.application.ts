import { Injectable } from '@nestjs/common';
import { UserPersistence } from '../../ports/outbound';
import { CreateUserCmd } from './create-user.cmd';
import { User } from '../../cores/user.entity';

@Injectable()
export class CreateUserApplication {
  constructor(private persistenceApi: UserPersistence) {}

  execute(cmd: CreateUserCmd) {
    const user = new User();
    user.setName(cmd.name).setEmail(cmd.email);
    return this.persistenceApi.create(user);
  }
}
