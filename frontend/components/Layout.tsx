import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { getToken } from '../utils/auth';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => router.push('/')}
        >
          📚 Learning Platform
        </h1>
        {getToken() && (
          <button
            onClick={logout}
            className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-blue-100"
          >
            Logout
          </button>
        )}
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
