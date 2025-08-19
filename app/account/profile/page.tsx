'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Redirect to login if no user
  useEffect(() => {
    if (!user) {
      router.push('/login'); 
    }
  }, [user, router]);

  if (!user) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.displayName || 'User'} 👋</h1>

        <div className="flex items-center space-x-4 mb-6">
          {user.photoURL && (
            <Image
              src={user.photoURL}
              alt="Profile"
              width={64}
              height={64}
              className="rounded-full"
            />
          )}
          <div>
            <p className="text-lg font-medium">{user.displayName || 'No Name'}</p>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="grid gap-4">
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
