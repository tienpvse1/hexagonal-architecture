import { Injectable } from '@nestjs/common';
import { UserPersistenceAPI } from '../../ports/outbound';
import { CreateUserCmd } from './create-user.cmd';
import { User } from '../../cores/user.entity';

@Injectable()
export class CreateUserApplication {
  constructor(private persistenceApi: UserPersistenceAPI) {}

  execute(cmd: CreateUserCmd) {
    const user = new User();
    user.setName(cmd.name).setEmail(cmd.email);
    return this.persistenceApi.create(user);
  }
}
