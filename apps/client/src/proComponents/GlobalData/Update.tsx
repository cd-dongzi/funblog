'use client';
import { User } from '@funblog/types';
import { useEffect } from 'react';
import { useStore } from '@/context';

function Update({ userInfo }: { userInfo: User }) {
  const { updateUserInfo } = useStore();
  useEffect(() => {
    updateUserInfo(userInfo);
  }, [updateUserInfo, userInfo]);
  return <></>;
}

export default Update;
