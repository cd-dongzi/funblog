import Main from '../../Main';

export async function generateMetadata({ searchParams }: { searchParams: { keyword: string } }) {
  return {
    title: `搜索：${searchParams.keyword}`,
  };
}

function PostPage({ params, searchParams }: { params: { page: string }; searchParams: { keyword: string } }) {
  return <Main page={+params.page} keyword={searchParams?.keyword} />;
}

export default PostPage;
