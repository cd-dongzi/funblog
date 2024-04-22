import Main from './Main';

export async function generateMetadata({ searchParams }: { searchParams: { keyword: string } }) {
  return {
    title: `搜索：${searchParams.keyword}`,
  };
}

function PostPage({ searchParams }: { searchParams: { keyword: string } }) {
  return <Main keyword={searchParams?.keyword} />;
}

export default PostPage;
