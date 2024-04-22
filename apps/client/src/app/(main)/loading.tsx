import Loading from '@/components/Loading';
function PageLoading() {
  return (
    <div className="flex h-[calc(100vh-theme(spacing.headerH))] w-full items-center justify-center">
      <Loading />
    </div>
  );
}

export default PageLoading;
