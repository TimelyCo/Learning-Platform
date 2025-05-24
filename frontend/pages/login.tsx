import { useState } from 'react';
import api from '../utils/api';
import { useRouter } from 'next/router';
import { setToken } from '../utils/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      setToken(res.data.token);

      // Redirect based on role
      if (res.data.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/learner/dashboard');
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input type="email" placeholder="Email" className="border p-2 mb-2 block" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="border p-2 mb-2 block" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </div>
  );
}
