import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function useLogout(redirectToPath: string = '/') {
  const router = useRouter();

  return (path?: string) => {
    Cookies.remove('token');
    return router.push(path || redirectToPath);
  };
}
