// components/ProtectedRoute.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const session = supabase.auth.getSession();
    if (!session) {
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
}
