import { InvitationCode } from '@funblog/types';
import { request } from './fetch';

export function createInvitationCode(data: Partial<InvitationCode>) {
  return request.post('/api/invitation-code', {
    body: data,
  });
}

export function getInvitationCodeList() {
  return request.get<InvitationCode[]>('/api/invitation-code/list');
}

export function getInvitationCode(id: number) {
  return request.get<InvitationCode>(`/api/invitation-code/${id}`);
}

export function updateInvitationCode(id: number, data: Partial<InvitationCode>) {
  return request.patch(`/api/invitation-code/${id}`, {
    body: data,
  });
}

export function deleteInvitationCode(id: number) {
  return request.delete(`/api/invitation-code/${id}`);
}

export function deleteMoreInvitationCode(ids: number[]) {
  return request.delete('/api/invitation-code/remove', {
    body: {
      ids,
    },
  });
}
