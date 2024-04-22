import PostPage from '@/proComponents/PostPage';

function Page({ params }: { params: { slug: string[] } }) {
  const slug = params.slug || [];
  const id = slug[0];
  const value = slug[2];
  return (
    <PostPage
      page={+value}
      query={{
        tags: [id],
      }}
    />
  );
}

export const revalidate = 0;
export default Page;
