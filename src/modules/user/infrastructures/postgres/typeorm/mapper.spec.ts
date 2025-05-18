import { TypeormUserMapper } from './mapper';
import { UserStatus } from 'src/modules/user/cores/user-status';
import { UserEntity } from './entity';
import { User } from 'src/modules/user/cores/user.entity';

describe('Typeorm Mapper', () => {
  const mapper = new TypeormUserMapper();
  describe('Map from entity to model', () => {
    it('should return correct model from entity', () => {
      const user = new UserEntity();
      user
        .setId('some-id')
        .setName('name')
        .setEmail('test@example.com')
        .setStatus(UserStatus.Active);

      const result = mapper.toModel(user);
      expect(result).toMatchObject({
        id: 'some-id',
        name: 'name',
        email: 'test@example.com',
        status: 'active',
      });
    });

    it('should throws when status is invalid', async () => {
      const user = new UserEntity();

      user.setId('some-id').setName('name').setEmail('test@example.com');

      //@ts-ignore
      user.status = '';

      await expect(async () => mapper.toModel(user)).rejects.toThrow();
    });
  });

  describe('Map from model to entity', () => {
    it('should return correct entity from model', () => {
      const user = new User();
      user
        .setId('some-id')
        .setName('name')
        .setEmail('test@example.com')
        .setStatus(UserStatus.Active);

      const result = mapper.toEntity(user);
      expect(result).toMatchObject({
        id: 'some-id',
        name: 'name',
        email: 'test@example.com',
        status: 'active',
      });
    });

    it('should throws when status is invalid', async () => {
      const user = new User();
      user.setId('some-id').setName('name').setEmail('test@example.com');

      //@ts-ignore
      user.status = '';

      await expect(async () => mapper.toEntity(user)).rejects.toThrow();
    });
  });
});
