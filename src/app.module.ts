import { type DynamicModule, Module, ValidationPipe } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import 'dotenv/config';
import { AppConfig } from './app.config';
import { DbModule } from './common/db.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
	providers: [
		{
			provide: APP_PIPE,
			useValue: new ValidationPipe({
				whitelist: true,
				forbidNonWhitelisted: true,
			}),
		},
	],
})
export class AppModule {
	static use(config: AppConfig): DynamicModule {
		return {
			module: AppModule,
			imports: [
				DbModule.forRoot(config.dbClient),
				UserModule.use({
					enableRest: config.enableRestAPI,
					infrastructureType: config.dbClient,
				}),
			],
		};
	}
}
