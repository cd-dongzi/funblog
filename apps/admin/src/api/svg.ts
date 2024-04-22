import { Svg } from '@funblog/types';
import { request } from './fetch';

export function createSvg(data: Partial<Svg>) {
  return request.post('/api/svg', {
    body: data,
  });
}

export function getSvgList(params?: { keyword?: string }) {
  return request.get<Svg[]>('/api/svg/list', {
    params,
  });
}
export function getSvgClientList(params?: { keyword?: string }) {
  return request.get<Svg[]>('/api/svg/list/client', {
    params,
  });
}
export function getSvgAdminList(params?: { keyword?: string }) {
  return request.get<Svg[]>('/api/p/svg/list/admin', {
    params,
  });
}

export function getSvg(id: number) {
  return request.get<Svg>(`/api/svg/${id}`);
}

export function updateSvg(id: number, data: Partial<Svg>) {
  return request.patch(`/api/svg/${id}`, {
    body: data,
  });
}

export function deleteSvg(id: number) {
  return request.delete(`/api/svg/${id}`);
}
