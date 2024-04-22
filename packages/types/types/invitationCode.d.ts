import { Role } from './rolePermission';
export interface InvitationCode {
    id: number;
    code: string;
    createdAt: string;
    updatedAt: string;
    expiredAt: string;
    roles: Role[];
}
