import {
  DynamicModule,
  InternalServerErrorException,
  Module,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mapper } from 'src/common/mapper.interface';
import { UserModuleConfig } from 'src/modules/user/config.type';
import { UserPersistence } from 'src/modules/user/ports/outbound';
import { TypeormUserRepository } from './typeorm/user.repository';
import { UserEntity } from './typeorm/entity';
import { TypeormUserMapper } from './typeorm/mapper';
import { KyselyUserRepository } from './kysely/user.repository';
import { KyselyUserMapper } from './kysely/mapper';

@Module({})
export class UserInfrasturcture {
  /**
   * provide token:
   * ```ts
   * 	UserPeristence
   * ```
   */
  static withInfrastucture(
    infrastructureType: UserModuleConfig['infrastructureType'],
  ): DynamicModule {
    if (infrastructureType === 'kysely') {
      const kyselyProvider = {
        provide: UserPersistence,
        useClass: KyselyUserRepository,
      };
      return {
        module: UserInfrasturcture,
        providers: [
          {
            provide: Mapper,
            useClass: KyselyUserMapper,
          },

          kyselyProvider,
        ],
        exports: [kyselyProvider],
      };
    }

    const typeormProvider = {
      provide: UserPersistence,
      useClass: TypeormUserRepository,
    };
    return {
      module: UserInfrasturcture,
      imports: [TypeOrmModule.forFeature([UserEntity])],
      providers: [
        {
          provide: Mapper,
          useClass: TypeormUserMapper,
        },
        typeormProvider,
      ],
      exports: [typeormProvider],
    };
  }
}
