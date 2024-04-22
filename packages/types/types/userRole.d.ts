import { InvitationCode } from './invitationCode';
import { Role } from './rolePermission';
export interface User {
    id: number;
    username: string;
    email?: string;
    password?: string;
    url?: string;
    avatar?: string;
    role: string[];
    ip: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    userRoles?: UserRole[];
    invitationCodeId?: string;
    invitationCode?: InvitationCode;
    createInvitationCodes?: InvitationCode[];
    admin: number;
}
export interface UserRole {
    id: number;
    roleId: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    role?: Role;
}
