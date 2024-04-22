import PostPage from '@/proComponents/PostPage';

function Page({ params }: { params: { slug: string[] } }) {
  const slug = params.slug || [];
  const id = slug[0];
  const value = slug[2];
  return (
    <PostPage
      page={+value}
      query={{
        categories: [id],
      }}
    />
  );
}

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const revalidate = 0;

export default Page;
