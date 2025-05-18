import { type DynamicModule, Module, type Type } from '@nestjs/common';
import { UserController } from './transports/http/user.controller';
import type { UserModuleConfig } from './config.type';
import { UserApplicationModule } from './applications/user-application.module';

@Module({})
export class UserModule {
	static use(config: UserModuleConfig): DynamicModule {
		const controllers: Type<unknown>[] = [];
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
