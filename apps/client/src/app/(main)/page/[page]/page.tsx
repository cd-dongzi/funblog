import PostPage from '@/proComponents/PostPage';

function Page({ params }: { params: { page: string } }) {
  return <PostPage page={+params.page} />;
}

export default Page;
