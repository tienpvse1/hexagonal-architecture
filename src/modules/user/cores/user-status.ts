export enum UserStatus {
  Inactive = 'inactive',
  Active = 'active',
}

export function isStatusValid(status: string): status is UserStatus {
  return status === UserStatus.Inactive || status === UserStatus.Active;
}
