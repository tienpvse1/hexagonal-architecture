import { DynamicModule, Module } from '@nestjs/common';
import { CreateUserApplication } from './create-user/create-user.application';
import { UserInfrasturcture } from '../infrastructures/postgres/user-infrastructure.module';
import { UserModuleConfig } from '../config.type';

@Module({
  providers: [CreateUserApplication],
  exports: [CreateUserApplication],
})
export class UserApplicationModule {
  static withInfrastructure(
    type: UserModuleConfig['infrastructureType'],
  ): DynamicModule {
    return {
      module: UserApplicationModule,
      imports: [UserInfrasturcture.withInfrastucture(type)],
    };
  }
}
