import { Svg } from '@funblog/types';
import { request } from './fetch';

export function getSvgList() {
  return request.get<Svg[]>('/api/p/svg/list');
}
