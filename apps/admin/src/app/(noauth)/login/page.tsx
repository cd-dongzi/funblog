import { TOKEN_KEY } from '@funblog/constants';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { allowLoginAdmin, checkUser } from '@/api';
import Page from './_page';

export default async function Login(params: any) {
  let redirectUrl = '';
  try {
    const token = cookies().get(TOKEN_KEY)?.value;
    if (token) {
      const uid = await checkUser(token);
      if (uid) {
        const pass = await allowLoginAdmin(uid);
        if (pass) {
          redirectUrl = params?.searchParams?.redirectUrl || '/';
        }
      }
    }
  } catch (e) {}
  if (redirectUrl) {
    // redirect这玩意会报错， 不要包裹在try catch中
    // https://github.com/vercel/next.js/issues/49298
    return redirect(redirectUrl);
  }
  return <Page />;
}
