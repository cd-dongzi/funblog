'use client';
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Link from '@/components/Link';
import Pagination from '@/components/Pagination';
import { PageProvider, usePageStore } from '@/context';
import { PageContextProps } from '@/context/page/context';
import { getPaginationPageUrl } from '@/utils';

function Container({ children, pagination }: PageContextProps & { children: React.ReactNode }) {
  return <PageProvider pagination={pagination}>{children}</PageProvider>;
}

function generateUrl(url: string, page: number) {
  !url.startsWith('/') && (url = `/${url}`);
  return (
    <Link className="h-full w-full" href={url}>
      {page}
    </Link>
  );
}

function getSearchStr(searchParams: ReadonlyURLSearchParams) {
  let str = '';
  const arr = [] as string[];
  for (const [key, value] of searchParams) {
    arr.push(`${key}=${value}`);
  }
  if (arr.length) {
    str = '?' + arr.join('&');
  }
  return str;
}

function Tools({ type }: { type?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsStr = getSearchStr(searchParams);
  const { updatePagination, pagination } = usePageStore();
  return (
    <>
      {!!pagination?.total && (
        <Pagination
          total={pagination.total}
          pageSize={pagination.pageSize}
          currentPage={pagination.page}
          className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2"
          renderPage={
            type === 'page' || type === 'message'
              ? (_page) => {
                  let url = getPaginationPageUrl(pathname!);
                  url = _page === 1 ? url : `${url}/page/${_page}`;
                  url = url.split('/').filter(Boolean).join('/');
                  url += searchParamsStr;
                  return generateUrl(url, _page);
                }
              : undefined
          }
          onChange={(page) => {
            updatePagination({ page });
          }}
        />
      )}
    </>
  );
}

function PageContainer({
  children,
  scroll = false,
  scrollTop = true,
  pagination,
  type,
}: {
  children: React.ReactNode;
  scroll?: boolean;
  scrollTop?: boolean;
  type?: string;
  pagination?: PageContextProps['pagination'];
}) {
  useEffect(() => {
    if (!scrollTop) return;
    window.scrollTo({
      top: 0,
    });
  }, [scrollTop]);

  useEffect(() => {
    if (scroll) {
      document.documentElement.classList.add('scroll');
    }
    return () => {
      document.documentElement.classList.remove('scroll');
    };
  }, [scroll]);
  return (
    <Container pagination={pagination}>
      {children}
      <Tools type={type} />
    </Container>
  );
}

export default PageContainer;
