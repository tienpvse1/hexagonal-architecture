import { Mapper } from 'src/common/mapper.interface';
import { User } from 'src/modules/user/cores/user.entity';
import { SelectedUser } from './entity';
import { Repository } from 'typeorm';
import { KyselyUserRepository } from './user.repository';
import { Test } from '@nestjs/testing';
import { UserPersistenceAPI } from 'src/modules/user/ports/outbound';
import { createMock } from '@golevelup/ts-vitest';
import { vi } from 'vitest';
import { Kysely } from 'kysely';
import { Database, KyselyInstance } from 'src/common/db-providers/kysely';

describe('Kysely User repository', () => {
  let mapper: Mapper<User, SelectedUser>;
  let repository: KyselyUserRepository;
  let db: Kysely<Database>;

  beforeEach(async () => {
    let module = await Test.createTestingModule({
      providers: [
        {
          provide: UserPersistenceAPI,
          useClass: KyselyUserRepository,
        },
        {
          provide: KyselyInstance,
          useValue: createMock(),
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    mapper = module.get(Mapper);
    repository = module.get(UserPersistenceAPI);
    db = module.get(KyselyInstance);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Create user', () => {
    it('should call kysely insert and return and execute take first function', async () => {
      const user = new User();
      user.setName('test');
      user.setEmail('test@example.com');
      await repository.create(user);
      expect(db.insertInto).toHaveBeenCalled();
			expect(mapper.toModel).toHaveBeenCalled()
    });
  });
});
