'use client';

import { useEffect } from 'react';
import { usePageStore } from '@/context';

function UpdatePagination({ page }: { page: number }) {
  const { updatePagination } = usePageStore();
  useEffect(() => {
    updatePagination({
      page,
    });
  }, [updatePagination, page]);
  return <></>;
}

export default UpdatePagination;
