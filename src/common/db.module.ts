import { AppConfig } from 'src/app.config';
import { KyselyModule } from './db-providers/kysely';
import typeorm from './db-providers/typeorm';
import { DynamicModule } from '@nestjs/common';

export class DbModule {
  static forRoot(client: AppConfig['dbClient']): DynamicModule {
    return client === 'kysely' ? KyselyModule.forRoot() : typeorm;
  }
}
