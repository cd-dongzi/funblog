import { Image, PageQuery, PageRes } from '@funblog/types';
import { request } from './fetch';

export function uploadImage(formData: FormData) {
  return request.file<string>('/api/image/upload', {
    body: formData,
  });
}

export function getImagePage(params: PageQuery) {
  return request.get<PageRes<Image>>('/api/image/page', { params });
}

export function getImageInfo(id: number) {
  return request.get<Image>(`/api/image/${id}`);
}

export function deleteImage(id: number) {
  return request.delete(`/api/image/${id}`);
}

export function updateFilename(id: number, filename: string) {
  return request.patch<Image>(`/api/image/${id}/filename`, {
    body: {
      filename,
    },
  });
}
