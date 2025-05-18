import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/user/infrastructures/postgres/typeorm/entity';

export default TypeOrmModule.forRoot({
	type: 'postgres',
	host: 'localhost',
	port: +(process.env.POSTGRES_PORT || 0),
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	entities: [UserEntity],
	synchronize: true,
});
