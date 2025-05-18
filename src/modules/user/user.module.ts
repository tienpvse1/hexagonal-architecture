import { DynamicModule, Module, Type } from '@nestjs/common';
import { UserController } from './transports/http/user.controller';
import { UserModuleConfig } from './config.type';
import { UserApplicationModule } from './applications/user-application.module';

@Module({})
export class UserModule {
  static use(config: UserModuleConfig): DynamicModule {
    let controllers: Type<any>[] = [];
    if (config.enableRest) controllers.push(UserController);
    return {
      module: UserModule,
      controllers,
      imports: [
        UserApplicationModule.withInfrastructure(config.infrastructureType),
      ],
    };
  }
}
