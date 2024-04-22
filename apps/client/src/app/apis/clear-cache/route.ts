import { revalidateTag } from 'next/cache';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag');
  if (tag) {
    revalidateTag(tag);
    return Response.json({
      code: 0,
      message: 'success',
    });
  }
  return Response.json({
    code: 1,
    message: 'fail',
  });
  // const token = request.cookies.get('token')
}
