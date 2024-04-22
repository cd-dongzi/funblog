import { request } from './fetch';

export function initData() {
  return request.post('/api/init/data');
}
