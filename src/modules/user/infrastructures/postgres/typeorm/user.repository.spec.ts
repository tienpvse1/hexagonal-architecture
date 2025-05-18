import { Mapper } from 'src/common/mapper.interface';
import { User } from 'src/modules/user/cores/user.entity';
import { UserEntity } from './entity';
import { vi } from 'vitest';
import { Test } from '@nestjs/testing';
import { UserPersistenceAPI } from 'src/modules/user/ports/outbound';
import { TypeormUserRepository } from './user.repository';
import { createMock } from '@golevelup/ts-vitest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserStatus } from 'src/modules/user/cores/user-status';

import { Repository } from 'typeorm';

describe('Typeorm user repository', () => {
  let mapper: Mapper<User, UserEntity>;
  let persistenceApi: UserPersistenceAPI;
  let userRepo: Repository<UserEntity>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: UserPersistenceAPI,
          useClass: TypeormUserRepository,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: createMock(),
        },
      ],
    })
      .useMocker(createMock)
      .compile();

    mapper = module.get(Mapper);
    persistenceApi = module.get(UserPersistenceAPI);
    userRepo = module.get(getRepositoryToken(UserEntity));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('create user', () => {
    it('Should inject correct repository', () => {
      expect(persistenceApi).toBeInstanceOf(TypeormUserRepository);
    });

    it('Should call save with correct input', async () => {
      const user = new User();
      user.setId('some-id');
      user.setName('name');
      user.setEmail('test@example.com');
      user.setStatus(UserStatus.Active);

      await persistenceApi.create(user);

      // called parameter must not contains `id`
      expect(userRepo.save).toHaveBeenCalledWith({
        name: 'name',
        email: 'test@example.com',
        status: UserStatus.Active,
      });

      expect(mapper.toModel).toHaveBeenCalled();
    });
  });
});
