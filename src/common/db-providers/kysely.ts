import { type DynamicModule, Module } from '@nestjs/common';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import type { UserEntity } from 'src/modules/user/infrastructures/postgres/kysely/entity';
import 'dotenv/config';

export interface Database {
	user: UserEntity;
}

const dialect = new PostgresDialect({
	pool: new Pool({
		database: process.env.POSTGRES_DB,
		host: 'localhost',
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		port: +(process.env.POSTGRES_PORT || 0),
		max: 10,
	}),
});

const db = new Kysely<Database>({
	dialect,
});

export const KyselyInstance = 'KyselyInstance';

const provider = {
	provide: KyselyInstance,
	useValue: db,
};

@Module({})
export class KyselyModule {
	static forRoot(): DynamicModule {
		return {
			module: KyselyModule,
			providers: [provider],
			exports: [provider],
			global: true,
		};
	}
}
