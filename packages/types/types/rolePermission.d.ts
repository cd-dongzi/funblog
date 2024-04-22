export interface Role {
    id: number;
    name: string;
    code: string;
    createAt: string;
    updateAt: string;
    userId?: number;
    rolePermissions?: RolePermission[];
}
export interface Permission {
    id: number;
    name: string;
    code: string;
    createAt: string;
    updateAt: string;
}
export interface RolePermission {
    id: number;
    roleId: number;
    permissionId: number;
    permission: Permission;
    role: Role;
}
