import { Role } from '@funblog/types';

export interface IRole extends Role {
  permissions: number[];
}
