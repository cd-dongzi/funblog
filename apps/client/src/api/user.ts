import { User } from '@funblog/types';
import { request, setTokenToHeader } from './fetch';

export function registerUser(data: Partial<User>) {
  return request.post<User>('/api/user/register', {
    body: data,
  });
}

export function loginUser(data: Partial<User>) {
  return request.post<{
    data: User;
    token: string;
  }>('/api/user-login', {
    body: data,
  });
}

export function logout() {
  return request.post('/api/logout');
}

export function getUserInfo(token?: string) {
  return request.get<User>('/api/user/info', {
    headers: {
      ...setTokenToHeader(token),
    },
  });
}

export function updateUserInfo(id: number, data: Partial<User>) {
  return request.patch(`/api/user/${id}/info`, {
    body: data,
  });
}

export function updateUserAvatar(id: number, avatar: string) {
  return request.post(`/api/user/${id}/avatar`, {
    body: { avatar },
  });
}
