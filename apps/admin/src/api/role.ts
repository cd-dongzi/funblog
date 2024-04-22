import { Role, PageRes, PageQuery } from '@funblog/types';
import { request } from './fetch';

/**
 * 获取角色列表
 *
 * @export
 * @return {*}
 */
export function getRoleList() {
  return request.get<Role[]>('/api/role');
}

/**
 * 获取角色分页列表
 *
 * @export
 * @param {PageQuery} params
 * @return {*}
 */
export function getRolePage(params: PageQuery) {
  return request.get<PageRes<Role>>('/api/role/page', {
    params,
  });
}

/**
 * 创建角色
 *
 * @export
 * @param {(Pick<Role, 'name' | 'code'>)} params
 * @return {*}
 */
export function createRole(params: Pick<Role, 'name' | 'code'> & { permissions: number[] }) {
  return request.post('/api/role', {
    body: params,
  });
}

/**
 * 更新角色
 *
 * @export
 * @param {string} id
 * @param {(Pick<Role, 'name' | 'code'>)} params
 * @return {*}
 */
export function updateRole(id: number, params: Pick<Role, 'name' | 'code'> & { permissions: number[] }) {
  return request.patch(`/api/role/${id}`, {
    body: params,
  });
}

/**
 * 删除角色
 *
 * @export
 * @param {number} id
 * @return {*}
 */
export function deleteRole(id: number) {
  return request.delete(`/api/role/${id}`);
}
