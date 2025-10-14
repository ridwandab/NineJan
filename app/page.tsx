'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('ninejan_token');
    if (token) {
      router.push('/feed');
    }

    // Handle Google OAuth redirect
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    const userParam = urlParams.get('user');

    if (tokenParam && userParam) {
      localStorage.setItem('ninejan_token', tokenParam);
      localStorage.setItem('ninejan_user', userParam);
      router.push('/feed');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">NineJan</h1>
          <p className="text-primary-100">Connect with friends and share your moments</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          {isLogin ? (
            <>
              <LoginForm />
              <p className="mt-4 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Sign up
                </button>
              </p>
            </>
          ) : (
            <>
              <RegisterForm />
              <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Sign in
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

