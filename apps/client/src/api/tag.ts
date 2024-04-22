import { Tag } from '@funblog/types';
import { request } from './fetch';

export function getTagList() {
  return request.get<Tag[]>('/api/p/tag/list');
}
