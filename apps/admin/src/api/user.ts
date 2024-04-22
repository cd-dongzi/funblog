import { PageQuery, PageRes, User } from '@funblog/types';
import { request, setTokenToHeader } from './fetch';

export function login(params: { username: string; password: string }) {
  return request.post('/api/login', {
    body: params,
  });
}

export function logout() {
  return request.post('/api/logout');
}

export function checkUser(token?: string) {
  return request.post<number | false>('/api/user-check', {
    body: { token },
  });
}

export function allowLoginAdmin(id: number) {
  return request.post(`/api/user/${id}/allow-login-admin`);
}

/**
 * 创建用户
 *
 * @export
 * @param {FormData} formData
 * @return {*}
 */
export function createUser(data: Partial<Omit<User, 'invitationCode'>> & { invitationCode: string }) {
  return request.post('/api/user', {
    body: data,
  });
}

/**
 * 获取用户列表
 *
 * @export
 * @return {*}
 */
export function getUserList(params?: { keyword?: string }) {
  return request.get<User[]>('/api/user/list', {
    params,
  });
}

/**
 * 获取用户分页列表
 *
 * @export
 * @param {PageQuery} params
 * @return {*}
 */
export function getUserPage(params: PageQuery) {
  return request.get<PageRes<User>>('/api/user/page', {
    params,
  });
}

/**
 * 禁用用户
 *
 * @export
 * @param {number} id
 * @return {*}
 */
export function disableUser(id: number) {
  return request.patch(`/api/user/${id}/disable`);
}

/**
 * 启用用户
 *
 * @export
 * @param {number} id
 * @return {*}
 */
export function enableUser(id: number) {
  return request.patch(`/api/user/${id}/enable`);
}

/**
 * 基于token查询用户信息
 *
 * @export
 * @param {string} [token]
 * @return {*}
 */
export function getUserInfoByToken(token?: string) {
  let options = {};
  if (token) {
    options = {
      headers: setTokenToHeader(token),
    };
  }
  return request.get<User>('/api/user/info/token', {
    ...options,
  });
}

/**
 * 更新用户权限
 *
 * @export
 * @param {number} id
 * @param {number[]} roleIds
 * @return {*}
 */
export function updateUserRoles(id: number, roleIds: number[]) {
  return request.patch(`/api/user/${id}/role`, {
    body: {
      userRoles: roleIds,
    },
  });
}

/**
 * 更新用户信息
 *
 * @export
 * @param {number} id
 * @param {Partial<User>} data
 * @return {*}
 */
export function updateUserInfo(id: number, data: Partial<User>) {
  return request.patch(`/api/user/${id}/info`, {
    body: data,
  });
}

/**
 * 更新用户头像
 *
 * @export
 * @param {number} id
 * @param {FormData} formData
 * @return {*}
 */
export function updateUserAvatar(id: number, avatar: string) {
  return request.post(`/api/user/${id}/avatar`, {
    body: { avatar },
  });
}

export function updateUserPassword(
  id: number,
  data: Pick<User, 'password'> & {
    oldPassword: string;
  },
) {
  return request.patch(`/api/user/${id}/password`, {
    body: data,
  });
}

/**
 * 删除用户
 *
 * @export
 * @param {number} id
 * @return {*}
 */
export function deleteUser(id: number) {
  return request.delete(`/api/user/${id}`);
}

export function getUserCount() {
  return request.get<number>('/api/user/count');
}
