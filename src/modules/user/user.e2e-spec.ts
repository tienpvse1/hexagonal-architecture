import { Test } from '@nestjs/testing';
import { HttpStatus, type INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import { AppModule } from 'src/app.module';
import request from 'supertest';

describe('User module integration test', async () => {
	let app: INestApplication<App>;

	beforeEach(async () => {
		const moduleFixture = await Test.createTestingModule({
			imports: [AppModule.use({ enableRestAPI: true, dbClient: 'typeorm' })],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('Should throw validation error', async () => {
		return request(app.getHttpServer())
			.post('/user')
			.send({})

			.expect(HttpStatus.BAD_REQUEST);
	});

	it('should throw error when provide missing name length', () => {
		return request(app.getHttpServer())
			.post('/user')
			.send({
				email: 'test',
				name: 'vi',
			})
			.expect(HttpStatus.BAD_REQUEST);
	});

	it('should create user when provide correct data', () => {
		return request(app.getHttpServer())
			.post('/user')
			.send({
				email: 'test@example.com',
				name: 'vitest',
			})
			.expect(HttpStatus.CREATED);
	});
});
