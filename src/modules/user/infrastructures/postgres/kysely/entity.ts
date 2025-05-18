import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
}
/**
 * provider: Kysely
 */
export type UserEntity = {
  id: Generated<string>;
  name: string;
  email: string;
  status: UserStatus;
};

export type SelectedUser = Selectable<UserEntity>;
export type NewUserInput = Insertable<UserEntity>;
export type UserUpdateInput = Updateable<UserEntity>;
