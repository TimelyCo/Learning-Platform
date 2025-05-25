import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getToken } from '../utils/auth';

const withAuth = (Component: any, allowedRole: string) => {
  return function ProtectedComponent(props: any) {
    const router = useRouter();

    useEffect(() => {
      const token = getToken();
      if (!token) {
        router.push('/login');
      } else {
        try {
          const decoded: any = JSON.parse(atob(token.split('.')[1]));
          if (decoded.role !== allowedRole) {
            router.push('/login');
          }
        } catch {
          localStorage.removeItem('token');
          router.push('/login');
        }
      }
    }, []);

    return <Component {...props} />;
  };
};

export default withAuth;
