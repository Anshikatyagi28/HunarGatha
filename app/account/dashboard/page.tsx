'use client';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) return <p>Loading...</p>;
  if (!user) {
    router.push('/account/login');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user.email}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 border rounded">My Orders</div>
        <div className="p-4 border rounded">Wishlist</div>
        <div className="p-4 border rounded">Profile Settings</div>
      </div>
    </div>
  );
}
