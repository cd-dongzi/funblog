import { Permission, PageRes, PageQuery } from '@funblog/types';
import { request } from './fetch';

/**
 * 获取权限列表
 *
 * @export
 * @return {*}
 */
export function getPermissionList() {
  return request.get<Permission[]>('/api/permission');
}

/**
 * 获取权限分页列表
 *
 * @export
 * @param {PageQuery} params
 * @return {*}
 */
export function getPermissionPage(params: PageQuery) {
  return request.get<PageRes<Permission>>('/api/permission/page', {
    params,
  });
}

/**
 * 创建权限
 *
 * @export
 * @param {(Pick<Permission, 'name' | 'code'>)} params
 * @return {*}
 */
export function createPermission(params: Pick<Permission, 'name' | 'code'>) {
  return request.post('/api/permission', {
    body: params,
  });
}

/**
 * 更新权限
 *
 * @export
 * @param {string} id
 * @param {(Pick<Permission, 'name' | 'code'>)} params
 * @return {*}
 */
export function updatePermission(id: number, params: Pick<Permission, 'name' | 'code'>) {
  return request.patch(`/api/permission/${id}`, {
    body: params,
  });
}

export function deletePermission(id: number) {
  return request.delete(`/api/permission/${id}`);
}
