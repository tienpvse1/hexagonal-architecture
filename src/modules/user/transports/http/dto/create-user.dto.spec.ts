import { validateSync } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

describe('CreateUserDto', () => {
  describe('Validate input', () => {
    it('throws 2 errors when both name, email is invalid', () => {
      const user = new CreateUserDto();
      user.name = '';
      user.email = '';
      const result = validateSync(user);
      expect(result.length).toBe(2);

      user.name = 'v';
      user.email = '';
      const secondSuit = validateSync(user);
      expect(secondSuit.length).toBe(2);
    });

    it('throws error when email or name is empty', () => {
      const user = new CreateUserDto();
      user.name = 'vit';
      user.email = '';
      const firstResult = validateSync(user);
      expect(firstResult.length).toBe(1);

      user.name = '';
      user.email = 'test@example.com';

      const thirdSuit = validateSync(user);
      expect(thirdSuit.length).toBe(1);
    });

    it('should be pass when all data is correct', () => {
      const user = new CreateUserDto();
      user.name = 'test';
      user.email = 'test@example.com';
      const result = validateSync(user);
      expect(result.length).toBeFalsy();
    });
  });
});
