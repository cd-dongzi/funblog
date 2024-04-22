import { TOKEN_KEY } from '@funblog/constants';
import { cookies, headers } from 'next/headers';
import { getUserInfo, createVisitor } from '@/api';
import Update from './Update';

async function GetData() {
  const userInfo = await getUserInfo(cookies().get(TOKEN_KEY)?.value);
  createVisitor({
    userAgent: headers().get('user-agent') as string,
  });
  return <Update userInfo={userInfo} />;
}

export default GetData;
