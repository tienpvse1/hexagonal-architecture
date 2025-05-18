import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule.use({ dbClient: 'typeorm', enableRestAPI: true }),
  );

  const config = new DocumentBuilder()
    .setTitle('Hexagonal')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.use(
    '/reference',
    apiReference({
      content: document,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
