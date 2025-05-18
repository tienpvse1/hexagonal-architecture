import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CreateUserApplication } from '../../applications/create-user/create-user.application';
import { vi } from 'vitest';

describe('UserController', () => {
  let controller: UserController;
  let service: CreateUserApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CreateUserApplication,
          useValue: {
            execute: vi
              .fn()
              .mockImplementation((input) => ({ ...input, id: 'random-id' })),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get(CreateUserApplication);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /user', () => {
    it('should call use case with correct endpoints', async () => {
      const response = await controller.create({
        email: 'test@example.com',
        name: 'test',
      });
      expect(service.execute).toHaveBeenCalledWith({
        email: 'test@example.com',
        name: 'test',
      });
      expect(response.id).toBeDefined();
    });
  });
});
