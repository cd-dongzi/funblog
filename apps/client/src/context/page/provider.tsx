import { useCallback, useState } from 'react';
import { useStore } from '@/context';
import { Context, PageContextProps, PageContextPagination } from './context';

export const Provider = ({ children, ...props }: PageContextProps & { children: React.ReactNode }) => {
  const { siteLayout } = useStore();
  const _showSidebar = siteLayout?.showSidebar === undefined ? false : siteLayout.showSidebar;
  const [showSidebar, setShowSidebar] = useState(_showSidebar);
  const [pagination, setPagination] = useState(props.pagination);
  const updatePagination = useCallback((pagination: Partial<PageContextPagination>) => {
    setPagination(
      (prev) =>
        ({
          ...prev,
          ...pagination,
        }) as PageContextPagination,
    );
  }, []);
  return (
    <Context.Provider
      value={{
        showSidebar,
        setShowSidebar,
        pagination,
        updatePagination,
      }}
    >
      {children}
    </Context.Provider>
  );
};
