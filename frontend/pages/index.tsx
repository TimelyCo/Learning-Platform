import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getToken } from '../utils/auth';
import {jwtDecode} from 'jwt-decode';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/learner/dashboard');
        }
      } catch {
        localStorage.removeItem('token');
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, []);

  return <p className="text-center mt-10">Redirecting...</p>;
}
